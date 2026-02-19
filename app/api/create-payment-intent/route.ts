import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const stripeKey = process.env.STRIPE_SECRET_KEY;

    if (!stripeKey || stripeKey.includes('REMPLACER')) {
      return NextResponse.json(
        { error: 'Clés Stripe non configurées. Ajoutez vos clés dans .env.local' },
        { status: 503 }
      );
    }

    const { default: Stripe } = await import('stripe');
    const stripe = new Stripe(stripeKey);

    const { amount, metadata } = await req.json();

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: 'Montant invalide' }, { status: 400 });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // En centimes
      currency: 'eur',
      metadata: metadata || {},
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Stripe error:', error);
    return NextResponse.json({ error: 'Erreur lors de la création du paiement' }, { status: 500 });
  }
}
