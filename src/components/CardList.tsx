import React from 'react';
import { Gamepad2, Bike, LayoutGrid, ChevronRight, Lock } from 'lucide-react';
import { ModalType, PageView } from '../types';

interface CardListProps {
  onSelectModal: (modal: ModalType) => void;
  onSelectPage: (page: PageView) => void;
}

export const CardList: React.FC<CardListProps> = ({ onSelectModal, onSelectPage }) => {
  return (
    <div className="w-full max-w-[520px] mx-auto px-4 pt-8 sm:pt-10 pb-6">
      {/* Section Header */}
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-[20px] sm:text-[22px] font-bold text-slate-700 tracking-tight">
          Escolha o que deseja alugar
        </h2>
        <p className="text-sm sm:text-[15px] text-slate-500 font-normal mt-1">
          Encontre itens disponíveis de forma rápida.
        </p>
      </div>

      {/* Cards Container */}
      <div className="space-y-4">
        {/* Card 1: PlayStation 5 -> Navigates to full screen PS5 page */}
        <button
          onClick={() => onSelectPage('ps5')}
          className="w-full bg-white rounded-[20px] p-4 sm:p-5 border border-slate-100 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_25px_-2px_rgba(13,59,255,0.08)] hover:border-blue-100/80 transition-all duration-200 flex items-center justify-between gap-4 group cursor-pointer text-left active:scale-[0.99]"
          aria-label="Alugar PlayStation 5"
        >
          <div className="flex items-center gap-4 min-w-0">
            {/* Left Icon Container */}
            <div className="w-[52px] h-[52px] sm:w-[56px] sm:h-[56px] rounded-[16px] bg-[#EFF4FF] text-[#0D3BFF] flex items-center justify-center shrink-0 group-hover:bg-[#0D3BFF] group-hover:text-white transition-colors duration-200">
              <Gamepad2 className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2]" />
            </div>

            {/* Text Content */}
            <div className="min-w-0">
              <h3 className="text-[16px] sm:text-[17px] font-bold text-slate-900 group-hover:text-[#0D3BFF] transition-colors leading-snug">
                PlayStation 5
              </h3>
              <p className="text-xs sm:text-[13.5px] text-slate-500 mt-0.5 truncate font-normal">
                Console PS5 Slim Digital + 2 Controles + Jogos.
              </p>
            </div>
          </div>

          {/* Right Chevron */}
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-slate-300 group-hover:text-[#0D3BFF] group-hover:translate-x-0.5 transition-all shrink-0" />
        </button>

        {/* Card 2: Bicicletas */}
        <button
          onClick={() => onSelectModal('bikes')}
          className="w-full bg-white rounded-[20px] p-4 sm:p-5 border border-slate-100 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_25px_-2px_rgba(13,59,255,0.08)] hover:border-blue-100/80 transition-all duration-200 flex items-center justify-between gap-4 group cursor-pointer text-left active:scale-[0.99]"
          aria-label="Alugar Bicicletas"
        >
          <div className="flex items-center gap-4 min-w-0">
            {/* Left Icon Container */}
            <div className="w-[52px] h-[52px] sm:w-[56px] sm:h-[56px] rounded-[16px] bg-[#F5EFFF] text-[#8B5CF6] flex items-center justify-center shrink-0 group-hover:bg-[#8B5CF6] group-hover:text-white transition-colors duration-200">
              <Bike className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2]" />
            </div>

            {/* Text Content */}
            <div className="min-w-0">
              <h3 className="text-[16px] sm:text-[17px] font-bold text-slate-900 group-hover:text-[#8B5CF6] transition-colors leading-snug">
                Bicicletas
              </h3>
              <p className="text-xs sm:text-[13.5px] text-slate-500 mt-0.5 truncate font-normal">
                Locação por diária ou período.
              </p>
            </div>
          </div>

          {/* Right Chevron */}
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-slate-300 group-hover:text-[#8B5CF6] group-hover:translate-x-0.5 transition-all shrink-0" />
        </button>

        {/* Card 3: Em breve... (Disabled) */}
        <div
          className="w-full bg-[#F4F5F8]/70 rounded-[20px] p-4 sm:p-5 border border-dashed border-slate-200/90 flex items-center justify-between gap-4 select-none cursor-not-allowed text-left opacity-90"
          aria-disabled="true"
        >
          <div className="flex items-center gap-4 min-w-0">
            {/* Left Icon Container */}
            <div className="w-[52px] h-[52px] sm:w-[56px] sm:h-[56px] rounded-[16px] bg-[#E5E7EB]/80 text-slate-400 flex items-center justify-center shrink-0">
              <LayoutGrid className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2]" />
            </div>

            {/* Text Content */}
            <div className="min-w-0">
              <h3 className="text-[16px] sm:text-[17px] font-bold text-slate-400 leading-snug">
                Em breve...
              </h3>
              <p className="text-xs sm:text-[13.5px] text-slate-400 mt-0.5 truncate font-normal">
                Novos itens serão adicionados.
              </p>
            </div>
          </div>

          {/* Right Lock Icon */}
          <Lock className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-slate-300/90 shrink-0" />
        </div>
      </div>
    </div>
  );
};
