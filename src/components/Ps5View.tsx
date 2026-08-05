import React, { useState } from 'react';
import {
  ArrowLeft,
  Gamepad2,
  Calendar,
  Download,
  MessageCircle,
  Info,
  Sparkles,
} from 'lucide-react';
import { GAME_CATALOG } from '../data/games';
import { GamesCatalogModal } from './GamesCatalogModal';
import { DatePickerModal } from './DatePickerModal';

interface Ps5ViewProps {
  onBackToHome: () => void;
}

export const Ps5View: React.FC<Ps5ViewProps> = ({ onBackToHome }) => {
  const [rentalPeriod, setRentalPeriod] = useState('weekend');

  // Date selection state
  const [deliveryDate, setDeliveryDate] = useState<Date>(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  });

  // Modal open states
  const [isCatalogModalOpen, setIsCatalogModalOpen] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const periods = [
    {
      id: 'weekend',
      label: 'Fim de Semana',
      days: 'Sexta à Segunda (3 Diárias)',
      durationDays: 3,
      price: 125,
      popular: true,
    },
    {
      id: 'week',
      label: 'Semana',
      days: '2 Diárias',
      durationDays: 2,
      price: 100,
    },
    {
      id: 'daily',
      label: 'Diária',
      days: '24 Horas (1 Diária)',
      durationDays: 1,
      price: 65,
    },
  ];

  const currentPeriod = periods.find((p) => p.id === rentalPeriod) || periods[0];

  // Calculate return date based on selected delivery date & plan duration
  const getCalculatedReturnDate = (delivDate: Date, durationDays: number): Date => {
    const returnDate = new Date(delivDate);
    returnDate.setDate(returnDate.getDate() + durationDays);
    return returnDate;
  };

  const calculatedReturnDate = getCalculatedReturnDate(deliveryDate, currentPeriod.durationDays);

  const formatDateShort = (d: Date) => {
    const weekdays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    return `${day}/${month}/${d.getFullYear()} (${weekdays[d.getDay()]})`;
  };

  const totalGamesCount = GAME_CATALOG.reduce((acc, cat) => acc + cat.games.length, 0);

  const handleSendWhatsApp = () => {
    const text =
      `Olá, VTMLoc.! Gostaria de alugar o *PlayStation 5 Slim Edição Digital* (com 2 Controles).\n\n` +
      `📅 *Plano Escolhido:* ${currentPeriod.label} - ${currentPeriod.days}\n` +
      `📦 *Data de Recebimento:* ${formatDateShort(deliveryDate)}\n` +
      `🔄 *Data de Devolução:* ${formatDateShort(calculatedReturnDate)}\n` +
      `💰 *Valor Total:* R$ ${currentPeriod.price},00\n\n` +
      `🎮 *Jogos Inclusos:* Todos os ${totalGamesCount} jogos em mídia digital do catálogo inclusos no console.\n\n` +
      `Como faço para prosseguir com a reserva?`;

    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/5593996589790?text=${encodedText}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-800 flex flex-col font-sans animate-fadeIn">
      {/* Navigation Top Bar */}
      <div className="bg-[#0A2ECC] text-white py-3 px-4 sm:px-8 border-b border-white/10 flex items-center justify-between shadow-xs sticky top-0 z-40 backdrop-blur-xs">
        <button
          onClick={onBackToHome}
          className="flex items-center gap-2 text-xs sm:text-sm font-bold bg-white/10 hover:bg-white/20 text-white px-3.5 py-1.5 rounded-xl transition-all cursor-pointer active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar ao início</span>
        </button>

        <div className="text-sm font-nimbus-heavy text-white tracking-tight">
          VTMLoc<span className="text-white">.</span>
        </div>
      </div>

      {/* Main Full-Screen Container */}
      <main className="flex-1 w-full max-w-3xl mx-auto px-4 py-6 sm:py-8 space-y-6">
        {/* Banner Card */}
        <div className="bg-gradient-to-r from-[#0D3BFF] to-[#0026C6] text-white rounded-[24px] p-6 sm:p-8 shadow-xl relative overflow-hidden">
          <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-white/5 rounded-full pointer-events-none blur-xl" />
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 bg-white/15 text-white text-[11px] font-bold px-3 py-1 rounded-full backdrop-blur-xs">
                <Gamepad2 className="w-3.5 h-3.5" />
                <span>Console Premium</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                PlayStation 5 Slim Digital
              </h1>
              <p className="text-xs sm:text-sm text-blue-100 font-medium max-w-md">
                Acompanha <strong className="text-white">2 Controles DualSense Originais</strong> + Todos os jogos do catálogo em mídia digital inclusos no console!
              </p>
            </div>
          </div>
        </div>

        {/* 1. PLAN / PERIOD SELECTION */}
        <section className="bg-white rounded-[24px] p-5 sm:p-6 border border-slate-100 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.04)] space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-bold text-slate-800 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-blue-100 text-[#0D3BFF] flex items-center justify-center text-xs font-black">1</span>
              Escolha o Período de Locação
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {periods.map((p) => (
              <div
                key={p.id}
                onClick={() => setRentalPeriod(p.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer relative flex flex-col justify-between ${
                  rentalPeriod === p.id
                    ? 'border-[#0D3BFF] bg-blue-50/70 ring-2 ring-[#0D3BFF]/20 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                {p.popular && (
                  <span className="absolute -top-2.5 right-3 bg-amber-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                    Mais Escolhido
                  </span>
                )}
                <div>
                  <div className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                    {p.label}
                  </div>
                  <div className="text-xs text-slate-500 font-medium mt-1">{p.days}</div>
                </div>
                <div className="text-xl font-black text-[#0D3BFF] mt-4">
                  R$ {p.price},00
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 2. DATE SELECTION (CALENDAR) */}
        <section className="bg-white rounded-[24px] p-5 sm:p-6 border border-slate-100 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.04)] space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-bold text-slate-800 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-blue-100 text-[#0D3BFF] flex items-center justify-center text-xs font-black">2</span>
              Agendamento de Recebimento
            </h2>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <div className="text-xs text-slate-500 font-medium">Data de Recebimento / Retirada:</div>
              <div className="text-sm sm:text-base font-bold text-slate-900 flex items-center justify-center sm:justify-start gap-2">
                <Calendar className="w-4 h-4 text-[#0D3BFF]" />
                <span>{formatDateShort(deliveryDate)}</span>
              </div>
              <div className="text-xs text-blue-600 font-semibold pt-1">
                Devolução prevista: <strong>{formatDateShort(calculatedReturnDate)}</strong>
              </div>
            </div>

            <button
              onClick={() => setIsDatePickerOpen(true)}
              className="bg-[#0D3BFF] hover:bg-blue-700 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl transition-all shadow-xs flex items-center gap-2 shrink-0 cursor-pointer active:scale-95"
            >
              <Calendar className="w-4 h-4" />
              <span>Selecione o dia para receber</span>
            </button>
          </div>
        </section>

        {/* 3. GAME CATALOG BUTTON & PROMO CARD */}
        <section className="bg-white rounded-[24px] p-5 sm:p-6 border border-slate-100 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.04)] space-y-4">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-800 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-blue-100 text-[#0D3BFF] flex items-center justify-center text-xs font-black">3</span>
              Jogos Inclusos no PS5
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Todos os jogos são em mídia digital e já ficam liberados no console para você baixar durante a sua locação.
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50/50 border border-blue-200/80 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#0D3BFF] text-white flex items-center justify-center shrink-0 shadow-xs">
                <Download className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-slate-900 text-sm sm:text-base">
                  Catálogo Completo em Mídia Digital
                </div>
              </div>
            </div>

            {/* Main CTA Button to view catalog in Modal */}
            <button
              onClick={() => setIsCatalogModalOpen(true)}
              className="w-full sm:w-auto bg-[#0D3BFF] hover:bg-blue-700 text-white font-bold text-xs sm:text-sm px-5 py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 shrink-0 cursor-pointer active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Confira os jogos inclusos</span>
            </button>
          </div>
        </section>

        {/* Info Notice */}
        <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-4 flex items-start gap-3 text-amber-900 text-xs">
          <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong>Reserva Direta no WhatsApp:</strong> Ao clicar no botão abaixo, suas informações de período e data serão enviadas diretamente para o nosso atendimento via WhatsApp.
          </div>
        </div>

        {/* Bottom Floating/Fixed WhatsApp Action Box */}
        <div className="bg-white rounded-[24px] p-5 sm:p-6 border border-slate-200/80 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Total do Período ({currentPeriod.label})
            </div>
            <div className="text-2xl sm:text-3xl font-black text-[#0D3BFF]">
              R$ {currentPeriod.price},00
            </div>
          </div>

          <button
            onClick={handleSendWhatsApp}
            className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20bd5a] text-white py-3.5 px-6 rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
          >
            <MessageCircle className="w-5 h-5 fill-white text-transparent shrink-0" />
            <span>Reservar no WhatsApp</span>
          </button>
        </div>
      </main>

      {/* Popups / Modals */}
      <GamesCatalogModal
        isOpen={isCatalogModalOpen}
        onClose={() => setIsCatalogModalOpen(false)}
      />

      <DatePickerModal
        isOpen={isDatePickerOpen}
        onClose={() => setIsDatePickerOpen(false)}
        selectedDate={deliveryDate}
        onSelectDate={(date) => {
          setDeliveryDate(date);
          setIsDatePickerOpen(false);
        }}
        planId={rentalPeriod}
        calculatedReturnDate={calculatedReturnDate}
      />
    </div>
  );
};
