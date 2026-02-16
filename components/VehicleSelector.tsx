'use client';

import { useEffect } from 'react';
import { useVehicleStore } from '@/store/vehicleStore';
import { generateYearRange } from '@/lib/vehicleData';

export default function VehicleSelector() {
  const {
    brands,
    selectedBrand,
    selectedYear,
    setSelectedBrand,
    setSelectedYear,
    resetSelection,
    getBrandById,
    loadVehicleData,
    initializeVehicleData
  } = useVehicleStore();

  // Initialize data on mount
  useEffect(() => {
    initializeVehicleData();
  }, [initializeVehicleData]);

  const selectedBrandData = selectedBrand ? getBrandById(selectedBrand) : null;
  const availableYears = selectedBrandData
    ? generateYearRange(selectedBrandData.startYear, selectedBrandData.endYear)
    : [];

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 mb-8 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">
          Sélectionnez votre véhicule
        </h2>
        {selectedBrand && (
          <button
            onClick={resetSelection}
            className="text-purple-400 hover:text-purple-300 text-sm flex items-center gap-2 transition-colors"
          >
            <span>✕</span>
            Réinitialiser
          </button>
        )}
      </div>

      {/* Step 1: Brand Selection */}
      <div className="mb-6">
        <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-500 text-white text-xs font-bold">
            1
          </span>
          Marque
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {brands.map(brand => (
            <button
              key={brand.id}
              onClick={() => setSelectedBrand(brand.id)}
              className={`p-4 rounded-lg border-2 transition-all transform hover:scale-105 ${
                selectedBrand === brand.id
                  ? 'border-purple-500 bg-purple-500/20 shadow-lg shadow-purple-500/30'
                  : 'border-purple-500/30 hover:border-purple-500/50 hover:bg-purple-500/5'
              }`}
            >
              <span className="text-white font-bold text-lg">{brand.name}</span>
            </button>
          ))}
        </div>
        {brands.length === 0 && (
          <p className="text-gray-400 text-center py-4">
            Aucune marque disponible
          </p>
        )}
      </div>

      {/* Step 2: Year Selection (optionnel) */}
      {selectedBrand && selectedBrandData && (
        <div className="mb-6 animate-fadeIn">
          <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-500 text-white text-xs font-bold">
              2
            </span>
            Année (optionnel)
          </h3>
          <select
            value={selectedYear || ''}
            onChange={(e) => setSelectedYear(e.target.value ? parseInt(e.target.value) : null)}
            className="w-full bg-gray-800 border border-purple-500/30 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
          >
            <option value="">Toutes les années</option>
            {availableYears.map(year => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Selection Summary */}
      {(selectedBrand || selectedYear) && (
        <div className="mt-6 pt-6 border-t border-purple-500/20">
          <p className="text-gray-400 text-sm mb-2">Votre sélection :</p>
          <div className="flex flex-wrap gap-2">
            {selectedBrandData && (
              <span className="bg-purple-500/20 border border-purple-500/30 rounded-full px-4 py-1 text-purple-300 text-sm">
                {selectedBrandData.name}
              </span>
            )}
            {selectedYear && (
              <span className="bg-purple-500/20 border border-purple-500/30 rounded-full px-4 py-1 text-purple-300 text-sm">
                {selectedYear}
              </span>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
