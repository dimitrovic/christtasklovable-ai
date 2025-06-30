const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4242;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Stripe payment intent creation
app.post('/create-payment-intent', async (req, res) => {
  try {
    const { plan, email, name } = req.body;
    
    // Define plan price IDs from Stripe
    const planPriceIds = {
      weekly: 'price_1ReOQ7FEfjI8S6GYiTNrAvPb', // £4.50
      monthly: 'price_1ReOLjFEfjI8S6GYAe7YSlOt' // £11.99
    };
    
    const priceId = planPriceIds[plan];
    
    if (!priceId) {
      return res.status(400).json({ error: 'Invalid plan selected' });
    }

    // Create payment intent using Stripe price ID
    const paymentIntent = await stripe.paymentIntents.create({
      amount: plan === 'weekly' ? 450 : 1199, // Amount in pence
      currency: 'gbp',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        plan: plan,
        customer_email: email,
        customer_name: name,
        stripe_price_id: priceId
      }
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      priceId: priceId
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: 'Failed to create payment intent' });
  }
});

// Stripe webhook handler
app.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('Payment succeeded:', paymentIntent.id);
      console.log('Plan:', paymentIntent.metadata.plan);
      console.log('Customer:', paymentIntent.metadata.customer_email);
      console.log('Price ID:', paymentIntent.metadata.stripe_price_id);
      
      // Here you would typically:
      // 1. Update user subscription in your database
      // 2. Send confirmation email
      // 3. Grant access to premium features based on plan
      if (paymentIntent.metadata.plan === 'weekly') {
        console.log('Granting weekly access to ChristTask');
      } else if (paymentIntent.metadata.plan === 'monthly') {
        console.log('Granting monthly access to ChristTask');
      }
      break;
    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object;
      console.log('Payment failed:', failedPayment.id);
      console.log('Customer:', failedPayment.metadata.customer_email);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
});

// Basic route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Hello World from the backend!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Health check route
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: err.message 
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.originalUrl 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 URL: http://localhost:${PORT}`);
  console.log(`💚 Health check: http://localhost:${PORT}/health`);
});

module.exports = app; 