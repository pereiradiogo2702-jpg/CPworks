'use client';

import { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { generateInvoiceNumber, Order } from '@/lib/invoice';

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

interface CheckoutFormProps {
  clientSecret: string;
}

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#ffffff',
      fontFamily: 'Arial, sans-serif',
      fontSize: '16px',
      '::placeholder': {
        color: '#6b7280',
      },
      backgroundColor: 'transparent',
    },
    invalid: {
      color: '#f87171',
      iconColor: '#f87171',
    },
  },
};

export default function CheckoutForm({ clientSecret }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const items = useCartStore((state) => state.items);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const clearCart = useCartStore((state) => state.clearCart);
  const user = useAuthStore((state) => state.user);

  const [formData, setFormData] = useState<FormData>({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: '',
    postalCode: '',
    country: 'Luxembourg',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const subtotalHT = getTotalPrice();
  const tvaRate = 0.17;
  const tvaAmount = subtotalHT * tvaRate;
  const totalTTC = subtotalHT * (1 + tvaRate);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      setError('Stripe n\'est pas encore chargé. Veuillez patienter.');
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setError('Impossible de trouver le champ carte.');
      return;
    }

    // Validation formulaire basique
    if (!formData.name || !formData.email || !formData.address || !formData.city || !formData.postalCode) {
      setError('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            address: {
              line1: formData.address,
              city: formData.city,
              postal_code: formData.postalCode,
              country: formData.country === 'Luxembourg' ? 'LU' : 'FR',
            },
          },
        },
      });

      if (result.error) {
        setError(result.error.message || 'Erreur lors du paiement.');
        setIsLoading(false);
        return;
      }

      if (result.paymentIntent?.status === 'succeeded') {
        // Créer la commande
        const invoiceNumber = generateInvoiceNumber();
        const orderId = `order-${Date.now()}`;

        const order: Order = {
          id: orderId,
          invoiceNumber,
          userId: user?.id || 'guest',
          customerName: formData.name,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          customerAddress: formData.address,
          customerCity: formData.city,
          customerPostalCode: formData.postalCode,
          customerCountry: formData.country,
          items: items.map((item) => ({
            productId: item.id,
            name: item.name,
            quantity: item.quantity,
            unitPrice: item.price,
          })),
          subtotalHT,
          tvaRate,
          tvaAmount,
          totalTTC,
          stripePaymentIntentId: result.paymentIntent.id,
          status: 'paid',
          createdAt: new Date().toISOString(),
        };

        // Sauvegarder dans localStorage
        const orders = JSON.parse(localStorage.getItem('cpworks_orders') || '[]');
        orders.push(order);
        localStorage.setItem('cpworks_orders', JSON.stringify(orders));

        // Mettre à jour le stock des produits
        const products = JSON.parse(localStorage.getItem('cpworks_products') || '[]');
        items.forEach((cartItem) => {
          const productIndex = products.findIndex((p: { id: string }) => p.id === cartItem.id);
          if (productIndex !== -1) {
            products[productIndex].stock -= cartItem.quantity;
          }
        });
        localStorage.setItem('cpworks_products', JSON.stringify(products));

        // Envoyer email de confirmation
        try {
          await fetch('/api/send-invoice', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: formData.email,
              customerName: formData.name,
              invoiceNumber,
              orderId,
              items: order.items,
              subtotalHT,
              tvaAmount,
              totalTTC,
            }),
          });
        } catch {
          // Email non bloquant
          console.warn('Email non envoyé, mais commande enregistrée');
        }

        // Vider le panier
        clearCart();

        // Rediriger vers la page de confirmation
        router.push(`/order-confirmed?id=${orderId}`);
      }
    } catch {
      setError('Une erreur inattendue s\'est produite.');
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Infos livraison */}
      <div>
        <h3 className="text-white font-semibold text-lg mb-4">Informations de livraison</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-400 text-sm mb-1">Nom complet *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Jean Dupont"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-500"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-1">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="jean@example.com"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-500"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-1">Téléphone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+352 123 456 789"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-500"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-1">Pays *</label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="Luxembourg">Luxembourg</option>
              <option value="France">France</option>
              <option value="Belgique">Belgique</option>
              <option value="Allemagne">Allemagne</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="block text-gray-400 text-sm mb-1">Adresse *</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              placeholder="123 Rue de la Paix"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-500"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-1">Ville *</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              placeholder="Luxembourg"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-500"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-1">Code postal *</label>
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              required
              placeholder="1234"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-500"
            />
          </div>
        </div>
      </div>

      {/* Paiement carte */}
      <div>
        <h3 className="text-white font-semibold text-lg mb-4">Informations de paiement</h3>
        <div className="bg-gray-800 border border-gray-600 rounded-lg p-4">
          <CardElement options={CARD_ELEMENT_OPTIONS} />
        </div>
        <p className="text-gray-500 text-xs mt-2 flex items-center gap-1">
          🔒 Paiement sécurisé par Stripe — Vos données sont chiffrées
        </p>
      </div>

      {/* Erreur */}
      {error && (
        <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {/* Bouton payer */}
      <button
        type="submit"
        disabled={!stripe || isLoading}
        className="w-full py-4 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-all duration-300 text-lg flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Paiement en cours...
          </>
        ) : (
          <>🔒 Payer {totalTTC.toFixed(2)} €</>
        )}
      </button>
    </form>
  );
}
