export interface OilSpec {
  model: string;
  engine: string;
  oil: string;
  spec: string;
  capacity: string;
}

export interface BrandOilData {
  brand: string;
  models: OilSpec[];
}

export const oilDatabase: BrandOilData[] = [
  {
    brand: 'Acura',
    models: [
      { model: 'Integra', engine: '1.5L Turbo', oil: '0W-20', spec: 'API SP / ILSAC GF-6', capacity: '3.7L' },
      { model: 'TLX', engine: '2.0L Turbo / 3.0L V6 Turbo', oil: '0W-20', spec: 'API SP', capacity: '4.5 - 5.5L' },
      { model: 'MDX', engine: '3.0L V6 Turbo / 3.5L V6', oil: '0W-20', spec: 'API SP', capacity: '5.0 - 5.7L' },
      { model: 'RDX', engine: '2.0L Turbo', oil: '0W-20', spec: 'API SP', capacity: '4.5L' },
    ],
  },
  {
    brand: 'Alfa Romeo',
    models: [
      { model: 'Giulia', engine: '2.0L Turbo / 2.9L V6 Biturbo', oil: '5W-30 / 5W-40', spec: 'ACEA C3 / FCA 9.55535-S3', capacity: '4.5 - 7.0L' },
      { model: 'Stelvio', engine: '2.0L Turbo / 2.9L V6 Biturbo', oil: '5W-30 / 5W-40', spec: 'ACEA C3 / FCA 9.55535-S3', capacity: '4.5 - 7.0L' },
      { model: 'Tonale', engine: '1.5L Turbo MHEV / 1.3L PHEV', oil: '0W-30 / 5W-30', spec: 'ACEA C2/C3', capacity: '4.0 - 4.5L' },
      { model: 'Giulietta', engine: '1.4L-1.75L Turbo / 1.6-2.0L Diesel', oil: '5W-30 / 5W-40', spec: 'ACEA C3 / FCA 9.55535-S3', capacity: '4.0 - 5.5L' },
    ],
  },
  {
    brand: 'Aston Martin',
    models: [
      { model: 'Vantage', engine: '4.0L V8 Biturbo (AMG)', oil: '0W-40 / 5W-40', spec: 'MB 229.5', capacity: '8.5L' },
      { model: 'DB11', engine: '4.0L V8 / 5.2L V12 Biturbo', oil: '0W-40 / 5W-40', spec: 'MB 229.5', capacity: '8.5 - 10.5L' },
      { model: 'DB12', engine: '4.0L V8 Biturbo', oil: '0W-40 / 5W-40', spec: 'MB 229.5', capacity: '8.5L' },
      { model: 'DBS', engine: '5.2L V12 Biturbo', oil: '0W-40 / 5W-40', spec: 'Aston Martin spécifique', capacity: '10.5L' },
      { model: 'DBX', engine: '4.0L V8 Biturbo (AMG)', oil: '0W-40 / 5W-40', spec: 'MB 229.5', capacity: '8.5L' },
    ],
  },
  {
    brand: 'Audi',
    models: [
      { model: 'A1', engine: '1.0L-1.5L Turbo', oil: '5W-30 / 0W-30', spec: 'VW 504.00 / 507.00', capacity: '4.0 - 4.5L' },
      { model: 'A3', engine: '1.0L-2.0L Turbo', oil: '5W-30 / 0W-30', spec: 'VW 504.00 / 507.00', capacity: '4.5 - 5.5L' },
      { model: 'A4', engine: '2.0L Turbo', oil: '5W-30 / 0W-30', spec: 'VW 504.00 / 507.00', capacity: '5.0 - 5.7L' },
      { model: 'A5', engine: '2.0L Turbo', oil: '5W-30 / 0W-30', spec: 'VW 504.00 / 507.00', capacity: '5.0 - 5.7L' },
      { model: 'A6', engine: '2.0L-3.0L Turbo', oil: '5W-30 / 0W-30', spec: 'VW 504.00 / 507.00', capacity: '5.5 - 7.0L' },
      { model: 'A7', engine: '2.0L-3.0L Turbo', oil: '5W-30 / 0W-30', spec: 'VW 504.00 / 507.00', capacity: '5.5 - 7.0L' },
      { model: 'A8', engine: '3.0L-4.0L Turbo', oil: '5W-30 / 0W-30', spec: 'VW 504.00 / 507.00', capacity: '7.0 - 8.5L' },
      { model: 'Q2', engine: '1.0L-2.0L Turbo', oil: '5W-30 / 0W-30', spec: 'VW 504.00 / 507.00', capacity: '4.5 - 5.5L' },
      { model: 'Q3', engine: '1.5L-2.0L Turbo', oil: '5W-30 / 0W-30', spec: 'VW 504.00 / 507.00', capacity: '4.5 - 5.5L' },
      { model: 'Q5', engine: '2.0L Turbo', oil: '5W-30 / 0W-30', spec: 'VW 504.00 / 507.00', capacity: '5.5 - 6.0L' },
      { model: 'Q7', engine: '3.0L Turbo', oil: '5W-30 / 0W-30', spec: 'VW 504.00 / 507.00', capacity: '7.0 - 8.0L' },
      { model: 'Q8', engine: '3.0L-4.0L Turbo', oil: '5W-30 / 0W-30', spec: 'VW 504.00 / 507.00', capacity: '7.0 - 8.5L' },
      { model: 'TT', engine: '2.0L Turbo', oil: '5W-30 / 0W-30', spec: 'VW 504.00 / 507.00', capacity: '4.5 - 5.0L' },
      { model: 'R8', engine: '5.2L V10', oil: '5W-40 / 0W-40', spec: 'VW 502.00', capacity: '10.5L' },
      { model: 'RS3', engine: '2.5L Turbo 5cyl', oil: '5W-30', spec: 'VW 504.00', capacity: '5.5L' },
      { model: 'RS4', engine: '2.9L V6 Biturbo', oil: '5W-30', spec: 'VW 504.00', capacity: '7.5L' },
      { model: 'RS5', engine: '2.9L V6 Biturbo', oil: '5W-30', spec: 'VW 504.00', capacity: '7.5L' },
      { model: 'RS6', engine: '4.0L V8 Biturbo', oil: '5W-30 / 0W-30', spec: 'VW 504.00', capacity: '8.5L' },
      { model: 'RS7', engine: '4.0L V8 Biturbo', oil: '5W-30 / 0W-30', spec: 'VW 504.00', capacity: '8.5L' },
      { model: 'e-tron', engine: 'Électrique', oil: 'N/A', spec: 'Huile réducteur Audi', capacity: 'N/A' },
      { model: 'e-tron GT', engine: 'Électrique', oil: 'N/A', spec: 'Huile réducteur Audi', capacity: 'N/A' },
    ],
  },
  {
    brand: 'Bentley',
    models: [
      { model: 'Continental GT', engine: '4.0L V8 / 6.0L W12', oil: '5W-40 / 0W-40', spec: 'VW 502.00', capacity: '8.0 - 10.0L' },
      { model: 'Flying Spur', engine: '4.0L V8 / 6.0L W12', oil: '5W-40 / 0W-40', spec: 'VW 502.00', capacity: '8.0 - 10.0L' },
      { model: 'Bentayga', engine: '4.0L V8 / 3.0L V6 Hybrid', oil: '5W-40 / 0W-40', spec: 'VW 502.00', capacity: '8.0 - 9.0L' },
    ],
  },
  {
    brand: 'BMW',
    models: [
      { model: 'Série 1', engine: '1.5L-3.0L Turbo', oil: '5W-30 / 0W-30', spec: 'BMW LL-01 / LL-04', capacity: '4.5 - 5.5L' },
      { model: 'Série 2', engine: '2.0L-3.0L Turbo', oil: '5W-30 / 0W-30', spec: 'BMW LL-01 / LL-04', capacity: '5.0 - 6.5L' },
      { model: 'Série 3', engine: '2.0L-3.0L Turbo', oil: '5W-30 / 0W-30', spec: 'BMW LL-01 / LL-04', capacity: '5.0 - 6.5L' },
      { model: 'Série 4', engine: '2.0L-3.0L Turbo', oil: '5W-30 / 0W-30', spec: 'BMW LL-01 / LL-04', capacity: '5.0 - 6.5L' },
      { model: 'Série 5', engine: '2.0L-4.4L Turbo', oil: '5W-30 / 0W-30', spec: 'BMW LL-01 / LL-04', capacity: '5.5 - 7.0L' },
      { model: 'Série 6', engine: '3.0L-4.4L Turbo', oil: '5W-30 / 0W-30', spec: 'BMW LL-01', capacity: '6.5 - 7.5L' },
      { model: 'Série 7', engine: '3.0L-6.6L Turbo', oil: '5W-30 / 0W-30', spec: 'BMW LL-01 / LL-04', capacity: '6.5 - 9.0L' },
      { model: 'Série 8', engine: '3.0L-4.4L Turbo', oil: '5W-30', spec: 'BMW LL-01', capacity: '6.5 - 8.0L' },
      { model: 'X1', engine: '1.5L-2.0L Turbo', oil: '5W-30 / 0W-30', spec: 'BMW LL-04', capacity: '4.5 - 5.5L' },
      { model: 'X2', engine: '1.5L-2.0L Turbo', oil: '5W-30 / 0W-30', spec: 'BMW LL-04', capacity: '4.5 - 5.5L' },
      { model: 'X3', engine: '2.0L-3.0L Turbo', oil: '5W-30 / 0W-30', spec: 'BMW LL-01 / LL-04', capacity: '5.0 - 6.5L' },
      { model: 'X4', engine: '2.0L-3.0L Turbo', oil: '5W-30 / 0W-30', spec: 'BMW LL-01 / LL-04', capacity: '5.0 - 6.5L' },
      { model: 'X5', engine: '3.0L-4.4L Turbo', oil: '5W-30 / 0W-30', spec: 'BMW LL-01 / LL-04', capacity: '6.5 - 8.0L' },
      { model: 'X6', engine: '3.0L-4.4L Turbo', oil: '5W-30 / 0W-30', spec: 'BMW LL-01', capacity: '6.5 - 8.0L' },
      { model: 'X7', engine: '3.0L-4.4L Turbo', oil: '5W-30 / 0W-30', spec: 'BMW LL-01', capacity: '6.5 - 8.0L' },
      { model: 'Z4', engine: '2.0L-3.0L Turbo', oil: '5W-30 / 0W-30', spec: 'BMW LL-01', capacity: '5.0 - 6.0L' },
      { model: 'M2', engine: '3.0L Biturbo', oil: '0W-30 / 5W-30', spec: 'BMW LL-01', capacity: '6.5L' },
      { model: 'M3', engine: '3.0L Biturbo S58', oil: '0W-30', spec: 'BMW LL-01 FE', capacity: '7.0L' },
      { model: 'M4', engine: '3.0L Biturbo S58', oil: '0W-30', spec: 'BMW LL-01 FE', capacity: '7.0L' },
      { model: 'M5', engine: '4.4L Biturbo S63', oil: '0W-30 / 5W-30', spec: 'BMW LL-01', capacity: '8.5L' },
      { model: 'M8', engine: '4.4L Biturbo S63', oil: '0W-30 / 5W-30', spec: 'BMW LL-01', capacity: '8.5L' },
      { model: 'iX', engine: 'Électrique', oil: 'N/A', spec: 'Huile spécifique réducteur BMW', capacity: 'N/A' },
      { model: 'i4', engine: 'Électrique', oil: 'N/A', spec: 'Huile spécifique réducteur BMW', capacity: 'N/A' },
      { model: 'i7', engine: 'Électrique', oil: 'N/A', spec: 'Huile spécifique réducteur BMW', capacity: 'N/A' },
    ],
  },
  {
    brand: 'Bugatti',
    models: [
      { model: 'Chiron', engine: '8.0L W16 Quad-Turbo', oil: '0W-40', spec: 'Bugatti spécifique Shell Helix Ultra', capacity: '16.0L' },
      { model: 'Mistral', engine: '8.0L W16 Quad-Turbo', oil: '0W-40', spec: 'Bugatti Shell Helix Ultra', capacity: '16.0L' },
    ],
  },
  {
    brand: 'Cadillac',
    models: [
      { model: 'CT5', engine: '2.0L Turbo / 3.0L V6 Turbo', oil: '0W-20 / 5W-30', spec: 'dexos1 Gen3', capacity: '5.5 - 6.0L' },
      { model: 'Escalade', engine: '6.2L V8 / 3.0L Diesel', oil: '0W-20 / 5W-30', spec: 'dexos1 Gen3 / dexosD', capacity: '8.0L' },
    ],
  },
  {
    brand: 'Chevrolet',
    models: [
      { model: 'Camaro', engine: '2.0L Turbo / 6.2L V8', oil: '5W-30 / 0W-40', spec: 'dexos1 Gen3', capacity: '5.0 - 8.0L' },
      { model: 'Corvette', engine: '6.2L V8 / 5.5L V8 Flat-Plane', oil: '0W-40 / 5W-30', spec: 'dexos1 Gen3', capacity: '6.5 - 8.0L' },
      { model: 'Malibu', engine: '1.5L-2.0L Turbo', oil: '0W-20 / 5W-30', spec: 'dexos1 Gen3', capacity: '4.5 - 5.0L' },
      { model: 'Equinox', engine: '1.5L-2.0L Turbo', oil: '0W-20 / 5W-30', spec: 'dexos1 Gen3', capacity: '4.5 - 5.0L' },
      { model: 'Tahoe', engine: '5.3L-6.2L V8 / 3.0L Diesel', oil: '0W-20 / 5W-30', spec: 'dexos1 Gen3 / dexos2', capacity: '7.0 - 8.0L' },
      { model: 'Silverado', engine: '2.7L-6.2L / 3.0L Diesel', oil: '0W-20 / 5W-30', spec: 'dexos1 Gen3 / dexosD', capacity: '7.0 - 8.0L' },
      { model: 'Bolt', engine: 'Électrique', oil: 'N/A', spec: 'Pas de vidange moteur', capacity: 'N/A' },
    ],
  },
  {
    brand: 'Chrysler',
    models: [
      { model: '300', engine: '3.6L V6 / 5.7L V8 HEMI', oil: '5W-20', spec: 'MS-6395', capacity: '5.9 - 7.0L' },
      { model: 'Pacifica', engine: '3.6L V6 / 3.6L PHEV', oil: '5W-20', spec: 'MS-6395', capacity: '5.9L' },
    ],
  },
  {
    brand: 'Citroën',
    models: [
      { model: 'C1', engine: '1.0L-1.2L', oil: '0W-30 / 5W-30', spec: 'PSA B71 2290', capacity: '3.0 - 3.5L' },
      { model: 'C3', engine: '1.2L PureTech / 1.5L BlueHDi', oil: '0W-30 / 5W-30', spec: 'PSA B71 2290 / 2312', capacity: '3.5 - 4.5L' },
      { model: 'C4', engine: '1.2L PureTech / 1.5L BlueHDi', oil: '0W-30 / 5W-30', spec: 'PSA B71 2290 / 2312', capacity: '3.5 - 5.0L' },
      { model: 'C5 X', engine: '1.2L-1.6L PureTech / 1.5L BlueHDi', oil: '0W-30 / 5W-30', spec: 'PSA B71 2290 / 2312', capacity: '4.0 - 5.0L' },
      { model: 'C3 Aircross', engine: '1.2L PureTech / 1.5L BlueHDi', oil: '0W-30 / 5W-30', spec: 'PSA B71 2290 / 2312', capacity: '3.5 - 4.5L' },
      { model: 'C5 Aircross', engine: '1.2L-1.6L PureTech / 1.5-2.0L BlueHDi', oil: '0W-30 / 5W-30', spec: 'PSA B71 2290 / 2312', capacity: '4.0 - 5.5L' },
      { model: 'Berlingo', engine: '1.2L PureTech / 1.5L BlueHDi', oil: '0W-30 / 5W-30', spec: 'PSA B71 2290 / 2312', capacity: '3.5 - 5.0L' },
      { model: 'ë-C4', engine: 'Électrique', oil: 'N/A', spec: 'Huile réducteur Citroën', capacity: 'N/A' },
    ],
  },
  {
    brand: 'Dodge',
    models: [
      { model: 'Charger', engine: '3.6L V6 / 5.7L-6.2L-6.4L V8', oil: '5W-20 / 0W-40', spec: 'MS-6395 / MS-12633', capacity: '5.5 - 7.0L' },
      { model: 'Challenger', engine: '3.6L V6 / 5.7L-6.2L-6.4L V8', oil: '5W-20 / 0W-40', spec: 'MS-6395 / MS-12633', capacity: '5.5 - 7.0L' },
      { model: 'Durango', engine: '3.6L V6 / 5.7L-6.4L V8', oil: '5W-20', spec: 'MS-6395', capacity: '5.9 - 7.0L' },
      { model: 'Hornet', engine: '2.0L Turbo / 1.3L PHEV', oil: '5W-30 / 0W-30', spec: 'MS-6395 / ACEA C3', capacity: '4.0 - 5.0L' },
    ],
  },
  {
    brand: 'Ferrari',
    models: [
      { model: 'Roma', engine: '3.9L V8 Turbo', oil: '5W-40', spec: 'Ferrari spécifique Shell Helix Ultra', capacity: '7.5L' },
      { model: 'Portofino M', engine: '3.9L V8 Turbo', oil: '5W-40', spec: 'Ferrari Shell Helix Ultra', capacity: '7.5L' },
      { model: '296 GTB', engine: '3.0L V6 Turbo Hybrid', oil: '5W-40', spec: 'Ferrari Shell Helix Ultra', capacity: '6.5L' },
      { model: 'SF90 Stradale', engine: '4.0L V8 Turbo Hybrid', oil: '5W-40', spec: 'Ferrari Shell Helix Ultra', capacity: '8.0L' },
      { model: '812 Superfast', engine: '6.5L V12', oil: '5W-40', spec: 'Ferrari Shell Helix Ultra', capacity: '11.5L' },
      { model: 'F8 Tributo', engine: '3.9L V8 Turbo', oil: '5W-40', spec: 'Ferrari Shell Helix Ultra', capacity: '7.5L' },
      { model: 'Purosangue', engine: '6.5L V12', oil: '5W-40', spec: 'Ferrari Shell Helix Ultra', capacity: '11.0L' },
    ],
  },
  {
    brand: 'Fiat',
    models: [
      { model: '500', engine: '1.0L-1.2L', oil: '5W-30 / 5W-40', spec: 'ACEA C2/C3', capacity: '3.0 - 3.5L' },
      { model: '500X', engine: '1.0L-1.3L Turbo / 1.6L Diesel', oil: '5W-30 / 0W-30', spec: 'ACEA C2/C3', capacity: '3.5 - 5.0L' },
      { model: 'Panda', engine: '1.0L-1.2L', oil: '5W-30 / 5W-40', spec: 'ACEA C2/C3', capacity: '3.0 - 3.5L' },
      { model: 'Tipo', engine: '1.0L-1.4L Turbo / 1.3-1.6L Diesel', oil: '5W-30 / 0W-30', spec: 'ACEA C2/C3', capacity: '3.5 - 5.0L' },
      { model: '500e', engine: 'Électrique', oil: 'N/A', spec: 'Huile réducteur Fiat', capacity: 'N/A' },
    ],
  },
  {
    brand: 'Ford',
    models: [
      { model: 'Fiesta', engine: '1.0L-1.5L EcoBoost', oil: '5W-20 / 5W-30', spec: 'Ford WSS-M2C948-B', capacity: '4.0 - 4.5L' },
      { model: 'Focus', engine: '1.0L-1.5L EcoBoost / 1.5-2.0L EcoBlue', oil: '5W-20 / 5W-30', spec: 'Ford WSS-M2C948-B / M2C913-D', capacity: '4.0 - 5.5L' },
      { model: 'Mustang', engine: '2.3L EcoBoost / 5.0L V8', oil: '5W-20 / 5W-30', spec: 'Ford WSS-M2C961-A1', capacity: '5.0 - 8.0L' },
      { model: 'Puma', engine: '1.0L EcoBoost / 1.0L mHEV', oil: '5W-20 / 0W-30', spec: 'Ford WSS-M2C948-B', capacity: '4.0 - 4.5L' },
      { model: 'Kuga', engine: '1.5L EcoBoost / 2.5L PHEV / 1.5-2.0L EcoBlue', oil: '5W-20 / 5W-30', spec: 'Ford WSS-M2C948-B / M2C913-D', capacity: '4.5 - 5.5L' },
      { model: 'Explorer', engine: '3.0L V6 EcoBoost / PHEV', oil: '5W-30', spec: 'Ford WSS-M2C946-B1', capacity: '5.7L' },
      { model: 'Ranger', engine: '2.0L-3.0L Diesel / 2.3L EcoBoost', oil: '5W-30 / 0W-30', spec: 'Ford WSS-M2C913-D', capacity: '5.5 - 7.0L' },
      { model: 'Bronco', engine: '2.3L-2.7L EcoBoost', oil: '5W-30', spec: 'Ford WSS-M2C946-B1', capacity: '5.5 - 6.0L' },
      { model: 'Mustang Mach-E', engine: 'Électrique', oil: 'N/A', spec: 'Huile réducteur Ford', capacity: 'N/A' },
      { model: 'GT', engine: '3.5L EcoBoost V6', oil: '5W-50', spec: 'Ford WSS-M2C946-B1', capacity: '8.0L' },
    ],
  },
  {
    brand: 'Genesis',
    models: [
      { model: 'G70', engine: '2.0L-3.3L Turbo', oil: '0W-20 / 5W-30', spec: 'API SP / ACEA C5', capacity: '5.0 - 6.0L' },
      { model: 'G80', engine: '2.5L-3.5L Turbo', oil: '0W-20 / 5W-30', spec: 'API SP / ACEA C5', capacity: '5.5 - 7.0L' },
      { model: 'G90', engine: '3.5L Turbo', oil: '0W-20 / 5W-30', spec: 'API SP', capacity: '7.0L' },
      { model: 'GV60', engine: 'Électrique', oil: 'N/A', spec: 'Huile réducteur Genesis', capacity: 'N/A' },
      { model: 'GV70', engine: '2.5L-3.5L Turbo', oil: '0W-20 / 5W-30', spec: 'API SP / ACEA C5', capacity: '5.5 - 7.0L' },
      { model: 'GV80', engine: '2.5L-3.5L Turbo / 3.0L Diesel', oil: '0W-20 / 5W-30', spec: 'API SP / ACEA C5', capacity: '6.0 - 7.5L' },
    ],
  },
  {
    brand: 'GMC',
    models: [
      { model: 'Sierra', engine: '2.7L-6.2L / 3.0L Diesel', oil: '0W-20 / 5W-30', spec: 'dexos1 Gen3 / dexosD', capacity: '7.0 - 8.0L' },
      { model: 'Canyon', engine: '2.7L Turbo / 3.6L V6', oil: '0W-20 / 5W-30', spec: 'dexos1 Gen3', capacity: '5.5 - 6.0L' },
      { model: 'Yukon', engine: '5.3L-6.2L V8 / 3.0L Diesel', oil: '0W-20 / 5W-30', spec: 'dexos1 Gen3 / dexosD', capacity: '7.0 - 8.0L' },
      { model: 'Acadia', engine: '2.0L Turbo / 3.6L V6', oil: '0W-20 / 5W-30', spec: 'dexos1 Gen3', capacity: '5.0 - 5.7L' },
      { model: 'Terrain', engine: '1.5L-2.0L Turbo', oil: '0W-20 / 5W-30', spec: 'dexos1 Gen3', capacity: '4.5 - 5.0L' },
    ],
  },
  {
    brand: 'Honda',
    models: [
      { model: 'Civic', engine: '1.5L Turbo / 2.0L Hybrid', oil: '0W-20', spec: 'API SP / ILSAC GF-6', capacity: '3.7 - 4.5L' },
      { model: 'Accord', engine: '1.5L Turbo / 2.0L Hybrid', oil: '0W-20', spec: 'API SP / ILSAC GF-6', capacity: '3.7 - 4.5L' },
      { model: 'CR-V', engine: '1.5L Turbo / 2.0L Hybrid', oil: '0W-20', spec: 'API SP / ILSAC GF-6', capacity: '3.7 - 4.5L' },
      { model: 'HR-V', engine: '1.5L / 1.5L Hybrid', oil: '0W-20', spec: 'API SP / ILSAC GF-6', capacity: '3.5 - 4.0L' },
      { model: 'Jazz', engine: '1.5L / 1.5L Hybrid', oil: '0W-20', spec: 'API SP / ILSAC GF-6', capacity: '3.5L' },
      { model: 'ZR-V', engine: '2.0L Hybrid', oil: '0W-20', spec: 'API SP / ILSAC GF-6', capacity: '4.0L' },
    ],
  },
  {
    brand: 'Hyundai',
    models: [
      { model: 'i10', engine: '1.0L-1.2L', oil: '0W-20 / 5W-30', spec: 'API SP / ILSAC GF-6', capacity: '3.3 - 3.6L' },
      { model: 'i20', engine: '1.0L-1.2L Turbo', oil: '0W-20 / 5W-30', spec: 'API SP / ACEA C5', capacity: '3.5 - 4.0L' },
      { model: 'i30', engine: '1.0L-1.5L Turbo / 1.6L Diesel', oil: '0W-20 / 5W-30', spec: 'ACEA C5 / C3', capacity: '4.0 - 5.3L' },
      { model: 'Tucson', engine: '1.6L Turbo / 1.6L Hybrid / 1.6L Diesel', oil: '0W-20 / 5W-30', spec: 'ACEA C5 / C3', capacity: '4.5 - 5.5L' },
      { model: 'Kona', engine: '1.0L-1.6L Turbo / 1.6L Hybrid', oil: '0W-20 / 5W-30', spec: 'ACEA C5 / C3', capacity: '3.5 - 4.5L' },
      { model: 'Santa Fe', engine: '1.6L-2.5L Turbo / 2.2L Diesel', oil: '0W-20 / 5W-30', spec: 'ACEA C5 / C3', capacity: '5.0 - 6.0L' },
      { model: 'Ioniq 5', engine: 'Électrique', oil: 'N/A', spec: 'Huile réducteur Hyundai', capacity: 'N/A' },
      { model: 'Ioniq 6', engine: 'Électrique', oil: 'N/A', spec: 'Huile réducteur Hyundai', capacity: 'N/A' },
      { model: 'Veloster', engine: '1.6L Turbo', oil: '0W-20 / 5W-30', spec: 'API SP / ACEA C5', capacity: '4.0 - 4.5L' },
    ],
  },
  {
    brand: 'Infiniti',
    models: [
      { model: 'Q50', engine: '2.0L Turbo / 3.0L V6 Turbo', oil: '5W-30 / 0W-20', spec: 'API SP', capacity: '5.0 - 5.5L' },
      { model: 'Q60', engine: '2.0L Turbo / 3.0L V6 Turbo', oil: '5W-30 / 0W-20', spec: 'API SP', capacity: '5.0 - 5.5L' },
      { model: 'QX50', engine: '2.0L VC-Turbo', oil: '0W-20', spec: 'API SP', capacity: '5.0L' },
      { model: 'QX55', engine: '2.0L VC-Turbo', oil: '0W-20', spec: 'API SP', capacity: '5.0L' },
      { model: 'QX60', engine: '3.5L V6', oil: '0W-20', spec: 'API SP', capacity: '5.5L' },
      { model: 'QX80', engine: '5.6L V8', oil: '5W-30', spec: 'API SP', capacity: '6.9L' },
    ],
  },
  {
    brand: 'Jaguar',
    models: [
      { model: 'XE', engine: '2.0L Turbo', oil: '5W-30 / 0W-30', spec: 'STJLR.03.5004', capacity: '5.0 - 5.5L' },
      { model: 'XF', engine: '2.0L-3.0L Turbo', oil: '5W-30 / 0W-30', spec: 'STJLR.03.5004', capacity: '5.5 - 7.5L' },
      { model: 'F-Pace', engine: '2.0L-3.0L-5.0L', oil: '5W-30 / 0W-30', spec: 'STJLR.03.5004', capacity: '5.5 - 8.0L' },
      { model: 'E-Pace', engine: '2.0L Turbo', oil: '5W-30 / 0W-30', spec: 'STJLR.03.5004', capacity: '5.0 - 5.5L' },
      { model: 'F-Type', engine: '2.0L-5.0L Turbo/Supercharged', oil: '5W-30 / 0W-30', spec: 'STJLR.03.5004 / 5005', capacity: '5.5 - 8.5L' },
      { model: 'I-Pace', engine: 'Électrique', oil: 'N/A', spec: 'Huile réducteur Jaguar', capacity: 'N/A' },
    ],
  },
  {
    brand: 'Jeep',
    models: [
      { model: 'Renegade', engine: '1.0L-1.3L Turbo / 1.6L Diesel', oil: '5W-30 / 5W-40', spec: 'MS-6395 / ACEA C3', capacity: '4.0 - 5.0L' },
      { model: 'Compass', engine: '1.3L Turbo / 1.6L Diesel', oil: '5W-30 / 5W-40', spec: 'MS-6395 / ACEA C3', capacity: '4.0 - 5.0L' },
      { model: 'Wrangler', engine: '2.0L Turbo / 3.6L V6 / 2.2L Diesel', oil: '5W-20 / 5W-30', spec: 'MS-6395 / ACEA C3', capacity: '5.0 - 6.0L' },
      { model: 'Cherokee', engine: '2.0L-2.4L / 3.2L V6 / 2.2L Diesel', oil: '5W-20 / 5W-30', spec: 'MS-6395', capacity: '5.0 - 5.5L' },
      { model: 'Grand Cherokee', engine: '2.0L Turbo / 3.6L V6 / 5.7L V8', oil: '5W-20 / 0W-20', spec: 'MS-6395 / MS-13340', capacity: '5.5 - 7.0L' },
      { model: 'Gladiator', engine: '3.0L Diesel / 3.6L V6', oil: '5W-20 / 5W-30', spec: 'MS-6395', capacity: '5.5 - 6.0L' },
    ],
  },
  {
    brand: 'Kia',
    models: [
      { model: 'Picanto', engine: '1.0L-1.2L', oil: '0W-20 / 5W-30', spec: 'API SP / ILSAC GF-6', capacity: '3.3L' },
      { model: 'Rio', engine: '1.0L-1.2L Turbo', oil: '0W-20 / 5W-30', spec: 'API SP / ACEA C5', capacity: '3.5 - 4.0L' },
      { model: 'Ceed', engine: '1.0L-1.5L Turbo / 1.6L Diesel', oil: '0W-20 / 5W-30', spec: 'ACEA C5 / C3', capacity: '4.0 - 5.3L' },
      { model: 'Sportage', engine: '1.6L Turbo / 1.6L Hybrid / 1.6L Diesel', oil: '0W-20 / 5W-30', spec: 'ACEA C5 / C3', capacity: '4.5 - 5.5L' },
      { model: 'Sorento', engine: '1.6L Hybrid / 2.2L Diesel', oil: '0W-20 / 5W-30', spec: 'ACEA C5 / C3', capacity: '5.0 - 6.0L' },
      { model: 'Stinger', engine: '2.0L-3.3L Turbo', oil: '5W-30 / 0W-30', spec: 'API SP / ACEA C3', capacity: '5.0 - 6.5L' },
      { model: 'EV6', engine: 'Électrique', oil: 'N/A', spec: 'Huile réducteur Kia', capacity: 'N/A' },
      { model: 'Forte Koup', engine: '1.6L-2.0L', oil: '5W-20 / 5W-30', spec: 'API SP', capacity: '4.0 - 4.5L' },
    ],
  },
  {
    brand: 'Lamborghini',
    models: [
      { model: 'Huracán', engine: '5.2L V10', oil: '5W-40 / 0W-40', spec: 'VW 502.00', capacity: '10.0L' },
      { model: 'Urus', engine: '4.0L V8 Biturbo', oil: '5W-40 / 0W-40', spec: 'VW 502.00', capacity: '8.5L' },
      { model: 'Revuelto', engine: '6.5L V12 Hybrid', oil: '5W-40 / 0W-40', spec: 'VW 502.00', capacity: '11.0L' },
      { model: 'Aventador', engine: '6.5L V12', oil: '5W-40 / 0W-40', spec: 'VW 502.00', capacity: '10.0L' },
    ],
  },
  {
    brand: 'Land Rover',
    models: [
      { model: 'Defender', engine: '2.0L-3.0L Turbo / 5.0L V8', oil: '5W-30 / 0W-30', spec: 'STJLR.03.5004 / 5005', capacity: '5.5 - 8.5L' },
      { model: 'Discovery', engine: '2.0L-3.0L Turbo', oil: '5W-30 / 0W-30', spec: 'STJLR.03.5004', capacity: '5.5 - 7.5L' },
      { model: 'Discovery Sport', engine: '2.0L Turbo', oil: '5W-30 / 0W-30', spec: 'STJLR.03.5004', capacity: '5.5 - 6.0L' },
      { model: 'Range Rover', engine: '3.0L-4.4L Turbo', oil: '0W-30 / 5W-30', spec: 'STJLR.03.5004 / 5005', capacity: '7.0 - 9.0L' },
      { model: 'Range Rover Sport', engine: '3.0L Turbo / 4.4L V8', oil: '0W-30 / 5W-30', spec: 'STJLR.03.5004', capacity: '7.0 - 8.5L' },
      { model: 'Range Rover Velar', engine: '2.0L-3.0L Turbo', oil: '5W-30 / 0W-30', spec: 'STJLR.03.5004', capacity: '5.5 - 7.5L' },
      { model: 'Range Rover Evoque', engine: '2.0L Turbo', oil: '5W-30 / 0W-30', spec: 'STJLR.03.5004', capacity: '5.5 - 6.0L' },
    ],
  },
  {
    brand: 'Lexus',
    models: [
      { model: 'IS', engine: '2.0L Turbo / 3.5L V6 Hybrid', oil: '0W-20', spec: 'Toyota TGMO / API SP', capacity: '4.5 - 5.5L' },
      { model: 'ES', engine: '2.5L Hybrid', oil: '0W-20 / 0W-16', spec: 'Toyota TGMO', capacity: '4.5L' },
      { model: 'LS', engine: '3.5L V6 Hybrid', oil: '0W-20', spec: 'Toyota TGMO', capacity: '6.0L' },
      { model: 'UX', engine: '2.0L Hybrid', oil: '0W-20 / 0W-16', spec: 'Toyota TGMO', capacity: '4.0L' },
      { model: 'NX', engine: '2.5L Hybrid / 2.4L Turbo', oil: '0W-20', spec: 'Toyota TGMO', capacity: '4.5 - 5.0L' },
      { model: 'RX', engine: '2.5L Hybrid / 2.4L Turbo', oil: '0W-20', spec: 'Toyota TGMO', capacity: '5.0 - 5.5L' },
      { model: 'LX', engine: '3.5L V6 Turbo', oil: '0W-30 / 5W-30', spec: 'JASO DL-1 / Toyota', capacity: '7.5L' },
      { model: 'RC', engine: '2.0L Turbo / 5.0L V8', oil: '0W-20 / 0W-30', spec: 'Toyota TGMO', capacity: '5.0 - 8.5L' },
      { model: 'LFA', engine: '4.8L V10', oil: '0W-30', spec: 'Toyota TGMO', capacity: '5.0L' },
    ],
  },
  {
    brand: 'Lincoln',
    models: [
      { model: 'Corsair', engine: '2.0L-2.5L Turbo / PHEV', oil: '5W-30 / 0W-20', spec: 'Ford WSS-M2C948-B', capacity: '4.5 - 5.0L' },
      { model: 'Nautilus', engine: '2.0L Turbo', oil: '5W-30 / 0W-20', spec: 'Ford WSS-M2C948-B', capacity: '5.0L' },
      { model: 'Aviator', engine: '3.0L V6 Turbo / PHEV', oil: '5W-30', spec: 'Ford WSS-M2C946-B1', capacity: '5.7L' },
      { model: 'Navigator', engine: '3.5L V6 EcoBoost', oil: '5W-30', spec: 'Ford WSS-M2C946-B1', capacity: '5.7L' },
      { model: 'Continental', engine: '2.7L-3.0L EcoBoost', oil: '5W-30', spec: 'Ford WSS-M2C948-B', capacity: '5.7L' },
    ],
  },
  {
    brand: 'Maserati',
    models: [
      { model: 'Ghibli', engine: '3.0L V6 Turbo / 2.0L Turbo', oil: '5W-40 / 0W-40', spec: 'ACEA C3', capacity: '6.0 - 7.0L' },
      { model: 'Quattroporte', engine: '3.0L V6 / 3.8L V8 Turbo', oil: '5W-40 / 0W-40', spec: 'ACEA C3', capacity: '6.5 - 8.0L' },
      { model: 'Levante', engine: '3.0L V6 / 3.8L V8 Turbo', oil: '5W-40 / 0W-40', spec: 'ACEA C3', capacity: '6.5 - 8.0L' },
      { model: 'MC20', engine: '3.0L V6 Nettuno Biturbo', oil: '5W-40', spec: 'ACEA C3', capacity: '7.0L' },
      { model: 'Grecale', engine: '2.0L Turbo / 3.0L V6', oil: '5W-30 / 5W-40', spec: 'ACEA C3', capacity: '5.0 - 7.0L' },
      { model: 'GranTurismo', engine: '3.0L V6 Nettuno / Électrique', oil: '5W-40', spec: 'ACEA C3', capacity: '7.0L' },
    ],
  },
  {
    brand: 'Mazda',
    models: [
      { model: 'Mazda2', engine: '1.5L Skyactiv-G', oil: '0W-20', spec: 'API SP / ILSAC GF-6', capacity: '3.8L' },
      { model: 'Mazda3', engine: '2.0L Skyactiv-G / 1.8L Skyactiv-D', oil: '0W-20 / 5W-30', spec: 'API SP / ACEA C3', capacity: '4.2 - 5.1L' },
      { model: 'Mazda6', engine: '2.0L-2.5L Skyactiv-G / 2.2L Skyactiv-D', oil: '0W-20 / 5W-30', spec: 'API SP / ACEA C3', capacity: '4.2 - 5.1L' },
      { model: 'CX-3', engine: '2.0L Skyactiv-G / 1.8L Skyactiv-D', oil: '0W-20 / 5W-30', spec: 'API SP / ACEA C3', capacity: '3.8 - 5.1L' },
      { model: 'CX-30', engine: '2.0L Skyactiv-G / 1.8L Skyactiv-D', oil: '0W-20 / 5W-30', spec: 'API SP / ACEA C3', capacity: '4.2 - 5.1L' },
      { model: 'CX-5', engine: '2.0L-2.5L Skyactiv-G / 2.2L Skyactiv-D', oil: '0W-20 / 5W-30', spec: 'API SP / ACEA C3', capacity: '4.2 - 5.5L' },
      { model: 'MX-5', engine: '1.5L-2.0L Skyactiv-G', oil: '0W-20', spec: 'API SP', capacity: '3.8 - 4.2L' },
      { model: 'RX-7', engine: '1.3L Rotary Turbo', oil: '10W-40', spec: 'API SJ', capacity: '3.0L' },
    ],
  },
  {
    brand: 'McLaren',
    models: [
      { model: '720S', engine: '4.0L V8 Biturbo', oil: '5W-40 / 0W-40', spec: 'McLaren spécifique Castrol Edge', capacity: '7.5L' },
      { model: 'Artura', engine: '3.0L V6 Turbo Hybrid', oil: '5W-40', spec: 'McLaren Castrol Edge Professional', capacity: '6.5L' },
      { model: 'GT', engine: '4.0L V8 Biturbo', oil: '5W-40 / 0W-40', spec: 'McLaren Castrol Edge', capacity: '7.5L' },
      { model: '600LT', engine: '3.8L V8 Biturbo', oil: '5W-40', spec: 'McLaren Castrol Edge', capacity: '7.5L' },
    ],
  },
  {
    brand: 'Mercedes-Benz',
    models: [
      { model: 'Classe A', engine: '1.3L-2.0L Turbo', oil: '5W-30 / 0W-30', spec: 'MB 229.51 / 229.52', capacity: '5.0 - 5.5L' },
      { model: 'Classe B', engine: '1.3L-2.0L Turbo', oil: '5W-30 / 0W-30', spec: 'MB 229.51 / 229.52', capacity: '5.0 - 5.5L' },
      { model: 'Classe C', engine: '1.5L-2.0L Turbo', oil: '0W-30 / 5W-30', spec: 'MB 229.52 / 229.71', capacity: '5.5 - 6.5L' },
      { model: 'Classe E', engine: '2.0L-3.0L Turbo', oil: '0W-30 / 5W-30', spec: 'MB 229.52 / 229.71', capacity: '5.5 - 8.0L' },
      { model: 'Classe S', engine: '3.0L-4.0L Turbo', oil: '0W-30 / 5W-30', spec: 'MB 229.52 / 229.71', capacity: '7.0 - 9.0L' },
      { model: 'CLA', engine: '1.3L-2.0L Turbo', oil: '5W-30 / 0W-30', spec: 'MB 229.51 / 229.52', capacity: '5.0 - 5.5L' },
      { model: 'CLS', engine: '2.0L-3.0L Turbo', oil: '0W-30 / 5W-30', spec: 'MB 229.52', capacity: '6.5 - 8.0L' },
      { model: 'GLA', engine: '1.3L-2.0L Turbo', oil: '5W-30 / 0W-30', spec: 'MB 229.51 / 229.52', capacity: '5.0 - 5.5L' },
      { model: 'GLB', engine: '1.3L-2.0L Turbo', oil: '5W-30 / 0W-30', spec: 'MB 229.51 / 229.52', capacity: '5.0 - 5.5L' },
      { model: 'GLC', engine: '2.0L Turbo', oil: '0W-30 / 5W-30', spec: 'MB 229.52 / 229.71', capacity: '5.5 - 6.5L' },
      { model: 'GLE', engine: '2.0L-3.0L Turbo', oil: '0W-30 / 5W-30', spec: 'MB 229.52 / 229.71', capacity: '7.0 - 9.0L' },
      { model: 'GLS', engine: '3.0L-4.0L Turbo', oil: '0W-30 / 5W-30', spec: 'MB 229.52', capacity: '7.5 - 9.0L' },
      { model: 'AMG GT', engine: '4.0L V8 Biturbo', oil: '0W-40 / 5W-40', spec: 'MB 229.5', capacity: '8.5 - 11.0L' },
      { model: 'EQA', engine: 'Électrique', oil: 'N/A', spec: 'Huile réducteur spécifique MB', capacity: 'N/A' },
      { model: 'EQC', engine: 'Électrique', oil: 'N/A', spec: 'Huile réducteur spécifique MB', capacity: 'N/A' },
      { model: 'EQS', engine: 'Électrique', oil: 'N/A', spec: 'Huile réducteur spécifique MB', capacity: 'N/A' },
    ],
  },
  {
    brand: 'Mini',
    models: [
      { model: 'Cooper', engine: '1.5L-2.0L Turbo', oil: '5W-30 / 0W-30', spec: 'BMW LL-01 / LL-04', capacity: '4.2 - 5.0L' },
      { model: 'Countryman', engine: '1.5L-2.0L Turbo', oil: '5W-30 / 0W-30', spec: 'BMW LL-01 / LL-04', capacity: '4.2 - 5.2L' },
      { model: 'Clubman', engine: '1.5L-2.0L Turbo', oil: '5W-30 / 0W-30', spec: 'BMW LL-01 / LL-04', capacity: '4.2 - 5.2L' },
      { model: 'John Cooper Works', engine: '2.0L Turbo', oil: '5W-30 / 0W-30', spec: 'BMW LL-04', capacity: '4.5 - 5.0L' },
    ],
  },
  {
    brand: 'Mitsubishi',
    models: [
      { model: 'ASX', engine: '2.0L / 1.3L Turbo (Renault)', oil: '0W-20 / 5W-30', spec: 'API SP / ACEA C3', capacity: '4.0 - 4.5L' },
      { model: 'Eclipse Cross', engine: '1.5L Turbo / 2.4L PHEV', oil: '0W-20 / 5W-30', spec: 'API SP', capacity: '4.2 - 4.5L' },
      { model: 'Outlander', engine: '2.4L / 2.5L PHEV', oil: '0W-20', spec: 'API SP / ILSAC GF-6', capacity: '4.4 - 5.0L' },
      { model: 'L200', engine: '2.4L Diesel', oil: '5W-30', spec: 'ACEA C3', capacity: '6.5L' },
      { model: 'Lancer Evolution', engine: '2.0L Turbo', oil: '5W-30', spec: 'API SP', capacity: '4.5L' },
    ],
  },
  {
    brand: 'Nissan',
    models: [
      { model: 'Micra', engine: '0.9L-1.0L Turbo', oil: '0W-20 / 5W-30', spec: 'ACEA C3/C4', capacity: '3.5 - 4.0L' },
      { model: 'Juke', engine: '1.0L DIG-T / 1.6L Hybrid', oil: '0W-20 / 5W-30', spec: 'ACEA C3', capacity: '4.0 - 4.5L' },
      { model: 'Qashqai', engine: '1.3L DIG-T / 1.5L e-Power', oil: '0W-20 / 5W-30', spec: 'ACEA C3 / C5', capacity: '4.5 - 5.0L' },
      { model: 'X-Trail', engine: '1.5L e-Power / 1.5L Turbo', oil: '0W-20 / 5W-30', spec: 'ACEA C5', capacity: '4.5 - 5.5L' },
      { model: '370Z', engine: '3.7L V6', oil: '5W-30', spec: 'API SN / ILSAC GF-5', capacity: '5.0L' },
      { model: 'GT-R', engine: '3.8L V6 Biturbo', oil: '0W-40 / 5W-40', spec: 'Nissan Ester Engine Oil', capacity: '5.5L' },
      { model: 'Skyline GT-R', engine: '2.6L RB26DETT Biturbo', oil: '5W-30 / 5W-40', spec: 'API SP', capacity: '4.5L' },
    ],
  },
  {
    brand: 'Opel',
    models: [
      { model: 'Corsa', engine: '1.2L Turbo / 1.5L Diesel', oil: '0W-30 / 5W-30', spec: 'dexos2 / PSA B71 2290', capacity: '3.5 - 4.5L' },
      { model: 'Astra', engine: '1.2L Turbo / 1.5L Diesel / 1.6L PHEV', oil: '0W-30 / 5W-30', spec: 'dexos2 / PSA B71 2290', capacity: '3.5 - 5.0L' },
      { model: 'Mokka', engine: '1.2L Turbo / 1.5L Diesel', oil: '0W-30 / 5W-30', spec: 'dexos2 / PSA B71 2290', capacity: '3.5 - 4.5L' },
      { model: 'Crossland', engine: '1.2L Turbo / 1.5L Diesel', oil: '0W-30 / 5W-30', spec: 'dexos2 / PSA B71 2290', capacity: '3.5 - 4.5L' },
      { model: 'Grandland', engine: '1.2L-1.6L Turbo / 1.5L Diesel / PHEV', oil: '0W-30 / 5W-30', spec: 'dexos2 / PSA B71 2290', capacity: '3.5 - 5.0L' },
    ],
  },
  {
    brand: 'Peugeot',
    models: [
      { model: '108', engine: '1.0L-1.2L', oil: '0W-30 / 5W-30', spec: 'PSA B71 2290', capacity: '3.0 - 3.5L' },
      { model: '208', engine: '1.2L PureTech / 1.5L BlueHDi', oil: '0W-30 / 5W-30', spec: 'PSA B71 2290 / 2312', capacity: '3.5 - 4.5L' },
      { model: '308', engine: '1.2L PureTech / 1.5L BlueHDi', oil: '0W-30 / 5W-30', spec: 'PSA B71 2290 / 2312', capacity: '3.5 - 5.0L' },
      { model: '408', engine: '1.2L PureTech / 1.6L Hybrid', oil: '0W-30 / 5W-30', spec: 'PSA B71 2290', capacity: '3.5 - 4.5L' },
      { model: '508', engine: '1.6L PureTech / 1.5-2.0L BlueHDi', oil: '0W-30 / 5W-30', spec: 'PSA B71 2290 / 2312', capacity: '4.0 - 5.5L' },
      { model: '2008', engine: '1.2L PureTech / 1.5L BlueHDi', oil: '0W-30 / 5W-30', spec: 'PSA B71 2290 / 2312', capacity: '3.5 - 4.5L' },
      { model: '3008', engine: '1.2L-1.6L PureTech / 1.5-2.0L BlueHDi', oil: '0W-30 / 5W-30', spec: 'PSA B71 2290 / 2312', capacity: '4.0 - 5.5L' },
      { model: '5008', engine: '1.2L-1.6L PureTech / 1.5-2.0L BlueHDi', oil: '0W-30 / 5W-30', spec: 'PSA B71 2290 / 2312', capacity: '4.0 - 5.5L' },
    ],
  },
  {
    brand: 'Porsche',
    models: [
      { model: '911', engine: '3.0L-3.8L Flat-6 Turbo', oil: '0W-40 / 5W-40', spec: 'Porsche A40', capacity: '8.5 - 9.5L' },
      { model: '718 Cayman', engine: '2.0L-2.5L Flat-4 Turbo / 4.0L Flat-6', oil: '0W-40 / 5W-40', spec: 'Porsche A40', capacity: '6.0 - 8.0L' },
      { model: '718 Boxster', engine: '2.0L-2.5L Flat-4 Turbo / 4.0L Flat-6', oil: '0W-40 / 5W-40', spec: 'Porsche A40', capacity: '6.0 - 8.0L' },
      { model: 'Cayenne', engine: '3.0L-4.0L V6/V8 Turbo', oil: '0W-40 / 5W-40', spec: 'Porsche A40', capacity: '8.0 - 9.5L' },
      { model: 'Macan', engine: '2.0L-2.9L Turbo', oil: '0W-40 / 5W-40', spec: 'Porsche A40', capacity: '6.0 - 7.5L' },
      { model: 'Panamera', engine: '2.9L-4.0L Turbo', oil: '0W-40 / 5W-40', spec: 'Porsche A40', capacity: '8.0 - 9.5L' },
      { model: 'Taycan', engine: 'Électrique', oil: 'N/A', spec: 'Huile réducteur Porsche', capacity: 'N/A' },
    ],
  },
  {
    brand: 'Ram',
    models: [
      { model: '1500', engine: '3.6L V6 / 5.7L V8 HEMI / 3.0L Diesel', oil: '5W-20 / 0W-20', spec: 'MS-6395 / MS-13340', capacity: '5.9 - 7.0L' },
      { model: '2500', engine: '6.4L HEMI V8 / 6.7L Cummins Diesel', oil: '5W-20 / 15W-40', spec: 'MS-6395 / CES 20081', capacity: '7.0 - 11.4L' },
      { model: '3500', engine: '6.4L HEMI V8 / 6.7L Cummins Diesel', oil: '5W-20 / 15W-40', spec: 'MS-6395 / CES 20081', capacity: '7.0 - 11.4L' },
    ],
  },
  {
    brand: 'Renault',
    models: [
      { model: 'Clio', engine: '1.0L TCe / 1.5L dCi', oil: '0W-30 / 5W-30', spec: 'RN0720 / RN17', capacity: '4.0 - 4.8L' },
      { model: 'Megane', engine: '1.3L TCe / 1.5L dCi', oil: '0W-30 / 5W-30', spec: 'RN0720 / RN17', capacity: '4.5 - 5.5L' },
      { model: 'Captur', engine: '1.0L-1.3L TCe / 1.5L dCi', oil: '0W-30 / 5W-30', spec: 'RN0720 / RN17', capacity: '4.0 - 5.0L' },
      { model: 'Kadjar', engine: '1.3L TCe / 1.5-1.7L dCi', oil: '0W-30 / 5W-30', spec: 'RN0720 / RN17', capacity: '4.5 - 5.5L' },
      { model: 'Arkana', engine: '1.3L TCe / 1.6L E-Tech', oil: '0W-30 / 5W-30', spec: 'RN0720 / RN17', capacity: '4.5 - 5.0L' },
      { model: 'Austral', engine: '1.2L TCe / 1.2L E-Tech', oil: '0W-30 / 5W-30', spec: 'RN17', capacity: '4.5 - 5.0L' },
      { model: 'Twingo', engine: '1.0L SCe / 0.9L TCe', oil: '5W-30 / 0W-30', spec: 'RN0720', capacity: '3.5 - 4.0L' },
      { model: 'Zoe', engine: 'Électrique', oil: 'N/A', spec: 'Huile réducteur Renault', capacity: 'N/A' },
    ],
  },
  {
    brand: 'Rolls-Royce',
    models: [
      { model: 'Ghost', engine: '6.75L V12 Turbo', oil: '0W-30 / 5W-30', spec: 'BMW LL-01', capacity: '9.0L' },
      { model: 'Phantom', engine: '6.75L V12 Turbo', oil: '0W-30 / 5W-30', spec: 'BMW LL-01', capacity: '9.0L' },
      { model: 'Wraith', engine: '6.6L V12 Turbo', oil: '0W-30 / 5W-30', spec: 'BMW LL-01', capacity: '9.0L' },
      { model: 'Cullinan', engine: '6.75L V12 Turbo', oil: '0W-30 / 5W-30', spec: 'BMW LL-01', capacity: '9.0L' },
    ],
  },
  {
    brand: 'Seat',
    models: [
      { model: 'Ibiza', engine: '1.0L-1.5L TSI', oil: '5W-30 / 0W-30', spec: 'VW 504.00 / 507.00', capacity: '3.8 - 4.5L' },
      { model: 'Leon', engine: '1.0L-2.0L TSI / 1.5-2.0L TDI', oil: '5W-30 / 0W-30', spec: 'VW 504.00 / 507.00', capacity: '4.5 - 5.5L' },
      { model: 'Arona', engine: '1.0L-1.5L TSI', oil: '5W-30 / 0W-30', spec: 'VW 504.00 / 507.00', capacity: '3.8 - 4.5L' },
      { model: 'Ateca', engine: '1.0L-2.0L TSI / 1.6-2.0L TDI', oil: '5W-30 / 0W-30', spec: 'VW 504.00 / 507.00', capacity: '4.5 - 5.7L' },
      { model: 'Tarraco', engine: '1.5L-2.0L TSI / 2.0L TDI', oil: '5W-30 / 0W-30', spec: 'VW 504.00 / 507.00', capacity: '4.5 - 5.7L' },
    ],
  },
  {
    brand: 'Skoda',
    models: [
      { model: 'Fabia', engine: '1.0L-1.5L TSI', oil: '5W-30 / 0W-30', spec: 'VW 504.00 / 507.00', capacity: '3.8 - 4.5L' },
      { model: 'Octavia', engine: '1.0L-2.0L TSI / 1.5-2.0L TDI', oil: '5W-30 / 0W-30', spec: 'VW 504.00 / 507.00', capacity: '4.5 - 5.7L' },
      { model: 'Superb', engine: '1.5L-2.0L TSI / 2.0L TDI', oil: '5W-30 / 0W-30', spec: 'VW 504.00 / 507.00', capacity: '5.0 - 5.7L' },
      { model: 'Kamiq', engine: '1.0L-1.5L TSI', oil: '5W-30 / 0W-30', spec: 'VW 504.00 / 507.00', capacity: '3.8 - 4.5L' },
      { model: 'Karoq', engine: '1.0L-2.0L TSI / 1.6-2.0L TDI', oil: '5W-30 / 0W-30', spec: 'VW 504.00 / 507.00', capacity: '4.5 - 5.7L' },
      { model: 'Kodiaq', engine: '1.5L-2.0L TSI / 2.0L TDI', oil: '5W-30 / 0W-30', spec: 'VW 504.00 / 507.00', capacity: '4.5 - 5.7L' },
    ],
  },
  {
    brand: 'Subaru',
    models: [
      { model: 'Impreza', engine: '1.6L-2.0L Boxer', oil: '0W-20', spec: 'API SP / ILSAC GF-6', capacity: '4.4L' },
      { model: 'WRX', engine: '2.4L Boxer Turbo', oil: '5W-30', spec: 'API SP', capacity: '5.0L' },
      { model: 'BRZ', engine: '2.4L Boxer', oil: '0W-20', spec: 'API SP', capacity: '5.0L' },
      { model: 'Forester', engine: '2.0L-2.5L Boxer / 2.0L Hybrid', oil: '0W-20', spec: 'API SP / ILSAC GF-6', capacity: '4.4 - 5.0L' },
      { model: 'Outback', engine: '2.4L-2.5L Boxer Turbo', oil: '0W-20 / 5W-30', spec: 'API SP', capacity: '4.4 - 5.0L' },
      { model: 'XV / Crosstrek', engine: '2.0L Boxer / 2.0L Hybrid', oil: '0W-20', spec: 'API SP / ILSAC GF-6', capacity: '4.4L' },
    ],
  },
  {
    brand: 'Suzuki',
    models: [
      { model: 'Swift', engine: '1.2L / 1.4L Boosterjet', oil: '0W-20 / 5W-30', spec: 'API SP / ILSAC GF-6', capacity: '3.3 - 3.8L' },
      { model: 'Vitara', engine: '1.4L Boosterjet / 1.5L Hybrid', oil: '0W-20 / 5W-30', spec: 'API SP', capacity: '3.8 - 4.5L' },
      { model: 'S-Cross', engine: '1.4L Boosterjet / 1.5L Hybrid', oil: '0W-20 / 5W-30', spec: 'API SP', capacity: '3.8 - 4.5L' },
      { model: 'Jimny', engine: '1.5L', oil: '5W-30', spec: 'API SP', capacity: '3.6L' },
    ],
  },
  {
    brand: 'Tesla',
    models: [
      { model: 'Model 3', engine: 'Électrique', oil: 'N/A', spec: 'Pas de vidange moteur', capacity: 'N/A' },
      { model: 'Model Y', engine: 'Électrique', oil: 'N/A', spec: 'Pas de vidange moteur', capacity: 'N/A' },
      { model: 'Model S', engine: 'Électrique', oil: 'N/A', spec: 'Pas de vidange moteur', capacity: 'N/A' },
      { model: 'Model X', engine: 'Électrique', oil: 'N/A', spec: 'Pas de vidange moteur', capacity: 'N/A' },
      { model: 'Cybertruck', engine: 'Électrique', oil: 'N/A', spec: 'Pas de vidange moteur', capacity: 'N/A' },
    ],
  },
  {
    brand: 'Toyota',
    models: [
      { model: 'Yaris', engine: '1.0L-1.5L / 1.5L Hybrid', oil: '0W-20 / 0W-16', spec: 'Toyota TGMO 0W-20', capacity: '3.5 - 4.0L' },
      { model: 'Corolla', engine: '1.2L Turbo / 1.8-2.0L Hybrid', oil: '0W-20 / 0W-16', spec: 'Toyota TGMO 0W-20', capacity: '4.0 - 4.5L' },
      { model: 'Camry', engine: '2.5L Hybrid', oil: '0W-20 / 0W-16', spec: 'Toyota TGMO 0W-20', capacity: '4.5 - 5.0L' },
      { model: 'RAV4', engine: '2.0L / 2.5L Hybrid', oil: '0W-20 / 0W-16', spec: 'Toyota TGMO 0W-20', capacity: '4.5 - 5.0L' },
      { model: 'C-HR', engine: '1.2L Turbo / 1.8-2.0L Hybrid', oil: '0W-20 / 0W-16', spec: 'Toyota TGMO 0W-20', capacity: '4.0 - 4.5L' },
      { model: 'Land Cruiser', engine: '3.3L V6 Diesel / 3.5L V6 Turbo', oil: '0W-30 / 5W-30', spec: 'ACEA C5 / JASO DL-1', capacity: '7.0 - 8.5L' },
      { model: 'Supra', engine: '2.0L-3.0L Turbo (BMW)', oil: '0W-30 / 5W-30', spec: 'BMW LL-01', capacity: '5.0 - 6.5L' },
      { model: 'GR86', engine: '2.4L Flat-4', oil: '0W-20', spec: 'API SP / ILSAC GF-6', capacity: '5.0L' },
    ],
  },
  {
    brand: 'Volkswagen',
    models: [
      { model: 'Golf', engine: '1.0L-2.0L Turbo', oil: '5W-30 / 0W-30', spec: 'VW 504.00 / 507.00', capacity: '4.5 - 5.5L' },
      { model: 'Polo', engine: '1.0L-1.5L Turbo', oil: '5W-30 / 0W-30', spec: 'VW 504.00 / 507.00', capacity: '3.8 - 4.5L' },
      { model: 'Passat', engine: '1.5L-2.0L Turbo', oil: '5W-30 / 0W-30', spec: 'VW 504.00 / 507.00', capacity: '5.0 - 5.7L' },
      { model: 'Tiguan', engine: '1.5L-2.0L Turbo', oil: '5W-30 / 0W-30', spec: 'VW 504.00 / 507.00', capacity: '4.5 - 5.7L' },
      { model: 'T-Roc', engine: '1.0L-2.0L Turbo', oil: '5W-30 / 0W-30', spec: 'VW 504.00 / 507.00', capacity: '4.5 - 5.5L' },
      { model: 'T-Cross', engine: '1.0L-1.5L Turbo', oil: '5W-30 / 0W-30', spec: 'VW 504.00 / 507.00', capacity: '3.8 - 4.5L' },
      { model: 'Touareg', engine: '3.0L V6 Turbo', oil: '5W-30 / 0W-30', spec: 'VW 504.00 / 507.00', capacity: '7.0 - 8.0L' },
      { model: 'Arteon', engine: '2.0L Turbo', oil: '5W-30 / 0W-30', spec: 'VW 504.00 / 507.00', capacity: '5.0 - 5.7L' },
      { model: 'ID.3', engine: 'Électrique', oil: 'N/A', spec: 'Huile réducteur VW', capacity: 'N/A' },
      { model: 'ID.4', engine: 'Électrique', oil: 'N/A', spec: 'Huile réducteur VW', capacity: 'N/A' },
      { model: 'Up', engine: '1.0L Atmo/Turbo', oil: '5W-30 / 0W-40', spec: 'VW 502.00 / 504.00', capacity: '3.0 - 3.5L' },
    ],
  },
  {
    brand: 'Volvo',
    models: [
      { model: 'XC40', engine: '1.5L-2.0L Turbo', oil: '0W-20 / 0W-30', spec: 'VCC RBS0-2AE', capacity: '5.0 - 5.9L' },
      { model: 'XC60', engine: '2.0L Turbo/Supercharged', oil: '0W-20 / 0W-30', spec: 'VCC RBS0-2AE', capacity: '5.4 - 5.9L' },
      { model: 'XC90', engine: '2.0L Turbo/Supercharged', oil: '0W-20 / 0W-30', spec: 'VCC RBS0-2AE', capacity: '5.4 - 5.9L' },
      { model: 'S60', engine: '2.0L Turbo', oil: '0W-20 / 0W-30', spec: 'VCC RBS0-2AE', capacity: '5.4 - 5.9L' },
      { model: 'S90', engine: '2.0L Turbo', oil: '0W-20 / 0W-30', spec: 'VCC RBS0-2AE', capacity: '5.4 - 5.9L' },
      { model: 'V60', engine: '2.0L Turbo', oil: '0W-20 / 0W-30', spec: 'VCC RBS0-2AE', capacity: '5.4 - 5.9L' },
      { model: 'V90', engine: '2.0L Turbo', oil: '0W-20 / 0W-30', spec: 'VCC RBS0-2AE', capacity: '5.4 - 5.9L' },
      { model: 'C40', engine: 'Électrique', oil: 'N/A', spec: 'Huile réducteur Volvo', capacity: 'N/A' },
      { model: 'EX30', engine: 'Électrique', oil: 'N/A', spec: 'Huile réducteur Volvo', capacity: 'N/A' },
    ],
  },
];

export function getOilForVehicle(brand: string, model: string): OilSpec | null {
  const brandData = oilDatabase.find(b => b.brand.toLowerCase() === brand.toLowerCase());
  if (!brandData) return null;
  return brandData.models.find(m => m.model.toLowerCase() === model.toLowerCase()) || null;
}

export function getBrandOilData(brand: string): BrandOilData | null {
  return oilDatabase.find(b => b.brand.toLowerCase() === brand.toLowerCase()) || null;
}
