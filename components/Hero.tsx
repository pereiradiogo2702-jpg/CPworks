'use client';

import AnimatedLogo from './AnimatedLogo';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-purple-900/20"></div>

      {/* Animated grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8b5cf620_1px,transparent_1px),linear-gradient(to_bottom,#8b5cf620_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        {/* Animated Logo */}
        <div className="mb-12">
          <AnimatedLogo />
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
          CPWorks
        </h1>

        <p className="text-xl md:text-2xl text-gray-300 mb-4">
          Mécanique & Customisation Automobile
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

      {/* Floating particles effect */}
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
    </section>
  );
}
