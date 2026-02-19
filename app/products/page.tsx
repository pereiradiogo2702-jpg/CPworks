'use client';

import { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';
import { useVehicleStore } from '@/store/vehicleStore';
import { generateYearRange, brandGroups, vehicleModels } from '@/lib/vehicleData';
import { motion, AnimatePresence } from 'framer-motion';

// Lazy load 3D component (disable SSR)
const VehicleModel3D = dynamic(() => import('@/components/VehicleModel3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
      <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-500"></div>
    </div>
  )
});

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  stock: number;
}

// Produits initiaux avec stock
const initialProducts: Product[] = [
  {
    id: 'prod-1',
    name: 'Kit Ciel Étoilé Premium',
    category: 'Ciel Étoilé',
    price: 599,
    description: 'Kit complet avec fibre optique premium, générateur LED et installation incluse',
    image: 'https://placehold.co/400x300/9333ea/ffffff?text=CPWorks',
    stock: 15,
  },
  {
    id: 'prod-2',
    name: 'Bande LED RGB 5m',
    category: 'LED & Éclairage',
    price: 89,
    description: 'Bande LED flexible RGB avec télécommande et contrôle via application',
    image: 'https://placehold.co/400x300/9333ea/ffffff?text=CPWorks',
    stock: 50,
  },
  {
    id: 'prod-3',
    name: 'Éclairage Pédalier LED',
    category: 'LED & Éclairage',
    price: 45,
    description: 'Kit d\'éclairage LED pour pédalier avec capteur de mouvement',
    image: 'https://placehold.co/400x300/9333ea/ffffff?text=CPWorks',
    stock: 30,
  },
  {
    id: 'prod-4',
    name: 'Projecteur Logo Porte',
    category: 'LED & Éclairage',
    price: 35,
    description: 'Projecteur LED personnalisable pour afficher votre logo sur le sol',
    image: 'https://placehold.co/400x300/9333ea/ffffff?text=CPWorks',
    stock: 40,
  },
  {
    id: 'prod-5',
    name: 'Kit Ambiance RGB 360°',
    category: 'LED & Éclairage',
    price: 149,
    description: 'Système d\'ambiance complet avec synchronisation musique',
    image: 'https://placehold.co/400x300/9333ea/ffffff?text=CPWorks',
    stock: 25,
  },
  {
    id: 'prod-6',
    name: 'Fibre Optique Pro (100m)',
    category: 'Ciel Étoilé',
    price: 299,
    description: 'Fibre optique haute qualité pour installation ciel étoilé personnalisé',
    image: 'https://placehold.co/400x300/9333ea/ffffff?text=CPWorks',
    stock: 20,
  },
  {
    id: 'prod-7',
    name: 'Générateur LED Bluetooth',
    category: 'Ciel Étoilé',
    price: 179,
    description: 'Générateur LED avec contrôle Bluetooth et variation de couleurs',
    image: 'https://placehold.co/400x300/9333ea/ffffff?text=CPWorks',
    stock: 18,
  },
  {
    id: 'prod-8',
    name: 'Tapis de Sol LED',
    category: 'Accessoires',
    price: 119,
    description: 'Tapis de sol avec éclairage LED intégré et détection de présence',
    image: 'https://placehold.co/400x300/9333ea/ffffff?text=CPWorks',
    stock: 12,
  },
  {
    id: 'prod-9',
    name: 'Nettoyant Intérieur Pro',
    category: 'Entretien',
    price: 25,
    description: 'Nettoyant professionnel pour plastiques et cuirs avec protection UV',
    image: 'https://placehold.co/400x300/9333ea/ffffff?text=CPWorks',
    stock: 100,
  },
  {
    id: 'prod-10',
    name: 'Kit Polissage Phares',
    category: 'Entretien',
    price: 39,
    description: 'Kit complet pour restaurer la transparence de vos phares',
    image: 'https://placehold.co/400x300/9333ea/ffffff?text=CPWorks',
    stock: 45,
  },
  {
    id: 'prod-11',
    name: 'Bande LED Sous-Caisse',
    category: 'LED & Éclairage',
    price: 79,
    description: 'Kit d\'éclairage sous-caisse étanche avec télécommande',
    image: 'https://placehold.co/400x300/9333ea/ffffff?text=CPWorks',
    stock: 0,
  },
  {
    id: 'prod-12',
    name: 'Revêtement Nano-Céramique',
    category: 'Entretien',
    price: 199,
    description: 'Protection nano-céramique longue durée avec effet hydrophobe',
    image: 'https://placehold.co/400x300/9333ea/ffffff?text=CPWorks',
    stock: 22,
  },
];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [addedToCart, setAddedToCart] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Index du carrousel

  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const {
    selectedBrand,
    selectedModel,
    selectedYear,
    brands,
    setSelectedBrand,
    setSelectedModel,
    setSelectedYear,
    getBrandById,
    getCompatibleProducts,
    initializeVehicleData,
    resetSelection
  } = useVehicleStore();

  // Initialize vehicle data and reset selection on page load
  useEffect(() => {
    initializeVehicleData();
    resetSelection(); // Toujours démarrer avec "Toutes"
  }, [initializeVehicleData, resetSelection]);

  // Initialiser les produits
  useEffect(() => {
    const storedProducts = localStorage.getItem('cpworks_products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      localStorage.setItem('cpworks_products', JSON.stringify(initialProducts));
      setProducts(initialProducts);
    }
  }, []);

  // Rafraîchir les produits
  useEffect(() => {
    const handleFocus = () => {
      const storedProducts = localStorage.getItem('cpworks_products');
      if (storedProducts) {
        setProducts(JSON.parse(storedProducts));
      }
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
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

  // Debug logging
  useEffect(() => {
    if (selectedBrand) {
      console.log('🔍 Selected brand:', selectedBrand);
      console.log('📋 Brand data:', selectedBrandData);
      if (selectedBrandData) {
        console.log('🎨 Model path:', selectedBrandData.modelPath);
      } else {
        console.error('❌ Brand not found in store!');
      }
    }
  }, [selectedBrand, selectedBrandData]);

  const categories = Array.from(new Set(products.map(p => p.category)));
  const availableModels = selectedBrand && vehicleModels[selectedBrand] ? vehicleModels[selectedBrand] : [];
  const availableYears = generateYearRange();

  // Images de la galerie
  const galleryImages = [
    { src: '/gallery/c1.jpeg', title: 'Installation Premium', subtitle: 'CPWorks' },
    { src: '/gallery/c2.jpeg', title: 'Éclairage LED', subtitle: 'Qualité professionnelle' },
    { src: '/gallery/c3.jpeg', title: 'Intérieur Luxe', subtitle: 'Personnalisation complète' },
    { src: '/gallery/c4.jpeg', title: 'Ciel Étoilé', subtitle: 'Technologie avancée' },
    { src: '/gallery/c5.jpeg', title: 'Ambiance RGB', subtitle: 'Installation sur mesure' },
    { src: '/gallery/c6.jpeg', title: 'Finition Premium', subtitle: 'Résultat exceptionnel' },
  ];

  // Navigation carrousel
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Masquer le header principal sur cette page */}
      <style jsx global>{`
        body > nav { display: none; }
        main { padding-top: 0 !important; }
      `}</style>

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
      {/* Hero Banner - 3D Model ou Video */}
      <section className="relative h-[600px] bg-gradient-to-b from-purple-900/20 to-black overflow-hidden" style={{ isolation: 'isolate', zIndex: 1 }}>
        <AnimatePresence mode="wait">
          {selectedBrand && selectedBrandData ? (
            // Modèle 3D si marque sélectionnée
            <motion.div
              key="3d-model"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{ transform: 'translateZ(0)', willChange: 'transform' }}
            >
              <VehicleModel3D
                modelPath={selectedBrandData.modelPath}
                brandName={selectedBrandData.name}
                height="600px"
                autoRotate={true}
              />
            </motion.div>
          ) : (
            // Vidéo par défaut
            <motion.div
              key="hero-video"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0"
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              >
                <source src="/products-bg.mp4" type="video/mp4" />
              </video>
              {/* Overlay sombre - Réduit à 30% */}
              <div className="absolute inset-0 bg-black/30"></div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Barre de Recherche/Filtre Unifiée - Chevauche le hero */}
      <section className="relative z-20 -mt-32">
        <div className="container mx-auto px-6">
          <div className="bg-gray-800 rounded-2xl shadow-2xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
              {/* 1. Marque */}
              <div>
                <label className="block text-gray-200 font-semibold mb-2 text-sm">
                  Marque
                </label>
                <select
                  value={selectedBrand || ''}
                  onChange={(e) => setSelectedBrand(e.target.value || null)}
                  className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-700 text-white"
                >
                  <option value="">Toutes</option>
                  {brandGroups.map(group => (
                    <optgroup key={group.label} label={group.label}>
                      {group.brands.map(brand => (
                        <option key={brand.id} value={brand.id}>{brand.name}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>

              {/* 2. Modèle */}
              <div>
                <label className="block text-gray-200 font-semibold mb-2 text-sm">
                  Modèle
                </label>
                <select
                  value={selectedModel || ''}
                  onChange={(e) => setSelectedModel(e.target.value || null)}
                  className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!selectedBrand}
                >
                  <option value="">Tous</option>
                  {availableModels.map(model => (
                    <option key={model} value={model}>{model}</option>
                  ))}
                </select>
              </div>

              {/* 3. Année */}
              <div>
                <label className="block text-gray-200 font-semibold mb-2 text-sm">
                  Année
                </label>
                <select
                  value={selectedYear || ''}
                  onChange={(e) => setSelectedYear(e.target.value ? parseInt(e.target.value) : null)}
                  className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-700 text-white"
                >
                  <option value="">Toutes</option>
                  {availableYears.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              {/* 4. Rechercher */}
              <div>
                <label className="block text-gray-200 font-semibold mb-2 text-sm">
                  Rechercher
                </label>
                <input
                  type="text"
                  placeholder="Nom du produit..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-700 text-white placeholder-gray-400"
                />
              </div>

              {/* 5. Catégorie */}
              <div>
                <label className="block text-gray-200 font-semibold mb-2 text-sm">
                  Catégorie
                </label>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-700 text-white"
                >
                  <option value="">Toutes</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* 6. Prix */}
              <div>
                <label className="block text-gray-200 font-semibold mb-2 text-sm">
                  Prix
                </label>
                <select
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-700 text-white"
                >
                  <option value="">Pertinence</option>
                  <option value="low">Prix croissant</option>
                  <option value="high">Prix décroissant</option>
                </select>
              </div>
            </div>

            {/* 7. Search Button - Full width row */}
            <div className="mt-4">
              <button
                onClick={() => {
                  // Construire l'URL avec les paramètres de recherche
                  const params = new URLSearchParams();
                  if (selectedBrand) params.set('brand', selectedBrand);
                  if (selectedModel) params.set('model', selectedModel);
                  if (selectedYear) params.set('year', selectedYear.toString());
                  if (searchTerm) params.set('search', searchTerm);
                  if (categoryFilter) params.set('category', categoryFilter);
                  if (priceFilter) params.set('price', priceFilter);

                  // Naviguer vers la page de résultats
                  router.push(`/products/search?${params.toString()}`);
                }}
                className="w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Rechercher
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Showcase Gallery - Carrousel iPhone */}
      <section className="py-16 bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="container mx-auto px-6">
          <div>
              <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                Nos Réalisations
              </h2>

              {/* Carrousel iPhone */}
              <div className="flex items-center justify-center gap-8 px-4">
                {/* Flèche Gauche */}
                <button
                  onClick={prevImage}
                  className="p-4 bg-purple-600 hover:bg-purple-700 rounded-full transition-all duration-300 shadow-lg hover:scale-110"
                  aria-label="Image précédente"
                >
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Cadre iPhone */}
                <div className="relative">
                  {/* Moldure iPhone */}
                  <div className="relative bg-black rounded-[3rem] p-4 shadow-2xl" style={{ width: '340px', height: '680px' }}>
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-black w-40 h-8 rounded-b-3xl z-20"></div>

                    {/* Écran */}
                    <div className="relative w-full h-full bg-gray-900 rounded-[2.5rem] overflow-hidden">
                      {/* Image */}
                      <div className="relative w-full h-full">
                        <Image
                          src={galleryImages[currentImageIndex].src}
                          alt={galleryImages[currentImageIndex].title}
                          fill
                          unoptimized
                          className="object-cover"
                        />

                        {/* Overlay gradient - Optionnel */}
                        {/* <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div> */}
                      </div>
                    </div>

                    {/* Bouton power (optionnel) */}
                    <div className="absolute right-0 top-32 w-1 h-16 bg-gray-800 rounded-l"></div>
                  </div>

                  {/* Indicateurs de pagination */}
                  <div className="flex justify-center gap-2 mt-6">
                    {galleryImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentImageIndex
                            ? 'bg-purple-500 w-8'
                            : 'bg-gray-600 hover:bg-gray-500'
                        }`}
                        aria-label={`Aller à l'image ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Flèche Droite */}
                <button
                  onClick={nextImage}
                  className="p-4 bg-purple-600 hover:bg-purple-700 rounded-full transition-all duration-300 shadow-lg hover:scale-110"
                  aria-label="Image suivante"
                >
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* CTA sous le carrousel */}
              <div className="text-center mt-16">
                <p className="text-gray-400 text-lg mb-6">
                  Sélectionnez votre véhicule ci-dessus pour voir nos produits compatibles
                </p>
                <div className="flex justify-center gap-8">
                  <div className="flex items-center gap-2 text-purple-400">
                    <span>Toutes marques</span>
                  </div>
                  <div className="flex items-center gap-2 text-purple-400">
                    <span>Installation pro</span>
                  </div>
                  <div className="flex items-center gap-2 text-purple-400">
                    <span>Qualité premium</span>
                  </div>
                </div>
              </div>
            </div>
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
