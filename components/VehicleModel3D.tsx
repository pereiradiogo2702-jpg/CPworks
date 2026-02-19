'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, PerspectiveCamera, Html, useProgress } from '@react-three/drei';
import { Suspense, useState, useMemo, Component, ReactNode } from 'react';
import * as THREE from 'three';

// Error Boundary to catch model loading errors
class ModelErrorBoundary extends Component<
  { children: ReactNode; onError: () => void; brandName: string },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error('❌ Error loading 3D model:', this.props.brandName, error);
    this.props.onError();
  }

  render() {
    if (this.state.hasError) {
      // Afficher un message d'erreur au lieu de null
      return (
        <Html center>
          <div className="text-center bg-red-900/80 p-8 rounded-xl border border-red-500">
            <p className="text-white text-xl font-bold mb-2">⚠️ Erreur de chargement</p>
            <p className="text-white">Modèle 3D: {this.props.brandName}</p>
            <p className="text-gray-300 text-sm mt-2">Vérifiez la console pour plus de détails</p>
          </div>
        </Html>
      );
    }
    return this.props.children;
  }
}

interface Model3DProps {
  url: string;
  onError?: () => void;
  brandName: string;
}

// Component that loads and displays the 3D model with progress
function Model3D({ url, onError: _onError, brandName }: Model3DProps) {
  const { scene: originalScene } = useGLTF(url, true);

  // IMPORTANT: Clone ET transformer la scène dans useMemo pour garantir une seule exécution
  const scene = useMemo(() => {
    console.log('🚗 Cloning and transforming 3D model:', url, 'Brand:', brandName);

    // Clone la scène
    const clonedScene = originalScene.clone();

    // Déterminer la marque
    const isBMW = brandName === 'BMW';
    const isMercedes = brandName === 'Mercedes-Benz';
    const isAudi = brandName === 'Audi';
    const isVolkswagen = brandName === 'Volkswagen';
    const isPorsche = brandName === 'Porsche';
    const isPeugeot = brandName === 'Peugeot';
    const isRenault = brandName === 'Renault';
    const isCitroen = brandName === 'Citroën';
    const isFiat = brandName === 'Fiat';
    const isVolvo = brandName === 'Volvo';
    const isOpel = brandName === 'Opel';
    const isSeat = brandName === 'Seat';
    const isSkoda = brandName === 'Skoda';
    const isLandRover = brandName === 'Land Rover';
    const isJaguar = brandName === 'Jaguar';
    const isMini = brandName === 'Mini';
    const isAlfaRomeo = brandName === 'Alfa Romeo';
    const isToyota = brandName === 'Toyota';
    const isHonda = brandName === 'Honda';
    const isNissan = brandName === 'Nissan';
    const isMazda = brandName === 'Mazda';
    const isSubaru = brandName === 'Subaru';
    const isMitsubishi = brandName === 'Mitsubishi';
    const isSuzuki = brandName === 'Suzuki';
    const isLexus = brandName === 'Lexus';
    const isInfiniti = brandName === 'Infiniti';
    const isAcura = brandName === 'Acura';
    const isHyundai = brandName === 'Hyundai';
    const isKia = brandName === 'Kia';
    const isGenesis = brandName === 'Genesis';
    const isFord = brandName === 'Ford';
    const isChevrolet = brandName === 'Chevrolet';
    const isDodge = brandName === 'Dodge';
    const isJeep = brandName === 'Jeep';
    const isCadillac = brandName === 'Cadillac';
    const isTesla = brandName === 'Tesla';
    const isGMC = brandName === 'GMC';
    const isRam = brandName === 'Ram';
    const isChrysler = brandName === 'Chrysler';
    const isLincoln = brandName === 'Lincoln';
    const isRollsRoyce = brandName === 'Rolls-Royce';
    const isBentley = brandName === 'Bentley';
    const isMaserati = brandName === 'Maserati';
    const isLamborghini = brandName === 'Lamborghini';
    const isFerrari = brandName === 'Ferrari';
    const isAstonMartin = brandName === 'Aston Martin';
    const isMcLaren = brandName === 'McLaren';
    const isBugatti = brandName === 'Bugatti';

    // Center and scale the model - Performance optimisée + réflexions réduites
    clonedScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = false; // Désactivé pour performance
        mesh.receiveShadow = false; // Désactivé pour performance

        // Matériaux - Approche différente pour Mercedes
        if (mesh.material) {
          const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];

          materials.forEach((material: any) => {
            material.visible = true;
            material.side = THREE.DoubleSide;

            if (isMercedes) {
              // Mercedes: meilleure qualité visuelle
              if (material.map) {
                material.map.anisotropy = 4; // Meilleure qualité
                material.map.colorSpace = THREE.SRGBColorSpace;
              }
              // Normal maps réactivées
              if (material.normalMap) {
                material.normalMap.anisotropy = 4;
              }
              // Émission réduite
              if (material.emissive && material.emissive.getHex() !== 0x000000) {
                material.emissiveIntensity = Math.max(material.emissiveIntensity || 0, 0.5);
              }
              // Réduire réflexions
              material.envMapIntensity = 0.2;
            } else if (isVolkswagen) {
              // Volkswagen: préserver les couleurs d'origine
              if (material.map) {
                material.map.anisotropy = 4;
                material.map.colorSpace = THREE.SRGBColorSpace;
              }
              if (material.normalMap) {
                material.normalMap.anisotropy = 4;
              }
              // Ne pas forcer de couleur, garder l'original
              material.envMapIntensity = 0.3;
              material.metalness = material.metalness || 0.5;
              material.roughness = material.roughness || 0.5;
            } else if (isOpel) {
              // Opel: préserver les couleurs d'origine
              if (material.map) {
                material.map.anisotropy = 4;
                material.map.colorSpace = THREE.SRGBColorSpace;
              }
              if (material.normalMap) {
                material.normalMap.anisotropy = 4;
              }
              material.envMapIntensity = 0.3;
              material.metalness = material.metalness || 0.5;
              material.roughness = material.roughness || 0.5;
            } else if (isSeat) {
              // Seat: préserver les couleurs d'origine
              if (material.map) {
                material.map.anisotropy = 4;
                material.map.colorSpace = THREE.SRGBColorSpace;
              }
              if (material.normalMap) {
                material.normalMap.anisotropy = 4;
              }
              material.envMapIntensity = 0.3;
              material.metalness = material.metalness || 0.5;
              material.roughness = material.roughness || 0.5;
            } else if (isSkoda) {
              // Skoda: préserver les couleurs d'origine
              if (material.map) {
                material.map.anisotropy = 4;
                material.map.colorSpace = THREE.SRGBColorSpace;
              }
              if (material.normalMap) {
                material.normalMap.anisotropy = 4;
              }
              material.envMapIntensity = 0.3;
              material.metalness = material.metalness || 0.5;
              material.roughness = material.roughness || 0.5;
            } else if (isLandRover) {
              // Land Rover: préserver les couleurs d'origine
              if (material.map) {
                material.map.anisotropy = 4;
                material.map.colorSpace = THREE.SRGBColorSpace;
              }
              if (material.normalMap) {
                material.normalMap.anisotropy = 4;
              }
              material.envMapIntensity = 0.3;
              material.metalness = material.metalness || 0.5;
              material.roughness = material.roughness || 0.5;
            } else if (isJaguar) {
              // Jaguar: préserver les couleurs d'origine
              if (material.map) {
                material.map.anisotropy = 4;
                material.map.colorSpace = THREE.SRGBColorSpace;
              }
              if (material.normalMap) {
                material.normalMap.anisotropy = 4;
              }
              material.envMapIntensity = 0.3;
              material.metalness = material.metalness || 0.5;
              material.roughness = material.roughness || 0.5;
            } else if (isMini) {
              // Mini: préserver les couleurs d'origine
              if (material.map) {
                material.map.anisotropy = 4;
                material.map.colorSpace = THREE.SRGBColorSpace;
              }
              if (material.normalMap) {
                material.normalMap.anisotropy = 4;
              }
              material.envMapIntensity = 0.3;
              material.metalness = material.metalness || 0.5;
              material.roughness = material.roughness || 0.5;
            } else if (isAlfaRomeo) {
              // Alfa Romeo: préserver les couleurs d'origine
              if (material.map) {
                material.map.anisotropy = 4;
                material.map.colorSpace = THREE.SRGBColorSpace;
              }
              if (material.normalMap) {
                material.normalMap.anisotropy = 4;
              }
              material.envMapIntensity = 0.3;
              material.metalness = material.metalness || 0.5;
              material.roughness = material.roughness || 0.5;
            } else if (isToyota) {
              // Toyota: préserver les couleurs d'origine
              if (material.map) {
                material.map.anisotropy = 4;
                material.map.colorSpace = THREE.SRGBColorSpace;
              }
              if (material.normalMap) {
                material.normalMap.anisotropy = 4;
              }
              material.envMapIntensity = 0.3;
              material.metalness = material.metalness || 0.5;
              material.roughness = material.roughness || 0.5;
            } else if (isHonda) {
              // Honda: préserver les couleurs d'origine
              if (material.map) {
                material.map.anisotropy = 4;
                material.map.colorSpace = THREE.SRGBColorSpace;
              }
              if (material.normalMap) {
                material.normalMap.anisotropy = 4;
              }
              material.envMapIntensity = 0.3;
              material.metalness = material.metalness || 0.5;
              material.roughness = material.roughness || 0.5;
            } else if (isNissan) {
              // Nissan: préserver les couleurs d'origine
              if (material.map) {
                material.map.anisotropy = 4;
                material.map.colorSpace = THREE.SRGBColorSpace;
              }
              if (material.normalMap) {
                material.normalMap.anisotropy = 4;
              }
              material.envMapIntensity = 0.3;
              material.metalness = material.metalness || 0.5;
              material.roughness = material.roughness || 0.5;
            } else if (isMazda) {
              // Mazda: préserver les couleurs d'origine
              if (material.map) {
                material.map.anisotropy = 4;
                material.map.colorSpace = THREE.SRGBColorSpace;
              }
              if (material.normalMap) {
                material.normalMap.anisotropy = 4;
              }
              material.envMapIntensity = 0.3;
              material.metalness = material.metalness || 0.5;
              material.roughness = material.roughness || 0.5;
            } else if (isSubaru) {
              // Subaru: préserver les couleurs d'origine
              if (material.map) {
                material.map.anisotropy = 4;
                material.map.colorSpace = THREE.SRGBColorSpace;
              }
              if (material.normalMap) {
                material.normalMap.anisotropy = 4;
              }
              material.envMapIntensity = 0.3;
              material.metalness = material.metalness || 0.5;
              material.roughness = material.roughness || 0.5;
            } else if (isMitsubishi) {
              // Mitsubishi: préserver les couleurs d'origine
              if (material.map) {
                material.map.anisotropy = 4;
                material.map.colorSpace = THREE.SRGBColorSpace;
              }
              if (material.normalMap) {
                material.normalMap.anisotropy = 4;
              }
              material.envMapIntensity = 0.3;
              material.metalness = material.metalness || 0.5;
              material.roughness = material.roughness || 0.5;
            } else if (isSuzuki) {
              // Suzuki: préserver les couleurs d'origine
              if (material.map) {
                material.map.anisotropy = 4;
                material.map.colorSpace = THREE.SRGBColorSpace;
              }
              if (material.normalMap) {
                material.normalMap.anisotropy = 4;
              }
              material.envMapIntensity = 0.3;
              material.metalness = material.metalness || 0.5;
              material.roughness = material.roughness || 0.5;
            } else if (isLexus) {
              // Lexus: préserver les couleurs d'origine
              if (material.map) {
                material.map.anisotropy = 4;
                material.map.colorSpace = THREE.SRGBColorSpace;
              }
              if (material.normalMap) {
                material.normalMap.anisotropy = 4;
              }
              material.envMapIntensity = 0.3;
              material.metalness = material.metalness || 0.5;
              material.roughness = material.roughness || 0.5;
            } else if (isInfiniti) {
              // Infiniti: préserver les couleurs d'origine
              if (material.map) {
                material.map.anisotropy = 4;
                material.map.colorSpace = THREE.SRGBColorSpace;
              }
              if (material.normalMap) {
                material.normalMap.anisotropy = 4;
              }
              material.envMapIntensity = 0.3;
              material.metalness = material.metalness || 0.5;
              material.roughness = material.roughness || 0.5;
            } else if (isAcura) {
              // Acura: préserver les couleurs d'origine
              if (material.map) {
                material.map.anisotropy = 4;
                material.map.colorSpace = THREE.SRGBColorSpace;
              }
              if (material.normalMap) {
                material.normalMap.anisotropy = 4;
              }
              material.envMapIntensity = 0.3;
              material.metalness = material.metalness || 0.5;
              material.roughness = material.roughness || 0.5;
            } else if (isHyundai) {
              // Hyundai: préserver les couleurs d'origine
              if (material.map) {
                material.map.anisotropy = 4;
                material.map.colorSpace = THREE.SRGBColorSpace;
              }
              if (material.normalMap) {
                material.normalMap.anisotropy = 4;
              }
              material.envMapIntensity = 0.3;
              material.metalness = material.metalness || 0.5;
              material.roughness = material.roughness || 0.5;
            } else if (isKia) {
              // Kia: préserver les couleurs d'origine
              if (material.map) {
                material.map.anisotropy = 4;
                material.map.colorSpace = THREE.SRGBColorSpace;
              }
              if (material.normalMap) {
                material.normalMap.anisotropy = 4;
              }
              material.envMapIntensity = 0.3;
              material.metalness = material.metalness || 0.5;
              material.roughness = material.roughness || 0.5;
            } else if (isGenesis) {
              // Genesis: préserver les couleurs d'origine
              if (material.map) {
                material.map.anisotropy = 4;
                material.map.colorSpace = THREE.SRGBColorSpace;
              }
              if (material.normalMap) {
                material.normalMap.anisotropy = 4;
              }
              material.envMapIntensity = 0.3;
              material.metalness = material.metalness || 0.5;
              material.roughness = material.roughness || 0.5;
            } else if (isFord) {
              // Ford: préserver les couleurs d'origine
              if (material.map) {
                material.map.anisotropy = 4;
                material.map.colorSpace = THREE.SRGBColorSpace;
              }
              if (material.normalMap) {
                material.normalMap.anisotropy = 4;
              }
              material.envMapIntensity = 0.3;
              material.metalness = material.metalness || 0.5;
              material.roughness = material.roughness || 0.5;
            } else if (isChevrolet) {
              // Chevrolet: préserver les couleurs d'origine
              if (material.map) {
                material.map.anisotropy = 4;
                material.map.colorSpace = THREE.SRGBColorSpace;
              }
              if (material.normalMap) {
                material.normalMap.anisotropy = 4;
              }
              material.envMapIntensity = 0.3;
              material.metalness = material.metalness || 0.5;
              material.roughness = material.roughness || 0.5;
            } else if (isDodge) {
              // Dodge: préserver les couleurs d'origine
              if (material.map) {
                material.map.anisotropy = 4;
                material.map.colorSpace = THREE.SRGBColorSpace;
              }
              if (material.normalMap) {
                material.normalMap.anisotropy = 4;
              }
              material.envMapIntensity = 0.3;
              material.metalness = material.metalness || 0.5;
              material.roughness = material.roughness || 0.5;
            } else if (isJeep) {
              // Jeep: préserver les couleurs d'origine
              if (material.map) {
                material.map.anisotropy = 4;
                material.map.colorSpace = THREE.SRGBColorSpace;
              }
              if (material.normalMap) {
                material.normalMap.anisotropy = 4;
              }
              material.envMapIntensity = 0.3;
              material.metalness = material.metalness || 0.5;
              material.roughness = material.roughness || 0.5;
            } else if (isCadillac) {
              // Cadillac: préserver les couleurs d'origine
              if (material.map) {
                material.map.anisotropy = 4;
                material.map.colorSpace = THREE.SRGBColorSpace;
              }
              if (material.normalMap) {
                material.normalMap.anisotropy = 4;
              }
              material.envMapIntensity = 0.3;
              material.metalness = material.metalness || 0.5;
              material.roughness = material.roughness || 0.5;
            } else if (isTesla) {
              // Tesla: préserver les couleurs d'origine
              if (material.map) {
                material.map.anisotropy = 4;
                material.map.colorSpace = THREE.SRGBColorSpace;
              }
              if (material.normalMap) {
                material.normalMap.anisotropy = 4;
              }
              material.envMapIntensity = 0.3;
              material.metalness = material.metalness || 0.5;
              material.roughness = material.roughness || 0.5;
            } else if (isGMC) {
              // GMC: préserver les couleurs d'origine
              if (material.map) {
                material.map.anisotropy = 4;
                material.map.colorSpace = THREE.SRGBColorSpace;
              }
              if (material.normalMap) {
                material.normalMap.anisotropy = 4;
              }
              material.envMapIntensity = 0.3;
              material.metalness = material.metalness || 0.5;
              material.roughness = material.roughness || 0.5;
            } else if (isRam) {
              // Ram: préserver les couleurs d'origine
              if (material.map) {
                material.map.anisotropy = 4;
                material.map.colorSpace = THREE.SRGBColorSpace;
              }
              if (material.normalMap) {
                material.normalMap.anisotropy = 4;
              }
              material.envMapIntensity = 0.3;
              material.metalness = material.metalness || 0.5;
              material.roughness = material.roughness || 0.5;
            } else if (isLincoln) {
              // Lincoln: préserver les couleurs d'origine
              if (material.map) {
                material.map.anisotropy = 4;
                material.map.colorSpace = THREE.SRGBColorSpace;
              }
              if (material.normalMap) {
                material.normalMap.anisotropy = 4;
              }
              material.envMapIntensity = 0.3;
              material.metalness = material.metalness || 0.5;
              material.roughness = material.roughness || 0.5;
            } else if (isRollsRoyce) {
              // Rolls-Royce: préserver les couleurs d'origine
              if (material.map) {
                material.map.anisotropy = 4;
                material.map.colorSpace = THREE.SRGBColorSpace;
              }
              if (material.normalMap) {
                material.normalMap.anisotropy = 4;
              }
              material.envMapIntensity = 0.3;
              material.metalness = material.metalness || 0.5;
              material.roughness = material.roughness || 0.5;
            } else if (isBentley) {
              // Bentley: préserver les couleurs d'origine
              if (material.map) {
                material.map.anisotropy = 4;
                material.map.colorSpace = THREE.SRGBColorSpace;
              }
              if (material.normalMap) {
                material.normalMap.anisotropy = 4;
              }
              material.envMapIntensity = 0.3;
              material.metalness = material.metalness || 0.5;
              material.roughness = material.roughness || 0.5;
            } else if (isMaserati) {
              // Maserati: préserver les couleurs d'origine
              if (material.map) {
                material.map.anisotropy = 4;
                material.map.colorSpace = THREE.SRGBColorSpace;
              }
              if (material.normalMap) {
                material.normalMap.anisotropy = 4;
              }
              material.envMapIntensity = 0.3;
              material.metalness = material.metalness || 0.5;
              material.roughness = material.roughness || 0.5;
            } else if (isLamborghini) {
              // Lamborghini: préserver les couleurs d'origine
              if (material.map) {
                material.map.anisotropy = 4;
                material.map.colorSpace = THREE.SRGBColorSpace;
              }
              if (material.normalMap) {
                material.normalMap.anisotropy = 4;
              }
              material.envMapIntensity = 0.3;
              material.metalness = material.metalness || 0.5;
              material.roughness = material.roughness || 0.5;
            } else if (isFerrari) {
              // Ferrari: préserver les couleurs d'origine
              if (material.map) {
                material.map.anisotropy = 4;
                material.map.colorSpace = THREE.SRGBColorSpace;
              }
              if (material.normalMap) {
                material.normalMap.anisotropy = 4;
              }
              material.envMapIntensity = 0.3;
              material.metalness = material.metalness || 0.5;
              material.roughness = material.roughness || 0.5;
            } else if (isAstonMartin) {
              // Aston Martin: préserver les couleurs d'origine
              if (material.map) {
                material.map.anisotropy = 4;
                material.map.colorSpace = THREE.SRGBColorSpace;
              }
              if (material.normalMap) {
                material.normalMap.anisotropy = 4;
              }
              material.envMapIntensity = 0.3;
              material.metalness = material.metalness || 0.5;
              material.roughness = material.roughness || 0.5;
            } else if (isMcLaren) {
              // McLaren: préserver les couleurs d'origine
              if (material.map) {
                material.map.anisotropy = 4;
                material.map.colorSpace = THREE.SRGBColorSpace;
              }
              if (material.normalMap) {
                material.normalMap.anisotropy = 4;
              }
              material.envMapIntensity = 0.3;
              material.metalness = material.metalness || 0.5;
              material.roughness = material.roughness || 0.5;
            } else if (isBugatti) {
              // Bugatti: préserver les couleurs d'origine
              if (material.map) {
                material.map.anisotropy = 4;
                material.map.colorSpace = THREE.SRGBColorSpace;
              }
              if (material.normalMap) {
                material.normalMap.anisotropy = 4;
              }
              material.envMapIntensity = 0.3;
              material.metalness = material.metalness || 0.5;
              material.roughness = material.roughness || 0.5;
            } else if (isChrysler) {
              // Chrysler: préserver les couleurs d'origine
              if (material.map) {
                material.map.anisotropy = 4;
                material.map.colorSpace = THREE.SRGBColorSpace;
              }
              if (material.normalMap) {
                material.normalMap.anisotropy = 4;
              }
              material.envMapIntensity = 0.3;
              material.metalness = material.metalness || 0.5;
              material.roughness = material.roughness || 0.5;
            } else if (isVolvo) {
              // Volvo: préserver les couleurs d'origine
              if (material.map) {
                material.map.anisotropy = 4;
                material.map.colorSpace = THREE.SRGBColorSpace;
              }
              if (material.normalMap) {
                material.normalMap.anisotropy = 4;
              }
              material.envMapIntensity = 0.3;
              material.metalness = material.metalness || 0.5;
              material.roughness = material.roughness || 0.5;
            } else if (isFiat) {
              // Fiat: préserver les couleurs d'origine
              if (material.map) {
                material.map.anisotropy = 4;
                material.map.colorSpace = THREE.SRGBColorSpace;
              }
              if (material.normalMap) {
                material.normalMap.anisotropy = 4;
              }
              material.envMapIntensity = 0.3;
              material.metalness = material.metalness || 0.5;
              material.roughness = material.roughness || 0.5;
            } else if (isCitroen) {
              // Citroën: préserver les couleurs d'origine
              if (material.map) {
                material.map.anisotropy = 4;
                material.map.colorSpace = THREE.SRGBColorSpace;
              }
              if (material.normalMap) {
                material.normalMap.anisotropy = 4;
              }
              material.envMapIntensity = 0.3;
              material.metalness = material.metalness || 0.5;
              material.roughness = material.roughness || 0.5;
            } else if (isRenault) {
              // Renault: préserver les couleurs d'origine
              if (material.map) {
                material.map.anisotropy = 4;
                material.map.colorSpace = THREE.SRGBColorSpace;
              }
              if (material.normalMap) {
                material.normalMap.anisotropy = 4;
              }
              // Garder les couleurs originales du modèle
              material.envMapIntensity = 0.3;
              material.metalness = material.metalness || 0.5;
              material.roughness = material.roughness || 0.5;
            } else if (isAudi) {
              // Audi: meilleure qualité visuelle
              material.transparent = false;
              material.opacity = 1.0;

              // Force white color if black
              if (!material.color || material.color.getHex() === 0x000000) {
                material.color = new THREE.Color(0xffffff);
              }

              if (material.emissive) {
                material.emissive = new THREE.Color(0x222222);
                material.emissiveIntensity = 0.2;
              }

              if (material.map) {
                material.map.anisotropy = 4; // Meilleure qualité
                material.map.colorSpace = THREE.SRGBColorSpace;
              }
              if (material.normalMap) {
                material.normalMap.anisotropy = 4; // Meilleure qualité
              }

              material.envMapIntensity = 0;
              material.metalness = Math.min(material.metalness || 0, 0.3);
              material.roughness = Math.max(material.roughness || 0, 0.7);
            } else {
              // Autres marques: meilleure qualité visuelle
              material.transparent = false;
              material.opacity = 1.0;
              // Autres marques: approche simplifiée
              if (!material.color || material.color.getHex() === 0x000000) {
                material.color = new THREE.Color(0xffffff);
              }

              if (material.emissive) {
                material.emissive = new THREE.Color(0x222222);
                material.emissiveIntensity = 0.2;
              }

              if (material.map) {
                material.map.anisotropy = 4; // Meilleure qualité
                material.map.colorSpace = THREE.SRGBColorSpace;
              }
              if (material.normalMap) {
                material.normalMap.anisotropy = 4; // Meilleure qualité
              }

              material.envMapIntensity = 0;
              material.metalness = Math.min(material.metalness || 0, 0.3);
              material.roughness = Math.max(material.roughness || 0, 0.7);
            }

            material.depthTest = true;
            material.depthWrite = true;
            material.needsUpdate = true;
          });
        }
      }
    });

    // Pour Renault: vitres en noir/gris foncé
    if (isRenault) {
      clonedScene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          const meshNameLower = mesh.name.toLowerCase();
          const isGlass = meshNameLower.includes('glass') || meshNameLower.includes('window') ||
                          meshNameLower.includes('windshield') || meshNameLower.includes('vitre') ||
                          meshNameLower.includes('light') || meshNameLower.includes('lihgt');
          if (isGlass) {
            const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
            materials.forEach((mat: any) => {
              mat.color = new THREE.Color(0x1a1a1a); // Noir/gris très foncé
              mat.transparent = true;
              mat.opacity = 0.85;
              mat.needsUpdate = true;
            });
          }
        }
      });
    }

    // Pour Peugeot: supprimer le plateau/sol sous la voiture
    if (isPeugeot) {
      clonedScene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          const meshBox = new THREE.Box3().setFromObject(mesh);
          const meshSize = meshBox.getSize(new THREE.Vector3());
          // Détecter un plateau: hauteur Y très petite par rapport à X et Z
          const isFlatPlate = meshSize.y < 0.05 * Math.max(meshSize.x, meshSize.z);
          if (isFlatPlate) {
            mesh.visible = false;
            console.log('🗑️ Plateau supprimé:', mesh.name, meshSize);
          }
        }
      });
    }

    // Calculate bounding box to center the model
    const box = new THREE.Box3().setFromObject(clonedScene);
    const center = box.getCenter(new THREE.Vector3());
    clonedScene.position.sub(center);

    // Ajuster la position Y pour chaque marque
    if (isVolkswagen) {
      clonedScene.position.y += 1.0; // Monter la Golf GTI en Y (descendu un peu)
    } else if (isAudi) {
      clonedScene.position.y += 0.8; // Monter l'Audi en Y
    } else if (isBMW || isMercedes) {
      clonedScene.position.y += 3.0; // Monter BMW/Mercedes beaucoup plus haut
    } else if (isPorsche) {
      clonedScene.position.y -= 0.8; // Porsche - position validée
    } else if (isPeugeot) {
      clonedScene.position.y += 4.0; // Peugeot 3008 - position validée
    } else if (isRenault) {
      clonedScene.position.y += 0.8; // Renault - position initiale
    } else if (isCitroen) {
      clonedScene.position.y += 0.8; // Citroën - position initiale
    } else if (isFiat) {
      clonedScene.position.y += 0.8; // Fiat - position initiale
    } else if (isVolvo) {
      clonedScene.position.y += 0.8; // Volvo - position initiale
    } else if (isOpel) {
      clonedScene.position.y += 0.8; // Opel - position initiale
    } else if (isSeat) {
      clonedScene.position.y += 0.8; // Seat - position initiale
    } else if (isSkoda) {
      clonedScene.position.y += 0.8; // Skoda - position initiale
    } else if (isLandRover) {
      clonedScene.position.y += 0.8; // Land Rover - position initiale
    } else if (isJaguar) {
      clonedScene.position.y += 0.8; // Jaguar - position initiale
    } else if (isMini) {
      clonedScene.position.y += 0.0; // Mini - position abaissée
    } else if (isAlfaRomeo) {
      clonedScene.position.y += 0.8; // Alfa Romeo - position initiale
    } else if (isToyota) {
      clonedScene.position.y += 7.0; // Toyota - montée en Y
    } else if (isHonda) {
      clonedScene.position.y += 0.8; // Honda - position initiale
    } else if (isNissan) {
      clonedScene.position.y += 0.8; // Nissan - position initiale
    } else if (isMazda) {
      clonedScene.position.y += 0.0; // Mazda - descendu
    } else if (isSubaru) {
      clonedScene.position.y += 0.0; // Subaru - descendu
    } else if (isMitsubishi) {
      clonedScene.position.y += 0.0; // Mitsubishi - descendu
    } else if (isSuzuki) {
      clonedScene.position.y += 0.8; // Suzuki
    } else if (isLexus) {
      clonedScene.position.y += 0.8; // Lexus
    } else if (isInfiniti) {
      clonedScene.position.y += 0.8; // Infiniti
    } else if (isAcura) {
      clonedScene.position.y += 0.8; // Acura
    } else if (isHyundai) {
      clonedScene.position.y += 0.8; // Hyundai
    } else if (isKia) {
      clonedScene.position.y += 0.0; // Kia
    } else if (isGenesis) {
      clonedScene.position.y += 0.8; // Genesis
    } else if (isFord) {
      clonedScene.position.y += 0.0; // Ford
    } else if (isChevrolet) {
      clonedScene.position.y += 0.8; // Chevrolet
    } else if (isDodge) {
      clonedScene.position.y += 0.8; // Dodge
    } else if (isJeep) {
      clonedScene.position.y += 0.8; // Jeep
    } else if (isCadillac) {
      clonedScene.position.y += 0.8; // Cadillac
    } else if (isTesla) {
      clonedScene.position.y += 0.8; // Tesla
    } else if (isGMC) {
      clonedScene.position.y += 0.8; // GMC
    } else if (isRam) {
      clonedScene.position.y += 0.8; // Ram
    } else if (isChrysler) {
      clonedScene.position.y += 4.5; // Chrysler
    } else if (isLincoln) {
      clonedScene.position.y += 0.8; // Lincoln
    } else if (isRollsRoyce) {
      clonedScene.position.y += 0.8; // Rolls-Royce
    } else if (isBentley) {
      clonedScene.position.y += 0.0; // Bentley
    } else if (isMaserati) {
      clonedScene.position.y += 0.8; // Maserati
    } else if (isLamborghini) {
      clonedScene.position.y += 0.8; // Lamborghini
    } else if (isFerrari) {
      clonedScene.position.y += 0.8; // Ferrari
    } else if (isAstonMartin) {
      clonedScene.position.y += 0.8; // Aston Martin
    } else if (isMcLaren) {
      clonedScene.position.y += 0.8; // McLaren
    } else if (isBugatti) {
      clonedScene.position.y += 0.8; // Bugatti
    }

    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);

    // Calcul de l'échelle - Modèles plus gros pour meilleure visibilité
    let scale = isAudi ? 5.5 / maxDim : (isVolkswagen ? 12.0 / maxDim : (isBMW || isMercedes ? 7.0 / maxDim : (isPorsche ? 6.0 / maxDim : (isPeugeot ? 6.0 / maxDim : (isRenault ? 6.0 / maxDim : (isCitroen ? 6.0 / maxDim : (isFiat ? 6.0 / maxDim : (isVolvo ? 6.0 / maxDim : (isOpel ? 6.0 / maxDim : (isSeat ? 6.0 / maxDim : (isSkoda ? 6.0 / maxDim : (isLandRover ? 6.0 / maxDim : (isJaguar ? 6.0 / maxDim : (isMini ? 6.0 / maxDim : (isAlfaRomeo ? 6.0 / maxDim : (isToyota ? 6.0 / maxDim : (isHonda ? 6.0 / maxDim : (isNissan ? 6.0 / maxDim : (isMazda ? 6.0 / maxDim : (isSubaru ? 6.0 / maxDim : (isMitsubishi ? 6.0 / maxDim : (isSuzuki ? 6.0 / maxDim : (isLexus ? 6.0 / maxDim : (isInfiniti ? 6.0 / maxDim : (isAcura ? 6.0 / maxDim : (isHyundai ? 6.0 / maxDim : (isKia ? 6.0 / maxDim : (isGenesis ? 5.0 / maxDim : (isFord ? 6.0 / maxDim : (isChevrolet ? 6.0 / maxDim : (isDodge ? 6.0 / maxDim : (isJeep ? 6.0 / maxDim : (isCadillac ? 6.0 / maxDim : (isTesla ? 6.0 / maxDim : (isGMC ? 6.0 / maxDim : (isRam ? 6.0 / maxDim : (isChrysler ? 6.0 / maxDim : (isLincoln ? 6.0 / maxDim : (isRollsRoyce ? 6.0 / maxDim : (isBentley ? 6.0 / maxDim : (isMaserati ? 6.0 / maxDim : (isLamborghini ? 6.0 / maxDim : (isFerrari ? 6.0 / maxDim : (isAstonMartin ? 6.0 / maxDim : (isMcLaren ? 6.0 / maxDim : (isBugatti ? 6.0 / maxDim : 3.0 / maxDim))))))))))))))))))))))))))))))))))))))))))))));

    console.log('📏 Model dimensions:', {
      url,
      brandName,
      size: { x: size.x, y: size.y, z: size.z },
      maxDim,
      finalScale: scale,
      center: { x: center.x, y: center.y, z: center.z }
    });

    clonedScene.scale.setScalar(scale);

    // Force scene visibility
    clonedScene.visible = true;

    return clonedScene;
  }, [originalScene, brandName, url]); // Recalculer uniquement si originalScene, brandName ou url change

  return <primitive object={scene} />;
}

