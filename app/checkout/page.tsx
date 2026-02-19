'use client';

import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const CheckoutForm = dynamic(() => import('@/components/CheckoutForm'), { ssr: false });

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const user = useAuthStore((state) => state.user);

  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const subtotalHT = getTotalPrice();
  const tvaRate = 0.17;
  const tvaAmount = subtotalHT * tvaRate;
  const totalTTC = subtotalHT * (1 + tvaRate);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    if (items.length === 0) {
      router.push('/cart');
      return;
    }

    // Créer le PaymentIntent
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: totalTTC,
        metadata: {
          userId: user.id,
          itemCount: items.length.toString(),
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          setError('Impossible de préparer le paiement. Vérifiez vos clés Stripe.');
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Erreur de connexion au service de paiement.');
        setLoading(false);
      });
  }, [user, items, totalTTC, router]);

  if (!user || items.length === 0) {
    return null;
  }

  const elementsOptions = clientSecret
    ? {
        clientSecret,
        appearance: {
          theme: 'night' as const,
          variables: {
            colorPrimary: '#a855f7',
            colorBackground: '#1f1f1f',
            colorText: '#ffffff',
            colorDanger: '#f87171',
            fontFamily: 'Arial, sans-serif',
            borderRadius: '8px',
          },
        },
      }
    : undefined;

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/cart" className="text-purple-400 hover:text-purple-300 text-sm flex items-center gap-1 mb-4">
            ← Retour au panier
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
            Finaliser la commande
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Colonne gauche : Récapitulatif */}
          <div>
            <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6 mb-6">
              <h2 className="text-xl font-bold text-white mb-4">Récapitulatif</h2>

              <div className="space-y-3 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-start py-2 border-b border-gray-800">
                    <div className="flex-1 pr-4">
                      <p className="text-white text-sm font-medium">{item.name}</p>
                      <p className="text-gray-400 text-xs mt-0.5">x{item.quantity}</p>
                    </div>
                    <p className="text-white text-sm font-semibold whitespace-nowrap">
                      {(item.price * item.quantity).toFixed(2)} €
                    </p>
                  </div>
                ))}
              </div>

              {/* Calculs TVA */}
              <div className="space-y-2">
                <div className="flex justify-between text-gray-400 text-sm">
                  <span>Sous-total HT</span>
                  <span>{subtotalHT.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between text-gray-400 text-sm">
                  <span>Livraison</span>
                  <span className="text-green-400">Gratuit</span>
                </div>
                <div className="flex justify-between text-gray-400 text-sm">
                  <span>TVA (17% Luxembourg)</span>
                  <span>{tvaAmount.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between text-white font-bold text-lg border-t border-gray-700 pt-3 mt-3">
                  <span>Total TTC</span>
                  <span className="text-purple-400">{totalTTC.toFixed(2)} €</span>
                </div>
              </div>
            </div>

            {/* Info facture */}
            <div className="bg-purple-900/20 border border-purple-500/20 rounded-xl p-4">
              <p className="text-purple-300 text-sm flex items-start gap-2">
                <span className="text-lg">📄</span>
                <span>Une facture PDF au format <strong>CPW-{new Date().getFullYear()}-XXXX</strong> sera générée automatiquement après votre paiement et envoyée par email.</span>
              </p>
            </div>
          </div>

          {/* Colonne droite : Formulaire paiement */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6">
            {loading && (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <svg className="animate-spin h-10 w-10 text-purple-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  <p className="text-gray-400">Chargement du paiement...</p>
                </div>
              </div>
            )}

            {error && (
              <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-6 text-center">
                <p className="text-red-400 text-lg mb-2">⚠️ {error}</p>
                <p className="text-gray-400 text-sm">
                  Pour activer Stripe, ajoutez vos clés API dans le fichier <code className="text-purple-400">.env.local</code>
                </p>
                <div className="mt-4 bg-gray-800/50 rounded-lg p-4 text-left">
                  <p className="text-gray-300 text-xs font-mono">
                    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...<br />
                    STRIPE_SECRET_KEY=sk_test_...
                  </p>
                </div>
                <p className="text-gray-500 text-xs mt-3">
                  Créez votre compte sur <a href="https://stripe.com" target="_blank" rel="noopener noreferrer" className="text-purple-400 underline">stripe.com</a>
                </p>
              </div>
            )}

            {!loading && !error && clientSecret && elementsOptions && (
              <Elements stripe={stripePromise} options={elementsOptions}>
                <CheckoutForm clientSecret={clientSecret} />
              </Elements>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
