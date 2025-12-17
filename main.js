// Vehicle data with speed limits
const vehicles = [
  {
    type: 'Ciclomotores e Quadriciclos <50cm³',
    localidades: { zonasCoexistencia: 20, outrasZonas: 40 },
    foraLocalidades: 45,
    viasReservadas: null,
    autoestradas: null,
  },
  {
    type: 'Motociclos >50cm³ S/ Carro Lateral',
    localidades: { zonasCoexistencia: 20, outrasZonas: 50 },
    foraLocalidades: 90,
    viasReservadas: 100,
    autoestradas: 120,
  },
  {
    type: 'Motociclos >50cm³ C/ Carro Lateral ou Reboque',
    localidades: { zonasCoexistencia: 20, outrasZonas: 50 },
    foraLocalidades: 70,
    viasReservadas: 80,
    autoestradas: 100,
  },
  {
    type: 'Motociclo <=50cm³',
    localidades: { zonasCoexistencia: 20, outrasZonas: 40 },
    foraLocalidades: 60,
    viasReservadas: null,
    autoestradas: null,
  },
  {
    type: 'Triciclos',
    localidades: { zonasCoexistencia: 20, outrasZonas: 50 },
    foraLocalidades: 80,
    viasReservadas: 90,
    autoestradas: 100,
  },
  {
    type: 'Automóveis Lig. Pass. e Mistos S/ Reboque',
    localidades: { zonasCoexistencia: 20, outrasZonas: 50 },
    foraLocalidades: 90,
    viasReservadas: 100,
    autoestradas: 120,
  },
  {
    type: 'Automóveis Lig. Pass. e Mistos C/ Reboque',
    localidades: { zonasCoexistencia: 20, outrasZonas: 50 },
    foraLocalidades: 70,
    viasReservadas: 80,
    autoestradas: 100,
  },
  {
    type: 'Automóveis Lig. Mercadorias S/ Reboque',
    localidades: { zonasCoexistencia: 20, outrasZonas: 50 },
    foraLocalidades: 80,
    viasReservadas: 90,
    autoestradas: 110,
  },
  {
    type: 'Automóveis Lig. Mercadorias C/ Reboque',
    localidades: { zonasCoexistencia: 20, outrasZonas: 50 },
    foraLocalidades: 70,
    viasReservadas: 80,
    autoestradas: 90,
  },
  {
    type: 'Automóveis Pes. Pass. S/ Reboque',
    localidades: { zonasCoexistencia: 20, outrasZonas: 50 },
    foraLocalidades: 80,
    viasReservadas: 90,
    autoestradas: 100,
  },
  {
    type: 'Automóveis Pes. Pass. C/ Reboque',
    localidades: { zonasCoexistencia: 20, outrasZonas: 50 },
    foraLocalidades: 70,
    viasReservadas: 90,
    autoestradas: 90,
  },
  {
    type: 'Automóveis Pes. Mercad. S/ Reboque',
    localidades: { zonasCoexistencia: 20, outrasZonas: 50 },
    foraLocalidades: 80,
    viasReservadas: 80,
    autoestradas: 90,
  },
  {
    type: 'Automóveis Pes. Mercad. C/ Reboque',
    localidades: { zonasCoexistencia: 20, outrasZonas: 40 },
    foraLocalidades: 70,
    viasReservadas: 70,
    autoestradas: 80,
  },
  {
    type: 'Tratores Agrícolas ou Florestais',
    localidades: { zonasCoexistencia: 20, outrasZonas: 30 },
    foraLocalidades: 40,
    viasReservadas: null,
    autoestradas: null,
  },
  {
    type: 'Máquinas Agrícolas, Motocultivadores e Tratocarros',
    localidades: { zonasCoexistencia: 20, outrasZonas: 20 },
    foraLocalidades: 20,
    viasReservadas: null,
    autoestradas: null,
  },
  {
    type: 'Máquinas Industriais S/ Matrícula',
    localidades: { zonasCoexistencia: 20, outrasZonas: 30 },
    foraLocalidades: 30,
    viasReservadas: null,
    autoestradas: null,
  },
  {
    type: 'Máquinas Industriais C/ Matrícula',
    localidades: { zonasCoexistencia: 20, outrasZonas: 40 },
    foraLocalidades: 70,
    viasReservadas: 70,
    autoestradas: 80,
  },
];

// State management
let totalCells = 0;
let correctAnswers = 0;
let interactiveCells = [];

