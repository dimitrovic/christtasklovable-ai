
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CREATE-CHECKOUT] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? ""
  );

  try {
    logStep("Function started");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");
    logStep("Stripe key verified");

    // Get the plan type from the request body
    const { plan = "monthly" } = await req.json().catch(() => ({}));
    logStep("Plan selected", { plan });

    // Check if user is authenticated (optional now)
    const authHeader = req.headers.get("Authorization");
    let user = null;
    let customerEmail = null;

    if (authHeader) {
      try {
        const token = authHeader.replace("Bearer ", "");
        const { data } = await supabaseClient.auth.getUser(token);
        user = data.user;
        if (user?.email) {
          customerEmail = user.email;
          logStep("User authenticated", { userId: user.id, email: user.email });
        }
      } catch (error) {
        logStep("Authentication failed, proceeding as guest", { error: error.message });
      }
    }

    logStep("Processing checkout", { isGuest: !user, hasEmail: !!customerEmail, plan });

    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });
    
    // Check if customer already exists (only if we have an email)
    let customerId;
    if (customerEmail) {
      const customers = await stripe.customers.list({ email: customerEmail, limit: 1 });
      if (customers.data.length > 0) {
        customerId = customers.data[0].id;
        logStep("Existing customer found", { customerId });
      }
    }

    const origin = req.headers.get("origin") || "http://localhost:3000";
    
    // Define pricing based on plan
    let priceData;
    let planName;
    if (plan === "weekly") {
      priceData = {
        currency: "gbp",
        product_data: { 
          name: "ChristTask Weekly Subscription",
          description: "Unlimited apologetic questions, all topic categories, and scripture-based responses"
        },
        unit_amount: 599, // £5.99
        recurring: { interval: "week" },
      };
      planName = "Weekly";
    } else {
      priceData = {
        currency: "gbp",
        product_data: { 
          name: "ChristTask Premium Subscription",
          description: "Unlimited apologetic questions, all topic categories, and scripture-based responses"
        },
        unit_amount: 1899, // £18.99
        recurring: { interval: "month" },
      };
      planName = "Monthly";
    }

    const sessionConfig: any = {
      line_items: [
        {
          price_data: priceData,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${origin}/?success=true`,
      cancel_url: `${origin}/?cancelled=true`,
      allow_promotion_codes: true,
      metadata: {
        user_id: user?.id || "guest",
        email: customerEmail || "guest_checkout",
        plan: planName,
      }
    };

    // Only set customer or customer_email if we have valid data
    if (customerId) {
      sessionConfig.customer = customerId;
    } else if (customerEmail) {
      sessionConfig.customer_email = customerEmail;
    }
    // For guest users without email, let Stripe collect email during checkout

    const session = await stripe.checkout.sessions.create(sessionConfig);

    logStep("Checkout session created", { sessionId: session.id, url: session.url, plan: planName });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in create-checkout", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
