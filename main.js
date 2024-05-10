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

const table = document.getElementById('speed-limits-table');
const tbody = table.createTBody();
tbody.classList.add('bg-white', 'divide-y');

function createTableCell(
  speed,
  content = '?',
  classes = ['whitespace-nowrap', 'px-3', 'py-4', 'text-sm', 'text-gray-500']
) {
  const cell = document.createElement('td');
  cell.textContent = content;
  cell.classList.add(...classes);
  cell.tabIndex = 0;
  if (content === '?') {
    cell.classList.add('cursor-pointer', 'hover:text-blue-700', 'text-center');
    cell.dataset.speed = speed;
    cell.addEventListener('click', () => {
      openModal(cell);
    });
  }
  return cell;
}

// Generate table dynamically
vehicles.forEach((vehicle, i) => {
  const row = tbody.insertRow();
  row.classList.add(i % 2 === 0 ? 'bg-white' : 'bg-slate-100');

  row.appendChild(
    createTableCell(NaN, vehicle.type, [
      'whitespace-nowrap',
      'py-4',
      'pl-4',
      'pr-3',
      'text-sm',
      'font-medium',
      'text-gray-900',
      'sm:pl-6',
    ])
  );
  row.appendChild(createTableCell(vehicle.localidades.zonasCoexistencia));
  row.appendChild(createTableCell(vehicle.localidades.outrasZonas));
  row.appendChild(createTableCell(vehicle.foraLocalidades));
  row.appendChild(createTableCell(vehicle.viasReservadas));
  row.appendChild(createTableCell(vehicle.autoestradas));
});

// Modal
const modal = document.getElementById('modal');
const speedInput = document.getElementById('speed-input');
const closeModal = document.getElementById('close-modal');
const incorrectSpeedWarning = document.getElementById(
  'incorrect-speed-warning'
);
const cleanIncorrectAnswer = document.getElementById('clean-incorrect-answer');
const submitSpeed = document.getElementById('submit-speed');

function openModal(clickedCell) {
  modal.classList.remove('hidden');
  speedInput.focus();

  const vehicleType = clickedCell.parentNode.querySelector('td').textContent;
  const table = clickedCell.closest('table');

  let roadType;

  const columnIndex = clickedCell.cellIndex;

  if (columnIndex === 1) {
    // Zona Coexistência
    const roadTypeHeading = table.querySelector(
      'thead tr th:nth-child(2)'
    ).textContent;
    const roadTypeSubheading = table.querySelector(
      'thead tr:nth-child(2) th'
    ).textContent;
    roadType = `${roadTypeSubheading} (${roadTypeHeading})`;
  } else if (columnIndex === 2) {
    // Outras Zonas
    const roadTypeHeading = table.querySelector(
      'thead tr th:nth-child(2)'
    ).textContent;
    const roadTypeSubheading = table.querySelector(
      'thead tr:nth-child(2) th:nth-child(2)'
    ).textContent;
    roadType = `${roadTypeSubheading} (${roadTypeHeading})`;
  } else {
    roadType =
      table.querySelector('thead tr').children[columnIndex - 1].textContent;
  }

  const modalTitle = document.getElementById('modal-title');
  modalTitle.innerHTML = `<span class="font-normal">de</span> <span class="text-indigo-400">${vehicleType}</span><br> <span class="font-normal">em</span> <span class="text-purple-400">${roadType}</span>`;

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

    // reset colors
    clickedCell.classList.remove('text-green-500', 'text-red-500');

    if (!isNaN(enteredSpeed)) {
      let expectedSpeed = parseInt(clickedCell.dataset.speed);
      if (isNaN(expectedSpeed)) expectedSpeed = 0;
      if (enteredSpeed === expectedSpeed) {
        clickedCell.textContent = enteredSpeed || '-';
        clickedCell.classList.add('text-green-500');
        closeModal.click();
      } else {
        clickedCell.textContent = 'x';
        clickedCell.classList.remove('text-gray-500');
        clickedCell.classList.add('text-red-500');
        incorrectSpeedWarning.classList.remove('hidden');
      }
    }
  }

  function closeAndCleanup() {
    modal.classList.add('hidden');
    incorrectSpeedWarning.classList.add('hidden');
    speedInput.value = '';
    speedInput.removeEventListener('keypress', handleKeyPress);
    submitSpeed.removeEventListener('click', submitSpeedHandler);
    closeModal.removeEventListener('click', closeAndCleanup);
    document.removeEventListener('keydown', handleKeyPress);
    document.removeEventListener('click', closeOnOutsideClick);
    cleanIncorrectAnswer.removeEventListener('click');
  }

  function closeOnOutsideClick(event) {
    const modalContent = document.querySelector(
      '.bg-white.rounded-lg.p-8.max-w-md'
    );
    if (!modalContent.contains(event.target) && event.target !== clickedCell) {
      closeAndCleanup();
    }
  }

  speedInput.addEventListener('keypress', handleKeyPress);
  submitSpeed.addEventListener('click', submitSpeedHandler);
  closeModal.addEventListener('click', closeAndCleanup);
  document.addEventListener('keydown', handleKeyPress);
  document.addEventListener('click', closeOnOutsideClick);
  cleanIncorrectAnswer.addEventListener('click', () => {
    incorrectSpeedWarning.classList.add('hidden');
    speedInput.value = '';
  });
}