// DOM Elements
const table = document.getElementById('speed-limits-table');
const tbody = table.createTBody();
const correctCountEl = document.getElementById('correct-count');
const totalCountEl = document.getElementById('total-count');
const progressBar = document.getElementById('progress-bar');
const resetBtn = document.getElementById('reset-btn');
const celebration = document.getElementById('celebration');
const completionModal = document.getElementById('completion-modal');
const restartBtn = document.getElementById('restart-btn');

// Modal elements
const modal = document.getElementById('modal');
const modalBackdrop = document.getElementById('modal-backdrop');
const modalContent = document.getElementById('modal-content');
const speedInput = document.getElementById('speed-input');
const closeModal = document.getElementById('close-modal');
const closeModalX = document.getElementById('close-modal-x');
const incorrectSpeedWarning = document.getElementById('incorrect-speed-warning');
const submitSpeed = document.getElementById('submit-speed');

// Create a table cell
function createTableCell(speed, content = '?', isVehicleName = false) {
  const cell = document.createElement('td');

  if (isVehicleName) {
    // Vehicle name cell styling
    cell.className = 'py-4 pl-4 pr-3 text-sm font-medium text-slate-900 sm:pl-6';
    cell.innerHTML = `
      <div class="flex items-center gap-2">
        <span class="hidden sm:inline-flex w-2 h-2 rounded-full bg-indigo-400"></span>
        <span>${content}</span>
      </div>
    `;
  } else {
    // Speed cell styling
    cell.className = 'speed-cell whitespace-nowrap px-3 py-4 text-center text-sm font-medium border-l border-slate-100';

    if (content === '?') {
      cell.innerHTML = `
        <span class="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12
          bg-indigo-50 hover:bg-indigo-100 text-indigo-600 hover:text-indigo-700
          rounded-xl cursor-pointer font-bold text-lg
          transform hover:scale-105 active:scale-95
          focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
          transition-all duration-150">?</span>
      `;
      cell.dataset.speed = speed;
      cell.dataset.answered = 'false';
      cell.tabIndex = 0;
      cell.setAttribute('role', 'button');
      cell.setAttribute('aria-label', 'Inserir velocidade');

      // Click handler
      cell.addEventListener('click', () => openModal(cell));

      // Keyboard handler
      cell.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openModal(cell);
        }
      });

      interactiveCells.push(cell);
      totalCells++;
    } else {
      cell.textContent = content;
      cell.classList.add('text-slate-500');
    }
  }

  return cell;
}

// Generate table
function generateTable() {
  tbody.innerHTML = '';
  interactiveCells = [];
  totalCells = 0;
  correctAnswers = 0;

  tbody.classList.add('divide-y', 'divide-slate-100');

  vehicles.forEach((vehicle, i) => {
    const row = tbody.insertRow();
    row.classList.add(
      i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50',
      'hover:bg-indigo-50/30',
      'transition-colors'
    );

    row.appendChild(createTableCell(NaN, vehicle.type, true));
    row.appendChild(createTableCell(vehicle.localidades.zonasCoexistencia));
    row.appendChild(createTableCell(vehicle.localidades.outrasZonas));
    row.appendChild(createTableCell(vehicle.foraLocalidades));
    row.appendChild(createTableCell(vehicle.viasReservadas));
    row.appendChild(createTableCell(vehicle.autoestradas));
  });

  updateProgress();
}

// Update progress display
function updateProgress() {
  correctCountEl.textContent = correctAnswers;
  totalCountEl.textContent = totalCells;

  const percentage = totalCells > 0 ? (correctAnswers / totalCells) * 100 : 0;
  progressBar.style.width = `${percentage}%`;

  // Check for completion
  if (correctAnswers === totalCells && totalCells > 0) {
    setTimeout(showCompletionModal, 500);
  }
}

// Show success celebration
function showCelebration() {
  celebration.classList.remove('hidden');
  setTimeout(() => {
    celebration.classList.add('hidden');
  }, 1000);
}

// Show completion modal
function showCompletionModal() {
  completionModal.classList.remove('hidden');
}

// Hide completion modal
function hideCompletionModal() {
  completionModal.classList.add('hidden');
}

// Reset game
function resetGame() {
  hideCompletionModal();
  generateTable();
}

