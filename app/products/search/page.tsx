'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

// Disable static generation for this page
export const dynamic = 'force-dynamic';
import Image from 'next/image';
import { useCartStore } from '@/store/cartStore';
import { useVehicleStore } from '@/store/vehicleStore';
import { oilDatabase, OilSpec } from '@/lib/oilData';
import FlyToCartAnimation from '@/components/FlyToCartAnimation';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  stock: number;
}

interface OilVariant {
  engine: string;
  oil: string;
  spec: string;
  capacity: string;
}

function parseOilVariants(spec: OilSpec): OilVariant[] {
  const engines = spec.engine.split(' / ');
  const oils = spec.oil.split(' / ');
  const specs = spec.spec.split(' / ');
  const capacities = spec.capacity.split(' / ');

  const numVariants = Math.max(engines.length, oils.length);
  if (numVariants <= 1) return [];

  const allEnginesSame = engines.length === 1;

  return Array.from({ length: numVariants }, (_, i) => {
    const eng = engines[i] || engines[0];
    let oilVal = oils[i] || oils[0];
    let specVal = specs[i] || specs[0];
    if (specVal && !specVal.includes(' ') && specs[0].includes(' ')) {
      const prefix = specs[0].substring(0, specs[0].lastIndexOf(' '));
      specVal = `${prefix} ${specVal}`;
    }
    const capVal = capacities[i] || spec.capacity;
    // Si tous les moteurs sont identiques, afficher l'huile comme label
    const label = allEnginesSame ? oilVal.trim() : eng.trim();
    return { engine: label, oil: oilVal.trim(), spec: specVal.trim(), capacity: capVal.trim() };
  });
}

