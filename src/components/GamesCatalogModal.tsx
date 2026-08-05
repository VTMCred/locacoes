import React, { useState, useMemo } from 'react';
import { X, Search, Gamepad2, ChevronDown, ChevronUp } from 'lucide-react';
import { GAME_CATALOG } from '../data/games';

interface GamesCatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GamesCatalogModal: React.FC<GamesCatalogModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  const toggleCategory = (catName: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [catName]: !prev[catName],
    }));
  };

  const filteredCatalog = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    return GAME_CATALOG.map((cat) => {
      const filteredGames = cat.games.filter((game) =>
        game.toLowerCase().includes(query)
      );

      return {
        ...cat,
        games: filteredGames,
      };
    }).filter((cat) => cat.games.length > 0);
  }, [searchQuery]);

  if (!isOpen) return null;

  const isSearching = searchQuery.trim().length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div
        className="bg-white w-full max-w-2xl rounded-[24px] shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh] animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#0D3BFF] text-white p-5 sm:p-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
              <Gamepad2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold leading-tight">
                Jogos Inclusos no PS5
              </h3>
              <p className="text-xs text-white/80 font-medium">
                Todos os títulos em mídia digital disponíveis no console
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

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar jogo por nome (ex: GTA, Resident Evil, Spider-Man)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0D3BFF]/30 focus:border-[#0D3BFF] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                Limpar
              </button>
            )}
          </div>

          {/* Catalog Accordion List */}
          <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
            {filteredCatalog.length === 0 ? (
              <div className="text-center py-8 text-slate-400 text-xs">
                Nenhum jogo encontrado com &quot;{searchQuery}&quot;.
              </div>
            ) : (
              filteredCatalog.map((cat) => {
                const isExpanded = isSearching || !!expandedCategories[cat.name];

                return (
                  <div
                    key={cat.name}
                    className="border border-slate-200/90 rounded-2xl overflow-hidden transition-all bg-white"
                  >
                    {/* Category Header (Accordion Toggle) */}
                    <button
                      type="button"
                      onClick={() => toggleCategory(cat.name)}
                      className="w-full p-3.5 sm:p-4 flex items-center justify-between bg-slate-50/80 hover:bg-slate-100 transition-colors text-left cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-base">{cat.emoji}</span>
                        <span className="font-bold text-slate-800 text-xs sm:text-sm">
                          {cat.name}
                        </span>
                        <span className="text-xs text-slate-400 font-medium">
                          ({cat.games.length} {cat.games.length === 1 ? 'jogo' : 'jogos'})
                        </span>
                      </div>

                      <div className="text-slate-400">
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-[#0D3BFF]" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )}
                      </div>
                    </button>

                    {/* Expanded Content Grid */}
                    {isExpanded && (
                      <div className="p-3 sm:p-4 bg-white border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-2 animate-fadeIn">
                        {cat.games.map((game) => (
                          <div
                            key={game}
                            className="p-2.5 rounded-xl border border-slate-200/90 bg-slate-50/50 text-slate-800 text-xs font-semibold flex items-center justify-between"
                          >
                            <span className="truncate pr-2">{game}</span>
                            <span className="text-[10px] font-bold text-[#0D3BFF] bg-blue-100/80 px-2 py-0.5 rounded-md shrink-0">
                              Disponível
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-500 font-medium">
            Catálogo de Jogos PS5
          </span>
          <button
            onClick={onClose}
            className="bg-[#0D3BFF] hover:bg-blue-700 text-white text-xs font-bold px-6 py-2.5 rounded-xl transition-all cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
