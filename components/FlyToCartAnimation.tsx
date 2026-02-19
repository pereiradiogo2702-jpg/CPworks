'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

interface FlyToCartAnimationProps {
  productImage: string;
  startPosition: { x: number; y: number };
  onComplete: () => void;
}

export default function FlyToCartAnimation({
  productImage,
  startPosition,
  onComplete,
}: FlyToCartAnimationProps) {
  const [mounted, setMounted] = useState(false);
  const [endPosition, setEndPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);

    // Trouver la position de l'icône panier
    const cartIcon = document.getElementById('cart-icon');
    if (cartIcon) {
      const rect = cartIcon.getBoundingClientRect();
      setEndPosition({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
    }

    // Animation complète après 800ms
    const timer = setTimeout(() => {
      onComplete();
    }, 800);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!mounted) return null;

  const animation = (
    <AnimatePresence>
      <motion.div
        initial={{
          position: 'fixed',
          left: startPosition.x,
          top: startPosition.y,
          width: 60,
          height: 60,
          zIndex: 9999,
          opacity: 1,
        }}
        animate={{
          left: endPosition.x - 30,
          top: endPosition.y - 30,
          width: 30,
          height: 30,
          opacity: 0,
        }}
        transition={{
          duration: 0.8,
          ease: [0.43, 0.13, 0.23, 0.96],
        }}
        className="pointer-events-none"
      >
        {productImage ? (
          <img
            src={productImage}
            alt="Product"
            className="w-full h-full object-cover rounded-lg shadow-2xl border-2 border-purple-500"
          />
        ) : (
          <div className="w-full h-full bg-purple-600 rounded-lg shadow-2xl flex items-center justify-center text-2xl">
            📦
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );

  return createPortal(animation, document.body);
}
