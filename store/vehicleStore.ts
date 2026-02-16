import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { VehicleBrand, ProductVehicleCompatibility } from '@/lib/types';
import { initialVehicleBrands } from '@/lib/vehicleData';

interface VehicleStore {
  // Data
  brands: VehicleBrand[];
  compatibility: ProductVehicleCompatibility[];

  // Selection state - marque + modèle + année
  selectedBrand: string | null;
  selectedModel: string | null;
  selectedYear: number | null;

  // Actions
  setSelectedBrand: (brandId: string | null) => void;
  setSelectedModel: (model: string | null) => void;
  setSelectedYear: (year: number | null) => void;
  resetSelection: () => void;

  // Data loaders
  loadVehicleData: () => void;
  initializeVehicleData: () => void;

  // Getters
  getBrandById: (brandId: string) => VehicleBrand | undefined;
  getCompatibleProducts: (productIds: string[]) => string[];
}

export const useVehicleStore = create<VehicleStore>()(
  persist(
    (set, get) => ({
      // Initial state - Charger directement les marques
      brands: initialVehicleBrands,
      compatibility: [],
      selectedBrand: null,
      selectedModel: null,
      selectedYear: null,

      // Selection actions
      setSelectedBrand: (brandId) => {
        set({
          selectedBrand: brandId,
          selectedModel: null, // Reset model when brand changes
          selectedYear: null // Reset year when brand changes
        });
      },

      setSelectedModel: (model) => {
        set({ selectedModel: model });
      },

      setSelectedYear: (year) => {
        set({ selectedYear: year });
      },

      resetSelection: () => {
        set({
          selectedBrand: null,
          selectedModel: null,
          selectedYear: null
        });
      },

      // Initialize vehicle data in localStorage if it doesn't exist
      initializeVehicleData: () => {
        // Force clear old data and set new data
        console.log('🚀 Initializing vehicle data...', initialVehicleBrands.length, 'brands');

        // Clear old data
        localStorage.removeItem('cpworks_vehicle_brands');

        // Set new data
        localStorage.setItem(
          'cpworks_vehicle_brands',
          JSON.stringify(initialVehicleBrands)
        );

        console.log('✅ Vehicle brands updated in localStorage');

        // Log brands with actual 3D models
        const brandsWithModels = initialVehicleBrands.filter(b => !b.modelPath.includes('placeholder'));
        console.log('🎨 Brands with 3D models:', brandsWithModels.map(b => b.name).join(', '));

        // Initialize compatibility (all products universal by default)
        if (!localStorage.getItem('cpworks_product_vehicle_compat')) {
          try {
            const productsStr = localStorage.getItem('cpworks_products');
            if (productsStr) {
              const products = JSON.parse(productsStr);
              const compat: ProductVehicleCompatibility[] = products.map((p: any) => ({
                productId: p.id,
                vehicleIds: [],
                universalFit: true
              }));
              localStorage.setItem(
                'cpworks_product_vehicle_compat',
                JSON.stringify(compat)
              );
            }
          } catch (error) {
            console.error('Error initializing compatibility:', error);
          }
        }

        // Load the data into store
        get().loadVehicleData();
      },

      // Load vehicle data from localStorage
      loadVehicleData: () => {
        try {
          const brandsStr = localStorage.getItem('cpworks_vehicle_brands');
          const compatStr = localStorage.getItem('cpworks_product_vehicle_compat');

          const brands = brandsStr ? JSON.parse(brandsStr) : [];
          const compatibility = compatStr ? JSON.parse(compatStr) : [];

          console.log('📦 Loaded brands from localStorage:', brands.length, 'brands');
          console.log('🎯 Sample brand:', brands[0]);

          set({ brands, compatibility });
        } catch (error) {
          console.error('Error loading vehicle data:', error);
          // Fallback to empty arrays
          set({ brands: [], compatibility: [] });
        }
      },

      // Get brand by ID
      getBrandById: (brandId) => {
        const { brands } = get();
        return brands.find(b => b.id === brandId);
      },

      // Get compatible product IDs based on current selection
      getCompatibleProducts: (productIds) => {
        const { selectedBrand, selectedYear, compatibility } = get();

        // If no vehicle selected, show all products
        if (!selectedBrand) {
          return productIds;
        }

        // Build vehicle identifier (simplifié: juste marque-année ou marque)
        const vehiclePattern = selectedYear
          ? `${selectedBrand}-${selectedYear}`
          : selectedBrand;

        // Filter products based on compatibility
        const compatibleProductIds = compatibility
          .filter(c => {
            // Universal fit products always show
            if (c.universalFit) return true;

            // Check if any vehicleId matches the current selection
            return c.vehicleIds.some(vid => {
              return vid.startsWith(selectedBrand);
            });
          })
          .map(c => c.productId);

        // Return only products that are in the provided list AND compatible
        return productIds.filter(id => compatibleProductIds.includes(id));
      }
    }),
    {
      name: 'vehicle-selection-storage',
      // Only persist selection state, not data
      partialize: (state) => ({
        selectedBrand: state.selectedBrand,
        selectedModel: state.selectedModel,
        selectedYear: state.selectedYear
      })
    }
  )
);
