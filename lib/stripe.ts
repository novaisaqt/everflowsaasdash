// src/lib/stripe.ts
import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-10",
});

export const plans = {
  starter: process.env.NEXT_PUBLIC_STRIPE_PRICE_STARTER!,
  growth: process.env.NEXT_PUBLIC_STRIPE_PRICE_GROWTH!,
  scale: process.env.NEXT_PUBLIC_STRIPE_PRICE_SCALE!,
};
