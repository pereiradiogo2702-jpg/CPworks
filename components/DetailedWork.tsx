'use client';

import { motion } from 'framer-motion';

export default function DetailedWork() {
  return (
    <section className="relative py-20 bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Video Section - Left */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden border-2 border-purple-500/30 shadow-2xl shadow-purple-500/20">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              >
                <source src="/Mvideo.mp4" type="video/mp4" />
              </video>

              {/* Gradient overlay for video */}
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 to-transparent pointer-events-none"></div>
            </div>

            {/* Decorative glow effect */}
            <div className="absolute -inset-4 bg-purple-500/20 blur-3xl -z-10 opacity-50"></div>
          </motion.div>

          {/* Text Section - Right */}
          <div className="space-y-6">
            <motion.h2
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-purple-300 to-purple-400 bg-clip-text text-transparent"
              style={{
                fontFamily: "PastelTrunk, 'Comic Sans MS', cursive, sans-serif",
                letterSpacing: "0.05em"
              }}
            >
              Un Travail d'Exception
            </motion.h2>

            <div className="space-y-4 text-gray-300">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg leading-relaxed"
              >
                Chaque installation est une <span className="text-purple-400 font-semibold">œuvre unique</span>,
                méticuleusement conçue pour s'adapter parfaitement à votre véhicule et répondre à vos exigences les plus précises.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-lg leading-relaxed"
              >
                Notre équipe d'experts travaille avec <span className="text-purple-400 font-semibold">précision et passion</span> pour
                transformer vos rêves en réalité. De la conception initiale à l'installation finale,
                chaque détail est soigneusement étudié.
              </motion.p>

              {/* Features List */}
              <div className="space-y-3 pt-4">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex items-start gap-3"
                >
                  <div className="text-2xl">✨</div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Personnalisation Totale</h3>
                    <p className="text-sm text-gray-400">
                      Densité des étoiles, couleurs, intensité - tout est configurable selon vos préférences
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="flex items-start gap-3"
                >
                  <div className="text-2xl">🎯</div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Options Uniques</h3>
                    <p className="text-sm text-gray-400">
                      Effets scintillants, constellations personnalisées, synchronisation LED
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="flex items-start gap-3"
                >
                  <div className="text-2xl">🔧</div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Installation Professionnelle</h3>
                    <p className="text-sm text-gray-400">
                      Techniciens certifiés, matériaux premium, finition impeccable
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="pt-6"
              >
                <a
                  href="/contact"
                  className="inline-block px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/30"
                >
                  Discutez de Votre Projet
                </a>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-purple-900/30 to-purple-800/30 rounded-2xl p-8 md:p-12 max-w-3xl mx-auto">
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
        </motion.div>
      </div>
    </section>
  );
}
