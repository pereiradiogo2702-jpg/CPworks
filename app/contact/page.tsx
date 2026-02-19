'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface Mechanic {
  name: string;
  role: string;
  experience: string;
  specialties: string[];
  bio: string;
  photo: string;
}

export default function ContactPage() {
  const [imageError1, setImageError1] = useState(false);
  const [imageError2, setImageError2] = useState(false);

  const mechanics: Mechanic[] = [
    {
      name: 'Bryan Michel Pereira Castro',
      role: 'Technicien en Mécatronique — Spécialiste Lumière d\'Ambiance & Ciel Étoilé',
      experience: 'BMW Bilia',
      specialties: ['Lumière d\'ambiance', 'Ciel étoilé', 'Électronique automobile', 'Câblage', 'Programmation modules', 'Fibres optiques'],
      bio: 'Diplômé en mécatronique, Bryan Michel Pereira Castro a débuté sa carrière chez BMW Bilia, où il intervient avec prudence et précision sur des véhicules haut de gamme. Ses solides compétences en électronique lui confèrent un véritable avantage dans sa spécialité : l\'installation de lumières d\'ambiance et de ciels étoilés. De la conception du câblage à la programmation des modules de contrôle, en passant par le positionnement des fibres optiques, il maîtrise l\'ensemble du processus pour transformer chaque habitacle en une expérience visuelle unique.',
      photo: '/bryan.jpg',
    },
    {
      name: 'Tiago Silverio Pereira Castro',
      role: 'Spécialiste Automobile · Ex Alfa Romeo',
      experience: 'Expert démontage & nettoyage premium',
      specialties: ['Démontage complet', 'Nettoyage premium', 'Toits & tableaux de bord', 'Intérieurs complets'],
      bio: 'Passionné de mécanique depuis toujours, Tiago a forgé son expertise chez Alfa Romeo. Il est capable de démonter n\'importe quel toit, tableau de bord ou intérieur complet avec une précision chirurgicale — ce qui lui permet de réaliser un nettoyage en profondeur exceptionnel, inaccessible par les méthodes classiques.',
      photo: '/tiago.jpg',
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <section className="bg-gradient-to-b from-purple-900/20 to-black py-20">
        <div className="container mx-auto px-6">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl md:text-6xl font-bold text-center mb-6 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent"
          >
            Notre Équipe
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl text-gray-400 text-center max-w-2xl mx-auto"
          >
            Rencontrez nos experts passionnés qui donnent vie à vos projets de customisation
          </motion.p>
        </div>
      </section>

      {/* Mechanics Profiles */}
      <section className="py-16 bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="container mx-auto px-6">
          <div className="space-y-16">
            {mechanics.map((mechanic, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`flex flex-col ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } gap-8 items-center bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-300`}
              >
                {/* Photo */}
                <div className="w-full lg:w-1/3">
                  <div className="relative aspect-square rounded-xl overflow-hidden border-4 border-purple-500/30 group">
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent z-10"></div>

                    {/* Photo or placeholder */}
                    {(index === 0 && !imageError1) || (index === 1 && !imageError2) ? (
                      <Image
                        src={mechanic.photo}
                        alt={mechanic.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={() =>
                          index === 0 ? setImageError1(true) : setImageError2(true)
                        }
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-purple-900/50 to-gray-900 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-8xl mb-4">👨‍🔧</div>
                          <p className="text-purple-400 font-semibold">
                            {mechanic.name}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Info */}
                <div className="w-full lg:w-2/3 space-y-4">
                  {/* Name and role */}
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">
                      {mechanic.name}
                    </h2>
                    <p className="text-xl text-purple-400 font-semibold mb-1">
                      {mechanic.role}
                    </p>
                    <p className="text-gray-500 font-medium">
                      {mechanic.experience}
                    </p>
                  </div>

                  {/* Specialties */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">
                      Spécialités:
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {mechanic.specialties.map((specialty, idx) => (
                        <span
                          key={idx}
                          className="px-4 py-2 bg-purple-600/20 border border-purple-500/30 rounded-full text-purple-300 text-sm font-medium"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bio */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">
                      Parcours professionnel:
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {mechanic.bio}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-gradient-to-b from-black to-gray-900 border-t border-purple-500/20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent"
            >
              Contactez-nous
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-gray-400 text-center mb-12"
            >
              Une question ? Un projet de customisation ? N'hésitez pas à nous contacter
            </motion.p>

            {/* Contact Form */}
            <motion.form
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6 bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-semibold mb-2">
                    Nom
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-gray-800 border border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="Votre nom"
                  />
                </div>
                <div>
                  <label className="block text-white font-semibold mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-gray-800 border border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">
                  Téléphone
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 bg-gray-800 border border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="06 12 34 56 78"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">
                  Sujet
                </label>
                <select className="w-full px-4 py-3 bg-gray-800 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors">
                  <option>Devis customisation</option>
                  <option>Ciel étoilé</option>
                  <option>Installation LED</option>
                  <option>Réparation / Entretien</option>
                  <option>Autre</option>
                </select>
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">
                  Message
                </label>
                <textarea
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-800 border border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                  placeholder="Décrivez votre projet ou votre demande..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/30"
              >
                Envoyer le message
              </button>
            </motion.form>

            {/* Contact Info */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300"
              >
                <div className="text-4xl mb-3">📍</div>
                <h3 className="text-white font-semibold mb-2">Adresse</h3>
                <p className="text-gray-400 text-sm">
                  123 Rue de l'Automobile<br />
                  75000 Paris, France
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300"
              >
                <div className="text-4xl mb-3">📞</div>
                <h3 className="text-white font-semibold mb-2">Téléphone</h3>
                <p className="text-gray-400 text-sm">
                  +33 1 23 45 67 89<br />
                  Lun-Ven: 9h-18h
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300"
              >
                <div className="text-4xl mb-3">✉️</div>
                <h3 className="text-white font-semibold mb-2">Email</h3>
                <p className="text-gray-400 text-sm">
                  contact@cpworks.fr<br />
                  Réponse sous 24h
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
