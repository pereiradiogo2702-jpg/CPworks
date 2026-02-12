'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function AnimatedLogo() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setTimeout(() => setIsAnimating(true), 300);
  }, []);

  // Prevent hydration mismatch by not rendering until mounted
  if (!isMounted) {
    return (
      <div className="relative flex items-center justify-center">
        <div className="relative w-[500px] h-[500px] opacity-0">
          <Image
            src="/logo.png"
            alt="CPWorks Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex items-center justify-center">
      {/* Logo - simple expand animation */}
      <div
        className={`relative transition-all duration-1500 ${
          isAnimating ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
        }`}
        style={{
          transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        <div className="relative w-[500px] h-[500px]">
          <Image
            src="/logo.png"
            alt="CPWorks Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
}
