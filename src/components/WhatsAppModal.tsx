import React from 'react';
import { X, MessageCircle, Gamepad2, Bike, HelpCircle } from 'lucide-react';

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WhatsAppModal: React.FC<WhatsAppModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleOpenWA = (topic: string) => {
    let message = 'Olá, VTMLoc.! Preciso de ajuda e informações sobre locação.';
    if (topic === 'ps5') {
      message = 'Olá! Gostaria de tirar dúvidas sobre o aluguel do PlayStation 5.';
    } else if (topic === 'bikes') {
      message = 'Olá! Gostaria de informações sobre o aluguel de Bicicletas.';
    }
    const url = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div 
        className="bg-white w-full max-w-md rounded-[24px] shadow-2xl border border-slate-100 overflow-hidden flex flex-col animate-slideUp"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#25D366] text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <MessageCircle className="w-6 h-6 fill-white text-transparent" />
            </div>
            <div>
              <h3 className="text-lg font-bold leading-tight">Atendimento WhatsApp</h3>
              <p className="text-xs text-white/90">Atendimento rápido em minutos</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-3 text-slate-700">
          <p className="text-xs text-slate-500 font-medium mb-1">
            Selecione o assunto para iniciar a conversa diretamente no WhatsApp:
          </p>

          <button
            onClick={() => handleOpenWA('ps5')}
            className="w-full p-3.5 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 flex items-center gap-3 text-left transition-all cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-lg bg-blue-100 text-[#0D3BFF] flex items-center justify-center shrink-0">
              <Gamepad2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 group-hover:text-[#0D3BFF]">Aluguel de PlayStation 5</div>
              <div className="text-[11px] text-slate-500">Disponibilidade, valores e modelos</div>
            </div>
          </button>

          <button
            onClick={() => handleOpenWA('bikes')}
            className="w-full p-3.5 rounded-xl border border-slate-200 hover:border-purple-500 hover:bg-purple-50/50 flex items-center gap-3 text-left transition-all cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-lg bg-purple-100 text-[#8B5CF6] flex items-center justify-center shrink-0">
              <Bike className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 group-hover:text-[#8B5CF6]">Aluguel de Bicicletas</div>
              <div className="text-[11px] text-slate-500">Mountain Bike, Urbana e E-Bike</div>
            </div>
          </button>

          <button
            onClick={() => handleOpenWA('general')}
            className="w-full p-3.5 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 flex items-center gap-3 text-left transition-all cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-700">Outras Dúvidas ou Sugestões</div>
              <div className="text-[11px] text-slate-500">Fale com um atendente da equipe</div>
            </div>
          </button>
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 text-center text-[11px] text-slate-400">
          Horário de Atendimento: Segunda a Sábado das 08h às 20h
        </div>
      </div>
    </div>
  );
};
