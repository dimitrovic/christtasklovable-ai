
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[HANDLE-GUEST-SUCCESS] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } }
  );

  try {
    logStep("Function started");

    const { sessionId } = await req.json();
    if (!sessionId) throw new Error("Session ID is required");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");

    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });
    
    // Retrieve the checkout session
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    logStep("Retrieved session", { sessionId, status: session.payment_status });

    if (session.payment_status !== "paid") {
      throw new Error("Payment not completed");
    }

    // Get customer email from Stripe
    const customerEmail = session.customer_details?.email || session.customer_email;
    if (!customerEmail) {
      throw new Error("No customer email found");
    }

    logStep("Processing guest success", { email: customerEmail });

    // Create anonymous user account
    const tempPassword = crypto.randomUUID();
    const { data: authData, error: authError } = await supabaseClient.auth.admin.createUser({
      email: customerEmail,
      password: tempPassword,
      email_confirm: true, // Skip email confirmation for guest accounts
      user_metadata: {
        is_guest: true,
        stripe_session_id: sessionId,
        subscription_plan: session.metadata?.plan || "Premium",
        created_via: "guest_checkout"
      }
    });

    if (authError) throw authError;
    logStep("Created guest user", { userId: authData.user.id, email: customerEmail });

    // Update subscription status in database
    const subscriptionTier = session.metadata?.plan || "Premium";
    const subscriptionEnd = new Date();
    subscriptionEnd.setMonth(subscriptionEnd.getMonth() + 1); // Default to 1 month

    await supabaseClient.from("subscribers").upsert({
      email: customerEmail,
      user_id: authData.user.id,
      stripe_customer_id: session.customer as string,
      subscribed: true,
      subscription_tier: subscriptionTier,
      subscription_end: subscriptionEnd.toISOString(),
      updated_at: new Date().toISOString(),
    }, { onConflict: 'email' });

    logStep("Updated subscription status");

    // Generate a session for the guest user
    const { data: sessionData, error: sessionError } = await supabaseClient.auth.admin.generateLink({
      type: 'recovery',
      email: customerEmail,
    });

    if (sessionError) throw sessionError;

    return new Response(JSON.stringify({ 
      success: true,
      user: authData.user,
      access_token: sessionData.properties?.action_link || null,
      message: "Guest account created successfully"
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in handle-guest-success", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
