import React from 'react';
import { ModalType } from '../types';

interface FooterLinksProps {
  onSelectModal: (modal: ModalType) => void;
}

export const FooterLinks: React.FC<FooterLinksProps> = ({ onSelectModal }) => {
  return (
    <footer className="w-full max-w-[520px] mx-auto px-4 mt-8 sm:mt-10 mb-12 text-center flex flex-col items-center">
      {/* TERMOS DE LOCAÇÃO */}
      <button
        onClick={() => onSelectModal('terms')}
        className="text-[12px] sm:text-[13px] font-bold text-[#0D3BFF] tracking-wider uppercase hover:underline focus:outline-none focus:ring-2 focus:ring-blue-300 rounded px-2 py-1 transition-all cursor-pointer"
      >
        TERMOS DE LOCAÇÃO
      </button>

      {/* Precisa de ajuda? Fale conosco pelo WhatsApp */}
      <div className="mt-3.5 text-xs sm:text-[13.5px] text-slate-500 font-normal">
        Precisa de ajuda?{' '}
        <button
          onClick={() => onSelectModal('whatsapp')}
          className="text-slate-600 underline font-medium hover:text-[#0D3BFF] transition-colors focus:outline-none cursor-pointer"
        >
          Fale conosco pelo WhatsApp
        </button>
      </div>

      {/* VTMLoc. © 2026 */}
      <div className="mt-12 text-[11px] font-bold tracking-widest text-slate-300 uppercase select-none">
        VTMLoc. © {new Date().getFullYear()}
      </div>
    </footer>
  );
};
