import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const app = express();
const PORT = process.env.PORT || 3001;

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

// Stripe webhook needs raw body — must be BEFORE json middleware
app.post('/api/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const { show_id, user_id } = session.metadata;

    const { error } = await supabase.from('tickets').upsert(
      {
        user_id,
        show_id,
        stripe_session_id: session.id,
        stripe_payment_intent: session.payment_intent,
        amount_paid: session.amount_total,
      },
      { onConflict: 'user_id,show_id' }
    );

    if (error) {
      console.error('Error creating ticket from webhook:', error);
    } else {
      console.log(`Ticket created via webhook for user ${user_id}, show ${show_id}`);
    }
  }

  res.json({ received: true });
});

// JSON middleware for all other routes
app.use(express.json());
app.use(cors({ origin: FRONTEND_URL, credentials: true }));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Create Stripe checkout session
app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { showId, userId } = req.body;

    if (!showId || !userId) {
      return res.status(400).json({ error: 'showId and userId are required' });
    }

    // Fetch show details
    const { data: show, error } = await supabase
      .from('shows')
      .select('*')
      .eq('id', showId)
      .single();

    if (error || !show) {
      return res.status(404).json({ error: 'Show not found' });
    }

    // Check if user already has a ticket
    const { data: existingTicket } = await supabase
      .from('tickets')
      .select('id')
      .eq('user_id', userId)
      .eq('show_id', showId)
      .single();

    if (existingTicket) {
      return res.status(400).json({ error: 'You already have a ticket for this show' });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: show.title,
              description: show.description || `Ticket for ${show.title}`,
            },
            unit_amount: show.ticket_price,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${FRONTEND_URL}/show/${showId}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${FRONTEND_URL}/show/${showId}?canceled=true`,
      metadata: {
        show_id: showId,
        user_id: userId,
      },
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error('Error creating checkout session:', err);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

// Verify payment and create ticket (fallback if webhook is slow)
app.post('/api/verify-session', async (req, res) => {
  try {
    const { sessionId } = req.body;

    if (!sessionId) {
      return res.status(400).json({ error: 'sessionId is required' });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== 'paid') {
      return res.status(400).json({ error: 'Payment not completed' });
    }

    const { show_id, user_id } = session.metadata;

    const { data: ticket, error } = await supabase
      .from('tickets')
      .upsert(
        {
          user_id,
          show_id,
          stripe_session_id: session.id,
          stripe_payment_intent: session.payment_intent,
          amount_paid: session.amount_total,
        },
        { onConflict: 'user_id,show_id' }
      )
      .select()
      .single();

    if (error) {
      console.error('Error verifying session:', error);
      return res.status(500).json({ error: 'Failed to create ticket' });
    }

    res.json({ ticket });
  } catch (err) {
    console.error('Error verifying session:', err);
    res.status(500).json({ error: 'Failed to verify session' });
  }
});

// Check if user has ticket for a show
app.get('/api/check-ticket/:showId/:userId', async (req, res) => {
  try {
    const { showId, userId } = req.params;

    const { data: ticket } = await supabase
      .from('tickets')
      .select('*')
      .eq('user_id', userId)
      .eq('show_id', showId)
      .single();

    res.json({ hasTicket: !!ticket, ticket });
  } catch (err) {
    console.error('Error checking ticket:', err);
    res.status(500).json({ error: 'Failed to check ticket' });
  }
});

app.listen(PORT, () => {
  console.log(`IV Backend running on port ${PORT}`);
});
