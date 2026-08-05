import React from 'react';
import { X, FileText, CheckCircle2, ShieldAlert, Clock, Truck } from 'lucide-react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div 
        className="bg-white w-full max-w-lg rounded-[24px] shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh] animate-slideUp"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0D3BFF] text-white p-5 sm:p-6 flex items-center justify-between relative shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold leading-tight">Termos de Locação</h3>
              <p className="text-xs text-white/80 font-medium">VTMLoc. - Política Transparente</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-slate-700 text-xs sm:text-sm">
          {/* Section 1: Documentação */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-2">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <CheckCircle2 className="w-4 h-4 text-[#0D3BFF]" />
              <h4>1. Documentação Necessária</h4>
            </div>
            <p className="text-slate-600 leading-relaxed pl-6">
              Para efetuar a locação de qualquer item na VTMLoc., o locatário deve apresentar documento oficial com foto (RG/CPF ou CNH) e comprovante de residência atualizado no próprio nome.
            </p>
          </div>

          {/* Section 2: Prazos e Devolução */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-2">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <Clock className="w-4 h-4 text-[#0D3BFF]" />
              <h4>2. Devolução e Horários</h4>
            </div>
            <p className="text-slate-600 leading-relaxed pl-6">
              A contagem das diárias inicia no momento da retirada ou entrega do equipamento. Atrasos na devolução sem aviso prévio de pelo menos 3 horas acarretarão em cobrança proporcional de nova diária.
            </p>
          </div>

          {/* Section 3: Cuidado e Conservação */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-2">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <ShieldAlert className="w-4 h-4 text-[#0D3BFF]" />
              <h4>3. Conservação dos Equipamentos</h4>
            </div>
            <p className="text-slate-600 leading-relaxed pl-6">
              Todos os itens são testados, higienizados e entregues em perfeito estado de funcionamento. O cliente se compromete a zelar pelo bem e reportar imediatamente qualquer anormalidade.
            </p>
          </div>

          {/* Section 4: Entrega e Retirada */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-2">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <Truck className="w-4 h-4 text-[#0D3BFF]" />
              <h4>4. Opções de Entrega</h4>
            </div>
            <p className="text-slate-600 leading-relaxed pl-6">
              Oferecemos a opção de retirada gratuita na nossa sede ou serviço de entrega via motoboy parceiro (consulte a taxa de entrega para o seu CEP).
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 text-center shrink-0">
          <button
            onClick={onClose}
            className="w-full bg-[#0D3BFF] hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all cursor-pointer text-sm"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
