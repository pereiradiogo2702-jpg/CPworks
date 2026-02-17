import { VehicleBrand } from './types';

// Marques européennes
const europeanBrands: VehicleBrand[] = [
  { id: 'brand-bmw', name: 'BMW', modelPath: '/models/bmw-m4-widebody/scene.gltf', startYear: 2010, order: 1 },
  { id: 'brand-mercedes', name: 'Mercedes-Benz', modelPath: '/models/mercedes-a45/scene.gltf', startYear: 2010, order: 2 },
  { id: 'brand-audi', name: 'Audi', modelPath: '/models/2020_audi_rs5.glb', startYear: 2010, order: 3 },
  { id: 'brand-volkswagen', name: 'Volkswagen', modelPath: '/models/volkswagen-golf-gti-2021/scene.gltf', startYear: 2010, order: 4 },
  { id: 'brand-porsche', name: 'Porsche', modelPath: '/models/porsche-911-gt3/scene.gltf', startYear: 2010, order: 5 },
  { id: 'brand-peugeot', name: 'Peugeot', modelPath: '/models/peugeot-3008/scene.gltf', startYear: 2010, order: 6 },
  { id: 'brand-renault', name: 'Renault', modelPath: '/models/renault-clio/scene.gltf', startYear: 2010, order: 7 },
  { id: 'brand-citroen', name: 'Citroën', modelPath: '/models/citroen-picasso/scene.gltf', startYear: 2010, order: 8 },
  { id: 'brand-fiat', name: 'Fiat', modelPath: '/models/fiat-500/scene.gltf', startYear: 2010, order: 9 },
  { id: 'brand-volvo', name: 'Volvo', modelPath: '/models/volvo-v60/scene.gltf', startYear: 2010, order: 10 },
  { id: 'brand-opel', name: 'Opel', modelPath: '/models/opel-astra/scene.gltf', startYear: 2010, order: 11 },
  { id: 'brand-seat', name: 'Seat', modelPath: '/models/seat-ibiza/scene.gltf', startYear: 2010, order: 12 },
  { id: 'brand-skoda', name: 'Skoda', modelPath: '/models/skoda-superb/scene.gltf', startYear: 2010, order: 13 },
  { id: 'brand-landrover', name: 'Land Rover', modelPath: '/models/land-rover/scene.gltf', startYear: 2010, order: 14 },
  { id: 'brand-jaguar', name: 'Jaguar', modelPath: '/models/jaguar-xkr/scene.gltf', startYear: 2010, order: 15 },
  { id: 'brand-mini', name: 'Mini', modelPath: '/models/mini/scene.gltf', startYear: 2010, order: 16 },
  { id: 'brand-alfaromeo', name: 'Alfa Romeo', modelPath: '/models/alfa-romeo/scene.gltf', startYear: 2010, order: 17 },
];

// Marques japonaises
const japaneseBrands: VehicleBrand[] = [
  { id: 'brand-toyota', name: 'Toyota', modelPath: '/models/toyota/scene.gltf', startYear: 2010, order: 18 },
  { id: 'brand-honda', name: 'Honda', modelPath: '/models/honda/scene.gltf', startYear: 2010, order: 19 },
  { id: 'brand-nissan', name: 'Nissan', modelPath: '/models/nissan/scene.gltf', startYear: 2010, order: 20 },
  { id: 'brand-mazda', name: 'Mazda', modelPath: '/models/placeholder.gltf', startYear: 2010, order: 21 },
  { id: 'brand-subaru', name: 'Subaru', modelPath: '/models/placeholder.gltf', startYear: 2010, order: 22 },
  { id: 'brand-mitsubishi', name: 'Mitsubishi', modelPath: '/models/placeholder.gltf', startYear: 2010, order: 23 },
  { id: 'brand-suzuki', name: 'Suzuki', modelPath: '/models/placeholder.gltf', startYear: 2010, order: 24 },
  { id: 'brand-lexus', name: 'Lexus', modelPath: '/models/placeholder.gltf', startYear: 2010, order: 25 },
  { id: 'brand-infiniti', name: 'Infiniti', modelPath: '/models/placeholder.gltf', startYear: 2010, order: 26 },
  { id: 'brand-acura', name: 'Acura', modelPath: '/models/placeholder.gltf', startYear: 2010, order: 27 },
];

