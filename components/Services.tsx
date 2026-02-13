export default function Services() {
  const services = [
    {
      icon: '✨',
      title: 'Ciels Étoilés',
      description: 'Installation de ciels étoilés personnalisés pour transformer l\'intérieur de votre véhicule en une expérience unique et luxueuse.',
      features: ['Fibre optique premium', 'Installation sur mesure', 'Contrôle d\'intensité'],
    },
    {
      icon: '💡',
      title: 'Lumière d\'Ambiance',
      description: 'Création d\'ambiances lumineuses personnalisées avec des LED RGB pour sublimer l\'intérieur de votre voiture.',
      features: ['LED RGB multicolore', 'Contrôle par app', 'Synchronisation musique'],
    },
    {
      icon: '🔧',
      title: 'Modification LED',
      description: 'Modification et installation de systèmes LED pour l\'intérieur et l\'extérieur de votre véhicule.',
      features: ['Bandes LED sur mesure', 'Éclairage pédalier', 'Logos projecteurs'],
    },
    {
      icon: '🚗',
      title: 'Entretien Automobile',
      description: 'Services complets pour l\'entretien et le soin de votre véhicule.',
      features: ['Entretien régulier', 'Diagnostic électronique', 'Réparations toutes marques'],
    },
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
            Nos Services
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Expertise en customisation automobile avec des solutions innovantes
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-500">
                      <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <a
            href="/contact"
            className="inline-block px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/30"
          >
            Demander un Devis
          </a>
        </div>
      </div>
    </section>
  );
}
