const form = document.getElementById('todo-form');
const tituloInput = document.getElementById('titulo');
const descricaoInput = document.getElementById('descricao');
const listaTarefas = document.getElementById('lista-tarefas');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const titulo = tituloInput.value.trim();
  const descricao = descricaoInput.value.trim();

  if (!titulo) {
    tituloInput.focus();
    return;
  }

  const li = document.createElement('li');
  li.className = 'tarefa';
  li.innerHTML = `
    <div class="tarefa-titulo">${titulo}</div>
    <div class="tarefa-descricao">${descricao}</div>
    <button class="excluir">Excluir</button>
  `;
  listaTarefas.appendChild(li);

  li.querySelector('.excluir').addEventListener('click', function () {
    li.remove();
  });

  form.reset();
  tituloInput.focus();
});