function SearchResults() {
  const [products, setProducts] = useState<Product[]>([]);
  const [addedToCart, setAddedToCart] = useState<string | null>(null);
  const [oilAddedToCart, setOilAddedToCart] = useState<'1L' | '5L' | null>(null);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState<number>(0);
  const [oilQty1L, setOilQty1L] = useState(1);
  const [oilQty5L, setOilQty5L] = useState(1);
  const [menuOpen, setMenuOpen] = useState(false);
  const [flyAnimation, setFlyAnimation] = useState<{ productImage: string; startPosition: { x: number; y: number } } | null>(null);

  const OIL_PRICES = { '1L': 14.99, '5L': 54.99 };

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

  const handleAddToCart = (product: Product, event: React.MouseEvent<HTMLButtonElement>) => {
    if (product.stock <= 0) return;

    // Capturer la position du bouton cliqué
    const rect = event.currentTarget.getBoundingClientRect();
    const startPosition = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };

    // Déclencher l'animation
    setFlyAnimation({
      productImage: product.image,
      startPosition,
    });

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

  const handleAddOilToCart = (spec: OilSpec, format: '1L' | '5L', event: React.MouseEvent<HTMLButtonElement>) => {
    const qty = format === '1L' ? oilQty1L : oilQty5L;

    // Capturer la position du bouton cliqué
    const rect = event.currentTarget.getBoundingClientRect();
    const startPosition = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };

    // Déclencher l'animation (sans image pour l'huile)
    setFlyAnimation({
      productImage: '',
      startPosition,
    });

    addItem({
      id: `oil-${selectedBrand}-${selectedModel}-${spec.oil}-${format}`,
      name: `Huile moteur ${spec.oil} ${format} — ${selectedBrandData?.name} ${selectedModel}`,
      price: OIL_PRICES[format],
      quantity: qty,
      image: '',
      stock: 99,
    });
    setOilAddedToCart(format);
    setTimeout(() => setOilAddedToCart(null), 2000);
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

  // Trouver l'huile moteur correspondante
  const oilSpec: OilSpec | null = (() => {
    if (!selectedBrandData || !selectedModel) return null;
    const brandData = oilDatabase.find(b => b.brand.toLowerCase() === selectedBrandData.name.toLowerCase());
    if (!brandData) return null;
    return brandData.models.find(m => m.model.toLowerCase() === selectedModel.toLowerCase()) || null;
  })();

  // Variantes moteur
  const oilVariants: OilVariant[] = oilSpec ? parseOilVariants(oilSpec) : [];
  const hasOilVariants = oilVariants.length > 1;
  // Toujours afficher une variante — index 0 par défaut
  const oilDisplay: OilVariant | null = hasOilVariants
    ? (oilVariants[selectedVariantIndex] ?? oilVariants[0])
    : (oilSpec ? { engine: oilSpec.engine, oil: oilSpec.oil, spec: oilSpec.spec, capacity: oilSpec.capacity } : null);

  return (
    <div className="min-h-screen bg-black relative">
      {/* Video Background */}
      <div className="fixed inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/search-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

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
      <section className="relative z-10 bg-gradient-to-b from-purple-900/20 to-transparent py-20 pt-32">
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
      <section className="relative z-10 py-16">
        <div className="container mx-auto px-6">
          {/* Carte Huile Moteur */}
          {oilSpec && (
            <div className="mb-10">
              <h2 className="text-xl font-bold text-purple-400 mb-4">
                Huile moteur recommandée pour votre {selectedBrandData?.name} {selectedModel}
              </h2>
              <div className="bg-gradient-to-br from-yellow-900/20 to-gray-900/60 border border-yellow-500/30 rounded-xl overflow-hidden">
                <div className="bg-yellow-500/10 px-6 py-3 flex items-center gap-2 border-b border-yellow-500/20">
                  <span className="text-yellow-400 font-semibold text-sm">Huile Moteur</span>
                  <span className="ml-auto text-xs text-gray-400">Recommandation constructeur</span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-3">
                    {selectedBrandData?.name} {selectedModel}
                  </h3>

                  {oilSpec.oil === 'N/A' ? (
                    <p className="text-blue-300 text-sm">Véhicule électrique — pas de vidange moteur requise.</p>
                  ) : (
                    <>
                      {/* Sélecteur de moteur si plusieurs variantes */}
                      {hasOilVariants && (
                        <div className="mb-5">
                          <p className="text-yellow-400 text-sm font-semibold mb-2">Sélectionnez votre moteur :</p>
                          <div className="flex flex-wrap gap-2">
                            {oilVariants.map((v, i) => (
                              <button
                                key={i}
                                onClick={() => { setSelectedVariantIndex(i); setOilAddedToCart(null); }}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border-2 ${
                                  selectedVariantIndex === i
                                    ? 'bg-yellow-500 text-black border-yellow-500'
                                    : 'bg-gray-800 text-gray-300 border-gray-600 hover:border-yellow-400 hover:text-white'
                                }`}
                              >
                                {v.engine}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Infos huile */}
                      {oilDisplay && (
                        <>
                          <div className="grid grid-cols-3 gap-3 mb-5">
                            <div className="bg-gray-900/60 rounded-lg p-3 text-center">
                              <p className="text-gray-500 text-xs mb-1">Viscosité</p>
                              <p className="text-yellow-400 font-bold">{oilDisplay.oil}</p>
                            </div>
                            <div className="bg-gray-900/60 rounded-lg p-3 text-center">
                              <p className="text-gray-500 text-xs mb-1">Norme</p>
                              <p className="text-white text-xs font-semibold">{oilDisplay.spec}</p>
                            </div>
                            <div className="bg-gray-900/60 rounded-lg p-3 text-center">
                              <p className="text-gray-500 text-xs mb-1">Capacité</p>
                              <p className="text-green-400 font-bold">{oilDisplay.capacity}</p>
                            </div>
                          </div>
                          {/* Formats indépendants */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                            {(['1L', '5L'] as const).map(fmt => {
                              const qty = fmt === '1L' ? oilQty1L : oilQty5L;
                              const setQty = fmt === '1L' ? setOilQty1L : setOilQty5L;
                              const added = oilAddedToCart === fmt;
                              return (
                                <div key={fmt} className="bg-gray-900/80 border border-gray-700 rounded-xl p-4 flex flex-col gap-3">
                                  <div className="flex items-center justify-between">
                                    <span className="text-white font-bold text-lg">{fmt}</span>
                                    <span className="text-yellow-400 font-bold">{OIL_PRICES[fmt].toFixed(2)} € / bouteille</span>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-9 h-9 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-bold text-xl flex items-center justify-center">−</button>
                                    <span className="text-white font-bold text-lg min-w-[2rem] text-center">{qty}</span>
                                    <button onClick={() => setQty(q => Math.min(20, q + 1))} className="w-9 h-9 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-bold text-xl flex items-center justify-center">+</button>
                                    <span className="text-gray-400 text-sm ml-auto">= {(OIL_PRICES[fmt] * qty).toFixed(2)} €</span>
                                  </div>
                                  <button
                                    onClick={(e) => handleAddOilToCart({ ...oilSpec, oil: oilDisplay.oil, spec: oilDisplay.spec, capacity: oilDisplay.capacity, engine: oilDisplay.engine }, fmt, e)}
                                    className={`w-full py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 ${
                                      added ? 'bg-green-600 text-white' : 'bg-yellow-500 hover:bg-yellow-400 text-black'
                                    }`}
                                  >
                                    {added ? '✓ Ajouté' : `Ajouter ${qty}× ${fmt} au panier`}
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        </>
                      )}
                    </>
                  )}

                  <p className="text-gray-600 text-xs mt-4">Consultez votre manuel du propriétaire pour confirmation.</p>
                </div>
              </div>
            </div>
          )}

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
                        onClick={(e) => handleAddToCart(product, e)}
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
      <section className="relative z-10 bg-gradient-to-r from-purple-900/20 to-transparent py-16 border-t border-purple-500/20">
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

      {/* Fly to Cart Animation */}
      {flyAnimation && (
        <FlyToCartAnimation
          productImage={flyAnimation.productImage}
          startPosition={flyAnimation.startPosition}
          onComplete={() => setFlyAnimation(null)}
        />
      )}
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
