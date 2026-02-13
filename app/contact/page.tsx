'use client';

import { useState } from 'react';
import Image from 'next/image';

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
      name: 'Jean-Paul Martinez',
      role: 'Expert en Customisation & Spécialiste LED',
      experience: '15 ans d\'expérience',
      specialties: ['Customisation LED', 'Ciels étoilés', 'Électronique auto'],
      bio: 'Passionné par l\'innovation automobile, Jean-Paul s\'est spécialisé dans les installations LED et ciels étoilés. Après 10 ans dans l\'automobile, il a perfectionné ses compétences en customisation haut de gamme. Expert en électronique automobile, il réalise des installations sur mesure qui transforment chaque véhicule en œuvre d\'art lumineuse.',
      photo: '/mechanic1.jpg',
    },
    {
      name: 'Alexandre Dubois',
      role: 'Expert Automobile & Spécialiste Entretien',
      experience: '12 ans d\'expérience',
      specialties: ['Diagnostic électronique', 'Entretien', 'Réparations complexes'],
      bio: 'Fort de 12 années d\'expérience dans le domaine automobile, Alexandre maîtrise tous les aspects de l\'automobile moderne. Diplômé en automobile et électronique, il excelle dans le diagnostic et la résolution de problèmes complexes. Sa rigueur et son professionnalisme garantissent des interventions de qualité sur tous types de véhicules.',
      photo: '/mechanic2.jpg',
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <section className="bg-gradient-to-b from-purple-900/20 to-black py-20">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-bold text-center mb-6 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
            Notre Équipe
          </h1>
          <p className="text-xl text-gray-400 text-center max-w-2xl mx-auto">
            Rencontrez nos experts passionnés qui donnent vie à vos projets de customisation
          </p>
        </div>
      </section>

      {/* Mechanics Profiles */}
      <section className="py-16 bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="container mx-auto px-6">
          <div className="space-y-16">
            {mechanics.map((mechanic, index) => (
              <div
                key={index}
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-gradient-to-b from-black to-gray-900 border-t border-purple-500/20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
              Contactez-nous
            </h2>
            <p className="text-gray-400 text-center mb-12">
              Une question ? Un projet de customisation ? N'hésitez pas à nous contacter
            </p>

            {/* Contact Form */}
            <form className="space-y-6 bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8">
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
            </form>

            {/* Contact Info */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
                <div className="text-4xl mb-3">📍</div>
                <h3 className="text-white font-semibold mb-2">Adresse</h3>
                <p className="text-gray-400 text-sm">
                  123 Rue de l'Automobile<br />
                  75000 Paris, France
                </p>
              </div>

              <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
                <div className="text-4xl mb-3">📞</div>
                <h3 className="text-white font-semibold mb-2">Téléphone</h3>
                <p className="text-gray-400 text-sm">
                  +33 1 23 45 67 89<br />
                  Lun-Ven: 9h-18h
                </p>
              </div>

              <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
                <div className="text-4xl mb-3">✉️</div>
                <h3 className="text-white font-semibold mb-2">Email</h3>
                <p className="text-gray-400 text-sm">
                  contact@cpworks.fr<br />
                  Réponse sous 24h
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
