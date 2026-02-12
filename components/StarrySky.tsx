'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function StarrySky() {
  const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>({});

  const starryImages = [
    { id: 1, src: '/starry1.jpg', alt: 'Ciel étoilé 1' },
    { id: 2, src: '/starry2.jpg', alt: 'Ciel étoilé 2' },
    { id: 3, src: '/starry3.jpg', alt: 'Ciel étoilé 3' },
    { id: 4, src: '/starry4.jpg', alt: 'Ciel étoilé 4' },
  ];

  return (
    <section className="relative py-20 bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-purple-300 to-purple-400 bg-clip-text text-transparent">
            ✨ Ciels Étoilés Sur Mesure
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-4">
            Transformez l'intérieur de votre véhicule en un ciel nocturne magique
          </p>
          <p className="text-purple-400 font-semibold text-xl">
            Installation professionnelle avec fibre optique premium
          </p>
        </div>

        {/* Images Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {starryImages.map((image) => (
            <div
              key={image.id}
              className="group relative aspect-square rounded-xl overflow-hidden border-2 border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 shadow-lg hover:shadow-purple-500/30"
            >
              {/* Image */}
              {!imageErrors[image.id] ? (
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={() => setImageErrors({ ...imageErrors, [image.id]: true })}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-purple-900/50 to-gray-900 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-2">✨</div>
                    <p className="text-purple-400 text-sm">Ciel étoilé {image.id}</p>
                  </div>
                </div>
              )}

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white font-semibold text-center">
                    Installation #{image.id}
                  </p>
                </div>
              </div>

              {/* Number badge */}
              <div className="absolute top-4 right-4 w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center font-bold text-white shadow-lg">
                {image.id}
              </div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 text-center">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="text-white font-semibold mb-2">Installation Rapide</h3>
            <p className="text-gray-400 text-sm">
              Installation professionnelle en une journée
            </p>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 text-center">
            <div className="text-4xl mb-3">💎</div>
            <h3 className="text-white font-semibold mb-2">Qualité Premium</h3>
            <p className="text-gray-400 text-sm">
              Fibre optique haut de gamme garantie 5 ans
            </p>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 text-center">
            <div className="text-4xl mb-3">🎨</div>
            <h3 className="text-white font-semibold mb-2">100% Personnalisable</h3>
            <p className="text-gray-400 text-sm">
              Intensité réglable et design sur mesure
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-purple-900/30 to-purple-800/30 border border-purple-500/30 rounded-2xl p-8 md:p-12 max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-4">
              Prêt à transformer votre véhicule ?
            </h3>
            <p className="text-gray-300 mb-6 text-lg">
              Contactez-nous pour un devis gratuit et personnalisé
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/30"
              >
                Demander un Devis Gratuit
              </a>
              <a
                href="tel:+33123456789"
                className="px-8 py-4 bg-transparent border-2 border-purple-500 hover:bg-purple-500/10 text-purple-400 rounded-lg font-semibold transition-all duration-300"
              >
                📞 Appelez-nous
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
