'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function StarrySky() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);
  const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>({});

  const starryImages = [
    { id: 1, src: '/starry1.jpg', alt: 'Ciel étoilé 1', title: 'Installation Premium' },
    { id: 2, src: '/starry2.jpg', alt: 'Ciel étoilé 2', title: 'Ambiance Luxe' },
    { id: 3, src: '/starry3.jpg', alt: 'Ciel étoilé 3', title: 'Éclairage Sur Mesure' },
    { id: 4, src: '/starry4.jpg', alt: 'Ciel étoilé 4', title: 'Expérience Unique' },
  ];

  const nextImage = () => {
    setIsGlitching(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % starryImages.length);
      setTimeout(() => setIsGlitching(false), 100);
    }, 200);
  };

  const prevImage = () => {
    setIsGlitching(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + starryImages.length) % starryImages.length);
      setTimeout(() => setIsGlitching(false), 100);
    }, 200);
  };

  const currentImage = starryImages[currentIndex];

  return (
    <section className="relative py-20 bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-purple-300 to-purple-400 bg-clip-text text-transparent"
            style={{
              fontFamily: "PastelTrunk, 'Comic Sans MS', cursive, sans-serif",
              letterSpacing: "0.1em"
            }}
          >
            ★ Ciels Étoilés Sur Mesure
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-4">
            Transformez l'intérieur de votre véhicule en un ciel nocturne magique
          </p>
          <p className="text-purple-400 font-semibold text-xl">
            Installation professionnelle avec fibre optique premium
          </p>
        </div>

        {/* Carousel */}
        <div className="mb-12 max-w-5xl mx-auto">
          <div className="relative aspect-video rounded-2xl overflow-hidden border-2 border-purple-500/30 shadow-2xl shadow-purple-500/20">
            {/* Main Image with Glitch Effect */}
            <div
              className={`relative w-full h-full ${
                isGlitching ? 'animate-glitch-carousel' : ''
              }`}
            >
              {!imageErrors[currentImage.id] ? (
                <Image
                  src={currentImage.src}
                  alt={currentImage.alt}
                  fill
                  className="object-contain"
                  onError={() => setImageErrors({ ...imageErrors, [currentImage.id]: true })}
                  priority
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-purple-900/50 to-gray-900 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-9xl mb-4">✨</div>
                    <p className="text-purple-400 text-2xl font-bold">{currentImage.title}</p>
                  </div>
                </div>
              )}

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

              {/* Image Title */}
              <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
                <h3 className="text-3xl font-bold text-white mb-2">{currentImage.title}</h3>
                <p className="text-purple-300">Installation #{currentImage.id} - {starryImages.length}</p>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-black/70 hover:bg-purple-600 border-2 border-purple-500/50 rounded-full flex items-center justify-center text-white text-2xl transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-purple-500/50"
              aria-label="Image précédente"
            >
              ←
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-black/70 hover:bg-purple-600 border-2 border-purple-500/50 rounded-full flex items-center justify-center text-white text-2xl transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-purple-500/50"
              aria-label="Image suivante"
            >
              →
            </button>

            {/* Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {starryImages.map((img, idx) => (
                <button
                  key={img.id}
                  onClick={() => {
                    setIsGlitching(true);
                    setTimeout(() => {
                      setCurrentIndex(idx);
                      setTimeout(() => setIsGlitching(false), 100);
                    }, 200);
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? 'bg-purple-500 w-8'
                      : 'bg-gray-400/50 hover:bg-gray-300'
                  }`}
                  aria-label={`Aller à l'image ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 text-center hover:border-purple-500/50 transition-all duration-300">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="text-white font-semibold mb-2">Installation Rapide</h3>
            <p className="text-gray-400 text-sm">
              Installation professionnelle en une journée
            </p>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 text-center hover:border-purple-500/50 transition-all duration-300">
            <div className="text-4xl mb-3">💎</div>
            <h3 className="text-white font-semibold mb-2">Qualité Premium</h3>
            <p className="text-gray-400 text-sm">
              Fibre optique haut de gamme garantie 5 ans
            </p>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 text-center hover:border-purple-500/50 transition-all duration-300">
            <div className="text-4xl mb-3">🎨</div>
            <h3 className="text-white font-semibold mb-2">100% Personnalisable</h3>
            <p className="text-gray-400 text-sm">
              Intensité réglable et design sur mesure
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes glitch-carousel {
          0% {
            transform: translate(0);
            filter: none;
          }
          20% {
            transform: translate(-10px, 5px);
            filter: hue-rotate(90deg) saturate(3);
          }
          40% {
            transform: translate(10px, -5px);
            filter: hue-rotate(-90deg) saturate(3);
          }
          60% {
            transform: translate(-5px, 10px);
            filter: hue-rotate(180deg) saturate(2);
          }
          80% {
            transform: translate(5px, -10px);
            filter: hue-rotate(-180deg) saturate(2);
          }
          100% {
            transform: translate(0);
            filter: none;
          }
        }

        .animate-glitch-carousel {
          animation: glitch-carousel 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
      `}</style>
    </section>
  );
}