// Marques coréennes
const koreanBrands: VehicleBrand[] = [
  { id: 'brand-hyundai', name: 'Hyundai', modelPath: '/models/placeholder.gltf', startYear: 2010, order: 28 },
  { id: 'brand-kia', name: 'Kia', modelPath: '/models/placeholder.gltf', startYear: 2010, order: 29 },
  { id: 'brand-genesis', name: 'Genesis', modelPath: '/models/placeholder.gltf', startYear: 2010, order: 30 },
];

// Marques américaines
const americanBrands: VehicleBrand[] = [
  { id: 'brand-ford', name: 'Ford', modelPath: '/models/placeholder.gltf', startYear: 2010, order: 31 },
  { id: 'brand-chevrolet', name: 'Chevrolet', modelPath: '/models/placeholder.gltf', startYear: 2010, order: 32 },
  { id: 'brand-dodge', name: 'Dodge', modelPath: '/models/placeholder.gltf', startYear: 2010, order: 33 },
  { id: 'brand-jeep', name: 'Jeep', modelPath: '/models/placeholder.gltf', startYear: 2010, order: 34 },
  { id: 'brand-cadillac', name: 'Cadillac', modelPath: '/models/placeholder.gltf', startYear: 2010, order: 35 },
  { id: 'brand-tesla', name: 'Tesla', modelPath: '/models/placeholder.gltf', startYear: 2010, order: 36 },
  { id: 'brand-gmc', name: 'GMC', modelPath: '/models/placeholder.gltf', startYear: 2010, order: 37 },
  { id: 'brand-ram', name: 'Ram', modelPath: '/models/placeholder.gltf', startYear: 2010, order: 38 },
  { id: 'brand-chrysler', name: 'Chrysler', modelPath: '/models/placeholder.gltf', startYear: 2010, order: 39 },
  { id: 'brand-lincoln', name: 'Lincoln', modelPath: '/models/placeholder.gltf', startYear: 2010, order: 40 },
];

// Marques premium/luxe
const luxuryBrands: VehicleBrand[] = [
  { id: 'brand-rollsroyce', name: 'Rolls-Royce', modelPath: '/models/placeholder.gltf', startYear: 2010, order: 41 },
  { id: 'brand-bentley', name: 'Bentley', modelPath: '/models/placeholder.gltf', startYear: 2010, order: 42 },
  { id: 'brand-maserati', name: 'Maserati', modelPath: '/models/placeholder.gltf', startYear: 2010, order: 43 },
  { id: 'brand-lamborghini', name: 'Lamborghini', modelPath: '/models/placeholder.gltf', startYear: 2010, order: 44 },
  { id: 'brand-ferrari', name: 'Ferrari', modelPath: '/models/placeholder.gltf', startYear: 2010, order: 45 },
  { id: 'brand-astonmartin', name: 'Aston Martin', modelPath: '/models/placeholder.gltf', startYear: 2010, order: 46 },
  { id: 'brand-mclaren', name: 'McLaren', modelPath: '/models/placeholder.gltf', startYear: 2010, order: 47 },
  { id: 'brand-bugatti', name: 'Bugatti', modelPath: '/models/placeholder.gltf', startYear: 2010, order: 48 },
];

// Toutes les marques combinées
export const initialVehicleBrands: VehicleBrand[] = [
  ...europeanBrands,
  ...japaneseBrands,
  ...koreanBrands,
  ...americanBrands,
  ...luxuryBrands,
];

