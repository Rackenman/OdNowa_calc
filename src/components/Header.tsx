import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white border-b-2 border-[#4A6B82]/20 sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 min-h-[80px] flex items-center justify-between">
        
        {/* Logo and Title Unit */}
        <div className="flex items-center gap-4 sm:gap-5">
          
          {/* Custom SVG Logo: Rising Sun over 5 Data Layers */}
          <svg
            className="social-concentration-logo"
            width="96"
            height="72"
            viewBox="0 0 96 72"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-labelledby="social-logo-title social-logo-desc"
          >
            <title id="social-logo-title">Koncentracja problemów społecznych</title>
            <desc id="social-logo-desc">
              Wschodzące słońce nad pięcioma kolorowymi warstwami symbolizującymi pięć grup problemów społecznych.
            </desc>

            {/* Promienie */}
            <g
              className="social-logo-rays"
              stroke="#F2B705"
              strokeWidth="4"
              strokeLinecap="square"
            >
              <path d="M48 5V14" />
              <path d="M24 12L29 20" />
              <path d="M72 12L67 20" />
              <path d="M10 28L20 32" />
              <path d="M86 28L76 32" />
            </g>

            {/* Półokrąg słońca */}
            <path
              className="social-logo-sun"
              d="M26 43C26 30.85 35.85 21 48 21C60.15 21 70 30.85 70 43"
              stroke="#F2B705"
              strokeWidth="5"
              strokeLinecap="round"
            />

            {/* Pięć obszarów */}
            <g className="social-logo-indicators">
              <rect x="18" y="43" width="12" height="4" rx="1" fill="#E0A900" />
              <rect x="32" y="43" width="12" height="4" rx="1" fill="#3F7893" />
              <rect x="46" y="43" width="12" height="4" rx="1" fill="#DF5A52" />
              <rect x="60" y="43" width="12" height="4" rx="1" fill="#4EAD68" />
              <rect x="74" y="43" width="12" height="4" rx="1" fill="#8A4AA3" />
            </g>

            {/* Warstwy wspólnego wyniku */}
            <g
              className="social-logo-layers"
              stroke="#132335"
              strokeWidth="4"
              strokeLinecap="square"
            >
              <path d="M10 51H86" />
              <path d="M14 58H82" />
              <path d="M20 65H76" />
            </g>

            {/* Drobne akcenty na warstwach */}
            <g className="social-logo-data">
              <path d="M18 51H30" stroke="#3F7893" strokeWidth="4" />
              <path d="M34 51H45" stroke="#DF5A52" strokeWidth="4" />
              <path d="M49 51H62" stroke="#4EAD68" strokeWidth="4" />
              <path d="M66 51H78" stroke="#8A4AA3" strokeWidth="4" />
            </g>
          </svg>

          {/* Title & Subtitle */}
          <div className="flex flex-col justify-center">
            <h1 className="text-xl sm:text-2xl md:text-[25px] font-extrabold text-[#132335] tracking-tight leading-tight">
              Koncentracja problemów społecznych
            </h1>
            <p className="text-xs md:text-[13px] text-[#3F7893] font-medium leading-snug mt-0.5">
              Pięć obszarów połączonych w jeden wynik
            </p>
          </div>

        </div>

        {/* Right side: Conscious empty space */}
        <div className="hidden md:block"></div>

      </div>
    </header>
  );
};



