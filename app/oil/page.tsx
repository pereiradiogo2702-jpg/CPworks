'use client';

import { useState } from 'react';
import { oilDatabase, OilSpec } from '@/lib/oilData';

export default function OilPage() {
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [result, setResult] = useState<OilSpec | null>(null);
  const [searched, setSearched] = useState(false);

  const brands = oilDatabase.map(b => b.brand).sort();
  const models = selectedBrand
    ? (oilDatabase.find(b => b.brand === selectedBrand)?.models.map(m => m.model) || [])
    : [];

  const handleSearch = () => {
    if (!selectedBrand || !selectedModel) return;
    const brandData = oilDatabase.find(b => b.brand === selectedBrand);
    const modelData = brandData?.models.find(m => m.model === selectedModel) || null;
    setResult(modelData);
    setSearched(true);
  };

  const handleBrandChange = (brand: string) => {
    setSelectedBrand(brand);
    setSelectedModel('');
    setResult(null);
    setSearched(false);
  };

  const isElectric = result?.oil === 'N/A';

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="fixed top-4 left-4 z-50">
        <a href="/" className="p-3 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white transition-all text-purple-700 font-bold text-sm px-4">
          ← Accueil
        </a>
      </div>

      {/* Hero */}
      <section className="pt-24 pb-12 bg-gradient-to-b from-purple-900/30 to-black">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
            Guide Huiles Moteur
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Sélectionnez votre marque et modèle pour connaître l'huile moteur recommandée
          </p>
        </div>
      </section>

      {/* Selector */}
      <section className="py-12">
        <div className="container mx-auto px-6 max-w-2xl">
          <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8">

            {/* Marque */}
            <div className="mb-6">
              <label className="block text-gray-300 font-semibold mb-2">Marque</label>
              <select
                value={selectedBrand}
                onChange={(e) => handleBrandChange(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
              >
                <option value="">Sélectionner une marque...</option>
                {brands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>

            {/* Modèle */}
            <div className="mb-8">
              <label className="block text-gray-300 font-semibold mb-2">Modèle</label>
              <select
                value={selectedModel}
                onChange={(e) => { setSelectedModel(e.target.value); setResult(null); setSearched(false); }}
                disabled={!selectedBrand}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <option value="">Sélectionner un modèle...</option>
                {models.map(model => (
                  <option key={model} value={model}>{model}</option>
                ))}
              </select>
            </div>

            {/* Bouton */}
            <button
              onClick={handleSearch}
              disabled={!selectedBrand || !selectedModel}
              className="w-full py-4 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-all duration-300 text-lg"
            >
              Trouver l'huile
            </button>
          </div>

          {/* Résultat */}
          {searched && result && (
            <div className={`mt-8 rounded-2xl p-8 border ${isElectric ? 'bg-blue-900/20 border-blue-500/30' : 'bg-green-900/20 border-green-500/30'}`}>
              <div className="text-center mb-6">
                <div className="text-5xl mb-3">{isElectric ? '⚡' : '🛢️'}</div>
                <h2 className="text-2xl font-bold text-white">
                  {result.model} — {selectedBrand}
                </h2>
                <p className="text-gray-400 mt-1">{result.engine}</p>
              </div>

              {isElectric ? (
                <div className="text-center bg-blue-900/30 rounded-xl p-6">
                  <p className="text-blue-300 text-lg font-semibold">Véhicule Électrique</p>
                  <p className="text-gray-400 mt-2">Pas de vidange d'huile moteur requise.</p>
                  <p className="text-gray-400 mt-1">Consultez votre concessionnaire pour l'huile de réducteur.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-900/60 rounded-xl p-5 text-center border border-purple-500/20">
                    <p className="text-gray-400 text-sm mb-1">Viscosité</p>
                    <p className="text-purple-400 text-2xl font-bold">{result.oil}</p>
                  </div>
                  <div className="bg-gray-900/60 rounded-xl p-5 text-center border border-purple-500/20">
                    <p className="text-gray-400 text-sm mb-1">Norme / Spec</p>
                    <p className="text-white text-sm font-semibold">{result.spec}</p>
                  </div>
                  <div className="bg-gray-900/60 rounded-xl p-5 text-center border border-purple-500/20">
                    <p className="text-gray-400 text-sm mb-1">Capacité</p>
                    <p className="text-green-400 text-2xl font-bold">{result.capacity}</p>
                  </div>
                </div>
              )}

              <p className="text-gray-500 text-xs text-center mt-6">
                Ces informations sont données à titre indicatif. Consultez toujours le manuel de votre véhicule.
              </p>
            </div>
          )}

          {searched && !result && (
            <div className="mt-8 bg-yellow-900/20 border border-yellow-500/30 rounded-2xl p-8 text-center">
              <p className="text-yellow-400 text-lg">Modèle non trouvé dans notre base de données.</p>
              <p className="text-gray-400 mt-2">Contactez-nous pour une recommandation personnalisée.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Contact */}
      <section className="py-12 border-t border-purple-500/10">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400 mb-4">Vous ne trouvez pas votre véhicule ?</p>
          <a
            href="/contact"
            className="inline-block px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-all"
          >
            Contactez-nous
          </a>
        </div>
      </section>
    </div>
  );
}