// Groupes de marques pour affichage avec optgroup
export const brandGroups = [
  { label: 'Européennes', brands: europeanBrands },
  { label: 'Japonaises', brands: japaneseBrands },
  { label: 'Coréennes', brands: koreanBrands },
  { label: 'Américaines', brands: americanBrands },
  { label: 'Premium/Luxe', brands: luxuryBrands },
];

// Modèles par marque
export const vehicleModels: { [brandId: string]: string[] } = {
  'brand-bmw': ['Série 1', 'Série 2', 'Série 3', 'Série 4', 'Série 5', 'Série 6', 'Série 7', 'Série 8', 'X1', 'X2', 'X3', 'X4', 'X5', 'X6', 'X7', 'Z4', 'M2', 'M3', 'M4', 'M5', 'M8', 'iX', 'i4', 'i7'],
  'brand-mercedes': ['Classe A', 'Classe B', 'Classe C', 'Classe E', 'Classe S', 'CLA', 'CLS', 'GLA', 'GLB', 'GLC', 'GLE', 'GLS', 'AMG GT', 'EQA', 'EQB', 'EQC', 'EQE', 'EQS'],
  'brand-audi': ['A1', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'Q2', 'Q3', 'Q5', 'Q7', 'Q8', 'TT', 'R8', 'e-tron', 'e-tron GT', 'RS3', 'RS4', 'RS5', 'RS6', 'RS7'],
  'brand-volkswagen': ['Golf', 'Polo', 'Passat', 'Tiguan', 'T-Roc', 'T-Cross', 'Touareg', 'Arteon', 'ID.3', 'ID.4', 'ID.5', 'ID.Buzz', 'Taigo', 'Up'],
  'brand-porsche': ['911', '718 Cayman', '718 Boxster', 'Cayenne', 'Macan', 'Panamera', 'Taycan'],
  'brand-peugeot': ['108', '208', '308', '408', '508', '2008', '3008', '5008', 'e-208', 'e-308', 'e-2008'],
  'brand-renault': ['Clio', 'Megane', 'Captur', 'Kadjar', 'Arkana', 'Austral', 'Espace', 'Twingo', 'Zoe', 'Megane E-Tech', 'Scenic E-Tech'],
  'brand-citroen': ['C1', 'C3', 'C4', 'C5 X', 'C3 Aircross', 'C5 Aircross', 'Berlingo', 'ë-C4'],
  'brand-fiat': ['500', '500X', 'Panda', 'Tipo', '500e', '600e'],
  'brand-volvo': ['XC40', 'XC60', 'XC90', 'S60', 'S90', 'V60', 'V90', 'C40', 'EX30', 'EX90'],
  'brand-opel': ['Corsa', 'Astra', 'Mokka', 'Crossland', 'Grandland', 'Insignia'],
  'brand-seat': ['Ibiza', 'Leon', 'Arona', 'Ateca', 'Tarraco'],
  'brand-skoda': ['Fabia', 'Octavia', 'Superb', 'Kamiq', 'Karoq', 'Kodiaq', 'Enyaq'],
  'brand-landrover': ['Defender', 'Discovery', 'Discovery Sport', 'Range Rover', 'Range Rover Sport', 'Range Rover Velar', 'Range Rover Evoque'],
  'brand-jaguar': ['XE', 'XF', 'F-Pace', 'E-Pace', 'I-Pace', 'F-Type'],
  'brand-mini': ['Cooper', 'Countryman', 'Clubman', 'Paceman'],
  'brand-alfaromeo': ['Giulia', 'Stelvio', 'Tonale', 'Giulietta'],
  'brand-toyota': ['Yaris', 'Corolla', 'Camry', 'RAV4', 'C-HR', 'Highlander', 'Land Cruiser', 'Supra', 'GR86', 'Aygo X', 'bZ4X'],
  'brand-honda': ['Civic', 'Accord', 'CR-V', 'HR-V', 'Jazz', 'ZR-V', 'e:Ny1', 'Honda e'],
  'brand-nissan': ['Micra', 'Juke', 'Qashqai', 'X-Trail', 'Leaf', 'Ariya', '370Z', 'GT-R'],
  'brand-mazda': ['Mazda2', 'Mazda3', 'Mazda6', 'CX-3', 'CX-30', 'CX-5', 'CX-60', 'MX-5', 'MX-30'],
  'brand-subaru': ['Impreza', 'WRX', 'BRZ', 'Forester', 'Outback', 'XV', 'Solterra'],
  'brand-mitsubishi': ['ASX', 'Eclipse Cross', 'Outlander', 'L200', 'Space Star'],
  'brand-suzuki': ['Swift', 'Vitara', 'S-Cross', 'Jimny', 'Ignis', 'Across'],
  'brand-lexus': ['IS', 'ES', 'LS', 'UX', 'NX', 'RX', 'LX', 'LC', 'RC', 'RZ'],
  'brand-infiniti': ['Q50', 'Q60', 'QX50', 'QX55', 'QX60', 'QX80'],
  'brand-acura': ['Integra', 'TLX', 'MDX', 'RDX'],
  'brand-hyundai': ['i10', 'i20', 'i30', 'Tucson', 'Kona', 'Santa Fe', 'Ioniq 5', 'Ioniq 6', 'Bayon'],
  'brand-kia': ['Picanto', 'Rio', 'Ceed', 'Sportage', 'Sorento', 'Niro', 'EV6', 'EV9', 'Stinger'],
  'brand-genesis': ['G70', 'G80', 'G90', 'GV60', 'GV70', 'GV80'],
  'brand-ford': ['Fiesta', 'Focus', 'Mustang', 'Puma', 'Kuga', 'Explorer', 'Ranger', 'Bronco', 'Mustang Mach-E'],
  'brand-chevrolet': ['Camaro', 'Corvette', 'Malibu', 'Equinox', 'Tahoe', 'Silverado', 'Bolt'],
  'brand-dodge': ['Charger', 'Challenger', 'Durango', 'Hornet'],
  'brand-jeep': ['Renegade', 'Compass', 'Wrangler', 'Cherokee', 'Grand Cherokee', 'Gladiator', 'Avenger'],
  'brand-cadillac': ['CT4', 'CT5', 'Escalade', 'XT4', 'XT5', 'XT6', 'Lyriq'],
  'brand-tesla': ['Model 3', 'Model Y', 'Model S', 'Model X', 'Cybertruck'],
  'brand-gmc': ['Sierra', 'Canyon', 'Yukon', 'Acadia', 'Terrain', 'Hummer EV'],
  'brand-ram': ['1500', '2500', '3500'],
  'brand-chrysler': ['300', 'Pacifica'],
  'brand-lincoln': ['Corsair', 'Nautilus', 'Aviator', 'Navigator'],
  'brand-rollsroyce': ['Ghost', 'Phantom', 'Wraith', 'Dawn', 'Cullinan', 'Spectre'],
  'brand-bentley': ['Continental GT', 'Flying Spur', 'Bentayga'],
  'brand-maserati': ['Ghibli', 'Quattroporte', 'Levante', 'MC20', 'Grecale', 'GranTurismo'],
  'brand-lamborghini': ['Huracán', 'Urus', 'Revuelto'],
  'brand-ferrari': ['Roma', 'Portofino', '296 GTB', 'SF90', '812', 'F8', 'Purosangue'],
  'brand-astonmartin': ['Vantage', 'DB11', 'DB12', 'DBS', 'DBX'],
  'brand-mclaren': ['720S', 'Artura', 'GT'],
  'brand-bugatti': ['Chiron', 'Mistral'],
};

// Helper function to generate year range (2000-2025)
export function generateYearRange(): number[] {
  const years: number[] = [];
  for (let year = 2025; year >= 2000; year--) {
    years.push(year);
  }
  return years;
}
