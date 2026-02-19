'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Order, generateInvoicePDF } from '@/lib/invoice';

function OrderConfirmedContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('id');
  const [order, setOrder] = useState<Order | null>(null);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (!orderId) return;
    const orders = JSON.parse(localStorage.getItem('cpworks_orders') || '[]');
    const found = orders.find((o: Order) => o.id === orderId);
    if (found) setOrder(found);
  }, [orderId]);

  const handleDownloadPDF = async () => {
    if (!order) return;
    setDownloading(true);
    try {
      await generateInvoicePDF(order);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="container mx-auto px-6 max-w-2xl">

      {/* Confirmation */}
      <div className="bg-gradient-to-br from-green-900/20 to-gray-900/30 border border-green-500/30 rounded-2xl p-10 text-center mb-8">
        <div className="w-20 h-20 bg-green-500/20 border-2 border-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-white mb-3">Paiement confirmé !</h1>
        <p className="text-gray-300 mb-2">
          Merci pour votre commande{order ? `, ${order.customerName}` : ''}.
        </p>

        {order && (
          <>
            <div className="flex items-center justify-center gap-3 mt-4">
              <span className="text-gray-400 text-sm">Numéro de facture :</span>
              <span className="text-purple-400 font-bold text-lg">{order.invoiceNumber}</span>
            </div>
            <p className="text-gray-500 text-sm mt-2">
              Un email de confirmation a été envoyé à{' '}
              <span className="text-purple-400">{order.customerEmail}</span>
            </p>
          </>
        )}
      </div>

      {/* Détails commande */}
      {order && (
        <div className="bg-gray-900/50 border border-purple-500/20 rounded-2xl p-6 mb-6">
          <h2 className="text-white font-semibold mb-4">Détail de la commande</h2>
          <div className="space-y-2 mb-4">
            {order.items.map((item, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span className="text-gray-300">{item.name} <span className="text-gray-500">x{item.quantity}</span></span>
                <span className="text-white">{(item.unitPrice * item.quantity).toFixed(2)} €</span>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-700 pt-4 space-y-1">
            <div className="flex justify-between text-sm text-gray-400">
              <span>Sous-total HT</span>
              <span>{order.subtotalHT.toFixed(2)} €</span>
            </div>
            <div className="flex justify-between text-sm text-gray-400">
              <span>TVA 17% Luxembourg</span>
              <span>{order.tvaAmount.toFixed(2)} €</span>
            </div>
            <div className="flex justify-between text-white font-bold text-lg pt-2 border-t border-gray-700">
              <span>Total TTC</span>
              <span className="text-purple-400">{order.totalTTC.toFixed(2)} €</span>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        {order && (
          <button
            onClick={handleDownloadPDF}
            disabled={downloading}
            className="flex-1 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
          >
            {downloading ? (
              <>
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Génération...
              </>
            ) : (
              <>📄 Télécharger la facture PDF</>
            )}
          </button>
        )}

        <Link
          href="/"
          className="flex-1 py-3 bg-transparent border-2 border-purple-500 hover:bg-purple-500/10 text-purple-400 rounded-lg font-semibold transition-all duration-300 text-center"
        >
          Retour à l&apos;accueil
        </Link>

        <Link
          href="/products"
          className="flex-1 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-semibold transition-all duration-300 text-center"
        >
          Continuer les achats
        </Link>
      </div>

    </div>
  );
}

export default function OrderConfirmedPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20">
      <Suspense fallback={
        <div className="container mx-auto px-6 max-w-2xl text-center pt-20">
          <svg className="animate-spin h-10 w-10 text-purple-400 mx-auto" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        </div>
      }>
        <OrderConfirmedContent />
      </Suspense>
    </div>
  );
}
