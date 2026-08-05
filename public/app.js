(function() {
  // Global State
  let activeDatePickerTarget = 'ps5'; // 'ps5' or 'bike'

  // PS5 State
  let ps5Plan = 'weekend'; // 'weekend', 'week', 'daily'
  let ps5ReceiptDate = new Date();

  // Bike State
  let bikePlan = 'daily'; // 'daily', 'weekend'
  let bikeReceiptDate = new Date();
  let bikeAccessories = {
    helmet: false,
    bag: false,
    lights: false
  };

  // DatePicker Internal State
  let dpCurrentDate = new Date();
  let dpSelectedDate = new Date();

  // Price Constants
  const PS5_PRICES = {
    weekend: 125,
    week: 100,
    daily: 65
  };
  const PS5_DAYS = {
    weekend: 3,
    week: 2,
    daily: 1
  };
  const PS5_LABELS = {
    weekend: 'Fim de Semana',
    week: 'Semana',
    daily: 'Diária'
  };

  const BIKE_PRICES = {
    daily: 80,
    weekend: 190
  };
  const BIKE_DAYS = {
    daily: 1,
    weekend: 3
  };
  const BIKE_LABELS = {
    daily: 'Diária',
    weekend: 'Fim de Semana'
  };

  const BIKE_ACC_PRICES = {
    helmet: 10,
    bag: 5,
    lights: 5
  };
  const BIKE_ACC_NAMES = {
    helmet: 'Capacete com Óculos (+R$ 10)',
    bag: 'Bolsa com Kit Remendo (+R$ 5)',
    lights: 'Luzes Dianteira e Traseira (+R$ 5)'
  };

  // Date Helper Functions
  function formatDate(d) {
    if (!d || isNaN(d.getTime())) return '--/--/----';
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  }

  function addDays(date, days) {
    const res = new Date(date);
    res.setDate(res.getDate() + days);
    return res;
  }

  // DOM Elements
  const homeView = document.getElementById('home-view');
  const ps5View = document.getElementById('ps5-view');

  // Modals
  const modalGames = document.getElementById('modal-games-catalog');
  const modalBikes = document.getElementById('modal-bikes');
  const modalDatepicker = document.getElementById('modal-datepicker');
  const modalTerms = document.getElementById('modal-terms');
  const modalWhatsapp = document.getElementById('modal-whatsapp');

  // Init Date Display
  function updatePs5DatesDisplay() {
    const returnDate = addDays(ps5ReceiptDate, PS5_DAYS[ps5Plan]);
    document.getElementById('ps5-receipt-date-display').textContent = formatDate(ps5ReceiptDate);
    document.getElementById('ps5-return-date-display').textContent = formatDate(returnDate);
    document.getElementById('ps5-summary-period-label').textContent = PS5_LABELS[ps5Plan];
    document.getElementById('ps5-summary-price').textContent = `R$ ${PS5_PRICES[ps5Plan].toFixed(2).replace('.', ',')}`;
  }

  function updateBikeDatesAndPriceDisplay() {
    const returnDate = addDays(bikeReceiptDate, BIKE_DAYS[bikePlan]);
    document.getElementById('bike-receipt-date-display').textContent = formatDate(bikeReceiptDate);
    document.getElementById('bike-return-date-display').textContent = formatDate(returnDate);

    let total = BIKE_PRICES[bikePlan];
    if (bikeAccessories.helmet) total += BIKE_ACC_PRICES.helmet;
    if (bikeAccessories.bag) total += BIKE_ACC_PRICES.bag;
    if (bikeAccessories.lights) total += BIKE_ACC_PRICES.lights;

    document.getElementById('bike-summary-price').textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
  }

  // Plan Selection - PS5
  function selectPs5Plan(planKey) {
    ps5Plan = planKey;
    const plans = ['weekend', 'week', 'daily'];
    plans.forEach(p => {
      const el = document.getElementById(`ps5-plan-${p}`);
      if (p === planKey) {
        el.className = 'ps5-plan-card p-4 rounded-2xl border border-[#0D3BFF] bg-blue-50/70 ring-2 ring-[#0D3BFF]/20 shadow-xs transition-all cursor-pointer relative flex flex-col justify-between';
      } else {
        el.className = 'ps5-plan-card p-4 rounded-2xl border border-slate-200 hover:border-slate-300 bg-white transition-all cursor-pointer relative flex flex-col justify-between';
      }
    });
    updatePs5DatesDisplay();
  }

  // Plan Selection - Bike
  function selectBikePlan(planKey) {
    bikePlan = planKey;
    const plans = ['daily', 'weekend'];
    plans.forEach(p => {
      const el = document.getElementById(`bike-plan-${p}`);
      if (p === planKey) {
        el.className = 'bike-plan-card p-3.5 rounded-2xl border border-[#8B5CF6] bg-purple-50/70 ring-2 ring-[#8B5CF6]/20 shadow-xs transition-all cursor-pointer relative flex flex-col justify-between';
      } else {
        el.className = 'bike-plan-card p-3.5 rounded-2xl border border-slate-200 hover:border-slate-300 bg-white transition-all cursor-pointer relative flex flex-col justify-between';
      }
    });
    updateBikeDatesAndPriceDisplay();
  }

  // DatePicker Logic
  function openDatePicker(target) {
    activeDatePickerTarget = target;
    const initialDate = target === 'ps5' ? ps5ReceiptDate : bikeReceiptDate;
    dpCurrentDate = new Date(initialDate.getFullYear(), initialDate.getMonth(), 1);
    dpSelectedDate = new Date(initialDate);
    renderCalendar();
    showModal(modalDatepicker);
  }

  function renderCalendar() {
    const label = document.getElementById('calendar-month-year-label');
    const monthNames = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    label.textContent = `${monthNames[dpCurrentDate.getMonth()]} ${dpCurrentDate.getFullYear()}`;

    const grid = document.getElementById('calendar-days-grid');
    grid.innerHTML = '';

    const year = dpCurrentDate.getFullYear();
    const month = dpCurrentDate.getMonth();

    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    const today = new Date();
    today.setHours(0,0,0,0);

    // Empty padding cells for previous month
    for (let i = 0; i < firstDayIndex; i++) {
      const emptyDiv = document.createElement('div');
      emptyDiv.className = 'h-9';
      grid.appendChild(emptyDiv);
    }

    for (let day = 1; day <= totalDays; day++) {
      const dateObj = new Date(year, month, day);
      dateObj.setHours(0,0,0,0);

      const button = document.createElement('button');
      button.textContent = day;

      const isPast = dateObj < today;
      const isSelected = dateObj.getTime() === new Date(dpSelectedDate.getFullYear(), dpSelectedDate.getMonth(), dpSelectedDate.getDate()).getTime();

      let classes = 'h-9 rounded-xl font-bold flex items-center justify-center transition-all cursor-pointer ';

      if (isPast) {
        classes += 'text-slate-300 cursor-not-allowed bg-transparent';
        button.disabled = true;
      } else if (isSelected) {
        classes += 'bg-[#0D3BFF] text-white shadow-md scale-105';
      } else {
        classes += 'text-slate-700 hover:bg-blue-50 hover:text-[#0D3BFF] bg-slate-50';
      }

      button.className = classes;

      if (!isPast) {
        button.addEventListener('click', () => {
          dpSelectedDate = dateObj;
          renderCalendar();
        });
      }

      grid.appendChild(button);
    }

    // Update DP Preview
    const daysToAdd = activeDatePickerTarget === 'ps5' ? PS5_DAYS[ps5Plan] : BIKE_DAYS[bikePlan];
    const returnDate = addDays(dpSelectedDate, daysToAdd);

    document.getElementById('dp-preview-receipt').textContent = formatDate(dpSelectedDate);
    document.getElementById('dp-preview-return').textContent = formatDate(returnDate);
  }

  // Games Catalog Rendering & Filter
  let expandedCategoryIndex = 0; // default expand 1st

  function renderGamesCatalog(filterText = '') {
    const container = document.getElementById('games-accordion-container');
    container.innerHTML = '';

    const catalog = window.GAME_CATALOG || [];
    const query = filterText.toLowerCase().trim();

    catalog.forEach((cat, idx) => {
      // Filter games if query present
      const filteredGames = cat.games.filter(g => g.toLowerCase().includes(query));

      if (query && filteredGames.length === 0) {
        return; // skip empty category on search
      }

      const gamesToDisplay = query ? filteredGames : cat.games;
      const isExpanded = query ? true : (expandedCategoryIndex === idx);

      const catCard = document.createElement('div');
      catCard.className = 'border border-slate-200/90 rounded-2xl overflow-hidden bg-white shadow-2xs';

      // Header Button
      const headerBtn = document.createElement('button');
      headerBtn.className = 'w-full p-3.5 bg-slate-50/80 hover:bg-slate-100/80 flex items-center justify-between text-left transition-colors cursor-pointer';
      headerBtn.innerHTML = `
        <div class="flex items-center gap-2.5">
          <span class="text-base">${cat.emoji}</span>
          <span class="font-bold text-slate-800 text-xs sm:text-sm">${cat.name}</span>
          <span class="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
            ${gamesToDisplay.length} ${gamesToDisplay.length === 1 ? 'jogo' : 'jogos'}
          </span>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}"><path d="m6 9 6 6 6-6"/></svg>
      `;

      headerBtn.addEventListener('click', () => {
        if (!query) {
          expandedCategoryIndex = (expandedCategoryIndex === idx) ? -1 : idx;
          renderGamesCatalog(filterText);
        }
      });

      catCard.appendChild(headerBtn);

      // Content Body
      if (isExpanded) {
        const bodyDiv = document.createElement('div');
        bodyDiv.className = 'p-3 bg-white border-t border-slate-100 flex flex-wrap gap-1.5';

        gamesToDisplay.forEach(game => {
          const badge = document.createElement('span');
          badge.className = 'inline-flex items-center gap-1.5 bg-slate-100 hover:bg-blue-50 hover:text-[#0D3BFF] text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-xl border border-slate-200/80 transition-colors';
          badge.innerHTML = `
            <span>${game}</span>
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
          `;
          bodyDiv.appendChild(badge);
        });

        catCard.appendChild(bodyDiv);
      }

      container.appendChild(catCard);
    });

    if (query && container.children.length === 0) {
      container.innerHTML = `
        <div class="text-center py-8 text-slate-400 text-xs font-medium">
          Nenhum jogo encontrado com "${filterText}"
        </div>
      `;
    }
  }

  // Modal Open / Close Helpers
  function showModal(modalEl) {
    modalEl.classList.remove('hidden');
    modalEl.classList.add('flex', 'animate-fadeIn');
  }

  function hideModal(modalEl) {
    modalEl.classList.add('hidden');
    modalEl.classList.remove('flex', 'animate-fadeIn');
  }

  // WhatsApp Redirect Handlers
  function handlePs5Whatsapp() {
    const returnDate = addDays(ps5ReceiptDate, PS5_DAYS[ps5Plan]);
    const priceStr = `R$ ${PS5_PRICES[ps5Plan].toFixed(2).replace('.', ',')}`;

    const text = `OlÁ, VTMLoc.! Gostaria de alugar o *PlayStation 5 Slim Digital*.
📌 *Plano:* ${PS5_LABELS[ps5Plan]} (${priceStr})
📅 *Recebimento:* ${formatDate(ps5ReceiptDate)}
📅 *Devolução:* ${formatDate(returnDate)}
🎮 *Incluso:* 2 Controles DualSense + Mídia Digital.`;

    const url = `https://wa.me/5593996589790?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  }

  function handleBikeWhatsapp() {
    const returnDate = addDays(bikeReceiptDate, BIKE_DAYS[bikePlan]);
    
    let total = BIKE_PRICES[bikePlan];
    const accList = [];
    if (bikeAccessories.helmet) {
      total += BIKE_ACC_PRICES.helmet;
      accList.push(BIKE_ACC_NAMES.helmet);
    }
    if (bikeAccessories.bag) {
      total += BIKE_ACC_PRICES.bag;
      accList.push(BIKE_ACC_NAMES.bag);
    }
    if (bikeAccessories.lights) {
      total += BIKE_ACC_PRICES.lights;
      accList.push(BIKE_ACC_NAMES.lights);
    }

    const priceStr = `R$ ${total.toFixed(2).replace('.', ',')}`;
    const accText = accList.length > 0 ? `\n🛠️ *Acessórios:* ${accList.join(', ')}` : '';

    const text = `Olá, VTMLoc.! Gostaria de alugar a *Bicicleta OGGI Hacker Sport Aro 29*.
📌 *Plano:* ${BIKE_LABELS[bikePlan]} (Total: ${priceStr})
📅 *Recebimento:* ${formatDate(bikeReceiptDate)}
📅 *Devolução:* ${formatDate(returnDate)}${accText}`;

    const url = `https://wa.me/5593996589790?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  }

  // Setup Event Listeners
  document.addEventListener('DOMContentLoaded', () => {
    // Nav / View Switching
    document.getElementById('btn-open-ps5').addEventListener('click', () => {
      homeView.classList.add('hidden');
      ps5View.classList.remove('hidden');
      ps5View.classList.add('flex');
      window.scrollTo(0,0);
    });

    document.getElementById('btn-ps5-back').addEventListener('click', () => {
      ps5View.classList.add('hidden');
      ps5View.classList.remove('flex');
      homeView.classList.remove('hidden');
      window.scrollTo(0,0);
    });

    // Open Modals from Home
    document.getElementById('btn-open-bike').addEventListener('click', () => showModal(modalBikes));
    document.getElementById('btn-open-terms').addEventListener('click', () => showModal(modalTerms));
    document.getElementById('btn-open-whatsapp').addEventListener('click', () => showModal(modalWhatsapp));
    document.getElementById('footer-link-terms').addEventListener('click', () => showModal(modalTerms));
    document.getElementById('footer-link-whatsapp').addEventListener('click', () => showModal(modalWhatsapp));

    // Close Modals
    document.getElementById('btn-close-games-modal').addEventListener('click', () => hideModal(modalGames));
    document.getElementById('btn-footer-close-games-modal').addEventListener('click', () => hideModal(modalGames));
    
    document.getElementById('btn-close-bikes-modal').addEventListener('click', () => hideModal(modalBikes));
    
    document.getElementById('btn-close-datepicker-modal').addEventListener('click', () => hideModal(modalDatepicker));
    document.getElementById('btn-cancel-datepicker').addEventListener('click', () => hideModal(modalDatepicker));

    document.getElementById('btn-close-terms-modal').addEventListener('click', () => hideModal(modalTerms));
    document.getElementById('btn-footer-close-terms').addEventListener('click', () => hideModal(modalTerms));

    document.getElementById('btn-close-whatsapp-modal').addEventListener('click', () => hideModal(modalWhatsapp));

    // PS5 Plans
    document.getElementById('ps5-plan-weekend').addEventListener('click', () => selectPs5Plan('weekend'));
    document.getElementById('ps5-plan-week').addEventListener('click', () => selectPs5Plan('week'));
    document.getElementById('ps5-plan-daily').addEventListener('click', () => selectPs5Plan('daily'));

    // Bike Plans
    document.getElementById('bike-plan-daily').addEventListener('click', () => selectBikePlan('daily'));
    document.getElementById('bike-plan-weekend').addEventListener('click', () => selectBikePlan('weekend'));

    // Bike Accessories Checkboxes
    document.getElementById('chk-helmet').addEventListener('change', (e) => {
      bikeAccessories.helmet = e.target.checked;
      updateBikeDatesAndPriceDisplay();
    });
    document.getElementById('chk-bag').addEventListener('change', (e) => {
      bikeAccessories.bag = e.target.checked;
      updateBikeDatesAndPriceDisplay();
    });
    document.getElementById('chk-lights').addEventListener('change', (e) => {
      bikeAccessories.lights = e.target.checked;
      updateBikeDatesAndPriceDisplay();
    });

    // DatePicker Openers
    document.getElementById('btn-open-ps5-datepicker').addEventListener('click', () => openDatePicker('ps5'));
    document.getElementById('btn-open-bike-datepicker').addEventListener('click', () => openDatePicker('bike'));

    // DatePicker Navigation
    document.getElementById('btn-prev-month').addEventListener('click', () => {
      dpCurrentDate.setMonth(dpCurrentDate.getMonth() - 1);
      renderCalendar();
    });
    document.getElementById('btn-next-month').addEventListener('click', () => {
      dpCurrentDate.setMonth(dpCurrentDate.getMonth() + 1);
      renderCalendar();
    });

    // Confirm DatePicker
    document.getElementById('btn-confirm-datepicker').addEventListener('click', () => {
      if (activeDatePickerTarget === 'ps5') {
        ps5ReceiptDate = new Date(dpSelectedDate);
        updatePs5DatesDisplay();
      } else {
        bikeReceiptDate = new Date(dpSelectedDate);
        updateBikeDatesAndPriceDisplay();
      }
      hideModal(modalDatepicker);
    });

    // Games Modal Open & Search
    document.getElementById('btn-open-games-modal').addEventListener('click', () => {
      renderGamesCatalog('');
      showModal(modalGames);
    });

    const searchInput = document.getElementById('games-search-input');
    searchInput.addEventListener('input', (e) => {
      renderGamesCatalog(e.target.value);
    });

    // WhatsApp Action Buttons
    document.getElementById('btn-ps5-whatsapp').addEventListener('click', handlePs5Whatsapp);
    document.getElementById('btn-bike-whatsapp').addEventListener('click', handleBikeWhatsapp);

    // Initial State Setup
    updatePs5DatesDisplay();
    updateBikeDatesAndPriceDisplay();
  });
})();
