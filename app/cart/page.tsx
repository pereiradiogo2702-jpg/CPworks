'use client';

import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function CartPage() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const clearCart = useCartStore((state) => state.clearCart);
  const user = useAuthStore((state) => state.user);

  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleCheckout = () => {
    if (!user) {
      router.push('/login');
      return;
    }

    // Simuler la création d'une commande
    const order = {
      id: `order-${Date.now()}`,
      user_id: user.id,
      items: items.map((item) => ({
        product_id: item.id,
        product_name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      total: getTotalPrice(),
      status: 'pending',
      customer_name: user.name,
      customer_email: user.email,
      customer_phone: user.phone || '',
      customer_address: user.address || '',
      created_at: new Date().toISOString(),
    };

    // Sauvegarder la commande dans localStorage
    const orders = JSON.parse(localStorage.getItem('cpworks_orders') || '[]');
    orders.push(order);
    localStorage.setItem('cpworks_orders', JSON.stringify(orders));

    // Mettre à jour le stock des produits
    const products = JSON.parse(localStorage.getItem('cpworks_products') || '[]');
    items.forEach((cartItem) => {
      const productIndex = products.findIndex((p: any) => p.id === cartItem.id);
      if (productIndex !== -1) {
        products[productIndex].stock -= cartItem.quantity;
      }
    });
    localStorage.setItem('cpworks_products', JSON.stringify(products));

    clearCart();
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black pt-32 px-6 pb-20">
        <div className="container mx-auto max-w-2xl">
          <div className="bg-gradient-to-br from-purple-900/30 to-gray-900/30 border border-purple-500/30 rounded-2xl p-12 text-center">
            <div className="text-6xl mb-6">✅</div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Commande confirmée!
            </h2>
            <p className="text-gray-300 mb-2">
              Merci pour votre commande. Nous vous contacterons bientôt pour confirmer les détails.
            </p>
            <p className="text-purple-400 mb-8">
              Un email de confirmation vous a été envoyé.
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/"
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Retour à l'accueil
              </Link>
              <Link
                href="/products"
                className="px-6 py-3 bg-transparent border-2 border-purple-500 hover:bg-purple-500/10 text-purple-400 rounded-lg font-semibold transition-all duration-300"
              >
                Continuer les achats
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black pt-32 px-6 pb-20">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center">
            <div className="text-8xl mb-6">🛒</div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Votre panier est vide
            </h1>
            <p className="text-gray-400 mb-8">
              Ajoutez des produits pour commencer vos achats
            </p>
            <Link
              href="/products"
              className="inline-block px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/30"
            >
              Voir nos produits
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const totalPrice = getTotalPrice();

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black pt-32 px-6 pb-20">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
          🛒 Votre Panier
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 flex gap-6"
              >
                <div className="relative w-24 h-24 flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {item.name}
                  </h3>
                  <p className="text-purple-400 font-semibold mb-4">
                    {item.price.toFixed(2)} €
                  </p>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
                      >
                        -
                      </button>
                      <span className="text-white font-semibold w-12 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        disabled={item.quantity >= item.stock}
                        className="w-8 h-8 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        +
                      </button>
                    </div>

                    <span className="text-gray-400 text-sm">
                      Stock: {item.stock}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col justify-between items-end">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    🗑️
                  </button>
                  <p className="text-xl font-bold text-white">
                    {(item.price * item.quantity).toFixed(2)} €
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-purple-900/30 to-gray-900/30 border border-purple-500/30 rounded-2xl p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-white mb-6">
                Résumé de la commande
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-300">
                  <span>Sous-total</span>
                  <span>{totalPrice.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Livraison</span>
                  <span className="text-green-400">Gratuit</span>
                </div>
                <div className="border-t border-gray-700 pt-4 flex justify-between text-white font-bold text-xl">
                  <span>Total</span>
                  <span className="text-purple-400">{totalPrice.toFixed(2)} €</span>
                </div>
              </div>

              {!user && (
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-4">
                  <p className="text-yellow-400 text-sm">
                    ⚠️ Vous devez être connecté pour passer commande
                  </p>
                </div>
              )}

              <button
                onClick={handleCheckout}
                className="w-full px-6 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/30 mb-4"
              >
                {user ? 'Passer la commande' : 'Se connecter pour commander'}
              </button>

              <Link
                href="/products"
                className="block text-center text-purple-400 hover:text-purple-300 text-sm transition-colors"
              >
                ← Continuer les achats
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
