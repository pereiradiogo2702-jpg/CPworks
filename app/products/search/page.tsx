'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

// Disable static generation for this page
export const dynamic = 'force-dynamic';
import Image from 'next/image';
import { useCartStore } from '@/store/cartStore';
import { useVehicleStore } from '@/store/vehicleStore';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  stock: number;
}

function SearchResults() {
  const [products, setProducts] = useState<Product[]>([]);
  const [addedToCart, setAddedToCart] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const { getCompatibleProducts, getBrandById } = useVehicleStore();

  // Get filter params from URL
  const selectedBrand = searchParams.get('brand');
  const selectedModel = searchParams.get('model');
  const selectedYear = searchParams.get('year') ? parseInt(searchParams.get('year')!) : null;
  const searchTerm = searchParams.get('search') || '';
  const categoryFilter = searchParams.get('category') || '';
  const priceFilter = searchParams.get('price') || '';

  // Load products
  useEffect(() => {
    const storedProducts = localStorage.getItem('cpworks_products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  const handleAddToCart = (product: Product) => {
    if (product.stock <= 0) return;

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
      stock: product.stock,
    });

    setAddedToCart(product.id);
    setTimeout(() => setAddedToCart(null), 2000);
  };

  // Filter products
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by vehicle
    if (selectedBrand) {
      const productIds = products.map(p => p.id);
      const compatibleIds = getCompatibleProducts(productIds);
      filtered = filtered.filter(p => compatibleIds.includes(p.id));
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (categoryFilter) {
      filtered = filtered.filter(p => p.category === categoryFilter);
    }

    // Filter by price
    if (priceFilter === 'low') {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (priceFilter === 'high') {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [products, selectedBrand, getCompatibleProducts, searchTerm, categoryFilter, priceFilter]);

  const selectedBrandData = selectedBrand ? getBrandById(selectedBrand) : null;

  return (
    <div className="min-h-screen bg-black">
      {/* Menu Hamburger */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-3 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white transition-all"
          aria-label="Menu"
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <span className={`w-full h-0.5 bg-purple-600 transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-full h-0.5 bg-purple-600 transition-all ${menuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-full h-0.5 bg-purple-600 transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </div>
        </button>

        {/* Menu déroulant */}
        {menuOpen && (
          <div className="absolute top-16 right-0 w-64 bg-white rounded-lg shadow-2xl overflow-hidden">
            <nav className="flex flex-col p-2">
              <a href="/" className="px-4 py-3 hover:bg-purple-50 rounded-lg transition-colors text-gray-800 font-medium">
                Accueil
              </a>
              <a href="/products" className="px-4 py-3 hover:bg-purple-50 rounded-lg transition-colors text-purple-600 font-bold">
                Produits
              </a>
              <a href="/contact" className="px-4 py-3 hover:bg-purple-50 rounded-lg transition-colors text-gray-800 font-medium">
                Contact
              </a>
              <a href="/cart" className="px-4 py-3 hover:bg-purple-50 rounded-lg transition-colors text-gray-800 font-medium">
                Panier
              </a>
            </nav>
          </div>
        )}
      </div>

      {/* Header */}
      <section className="bg-gradient-to-b from-purple-900/20 to-black py-20 pt-32">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-bold text-center mb-6 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
            Résultats de Recherche
          </h1>
          <p className="text-xl text-gray-400 text-center max-w-2xl mx-auto">
            {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}
          </p>

          {/* Afficher les filtres actifs */}
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {selectedBrandData && (
              <div className="px-4 py-2 bg-purple-600/20 border border-purple-500/30 rounded-lg text-purple-300">
                <span className="font-semibold">{selectedBrandData.name}</span>
                {selectedModel && ` ${selectedModel}`}
                {selectedYear && ` (${selectedYear})`}
              </div>
            )}
            {searchTerm && (
              <div className="px-4 py-2 bg-purple-600/20 border border-purple-500/30 rounded-lg text-purple-300">
                Recherche: "{searchTerm}"
              </div>
            )}
            {categoryFilter && (
              <div className="px-4 py-2 bg-purple-600/20 border border-purple-500/30 rounded-lg text-purple-300">
                Catégorie: {categoryFilter}
              </div>
            )}
            {priceFilter && (
              <div className="px-4 py-2 bg-purple-600/20 border border-purple-500/30 rounded-lg text-purple-300">
                Prix: {priceFilter === 'low' ? 'Croissant' : 'Décroissant'}
              </div>
            )}
          </div>

          {/* Bouton retour */}
          <div className="mt-6 text-center">
            <button
              onClick={() => router.push('/products')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-semibold transition-all duration-300"
            >
              <span>←</span>
              Nouvelle recherche
            </button>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="container mx-auto px-6">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-xl mb-4">
                Aucun produit trouvé
              </p>
              <button
                onClick={() => router.push('/products')}
                className="inline-block px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-all duration-300"
              >
                Retour à la sélection
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105"
                >
                  {/* Product Image/Icon */}
                  <div className="relative bg-gradient-to-br from-purple-900/30 to-black h-48 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      unoptimized
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {product.stock === 0 ? (
                      <div className="absolute top-4 right-4 bg-red-500 text-white text-xs px-3 py-1 rounded-full z-10">
                        Rupture
                      </div>
                    ) : product.stock < 10 ? (
                      <div className="absolute top-4 right-4 bg-orange-500 text-white text-xs px-3 py-1 rounded-full z-10">
                        Stock: {product.stock}
                      </div>
                    ) : (
                      <div className="absolute top-4 right-4 bg-green-500 text-white text-xs px-3 py-1 rounded-full z-10">
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
                        {product.price}€
                      </span>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                          addedToCart === product.id
                            ? 'bg-green-600 text-white'
                            : product.stock > 0
                            ? 'bg-purple-600 hover:bg-purple-700 text-white'
                            : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                        }`}
                        disabled={product.stock === 0}
                      >
                        {addedToCart === product.id ? '✓ Ajouté' : product.stock > 0 ? 'Ajouter' : 'Rupture'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
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

export default function SearchResultsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Chargement...</div>
      </div>
    }>
      <SearchResults />
    </Suspense>
  );
}
