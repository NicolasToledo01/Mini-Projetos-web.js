let segundos = 0;
let minutos = 0;
let horas = 0;
let intervalo = null;
let rodando = false;

const display = document.getElementById('display');
const btnStart = document.getElementById('start');
const btnPause = document.getElementById('pause');
const btnReset = document.getElementById('reset');
const btnToggle = document.getElementById('toggle-mode');

function atualizarDisplay() {
  const h = String(horas).padStart(2, '0');
  const m = String(minutos).padStart(2, '0');
  const s = String(segundos).padStart(2, '0');
  display.textContent = `${h}:${m}:${s}`;
}

function iniciar() {
  if (rodando) return;
  rodando = true;
  intervalo = setInterval(() => {
    segundos++;
    if (segundos >= 60) {
      segundos = 0;
      minutos++;
    }
    if (minutos >= 60) {
      minutos = 0;
      horas++;
    }
    atualizarDisplay();
  }, 1000);
}

function pausar() {
  rodando = false;
  clearInterval(intervalo);
}

function zerar() {
  pausar();
  segundos = 0;
  minutos = 0;
  horas = 0;
  atualizarDisplay();
}

btnStart.addEventListener('click', iniciar);
btnPause.addEventListener('click', pausar);
btnReset.addEventListener('click', zerar);

btnToggle.addEventListener('click', function () {
  document.body.classList.toggle('dark-mode');
  btnToggle.textContent = document.body.classList.contains('dark-mode')
    ? 'Modo Claro'
    : 'Modo Escuro';
});

atualizarDisplay();
