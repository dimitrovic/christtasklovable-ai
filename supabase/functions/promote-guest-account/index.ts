
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[PROMOTE-GUEST-ACCOUNT] ${step}${detailsStr}`);
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

    const { email, newPassword } = await req.json();
    if (!email || !newPassword) {
      throw new Error("Email and new password are required");
    }

    logStep("Promoting guest account", { email });

    // Find the existing user
    const { data: existingUsers, error: listError } = await supabaseClient.auth.admin.listUsers();
    if (listError) throw listError;

    const existingUser = existingUsers.users.find(u => u.email === email);
    if (!existingUser) {
      throw new Error("User not found");
    }

    logStep("Found existing user", { userId: existingUser.id });

    // Update the user's password and remove guest status
    const { data: updateData, error: updateError } = await supabaseClient.auth.admin.updateUserById(
      existingUser.id,
      {
        password: newPassword,
        user_metadata: {
          ...existingUser.user_metadata,
          is_guest: false
        }
      }
    );

    if (updateError) throw updateError;

    logStep("Successfully promoted guest account", { userId: existingUser.id });

    return new Response(JSON.stringify({ 
      success: true,
      message: "Account promoted successfully"
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in promote-guest-account", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