// Open modal
function openModal(clickedCell) {
  // Don't reopen if already answered correctly
  if (clickedCell.dataset.answered === 'true') return;

  modal.classList.remove('hidden');

  // Animate modal in
  requestAnimationFrame(() => {
    modalContent.classList.add('animate-slide-up');
  });

  speedInput.value = '';
  speedInput.focus();
  incorrectSpeedWarning.classList.add('hidden');

  // Get context info
  const vehicleType = clickedCell.parentNode.querySelector('td').textContent.trim();
  const columnIndex = clickedCell.cellIndex;

  let roadType;
  if (columnIndex === 1) {
    roadType = 'Zona Coexistência (Dentro Localidades)';
  } else if (columnIndex === 2) {
    roadType = 'Outras Zonas (Dentro Localidades)';
  } else {
    const roadTypes = ['', '', '', 'Fora Localidades', 'Vias Reservadas', 'Auto-Estradas'];
    roadType = roadTypes[columnIndex] || '';
  }

  // Update modal title
  const modalTitle = document.getElementById('modal-title');
  modalTitle.innerHTML = `
    <div class="space-y-2">
      <div class="flex items-center gap-2 text-sm">
        <span class="text-slate-500">Veículo:</span>
        <span class="font-semibold text-indigo-600">${vehicleType}</span>
      </div>
      <div class="flex items-center gap-2 text-sm">
        <span class="text-slate-500">Via:</span>
        <span class="font-semibold text-purple-600">${roadType}</span>
      </div>
    </div>
  `;

  // Event handlers
  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      submitSpeedHandler();
    } else if (event.key === 'Escape') {
      event.preventDefault();
      closeAndCleanup();
    }
  }

  function submitSpeedHandler() {
    const enteredSpeed = parseInt(speedInput.value);

    if (isNaN(enteredSpeed)) {
      // Shake input for empty submission
      speedInput.classList.add('animate-shake', 'border-red-300');
      setTimeout(() => {
        speedInput.classList.remove('animate-shake', 'border-red-300');
      }, 500);
      return;
    }

    let expectedSpeed = parseInt(clickedCell.dataset.speed);
    if (isNaN(expectedSpeed)) expectedSpeed = 0;

    if (enteredSpeed === expectedSpeed) {
      // Correct answer
      const displayValue = enteredSpeed === 0 ? '—' : enteredSpeed;
      clickedCell.innerHTML = `
        <span class="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12
          bg-green-100 text-green-600 rounded-xl font-bold text-lg animate-bounce-in">
          ${displayValue}
        </span>
      `;
      clickedCell.dataset.answered = 'true';
      clickedCell.classList.remove('cursor-pointer');
      clickedCell.removeAttribute('tabindex');
      clickedCell.removeAttribute('role');

      correctAnswers++;
      updateProgress();

      closeAndCleanup();
      showCelebration();
    } else {
      // Incorrect answer
      clickedCell.innerHTML = `
        <span class="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12
          bg-red-100 text-red-500 rounded-xl font-bold text-lg animate-shake">
          ✕
        </span>
      `;

      incorrectSpeedWarning.classList.remove('hidden');
      speedInput.value = '';
      speedInput.focus();

      // Reset cell to interactive after a delay
      setTimeout(() => {
        if (clickedCell.dataset.answered !== 'true') {
          clickedCell.innerHTML = `
            <span class="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12
              bg-indigo-50 hover:bg-indigo-100 text-indigo-600 hover:text-indigo-700
              rounded-xl cursor-pointer font-bold text-lg
              transform hover:scale-105 active:scale-95
              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
              transition-all duration-150">?</span>
          `;
        }
      }, 1500);
    }
  }

  function closeAndCleanup() {
    modal.classList.add('hidden');
    modalContent.classList.remove('animate-slide-up');
    incorrectSpeedWarning.classList.add('hidden');
    speedInput.value = '';

    // Remove event listeners
    speedInput.removeEventListener('keypress', handleKeyPress);
    submitSpeed.removeEventListener('click', submitSpeedHandler);
    closeModal.removeEventListener('click', closeAndCleanup);
    closeModalX.removeEventListener('click', closeAndCleanup);
    document.removeEventListener('keydown', handleKeyPress);
    modalBackdrop.removeEventListener('click', closeAndCleanup);
  }

  // Attach event listeners
  speedInput.addEventListener('keypress', handleKeyPress);
  submitSpeed.addEventListener('click', submitSpeedHandler);
  closeModal.addEventListener('click', closeAndCleanup);
  closeModalX.addEventListener('click', closeAndCleanup);
  document.addEventListener('keydown', handleKeyPress);
  modalBackdrop.addEventListener('click', closeAndCleanup);
}

// Initialize
generateTable();

// Reset button handler
resetBtn.addEventListener('click', resetGame);

// Restart button handler (in completion modal)
restartBtn.addEventListener('click', resetGame);

// Prevent zoom on double-tap for mobile
document.addEventListener('touchend', (e) => {
  const now = Date.now();
  if (now - (window.lastTouchEnd || 0) < 300) {
    e.preventDefault();
  }
  window.lastTouchEnd = now;
}, { passive: false });
