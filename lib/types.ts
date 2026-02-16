// Vehicle-related types for filtering products by vehicle

export interface VehicleBrand {
  id: string;
  name: string;
  modelPath: string; // Path to 3D model file (e.g., '/models/bmw-m4-gt3.glb')
  startYear: number; // First year this brand/model is available
  endYear?: number; // undefined means still in production
  order: number;
}

export interface VehicleModel {
  id: string;
  name: string;
  brandId: string;
  startYear: number;
  endYear?: number; // undefined means still in production
}

export interface ProductVehicleCompatibility {
  productId: string;
  vehicleIds: string[]; // Array of vehicle identifiers
  universalFit?: boolean; // If true, product fits all vehicles
}

// Helper type for product with vehicle compatibility info
export interface ProductWithVehicles {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  stock: number;
  compatibleVehicles?: string[];
  universalFit?: boolean;
}
