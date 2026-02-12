'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function AnimatedLogo() {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Trigger animation on mount
    setTimeout(() => setIsAnimating(true), 100);
  }, []);

  return (
    <div className="relative flex items-center justify-center">
      {/* Animated logo container */}
      <div
        className={`relative w-64 h-64 transition-all duration-2000 ${
          isAnimating ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        }`}
        style={{
          transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        {/* Purple glow effect */}
        <div className="absolute inset-0 bg-purple-500/30 blur-3xl animate-pulse"></div>

        {/* Logo placeholder - will be replaced with actual logo */}
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          {/* Temporary placeholder - replace with actual logo image */}
          <div className="relative w-full h-full flex items-center justify-center">
            <svg
              className="w-full h-full"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Animated expanding lines */}
              <g className="animate-draw-lines">
                {/* Outer circle */}
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  stroke="url(#purple-gradient)"
                  strokeWidth="3"
                  fill="none"
                  className="animate-expand"
                  style={{
                    strokeDasharray: '502',
                    strokeDashoffset: isAnimating ? '0' : '502',
                    transition: 'stroke-dashoffset 2s ease-out',
                  }}
                />

                {/* Inner lines forming "CP" */}
                <text
                  x="100"
                  y="120"
                  fontSize="60"
                  fontWeight="bold"
                  textAnchor="middle"
                  fill="url(#purple-gradient)"
                  className={`transition-opacity duration-1000 delay-1000 ${
                    isAnimating ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  CP
                </text>
              </g>

              {/* Gradient definition */}
              <defs>
                <linearGradient id="purple-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#c084fc" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
