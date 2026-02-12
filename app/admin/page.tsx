'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { Order, Product } from '@/lib/supabase';

type TabType = 'orders' | 'products';

export default function AdminPage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  const [activeTab, setActiveTab] = useState<TabType>('orders');
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (!user || !user.isAdmin) {
      router.push('/login');
      return;
    }

    loadOrders();
    loadProducts();
  }, [user, router]);

  const loadOrders = () => {
    const storedOrders = localStorage.getItem('cpworks_orders');
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    }
  };

  const loadProducts = () => {
    const storedProducts = localStorage.getItem('cpworks_products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  };

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem('cpworks_orders', JSON.stringify(updatedOrders));
  };

  const updateProductStock = (productId: string, newStock: number) => {
    const updatedProducts = products.map((product) =>
      product.id === productId ? { ...product, stock: Math.max(0, newStock) } : product
    );
    setProducts(updatedProducts);
    localStorage.setItem('cpworks_products', JSON.stringify(updatedProducts));
  };

  const saveProduct = (product: Product) => {
    let updatedProducts;
    if (editingProduct && products.find((p) => p.id === product.id)) {
      // Update existing product
      updatedProducts = products.map((p) => (p.id === product.id ? product : p));
    } else {
      // Add new product
      updatedProducts = [...products, { ...product, id: `prod-${Date.now()}` }];
    }
    setProducts(updatedProducts);
    localStorage.setItem('cpworks_products', JSON.stringify(updatedProducts));
    setEditingProduct(null);
  };

  const deleteProduct = (productId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce produit?')) {
      const updatedProducts = products.filter((p) => p.id !== productId);
      setProducts(updatedProducts);
      localStorage.setItem('cpworks_products', JSON.stringify(updatedProducts));
    }
  };

  if (!user || !user.isAdmin) {
    return null;
  }

  const statusColors = {
    pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
    processing: 'bg-blue-500/20 text-blue-400 border-blue-500/50',
    completed: 'bg-green-500/20 text-green-400 border-green-500/50',
    cancelled: 'bg-red-500/20 text-red-400 border-red-500/50',
  };

  const statusLabels = {
    pending: 'En attente',
    processing: 'En cours',
    completed: 'Terminée',
    cancelled: 'Annulée',
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black pt-32 px-6 pb-20">
      <div className="container mx-auto max-w-7xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
          🔧 Panel Administrateur
        </h1>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-purple-500/20">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-6 py-3 font-semibold transition-all duration-300 ${
              activeTab === 'orders'
                ? 'text-purple-400 border-b-2 border-purple-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Commandes ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-6 py-3 font-semibold transition-all duration-300 ${
              activeTab === 'products'
                ? 'text-purple-400 border-b-2 border-purple-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Produits ({products.length})
          </button>
        </div>

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {orders.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">📦</div>
                <p className="text-gray-400 text-xl">Aucune commande pour le moment</p>
              </div>
            ) : (
              orders
                .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                .map((order) => (
                  <div
                    key={order.id}
                    className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">
                          Commande #{order.id.slice(-8)}
                        </h3>
                        <p className="text-gray-400 text-sm">
                          {new Date(order.created_at).toLocaleString('fr-FR')}
                        </p>
                      </div>

                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as Order['status'])}
                        className={`px-4 py-2 rounded-lg font-semibold border ${
                          statusColors[order.status]
                        } bg-gray-800 cursor-pointer transition-all duration-300`}
                      >
                        <option value="pending">En attente</option>
                        <option value="processing">En cours</option>
                        <option value="completed">Terminée</option>
                        <option value="cancelled">Annulée</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Customer Info */}
                      <div>
                        <h4 className="text-sm font-semibold text-purple-400 mb-2">
                          Informations client
                        </h4>
                        <div className="space-y-1 text-sm text-gray-300">
                          <p>
                            <strong>Nom:</strong> {order.customer_name}
                          </p>
                          <p>
                            <strong>Email:</strong> {order.customer_email}
                          </p>
                          <p>
                            <strong>Tél:</strong> {order.customer_phone}
                          </p>
                          <p>
                            <strong>Adresse:</strong> {order.customer_address}
                          </p>
                        </div>
                      </div>

                      {/* Order Items */}
                      <div>
                        <h4 className="text-sm font-semibold text-purple-400 mb-2">Articles</h4>
                        <div className="space-y-2">
                          {order.items.map((item, index) => (
                            <div
                              key={index}
                              className="flex justify-between text-sm text-gray-300"
                            >
                              <span>
                                {item.product_name} x{item.quantity}
                              </span>
                              <span className="font-semibold">
                                {(item.price * item.quantity).toFixed(2)} €
                              </span>
                            </div>
                          ))}
                          <div className="border-t border-gray-700 pt-2 flex justify-between font-bold text-purple-400">
                            <span>Total</span>
                            <span>{order.total.toFixed(2)} €</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
            )}
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div>
            <div className="mb-6">
              <button
                onClick={() =>
                  setEditingProduct({
                    id: '',
                    name: '',
                    description: '',
                    price: 0,
                    stock: 0,
                    category: 'LED & Éclairage',
                    image: '🔧',
                    created_at: new Date().toISOString(),
                  })
                }
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                + Ajouter un produit
              </button>
            </div>

            {/* Product Form */}
            {editingProduct && (
              <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 mb-6">
                <h3 className="text-xl font-bold text-white mb-4">
                  {editingProduct.id ? 'Modifier le produit' : 'Nouveau produit'}
                </h3>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    saveProduct(editingProduct);
                  }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  <input
                    type="text"
                    placeholder="Nom du produit"
                    value={editingProduct.name}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, name: e.target.value })
                    }
                    required
                    className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  />
                  <select
                    value={editingProduct.category}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, category: e.target.value })
                    }
                    className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  >
                    <option>LED & Éclairage</option>
                    <option>Ciel Étoilé</option>
                    <option>Accessoires</option>
                    <option>Entretien</option>
                  </select>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Prix (€)"
                    value={editingProduct.price || ''}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })
                    }
                    required
                    className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  />
                  <input
                    type="number"
                    placeholder="Stock"
                    value={editingProduct.stock || ''}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, stock: parseInt(e.target.value) })
                    }
                    required
                    className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  />
                  <input
                    type="text"
                    placeholder="Emoji (ex: 💡)"
                    value={editingProduct.image}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, image: e.target.value })
                    }
                    required
                    className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  />
                  <textarea
                    placeholder="Description"
                    value={editingProduct.description}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, description: e.target.value })
                    }
                    required
                    rows={3}
                    className="md:col-span-2 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500 resize-none"
                  />
                  <div className="md:col-span-2 flex gap-4">
                    <button
                      type="submit"
                      className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-all duration-300"
                    >
                      Sauvegarder
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingProduct(null)}
                      className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition-all duration-300"
                    >
                      Annuler
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Products List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="text-4xl">{product.image}</div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingProduct(product)}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-1">{product.name}</h3>
                  <p className="text-xs text-purple-400 mb-2">{product.category}</p>
                  <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-purple-500">
                      {product.price} €
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateProductStock(product.id, product.stock - 1)}
                        className="w-8 h-8 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
                      >
                        -
                      </button>
                      <span className="text-white font-semibold w-12 text-center">
                        {product.stock}
                      </span>
                      <button
                        onClick={() => updateProductStock(product.id, product.stock + 1)}
                        className="w-8 h-8 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
