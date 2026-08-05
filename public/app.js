// VTMLoc Vanilla JS App Logic

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // State
  let currentPage = 'home'; // 'home' | 'ps5'
  
  // PS5 State
  let ps5Period = 'weekend';
  let ps5DeliveryDate = new Date();
  ps5DeliveryDate.setHours(0, 0, 0, 0);

  // Bike State
  let bikePeriod = 'daily';
  let bikeDeliveryDate = new Date();
  bikeDeliveryDate.setHours(0, 0, 0, 0);
  let bikeHelmet = false;
  let bikeBag = false;
  let bikeLights = false;

  // DatePicker Modal State
  let dpTarget = 'ps5'; // 'ps5' | 'bike'
  let dpCalendarDate = new Date();
  dpCalendarDate.setHours(0, 0, 0, 0);
  let dpSelectedDate = new Date();
  dpSelectedDate.setHours(0, 0, 0, 0);

  // Accordions State for Games Modal
  let expandedCategories = {};

  // DOM Elements - Navigation & Views
  const homeView = document.getElementById('home-view');
  const ps5View = document.getElementById('ps5-view');

  // Buttons on Home
  document.getElementById('btn-open-ps5').addEventListener('click', () => showPage('ps5'));
  document.getElementById('btn-open-bike').addEventListener('click', () => openModal('modal-bikes'));
  document.getElementById('btn-open-terms').addEventListener('click', () => openModal('modal-terms'));
  document.getElementById('btn-open-whatsapp').addEventListener('click', () => openModal('modal-whatsapp'));

  document.getElementById('footer-link-terms').addEventListener('click', () => openModal('modal-terms'));
  document.getElementById('footer-link-whatsapp').addEventListener('click', () => openModal('modal-whatsapp'));

  // PS5 Back Button
  document.getElementById('btn-ps5-back').addEventListener('click', () => showPage('home'));

  // Modals Close Buttons
  document.getElementById('btn-close-games-modal').addEventListener('click', () => closeModal('modal-games-catalog'));
  document.getElementById('btn-footer-close-games-modal').addEventListener('click', () => closeModal('modal-games-catalog'));
  document.getElementById('btn-close-bikes-modal').addEventListener('click', () => closeModal('modal-bikes'));
  document.getElementById('btn-close-terms-modal').addEventListener('click', () => closeModal('modal-terms'));
  document.getElementById('btn-footer-close-terms').addEventListener('click', () => closeModal('modal-terms'));
  document.getElementById('btn-close-whatsapp-modal').addEventListener('click', () => closeModal('modal-whatsapp'));
  document.getElementById('btn-close-datepicker-modal').addEventListener('click', () => closeModal('modal-datepicker'));
  document.getElementById('btn-cancel-datepicker').addEventListener('click', () => closeModal('modal-datepicker'));

  // PS5 Plan Cards Click
  document.getElementById('ps5-plan-weekend').addEventListener('click', () => selectPs5Plan('weekend'));
  document.getElementById('ps5-plan-week').addEventListener('click', () => selectPs5Plan('week'));
  document.getElementById('ps5-plan-daily').addEventListener('click', () => selectPs5Plan('daily'));

  // Open Games Modal
  document.getElementById('btn-open-games-modal').addEventListener('click', () => {
    openModal('modal-games-catalog');
    renderGamesCatalog();
  });

  // Open Date Pickers
  document.getElementById('btn-open-ps5-datepicker').addEventListener('click', () => openDatePicker('ps5'));
  document.getElementById('btn-open-bike-datepicker').addEventListener('click', () => openDatePicker('bike'));

  // Bike Plan Cards Click
  document.getElementById('bike-plan-daily').addEventListener('click', () => selectBikePlan('daily'));
  document.getElementById('bike-plan-weekend').addEventListener('click', () => selectBikePlan('weekend'));

  // Bike Accessories Checkboxes
  document.getElementById('chk-helmet').addEventListener('change', (e) => {
    bikeHelmet = e.target.checked;
    updateBikeSummary();
  });
  document.getElementById('chk-bag').addEventListener('change', (e) => {
    bikeBag = e.target.checked;
    updateBikeSummary();
  });
  document.getElementById('chk-lights').addEventListener('change', (e) => {
    bikeLights = e.target.checked;
    updateBikeSummary();
  });

  // WhatsApp Buttons
  document.getElementById('btn-ps5-whatsapp').addEventListener('click', sendPs5WhatsApp);
  document.getElementById('btn-bike-whatsapp').addEventListener('click', sendBikeWhatsApp);

  // Search input in games catalog
  const gamesSearchInput = document.getElementById('games-search-input');
  if (gamesSearchInput) {
    gamesSearchInput.addEventListener('input', () => renderGamesCatalog());
  }

  // Calendar Navigation
  document.getElementById('btn-prev-month').addEventListener('click', () => {
    dpCalendarDate.setMonth(dpCalendarDate.getMonth() - 1);
    renderCalendar();
  });
  document.getElementById('btn-next-month').addEventListener('click', () => {
    dpCalendarDate.setMonth(dpCalendarDate.getMonth() + 1);
    renderCalendar();
  });
  document.getElementById('btn-confirm-datepicker').addEventListener('click', () => {
    if (dpTarget === 'ps5') {
      ps5DeliveryDate = new Date(dpSelectedDate);
      updatePs5DatesDisplay();
    } else {
      bikeDeliveryDate = new Date(dpSelectedDate);
      updateBikeDatesDisplay();
    }
    closeModal('modal-datepicker');
  });

  // Helper Functions
  function showPage(page) {
    currentPage = page;
    if (page === 'ps5') {
      homeView.classList.add('hidden');
      ps5View.classList.remove('hidden');
      ps5View.classList.add('flex');
      window.scrollTo(0, 0);
    } else {
      ps5View.classList.add('hidden');
      ps5View.classList.remove('flex');
      homeView.classList.remove('hidden');
      window.scrollTo(0, 0);
    }
    if (window.lucide) window.lucide.createIcons();
  }

  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    }
    if (window.lucide) window.lucide.createIcons();
  }

  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  }

  function formatDateShort(d) {
    const weekdays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    return `${day}/${month}/${d.getFullYear()} (${weekdays[d.getDay()]})`;
  }

  function getCalculatedReturnDate(delivDate, durationDays) {
    const returnDate = new Date(delivDate);
    returnDate.setDate(returnDate.getDate() + durationDays);
    return returnDate;
  }

  // --- PS5 Logic ---
  const ps5Plans = {
    weekend: { label: 'Fim de Semana', days: 'Sexta à Segunda (3 Diárias)', durationDays: 3, price: 125 },
    week: { label: 'Semana', days: '2 Diárias', durationDays: 2, price: 100 },
    daily: { label: 'Diária', days: '24 Horas (1 Diária)', durationDays: 1, price: 65 }
  };

  function selectPs5Plan(planKey) {
    ps5Period = planKey;
    ['weekend', 'week', 'daily'].forEach((p) => {
      const card = document.getElementById(`ps5-plan-${p}`);
      if (p === planKey) {
        card.className = 'ps5-plan-card p-4 rounded-2xl border border-[#0D3BFF] bg-blue-50/70 ring-2 ring-[#0D3BFF]/20 shadow-xs transition-all cursor-pointer relative flex flex-col justify-between';
      } else {
        card.className = 'ps5-plan-card p-4 rounded-2xl border border-slate-200 hover:border-slate-300 bg-white transition-all cursor-pointer relative flex flex-col justify-between';
      }
    });
    updatePs5DatesDisplay();
  }

  function updatePs5DatesDisplay() {
    const plan = ps5Plans[ps5Period];
    const returnDate = getCalculatedReturnDate(ps5DeliveryDate, plan.durationDays);

    document.getElementById('ps5-receipt-date-display').textContent = formatDateShort(ps5DeliveryDate);
    document.getElementById('ps5-return-date-display').textContent = formatDateShort(returnDate);

    document.getElementById('ps5-summary-period-label').textContent = plan.label;
    document.getElementById('ps5-summary-price').textContent = `R$ ${plan.price},00`;
  }

  function sendPs5WhatsApp() {
    const plan = ps5Plans[ps5Period];
    const returnDate = getCalculatedReturnDate(ps5DeliveryDate, plan.durationDays);
    const totalGamesCount = GAME_CATALOG.reduce((acc, cat) => acc + cat.games.length, 0);

    const text =
      `Olá, VTMLoc.! Gostaria de alugar o *PlayStation 5 Slim Edição Digital* (com 2 Controles).\n\n` +
      `📅 *Plano Escolhido:* ${plan.label} - ${plan.days}\n` +
      `📦 *Data de Recebimento:* ${formatDateShort(ps5DeliveryDate)}\n` +
      `🔄 *Data de Devolução:* ${formatDateShort(returnDate)}\n` +
      `💰 *Valor Total:* R$ ${plan.price},00\n\n` +
      `🎮 *Jogos Inclusos:* Todos os ${totalGamesCount} jogos em mídia digital do catálogo inclusos no console.\n\n` +
      `Como faço para prosseguir com a reserva?`;

    window.open(`https://wa.me/5593996589790?text=${encodeURIComponent(text)}`, '_blank');
  }

  // --- Bike Logic ---
  const bikePlans = {
    daily: { label: 'Diária', days: '24 Horas (1 Diária)', durationDays: 1, price: 80 },
    weekend: { label: 'Fim de Semana', days: 'Sexta à Domingo (3 Diárias)', durationDays: 3, price: 190 }
  };

  function selectBikePlan(planKey) {
    bikePeriod = planKey;
    ['daily', 'weekend'].forEach((p) => {
      const card = document.getElementById(`bike-plan-${p}`);
      if (p === planKey) {
        card.className = 'bike-plan-card p-3.5 rounded-2xl border border-[#8B5CF6] bg-purple-50/70 ring-2 ring-[#8B5CF6]/20 shadow-xs transition-all cursor-pointer relative flex flex-col justify-between';
      } else {
        card.className = 'bike-plan-card p-3.5 rounded-2xl border border-slate-200 hover:border-slate-300 bg-white transition-all cursor-pointer relative flex flex-col justify-between';
      }
    });
    updateBikeSummary();
  }

  function updateBikeDatesDisplay() {
    const plan = bikePlans[bikePeriod];
    const returnDate = getCalculatedReturnDate(bikeDeliveryDate, plan.durationDays);

    document.getElementById('bike-receipt-date-display').textContent = formatDateShort(bikeDeliveryDate);
    document.getElementById('bike-return-date-display').textContent = formatDateShort(returnDate);
  }

  function updateBikeSummary() {
    const plan = bikePlans[bikePeriod];
    let total = plan.price;
    if (bikeHelmet) total += 10;
    if (bikeBag) total += 5;
    if (bikeLights) total += 5;

    document.getElementById('bike-summary-price').textContent = `R$ ${total},00`;
    updateBikeDatesDisplay();
  }

  function sendBikeWhatsApp() {
    const plan = bikePlans[bikePeriod];
    const returnDate = getCalculatedReturnDate(bikeDeliveryDate, plan.durationDays);

    let total = plan.price;
    const selectedAccessories = [];
    if (bikeHelmet) {
      total += 10;
      selectedAccessories.push('Capacete com Óculos (+R$ 10,00)');
    }
    if (bikeBag) {
      total += 5;
      selectedAccessories.push('Bolsa com Kit Remendo de Pneu (+R$ 5,00)');
    }
    if (bikeLights) {
      total += 5;
      selectedAccessories.push('Luzes Dianteira e Traseira (+R$ 5,00)');
    }

    const accessoriesText =
      selectedAccessories.length > 0
        ? selectedAccessories.join('\n  • ')
        : 'Nenhum equipamento opcional';

    const text =
      `Olá, VTMLoc.! Gostaria de alugar a bicicleta *OGGI Hacker Sport Aro 29*.\n\n` +
      `🚲 *Modelo:* OGGI Hacker Sport Aro 29\n` +
      `📅 *Plano Escolhido:* ${plan.label} - ${plan.days}\n` +
      `📦 *Data de Recebimento:* ${formatDateShort(bikeDeliveryDate)}\n` +
      `🔄 *Data de Devolução:* ${formatDateShort(returnDate)}\n\n` +
      `🛠️ *Equipamentos/Acessórios:* \n  • ${accessoriesText}\n\n` +
      `💰 *Valor Total:* R$ ${total},00\n\n` +
      `Como faço para confirmar a reserva?`;

    window.open(`https://wa.me/5593996589790?text=${encodeURIComponent(text)}`, '_blank');
  }

  // --- Games Catalog Accordion Render ---
  function renderGamesCatalog() {
    const container = document.getElementById('games-accordion-container');
    if (!container) return;

    const query = (document.getElementById('games-search-input')?.value || '').toLowerCase().trim();
    const isSearching = query.length > 0;

    container.innerHTML = '';

    const filteredCatalog = GAME_CATALOG.map((cat) => {
      const filteredGames = cat.games.filter((game) => game.toLowerCase().includes(query));
      return { ...cat, games: filteredGames };
    }).filter((cat) => cat.games.length > 0);

    if (filteredCatalog.length === 0) {
      container.innerHTML = `
        <div class="text-center py-8 text-slate-400 text-xs">
          Nenhum jogo encontrado com "${query}".
        </div>
      `;
      return;
    }

    filteredCatalog.forEach((cat) => {
      const isExpanded = isSearching || !!expandedCategories[cat.name];

      const catDiv = document.createElement('div');
      catDiv.className = 'border border-slate-200/90 rounded-2xl overflow-hidden transition-all bg-white';

      const toggleBtn = document.createElement('button');
      toggleBtn.type = 'button';
      toggleBtn.className = 'w-full p-3.5 sm:p-4 flex items-center justify-between bg-slate-50/80 hover:bg-slate-100 transition-colors text-left cursor-pointer';
      toggleBtn.innerHTML = `
        <div class="flex items-center gap-2.5">
          <span class="text-base">${cat.emoji}</span>
          <span class="font-bold text-slate-800 text-xs sm:text-sm">${cat.name}</span>
          <span class="text-xs text-slate-400 font-medium">(${cat.games.length} ${cat.games.length === 1 ? 'jogo' : 'jogos'})</span>
        </div>
        <div class="text-slate-400">
          <i data-lucide="${isExpanded ? 'chevron-up' : 'chevron-down'}" class="w-5 h-5 ${isExpanded ? 'text-[#0D3BFF]' : ''}"></i>
        </div>
      `;

      toggleBtn.addEventListener('click', () => {
        expandedCategories[cat.name] = !expandedCategories[cat.name];
        renderGamesCatalog();
      });

      catDiv.appendChild(toggleBtn);

      if (isExpanded) {
        const contentGrid = document.createElement('div');
        contentGrid.className = 'p-3 sm:p-4 bg-white border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-2';

        cat.games.forEach((game) => {
          const gameItem = document.createElement('div');
          gameItem.className = 'p-2.5 rounded-xl border border-slate-200/90 bg-slate-50/50 text-slate-800 text-xs font-semibold flex items-center justify-between';
          gameItem.innerHTML = `
            <span class="truncate pr-2">${game}</span>
            <span class="text-[10px] font-bold text-[#0D3BFF] bg-blue-100/80 px-2 py-0.5 rounded-md shrink-0">Disponível</span>
          `;
          contentGrid.appendChild(gameItem);
        });

        catDiv.appendChild(contentGrid);
      }

      container.appendChild(catDiv);
    });

    if (window.lucide) window.lucide.createIcons();
  }

  // --- DatePicker Modal Logic ---
  function openDatePicker(target) {
    dpTarget = target;
    const initialDate = target === 'ps5' ? ps5DeliveryDate : bikeDeliveryDate;
    dpCalendarDate = new Date(initialDate);
    dpSelectedDate = new Date(initialDate);

    openModal('modal-datepicker');
    renderCalendar();
  }

  function renderCalendar() {
    const monthYearLabel = document.getElementById('calendar-month-year-label');
    const daysGrid = document.getElementById('calendar-days-grid');
    const previewReceipt = document.getElementById('dp-preview-receipt');
    const previewReturn = document.getElementById('dp-preview-return');

    const monthNames = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    const year = dpCalendarDate.getFullYear();
    const month = dpCalendarDate.getMonth();

    monthYearLabel.textContent = `${monthNames[month]} ${year}`;

    // Get first day of month and total days in month
    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    daysGrid.innerHTML = '';

    // Empty padding slots
    for (let i = 0; i < firstDayIndex; i++) {
      const emptyDiv = document.createElement('div');
      daysGrid.appendChild(emptyDiv);
    }

    // Days
    for (let day = 1; day <= totalDays; day++) {
      const dayDate = new Date(year, month, day);
      dayDate.setHours(0, 0, 0, 0);

      const dayBtn = document.createElement('button');
      dayBtn.type = 'button';
      dayBtn.textContent = day;

      const isPast = dayDate < today;
      const isSelected = dayDate.getTime() === dpSelectedDate.getTime();

      if (isPast) {
        dayBtn.className = 'p-2 text-center text-slate-300 rounded-xl cursor-not-allowed';
        dayBtn.disabled = true;
      } else if (isSelected) {
        dayBtn.className = 'p-2 text-center font-bold text-white bg-[#0D3BFF] rounded-xl shadow-xs';
      } else {
        dayBtn.className = 'p-2 text-center font-semibold text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer';
      }

      if (!isPast) {
        dayBtn.addEventListener('click', () => {
          dpSelectedDate = new Date(dayDate);
          renderCalendar();
        });
      }

      daysGrid.appendChild(dayBtn);
    }

    // Update Preview
    const currentPlan = dpTarget === 'ps5' ? ps5Plans[ps5Period] : bikePlans[bikePeriod];
    const calculatedReturn = getCalculatedReturnDate(dpSelectedDate, currentPlan.durationDays);

    previewReceipt.textContent = formatDateShort(dpSelectedDate);
    previewReturn.textContent = formatDateShort(calculatedReturn);
  }

  // Initial Setup Calls
  updatePs5DatesDisplay();
  updateBikeSummary();
});
