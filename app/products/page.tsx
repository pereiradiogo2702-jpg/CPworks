'use client';

import { useState } from 'react';

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  description: string;
  image: string;
  inStock: boolean;
}

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('Tous');

  const categories = ['Tous', 'LED & Éclairage', 'Ciel Étoilé', 'Accessoires', 'Entretien'];

  const products: Product[] = [
    {
      id: 1,
      name: 'Kit Ciel Étoilé Premium',
      category: 'Ciel Étoilé',
      price: '599€',
      description: 'Kit complet avec fibre optique premium, générateur LED et installation incluse',
      image: '✨',
      inStock: true,
    },
    {
      id: 2,
      name: 'Bande LED RGB 5m',
      category: 'LED & Éclairage',
      price: '89€',
      description: 'Bande LED flexible RGB avec télécommande et contrôle via application',
      image: '💡',
      inStock: true,
    },
    {
      id: 3,
      name: 'Éclairage Pédalier LED',
      category: 'LED & Éclairage',
      price: '45€',
      description: 'Kit d\'éclairage LED pour pédalier avec capteur de mouvement',
      image: '🚗',
      inStock: true,
    },
    {
      id: 4,
      name: 'Projecteur Logo Porte',
      category: 'LED & Éclairage',
      price: '35€',
      description: 'Projecteur LED personnalisable pour afficher votre logo sur le sol',
      image: '🎯',
      inStock: true,
    },
    {
      id: 5,
      name: 'Kit Ambiance RGB 360°',
      category: 'LED & Éclairage',
      price: '149€',
      description: 'Système d\'ambiance complet avec synchronisation musique',
      image: '🌈',
      inStock: true,
    },
    {
      id: 6,
      name: 'Fibre Optique Pro (100m)',
      category: 'Ciel Étoilé',
      price: '299€',
      description: 'Fibre optique haute qualité pour installation ciel étoilé personnalisé',
      image: '⭐',
      inStock: true,
    },
    {
      id: 7,
      name: 'Générateur LED Bluetooth',
      category: 'Ciel Étoilé',
      price: '179€',
      description: 'Générateur LED avec contrôle Bluetooth et variation de couleurs',
      image: '📱',
      inStock: true,
    },
    {
      id: 8,
      name: 'Tapis de Sol LED',
      category: 'Accessoires',
      price: '119€',
      description: 'Tapis de sol avec éclairage LED intégré et détection de présence',
      image: '🔲',
      inStock: true,
    },
    {
      id: 9,
      name: 'Nettoyant Intérieur Pro',
      category: 'Entretien',
      price: '25€',
      description: 'Nettoyant professionnel pour plastiques et cuirs avec protection UV',
      image: '🧴',
      inStock: true,
    },
    {
      id: 10,
      name: 'Kit Polissage Phares',
      category: 'Entretien',
      price: '39€',
      description: 'Kit complet pour restaurer la transparence de vos phares',
      image: '💎',
      inStock: true,
    },
    {
      id: 11,
      name: 'Bande LED Sous-Caisse',
      category: 'LED & Éclairage',
      price: '79€',
      description: 'Kit d\'éclairage sous-caisse étanche avec télécommande',
      image: '⚡',
      inStock: false,
    },
    {
      id: 12,
      name: 'Revêtement Nano-Céramique',
      category: 'Entretien',
      price: '199€',
      description: 'Protection nano-céramique longue durée avec effet hydrophobe',
      image: '🛡️',
      inStock: true,
    },
  ];

  const filteredProducts =
    selectedCategory === 'Tous'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <section className="bg-gradient-to-b from-purple-900/20 to-black py-20">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-bold text-center mb-6 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
            Nos Produits
          </h1>
          <p className="text-xl text-gray-400 text-center max-w-2xl mx-auto">
            Découvrez notre sélection de produits premium pour la customisation et l'entretien de votre véhicule
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-gray-900/50 border-y border-purple-500/20 sticky top-20 z-40 backdrop-blur-md">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/50'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                {/* Product Image/Icon */}
                <div className="relative bg-gradient-to-br from-purple-900/30 to-black p-8 flex items-center justify-center h-48">
                  <div className="text-7xl transform group-hover:scale-110 transition-transform duration-300">
                    {product.image}
                  </div>
                  {!product.inStock && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white text-xs px-3 py-1 rounded-full">
                      Rupture
                    </div>
                  )}
                  {product.inStock && (
                    <div className="absolute top-4 right-4 bg-green-500 text-white text-xs px-3 py-1 rounded-full">
                      En stock
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <div className="text-xs text-purple-400 font-semibold mb-2">
                    {product.category}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-purple-500">
                      {product.price}
                    </span>
                    <button
                      className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                        product.inStock
                          ? 'bg-purple-600 hover:bg-purple-700 text-white'
                          : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                      }`}
                      disabled={!product.inStock}
                    >
                      {product.inStock ? 'Commander' : 'Indisponible'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400 text-xl">Aucun produit dans cette catégorie</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-purple-900/20 to-black py-16 border-t border-purple-500/20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Besoin d'un conseil ?
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Notre équipe est à votre disposition pour vous aider à choisir les produits adaptés à vos besoins
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/30"
          >
            Contactez-nous
          </a>
        </div>
      </section>
    </div>
  );
}