// Loading component with progress
function LoadingSpinner() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-500"></div>
        <p className="text-purple-400 mt-4 text-sm font-semibold">
          Chargement du modèle 3D... {Math.round(progress)}%
        </p>
        {/* Progress bar */}
        <div className="w-48 h-2 bg-gray-700 rounded-full mt-2 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-purple-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </Html>
  );
}

// Error fallback component
function ErrorFallback({ brandName }: { brandName: string }) {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-black rounded-xl">
      <div className="text-center p-8">
        <div className="text-6xl mb-4">🚗</div>
        <h3 className="text-white text-xl font-bold mb-2">{brandName}</h3>
        <p className="text-gray-400 text-sm">Mod\u00e8le 3D non disponible</p>
      </div>
    </div>
  );
}

interface VehicleModel3DProps {
  modelPath: string;
  brandName: string;
  autoRotate?: boolean;
  height?: string;
}

export default function VehicleModel3D({
  modelPath,
  brandName,
  autoRotate = true,
  height = '500px'
}: VehicleModel3DProps) {
  const [error, setError] = useState(false);

  // Position de caméra spécifique par marque
  const getCameraPosition = (): [number, number, number] => {
    if (brandName === 'Audi') {
      return [4, 3, 4]; // Audi - Caméra éloignée
    } else if (brandName === 'BMW' || brandName === 'Mercedes-Benz') {
      return [5, 3.5, 5]; // BMW et Mercedes - Caméra rapprochée
    } else if (brandName === 'Volkswagen') {
      return [7.5, 5.6, 7.5]; // Volkswagen - Caméra encore plus éloignée
    } else if (brandName === 'Porsche') {
      return [5, 3.5, 5]; // Porsche - Caméra similaire BMW
    } else if (brandName === 'Peugeot') {
      return [3.5, 2.5, 3.5]; // Peugeot - Caméra rapprochée
    } else if (brandName === 'Renault') {
      return [5, 3.5, 5]; // Renault - Caméra éloignée
    } else if (brandName === 'Citroën') {
      return [5, 3.5, 5]; // Citroën - Caméra initiale
    } else if (brandName === 'Fiat') {
      return [5, 3.5, 5]; // Fiat - Caméra initiale
    } else if (brandName === 'Volvo') {
      return [5, 3.5, 5]; // Volvo - Caméra initiale
    } else if (brandName === 'Opel') {
      return [5, 3.5, 5]; // Opel - Caméra initiale
    } else if (brandName === 'Seat') {
      return [5, 3.5, 5]; // Seat - Caméra initiale
    } else if (brandName === 'Skoda') {
      return [5, 3.5, 5]; // Skoda - Caméra initiale
    } else if (brandName === 'Land Rover') {
      return [5, 3.5, 5]; // Land Rover - Caméra initiale
    } else if (brandName === 'Jaguar') {
      return [5, 3.5, 5]; // Jaguar - Caméra initiale
    } else if (brandName === 'Mini') {
      return [5, 3.5, 5]; // Mini - Caméra initiale
    } else if (brandName === 'Alfa Romeo') {
      return [5, 3.5, 5]; // Alfa Romeo - Caméra initiale
    } else if (brandName === 'Toyota') {
      return [5, 3.5, 5]; // Toyota - Caméra initiale
    } else if (brandName === 'Honda') {
      return [5, 3.5, 5]; // Honda - Caméra initiale
    } else if (brandName === 'Nissan') {
      return [5, 3.5, 5]; // Nissan - Caméra initiale
    } else if (brandName === 'Mazda') {
      return [5, 3.5, 5]; // Mazda - Caméra initiale
    } else if (brandName === 'Subaru') {
      return [5, 3.5, 5]; // Subaru - Caméra initiale
    } else if (brandName === 'Mitsubishi') {
      return [5, 3.5, 5]; // Mitsubishi - Caméra initiale
    } else if (brandName === 'Suzuki') {
      return [5, 3.5, 5]; // Suzuki - Caméra initiale
    } else if (brandName === 'Lexus') {
      return [5, 3.5, 5]; // Lexus - Caméra initiale
    } else if (brandName === 'Infiniti') {
      return [5, 3.5, 5]; // Infiniti - Caméra initiale
    } else if (brandName === 'Acura') {
      return [5, 3.5, 5]; // Acura - Caméra initiale
    } else if (brandName === 'Hyundai') {
      return [5, 3.5, 5]; // Hyundai - Caméra initiale
    } else if (brandName === 'Kia') {
      return [5, 3.5, 5]; // Kia - Caméra initiale
    } else if (brandName === 'Genesis') {
      return [5, 3.5, 5]; // Genesis - Caméra initiale
    } else if (brandName === 'Ford') {
      return [5, 3.5, 5]; // Ford - Caméra initiale
    } else if (brandName === 'Chevrolet') {
      return [5, 3.5, 5]; // Chevrolet - Caméra initiale
    } else if (brandName === 'Dodge') {
      return [5, 3.5, 5]; // Dodge - Caméra initiale
    } else if (brandName === 'Jeep') {
      return [5, 3.5, 5]; // Jeep - Caméra initiale
    } else if (brandName === 'Cadillac') {
      return [5, 3.5, 5]; // Cadillac - Caméra initiale
    } else if (brandName === 'Tesla') {
      return [5, 3.5, 5]; // Tesla - Caméra initiale
    } else if (brandName === 'GMC') {
      return [11, 7, 11]; // GMC - Caméra très reculée
    } else if (brandName === 'Ram') {
      return [5, 3.5, 5]; // Ram - Caméra initiale
    } else if (brandName === 'Chrysler') {
      return [5, 3.5, 5]; // Chrysler - Caméra initiale
    } else if (brandName === 'Lincoln') {
      return [5, 3.5, 5]; // Lincoln - Caméra initiale
    } else if (brandName === 'Rolls-Royce') {
      return [5, 3.5, 5]; // Rolls-Royce - Caméra initiale
    } else if (brandName === 'Bentley') {
      return [5, 3.5, 5]; // Bentley - Caméra initiale
    } else if (brandName === 'Maserati') {
      return [5, 3.5, 5]; // Maserati - Caméra initiale
    } else if (brandName === 'Lamborghini') {
      return [5, 3.5, 5]; // Lamborghini - Caméra initiale
    } else if (brandName === 'Ferrari') {
      return [5, 3.5, 5]; // Ferrari - Caméra initiale
    } else if (brandName === 'Aston Martin') {
      return [5, 3.5, 5]; // Aston Martin - Caméra initiale
    } else if (brandName === 'McLaren') {
      return [5, 3.5, 5]; // McLaren - Caméra initiale
    } else if (brandName === 'Bugatti') {
      return [5, 3.5, 5]; // Bugatti - Caméra initiale
    } else {
      return [4, 3, 4]; // Autres marques
    }
  };

  const cameraPosition = getCameraPosition();

  if (error) {
    return (
      <div style={{ height }}>
        <ErrorFallback brandName={brandName} />
      </div>
    );
  }

  return (
    <div style={{ height, maxHeight: height, overflow: 'hidden', contain: 'layout style paint', backgroundImage: 'url(/los-santos.webp)', backgroundSize: 'cover', backgroundPosition: 'center' }} className="w-full rounded-xl">
      <Canvas
        camera={{ position: cameraPosition, fov: 50 }}
        onError={() => setError(true)}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
        dpr={[1.0, 1.5]} // Meilleure qualité visuelle
        performance={{ min: 0.5 }}
      >
        <Suspense fallback={<LoadingSpinner />}>
          <ModelErrorBoundary onError={() => setError(true)} brandName={brandName}>
            <Model3D key={`${brandName}-${modelPath}`} url={modelPath} onError={() => setError(true)} brandName={brandName} />
          </ModelErrorBoundary>

          {/* Lighting - Optimisé pour performance */}
          <ambientLight intensity={0.7} />
          <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow={false} />
          <directionalLight position={[0, 2, 10]} intensity={1.0} castShadow={false} />

          {/* Controls */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate={autoRotate}
            autoRotateSpeed={2}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 3}
          />

          {/* Camera */}
          <PerspectiveCamera makeDefault position={cameraPosition} fov={50} />
        </Suspense>
      </Canvas>
    </div>
  );
}
