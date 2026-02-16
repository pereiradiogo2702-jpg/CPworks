'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, PerspectiveCamera, Html, useProgress } from '@react-three/drei';
import { Suspense, useState, useEffect, Component, ReactNode } from 'react';
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
function Model3D({ url, onError, brandName }: Model3DProps) {
  const { scene } = useGLTF(url, true);

  useEffect(() => {
    console.log('🚗 Loading 3D model:', url);
    console.log('Scene object:', scene);
    console.log('Scene children count:', scene.children.length);

    // Log all meshes found
    let meshCount = 0;
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        meshCount++;
        console.log('Found mesh:', child.name || 'unnamed', 'with material:', !!child.material);
      }
    });
    console.log('Total meshes found:', meshCount);
  }, [url, scene]);

  // Déterminer la marque AVANT le traverse
  const isBMW = brandName === 'BMW';
  const isMercedes = brandName === 'Mercedes-Benz';
  const isAudi = brandName === 'Audi';
  const isVolkswagen = brandName === 'Volkswagen';

  // Center and scale the model - Performance optimisée + réflexions réduites
  scene.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      child.castShadow = false; // Désactivé pour performance
      child.receiveShadow = false; // Désactivé pour performance

      // Matériaux - Approche différente pour Mercedes
      if (child.material) {
        const mesh = child as THREE.Mesh;
        const materials = Array.isArray(child.material) ? child.material : [child.material];

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

  // Calculate bounding box to center the model
  const box = new THREE.Box3().setFromObject(scene);
  const center = box.getCenter(new THREE.Vector3());
  scene.position.sub(center);

  // Ajuster la position Y pour Volkswagen et Audi
  if (isVolkswagen) {
    scene.position.y += 1.5; // Monter la Golf GTI en Y
  } else if (isAudi) {
    scene.position.y += 0.8; // Monter l'Audi en Y
  }

  const size = box.getSize(new THREE.Vector3());
  const maxDim = Math.max(size.x, size.y, size.z);

  // Calcul de l'échelle - BMW et Mercedes plus loin, Audi et VW plus gros
  let scale = isAudi ? 4.5 / maxDim : (isVolkswagen ? 10.0 / maxDim : (isBMW || isMercedes ? 1.5 / maxDim : 2.0 / maxDim));

  console.log('📏 Model dimensions:', {
    url,
    brandName,
    size: { x: size.x, y: size.y, z: size.z },
    maxDim,
    finalScale: scale,
    center: { x: center.x, y: center.y, z: center.z }
  });

  scene.scale.setScalar(scale);

  // Force scene visibility
  scene.visible = true;

  // Count meshes and check geometry for debug display
  let meshCount = 0;
  let vertexCount = 0;
  let visibleMeshCount = 0;
  scene.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      meshCount++;
      const mesh = child as THREE.Mesh;
      if (mesh.visible && mesh.material) visibleMeshCount++;
      if (mesh.geometry && mesh.geometry.attributes.position) {
        vertexCount += mesh.geometry.attributes.position.count;
      }
    }
  });

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
      return [3, 2, 3]; // Très proche pour Audi
    } else if (brandName === 'BMW' || brandName === 'Mercedes-Benz') {
      return [12, 8, 12]; // Extrêmement loin pour BMW et Mercedes
    } else if (brandName === 'Volkswagen') {
      return [2, 1.5, 2]; // Très très proche pour Volkswagen
    } else {
      return [6, 4, 6]; // Distance moyenne pour les autres
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
    <div style={{ height, maxHeight: height, overflow: 'hidden', contain: 'layout style paint' }} className="w-full rounded-xl bg-gradient-to-br from-gray-900 to-black">
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
            <Model3D url={modelPath} onError={() => setError(true)} brandName={brandName} />
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
