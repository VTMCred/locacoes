import React, { useState } from 'react';
import { X, Bike, Calendar, Check, MessageCircle, ShieldCheck } from 'lucide-react';
import { DatePickerModal } from './DatePickerModal';

interface BikesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BikesModal: React.FC<BikesModalProps> = ({ isOpen, onClose }) => {
  const [period, setPeriod] = useState<'daily' | 'weekend'>('daily');

  // Equipment options state
  const [helmetWithGlasses, setHelmetWithGlasses] = useState(false);
  const [repairKitBag, setRepairKitBag] = useState(false);
  const [frontBackLights, setFrontBackLights] = useState(false);

  // Date picker state
  const [deliveryDate, setDeliveryDate] = useState<Date>(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  });
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  if (!isOpen) return null;

  const periods = [
    {
      id: 'daily',
      label: 'Diária',
      days: '24 Horas (1 Diária)',
      durationDays: 1,
      price: 80,
    },
    {
      id: 'weekend',
      label: 'Fim de Semana',
      days: 'Sexta à Domingo (3 Diárias)',
      durationDays: 3,
      price: 190,
      popular: true,
    },
  ];

  const currentPeriod = periods.find((p) => p.id === period) || periods[0];

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

  const calculateTotal = () => {
    let total = currentPeriod.price;
    if (helmetWithGlasses) total += 10;
    if (repairKitBag) total += 5;
    if (frontBackLights) total += 5;
    return total;
  };

  const handleSendWhatsApp = () => {
    const total = calculateTotal();

    const selectedAccessories = [];
    if (helmetWithGlasses) selectedAccessories.push('Capacete com Óculos (+R$ 10,00)');
    if (repairKitBag) selectedAccessories.push('Bolsa com Kit Remendo de Pneu (+R$ 5,00)');
    if (frontBackLights) selectedAccessories.push('Luzes Dianteira e Traseira (+R$ 5,00)');

    const accessoriesText =
      selectedAccessories.length > 0
        ? selectedAccessories.join('\n  • ')
        : 'Nenhum equipamento opcional';

    const text =
      `Olá, VTMLoc.! Gostaria de alugar a bicicleta *OGGI Hacker Sport Aro 29*.\n\n` +
      `🚲 *Modelo:* OGGI Hacker Sport Aro 29\n` +
      `📅 *Plano Escolhido:* ${currentPeriod.label} - ${currentPeriod.days}\n` +
      `📦 *Data de Recebimento:* ${formatDateShort(deliveryDate)}\n` +
      `🔄 *Data de Devolução:* ${formatDateShort(calculatedReturnDate)}\n\n` +
      `🛠️ *Equipamentos/Acessórios:* \n  • ${accessoriesText}\n\n` +
      `💰 *Valor Total:* R$ ${total},00\n\n` +
      `Como faço para confirmar a reserva?`;

    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/5593996589790?text=${encodedText}`, '_blank');
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
        <div
          className="bg-white w-full max-w-lg rounded-[24px] shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh] animate-slideUp"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-[#8B5CF6] text-white p-5 sm:p-6 flex items-center justify-between relative shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center">
                <Bike className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold leading-tight">Alugar Bicicleta</h3>
                <p className="text-xs text-white/80 font-medium">
                  OGGI Hacker Sport Aro 29
                </p>
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
          <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-slate-800">
            {/* Bike Model Info Card */}
            <div className="bg-purple-50/70 border border-purple-200/80 rounded-2xl p-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#8B5CF6] text-white flex items-center justify-center shrink-0">
                  <Bike className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-purple-900 uppercase tracking-wider">
                    Bicicleta Disponível
                  </div>
                  <div className="text-sm font-extrabold text-slate-900">
                    OGGI Hacker Sport Aro 29
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-bold text-purple-700 bg-purple-100 px-2.5 py-1 rounded-full shrink-0">
                Disponível
              </span>
            </div>

            {/* 1. Period Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">
                1. Escolha o Período de Locação
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {periods.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => setPeriod(p.id as 'daily' | 'weekend')}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer relative flex flex-col justify-between ${
                      period === p.id
                        ? 'border-[#8B5CF6] bg-purple-50/70 ring-2 ring-[#8B5CF6]/20 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    {p.popular && (
                      <span className="absolute -top-2 right-2 bg-amber-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                        Mais Escolhido
                      </span>
                    )}
                    <div>
                      <div className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                        {p.label}
                      </div>
                      <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                        {p.days}
                      </div>
                    </div>
                    <div className="text-lg font-black text-[#8B5CF6] mt-3">
                      R$ {p.price},00
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Date Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">
                2. Agendamento de Recebimento
              </label>
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="space-y-1 text-center sm:text-left">
                  <div className="text-xs text-slate-500 font-medium">Data de Recebimento:</div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900 flex items-center justify-center sm:justify-start gap-1.5">
                    <Calendar className="w-4 h-4 text-[#8B5CF6]" />
                    <span>{formatDateShort(deliveryDate)}</span>
                  </div>
                  <div className="text-[11px] text-purple-700 font-semibold pt-0.5">
                    Devolução: <strong>{formatDateShort(calculatedReturnDate)}</strong>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsDatePickerOpen(true)}
                  className="w-full sm:w-auto bg-[#8B5CF6] hover:bg-purple-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 shrink-0 cursor-pointer active:scale-95"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Selecionar Data</span>
                </button>
              </div>
            </div>

            {/* 3. Equipments & Accessories Options */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">
                3. Equipamentos Opcionais
              </label>
              <div className="space-y-2">
                <label className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200/90 hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={helmetWithGlasses}
                      onChange={(e) => setHelmetWithGlasses(e.target.checked)}
                      className="w-4 h-4 rounded text-[#8B5CF6] focus:ring-purple-400 cursor-pointer"
                    />
                    <span className="text-xs font-semibold text-slate-800">
                      Capacete com Óculos
                    </span>
                  </div>
                  <span className="text-xs font-bold text-[#8B5CF6] bg-purple-50 px-2 py-0.5 rounded-md">
                    +R$ 10,00
                  </span>
                </label>

                <label className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200/90 hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={repairKitBag}
                      onChange={(e) => setRepairKitBag(e.target.checked)}
                      className="w-4 h-4 rounded text-[#8B5CF6] focus:ring-purple-400 cursor-pointer"
                    />
                    <span className="text-xs font-semibold text-slate-800">
                      Bolsa com Kit Remendo de Pneu
                    </span>
                  </div>
                  <span className="text-xs font-bold text-[#8B5CF6] bg-purple-50 px-2 py-0.5 rounded-md">
                    +R$ 5,00
                  </span>
                </label>

                <label className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200/90 hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={frontBackLights}
                      onChange={(e) => setFrontBackLights(e.target.checked)}
                      className="w-4 h-4 rounded text-[#8B5CF6] focus:ring-purple-400 cursor-pointer"
                    />
                    <span className="text-xs font-semibold text-slate-800">
                      Luzes Dianteira e Traseira
                    </span>
                  </div>
                  <span className="text-xs font-bold text-[#8B5CF6] bg-purple-50 px-2 py-0.5 rounded-md">
                    +R$ 5,00
                  </span>
                </label>
              </div>
            </div>

            {/* Safety Badge */}
            <div className="bg-purple-50 border border-purple-200/80 rounded-xl p-3 flex items-start gap-2.5 text-purple-900 text-xs">
              <ShieldCheck className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
              <div>
                <strong>Revisão Garantida:</strong> A bicicleta passa por regulagem de freios e calibragem dos pneus antes de cada entrega.
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-4 shrink-0">
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Total do Período
              </div>
              <div className="text-xl sm:text-2xl font-black text-[#8B5CF6]">
                R$ {calculateTotal()},00
              </div>
            </div>

            <button
              onClick={handleSendWhatsApp}
              className="flex-1 max-w-[240px] bg-[#25D366] hover:bg-[#20bd5a] text-white py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-[0.98] cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-white text-transparent" />
              <span>Reservar no WhatsApp</span>
            </button>
          </div>
        </div>
      </div>

      <DatePickerModal
        isOpen={isDatePickerOpen}
        onClose={() => setIsDatePickerOpen(false)}
        selectedDate={deliveryDate}
        onSelectDate={(date) => {
          setDeliveryDate(date);
          setIsDatePickerOpen(false);
        }}
        planId={period}
        calculatedReturnDate={calculatedReturnDate}
      />
    </>
  );
};
