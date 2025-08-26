function atualizarRelogio() {
  const agora = new Date();
  const horas = String(agora.getHours()).padStart(2, '0');
  const minutos = String(agora.getMinutes()).padStart(2, '0');
  const segundos = String(agora.getSeconds()).padStart(2, '0');
  document.getElementById('relogio').textContent = `${horas}:${minutos}:${segundos}`;
}

setInterval(atualizarRelogio, 1000);
atualizarRelogio();

const btnToggle = document.getElementById('toggle-mode');
btnToggle.addEventListener('click', function () {
  document.body.classList.toggle('dark-mode');
  btnToggle.textContent = document.body.classList.contains('dark-mode')
    ? 'Modo Claro'
    : 'Modo Escuro';
});
