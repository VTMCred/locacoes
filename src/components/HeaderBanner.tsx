import React from 'react';

export const HeaderBanner: React.FC = () => {
  return (
    <header className="w-full bg-[#0D3BFF] h-[170px] flex flex-col items-center justify-center text-center px-4 shadow-md relative overflow-hidden select-none">
      {/* Decorative subtle ambient light overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
      
      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Main Title - Nimbus Sans Novus Heavy font */}
        <h1 className="text-[38px] sm:text-[44px] font-nimbus-heavy text-white tracking-tight leading-none">
          VTMLoc<span className="text-white">.</span>
        </h1>
        
        {/* Static Subtitle / Slogan - FF Identification Std Five C Regular font */}
        <p className="text-[11px] sm:text-[12px] font-ff-identification font-medium text-white tracking-[0.2em] sm:tracking-[0.22em] uppercase mt-2.5 opacity-95">
          LOCAÇÃO SIMPLES, RÁPIDA E SEGURA
        </p>
      </div>
    </header>
  );
};
