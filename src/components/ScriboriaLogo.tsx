import React from 'react';

interface LogoProps {
  variant?: 'full' | 'icon' | 'horizontal';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'custom';
  className?: string;
  iconClassName?: string;
}

export default function ScriboriaLogo({
  variant = 'full',
  size = 'md',
  className = '',
  iconClassName = '',
}: LogoProps) {
  // Size mappings
  const dimensions = {
    xs: { width: 'w-10', height: 'h-10', viewBox: '0 0 400 400' },
    sm: { width: 'w-16', height: 'h-16', viewBox: '0 0 400 400' },
    md: { width: 'w-24', height: 'h-24', viewBox: '0 0 400 400' },
    lg: { width: 'w-40', height: 'h-40', viewBox: '0 0 400 400' },
    xl: { width: 'w-64', height: 'h-64', viewBox: '0 0 400 400' },
    custom: { width: '', height: '', viewBox: '0 0 400 400' },
  };

  const currentSize = dimensions[size];

  // Pinched 4-point star path generator
  const getStarPath = (x: number, y: number, s: number) => {
    return `M ${x} ${y - s} Q ${x} ${y}, ${x + s} ${y} Q ${x} ${y}, ${x} ${y + s} Q ${x} ${y}, ${x - s} ${y} Q ${x} ${y}, ${x} ${y - s}`;
  };

  const renderIcon = (customClassName = '') => (
    <svg
      viewBox="0 0 400 400"
      className={`${currentSize.width} ${currentSize.height} select-none ${customClassName}`}
      xmlns="http://www.w3.org/2000/svg"
      id="scriboria-emblem-svg"
    >
      {/* Definitions for gorgeous gradients */}
      <defs>
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#dfba6b" />
          <stop offset="50%" stopColor="#c5a052" />
          <stop offset="100%" stopColor="#9e7b30" />
        </linearGradient>
      </defs>

      <g id="emblem-group" className="transform translate-y-12 translate-x-2">
        {/* Elegant Large Monogram "S" with fallback fonts */}
        <text
          x="192"
          y="200"
          textAnchor="middle"
          className="fill-brand-navy dark:fill-white font-serif font-bold transition-colors duration-300 pointer-events-none select-none"
          style={{ fontSize: '240px', fontFamily: '"Playfair Display", "Georgia", "Big Caslon", serif' }}
        >
          S
        </text>

        {/* --- LEAFY OLIVE FOILIAGE (STRETCHING RIGHT & UP) --- */}
        {/* Main stem */}
        <path
          d="M 235 150 C 255 142, 275 125, 292 100"
          fill="none"
          stroke="url(#goldGradient)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        
        {/* Leaves along the stem */}
        {/* Leaf 1 (Left Lower) */}
        <path
          d="M 245 145 C 235 140, 222 143, 218 140 C 224 135, 240 138, 245 145 Z"
          fill="url(#goldGradient)"
        />
        {/* Leaf 2 (Right Lower) */}
        <path
          d="M 252 142 C 265 144, 275 152, 280 156 C 272 153, 260 148, 252 142 Z"
          fill="url(#goldGradient)"
        />
        {/* Leaf 3 (Left Mid) */}
        <path
          d="M 262 135 C 250 125, 245 110, 242 106 C 250 114, 258 128, 262 135 Z"
          fill="url(#goldGradient)"
        />
        {/* Leaf 4 (Right Mid) */}
        <path
          d="M 270 128 C 285 128, 298 135, 305 140 C 295 138, 280 132, 270 128 Z"
          fill="url(#goldGradient)"
        />
        {/* Leaf 5 (Left Upper) */}
        <path
          d="M 280 118 C 275 105, 270 95, 268 90 C 274 98, 278 110, 280 118 Z"
          fill="url(#goldGradient)"
        />
        {/* Leaf 6 (Tip leaf) */}
        <path
          d="M 292 100 C 302 90, 310 85, 314 82 C 308 92, 300 98, 292 100 Z"
          fill="url(#goldGradient)"
        />

        {/* --- CELESTIAL SPARKLE STARS --- */}
        <path d={getStarPath(225, 80, 5)} fill="url(#goldGradient)" />
        <path d={getStarPath(255, 65, 8)} fill="url(#goldGradient)" />
        <path d={getStarPath(285, 52, 6)} fill="url(#goldGradient)" />

        {/* --- GOLD-PLATED FOUNTAIN PEN NIB DRAWING DIAGONALLY --- */}
        {/* Base section of the gold nib */}
        <path
          d="M 183 205 L 213 162 C 218 152, 225 140, 226 130 Q 212 121, 203 133 C 196 142, 189 152, 183 205"
          fill="url(#goldGradient)"
          className="shadow-sm"
        />
        {/* Slit line */}
        <line
          x1="183"
          y1="205"
          x2="214"
          y2="151"
          stroke="currentColor"
          className="text-brand-navy dark:text-dark-bg"
          strokeWidth="2.5"
        />
        {/* Breather hole */}
        <circle
          cx="214"
          cy="151"
          r="4"
          fill="currentColor"
          className="text-brand-navy dark:text-dark-bg"
        />

        {/* --- THE LITERATURE OPEN BOOK CUTOUT --- */}
        {/* Left Book Half */}
        <path
          d="M 194 214 C 180 214, 150 205, 138 180 C 148 190, 172 198, 194 198 Z"
          fill="currentColor"
          className="text-brand-navy dark:text-white transition-colors duration-300"
        />
        <path
          d="M 194 214 C 172 208, 142 192, 132 165 C 144 178, 172 188, 194 192 Z"
          fill="currentColor"
          className="text-brand-navy dark:text-white transition-colors duration-300"
        />
        <path
          d="M 194 214 C 160 200, 135 180, 126 150 C 138 162, 160 178, 194 186 Z"
          fill="currentColor"
          className="text-brand-navy dark:text-white transition-colors duration-300"
        />

        {/* Right Book Half */}
        <path
          d="M 198 214 C 212 214, 242 205, 254 180 C 244 190, 220 198, 198 198 Z"
          fill="currentColor"
          className="text-brand-navy dark:text-white transition-colors duration-300"
        />
        <path
          d="M 198 214 C 220 208, 250 192, 260 165 C 248 178, 220 188, 198 192 Z"
          fill="currentColor"
          className="text-brand-navy dark:text-white transition-colors duration-300"
        />
        <path
          d="M 198 214 C 232 200, 257 180, 266 150 C 254 162, 232 178, 198 186 Z"
          fill="currentColor"
          className="text-brand-navy dark:text-white transition-colors duration-300"
        />
      </g>
    </svg>
  );

  if (variant === 'icon') {
    return renderIcon(iconClassName);
  }

  if (variant === 'horizontal') {
    return (
      <div className={`flex items-center gap-4 ${className}`} id="scriboria-logo-horizontal">
        {renderIcon(`w-12 h-12 flex-shrink-0 ${iconClassName}`)}
        <div className="flex flex-col text-left select-none">
          <h1
            className="text-xl sm:text-2xl font-serif font-extrabold tracking-[0.12em] text-brand-navy dark:text-brand-gold relative transition-colors duration-300"
            style={{ fontFamily: '"Playfair Display", "Georgia", "Big Caslon", serif' }}
          >
            SCRIBORIA
          </h1>
          <p className="text-[8px] sm:text-[9px] uppercase tracking-[0.2em] text-brand-muted dark:text-dark-muted font-sans font-semibold -mt-0.5 whitespace-nowrap">
            Books to Read, <span className="text-brand-gold">Stationery to Create.</span>
          </p>
        </div>
      </div>
    );
  }

  // DEFAULT: Variant 'full' (emblem centered on top, followed by luxurious typography)
  return (
    <div className={`flex flex-col items-center text-center p-4 max-w-sm mx-auto ${className}`} id="scriboria-logo-full">
      {/* Center Emblem Icon */}
      {renderIcon(`mx-auto ${iconClassName}`)}

      {/* Decorative Brand Text */}
      <div className="mt-2 select-none">
        <h1
          className="text-3xl sm:text-4xl font-serif font-extrabold tracking-[0.18em] text-brand-navy dark:text-brand-gold transition-colors duration-300"
          style={{ fontFamily: '"Playfair Display", "Georgia", "Big Caslon", serif' }}
        >
          SCRIBORIA
        </h1>
        
        {/* Classic Diamond Divider */}
        <div className="flex items-center justify-center gap-4 my-2.5 w-full max-w-[240px] mx-auto opacity-80">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-brand-gold" />
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-brand-gold flex-shrink-0">
            <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9Z" />
          </svg>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-brand-gold" />
        </div>

        {/* Elegant tag line */}
        <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] font-sans font-medium text-brand-muted dark:text-dark-muted">
          Books to Read, <span className="text-brand-gold font-semibold">Stationery to Create.</span>
        </p>
      </div>
    </div>
  );
}
