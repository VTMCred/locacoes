import React, { useState } from 'react';
import { X, Calendar as CalendarIcon, ChevronLeft, ChevronRight, Check } from 'lucide-react';

interface DatePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
  planId: string;
  calculatedReturnDate: Date | null;
}

const MONTH_NAMES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

const WEEKDAY_NAMES = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

export const DatePickerModal: React.FC<DatePickerModalProps> = ({
  isOpen,
  onClose,
  selectedDate,
  onSelectDate,
  planId,
  calculatedReturnDate,
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  if (!isOpen) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const prevMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };

  const isSameDay = (d1: Date | null, d2: Date | null) => {
    if (!d1 || !d2) return false;
    return (
      d1.getDate() === d2.getDate() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getFullYear() === d2.getFullYear()
    );
  };

  const formatFullDate = (d: Date | null) => {
    if (!d) return '--/--/----';
    const dayStr = String(d.getDate()).padStart(2, '0');
    const monthStr = String(d.getMonth() + 1).padStart(2, '0');
    const weekName = WEEKDAY_NAMES[d.getDay()];
    return `${dayStr}/${monthStr}/${d.getFullYear()} (${weekName})`;
  };

  const handleDayClick = (dayNum: number) => {
    const chosen = new Date(year, month, dayNum);
    chosen.setHours(0, 0, 0, 0);
    if (chosen < today) return; // Prevent picking past dates
    onSelectDate(chosen);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div
        className="bg-white w-full max-w-md rounded-[24px] shadow-2xl border border-slate-100 overflow-hidden flex flex-col animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0D3BFF] text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
              <CalendarIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold leading-tight">
                Selecione a Data de Recebimento
              </h3>
              <p className="text-xs text-white/80 font-medium">
                Escolha o dia ideal para receber/retirar
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer shrink-0"
            aria-label="Fechar"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {/* Calendar Header Controls */}
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-slate-800">
              {MONTH_NAMES[month]} {year}
            </h4>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={prevMonth}
                className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Mês anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={nextMonth}
                className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Próximo mês"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 text-center text-[11px] font-bold text-slate-400">
            {WEEKDAY_NAMES.map((wd) => (
              <div key={wd} className="py-1">
                {wd}
              </div>
            ))}
          </div>

          {/* Month Days Grid */}
          <div className="grid grid-cols-7 gap-1 text-center text-xs">
            {/* Empty slots before first day */}
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} className="p-2" />
            ))}

            {/* Days of month */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const dayNum = i + 1;
              const thisDate = new Date(year, month, dayNum);
              thisDate.setHours(0, 0, 0, 0);

              const isPast = thisDate < today;
              const isSelected = isSameDay(selectedDate, thisDate);
              const isReturn = isSameDay(calculatedReturnDate, thisDate);

              let btnClasses =
                'p-2 rounded-xl font-semibold transition-all cursor-pointer flex flex-col items-center justify-center min-h-[38px]';

              if (isPast) {
                btnClasses += ' text-slate-300 cursor-not-allowed';
              } else if (isSelected) {
                btnClasses += ' bg-[#0D3BFF] text-white shadow-sm font-bold scale-105';
              } else if (isReturn) {
                btnClasses += ' bg-amber-100 text-amber-900 border border-amber-300 font-bold';
              } else {
                btnClasses += ' hover:bg-blue-50 hover:text-[#0D3BFF] text-slate-700';
              }

              return (
                <button
                  key={`day-${dayNum}`}
                  disabled={isPast}
                  onClick={() => handleDayClick(dayNum)}
                  className={btnClasses}
                >
                  <span>{dayNum}</span>
                </button>
              );
            })}
          </div>

          {/* Date Summary Card */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Data de Recebimento:</span>
              <span className="font-bold text-slate-900">
                {formatFullDate(selectedDate)}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs pt-1.5 border-t border-slate-200/60">
              <span className="text-slate-500 font-medium">Devolução Prevista:</span>
              <span className="font-bold text-[#0D3BFF]">
                {formatFullDate(calculatedReturnDate)}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="w-full bg-[#0D3BFF] hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all cursor-pointer text-xs sm:text-sm flex items-center justify-center gap-2"
          >
            <Check className="w-4 h-4" />
            <span>Confirmar Data</span>
          </button>
        </div>
      </div>
    </div>
  );
};
