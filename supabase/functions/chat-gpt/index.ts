
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    // Get the session or user object
    const {
      data: { user },
    } = await supabaseClient.auth.getUser()

    if (!user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    const { message, topic } = await req.json()

    // Check today's usage
    const today = new Date().toISOString().split('T')[0]
    
    const { data: usageData, error: usageError } = await supabaseClient
      .from('user_message_usage')
      .select('message_count')
      .eq('user_id', user.id)
      .eq('date', today)
      .single()

    let currentCount = 0
    if (usageData) {
      currentCount = usageData.message_count
    }

    // Check if user has exceeded daily limit
    if (currentCount >= 15) {
      return new Response(
        JSON.stringify({ 
          error: 'Daily message limit reached',
          message: 'You have reached your daily limit of 15 messages. Please try again tomorrow.',
          remaining: 0
        }),
        {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    // Try different possible names for the OpenAI API key
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY') || 
                        Deno.env.get('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')
    
    console.log('Checking for OpenAI API key...', openaiApiKey ? 'Found' : 'Not found')
    
    if (!openaiApiKey) {
      console.error('OpenAI API key not found in environment variables')
      return new Response(
        JSON.stringify({ error: 'OpenAI API key not configured' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    // Updated system prompt to respond as if speaking directly to the questioner
    const systemPrompt = 'You are a Christian apologist responding directly to someone (Muslim, atheist, or skeptic) who has asked you a challenging question about Christianity. Speak TO THEM directly using "you" - as if you are having a face-to-face conversation. Defend Christianity using Bible verses, logic, and respectful reasoning. Always quote Scripture with references, provide context, and keep your tone firm but loving. Be straightforward and give direct answers without lengthy explanations - make your response something a Christian could say word-for-word in conversation.'

    console.log('Making request to OpenAI API...')
    
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        max_tokens: 1000,
        temperature: 0.7,
      }),
    })

    if (!openaiResponse.ok) {
      const errorText = await openaiResponse.text()
      console.error(`OpenAI API error: ${openaiResponse.status} - ${errorText}`)
      throw new Error(`OpenAI API error: ${openaiResponse.status}`)
    }

    const openaiData = await openaiResponse.json()
    const aiResponse = openaiData.choices[0].message.content

    console.log('OpenAI response received successfully')

    // Update or insert usage count
    if (usageData) {
      // Update existing record
      await supabaseClient
        .from('user_message_usage')
        .update({ 
          message_count: currentCount + 1,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id)
        .eq('date', today)
    } else {
      // Insert new record
      await supabaseClient
        .from('user_message_usage')
        .insert({
          user_id: user.id,
          date: today,
          message_count: 1
        })
    }

    return new Response(
      JSON.stringify({ 
        response: aiResponse,
        remaining: 14 - currentCount
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )

  } catch (error) {
    console.error('Chat GPT function error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})
