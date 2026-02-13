'use client';

import { useEffect, useState } from 'react';
import AnimatedLogo from './AnimatedLogo';

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      >
        <source src="/background.mp4" type="video/mp4" />
      </video>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        {/* Animated Logo */}
        <div className="mb-12">
          <AnimatedLogo />
        </div>

        {/* Heading with Glitch Effect */}
        <h1
          className="text-5xl md:text-7xl font-bold mb-6 text-white glitch"
          data-text="CPWorks"
          style={{ fontFamily: "PastelTrunk, 'Comic Sans MS', cursive, sans-serif" }}
        >
          CPWorks
        </h1>

        <p className="text-xl md:text-2xl text-gray-300 mb-4">
          Customisation Automobile
        </p>

        <p className="text-lg text-purple-400 mb-12 max-w-2xl mx-auto">
          Spécialistes en ciels étoilés, LED, lumière d'ambiance et modifications sur mesure
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#services"
            className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/50"
          >
            Nos Services
          </a>
          <a
            href="/contact"
            className="px-8 py-4 bg-transparent border-2 border-purple-500 hover:bg-purple-500/10 text-purple-400 rounded-lg font-semibold transition-all duration-300"
          >
            Contactez-nous
          </a>
        </div>
      </div>

      {/* Floating particles effect - only render on client */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-purple-500/30 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 10}s`,
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
}
