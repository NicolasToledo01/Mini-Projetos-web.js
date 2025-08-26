document.addEventListener("DOMContentLoaded", function () {
  const tabuleiro = document.getElementById("tabuleiro");
  const statusDiv = document.getElementById("status");
  const reiniciarBtn = document.getElementById("reiniciar");
  let jogadorAtual = "X";
  let jogoAtivo = true;
  let estado = ["", "", "", "", "", "", "", "", ""];

  const vitorias = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // linhas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // colunas
    [0, 4, 8], [2, 4, 6]          // diagonais
  ];

  function atualizarStatus(msg) {
    statusDiv.textContent = msg;
  }

  function checarVitoria() {
    for (const condicao of vitorias) {
      const [a, b, c] = condicao;
      if (
        estado[a] &&
        estado[a] === estado[b] &&
        estado[a] === estado[c]
      ) {
        jogoAtivo = false;
        atualizarStatus(`Jogador ${estado[a]} venceu!`);
        condicao.forEach(i => tabuleiro.children[i].classList.add('vencedor'));
        return true;
      }
    }
    if (!estado.includes("")) {
      jogoAtivo = false;
      atualizarStatus("Empate!");
      return true;
    }
    return false;
  }

  function cliqueCelula(e) {
    const idx = e.target.dataset.index;
    if (!jogoAtivo || estado[idx]) return;
    estado[idx] = jogadorAtual;
    e.target.textContent = jogadorAtual;
    e.target.classList.add(jogadorAtual === "X" ? "x" : "o");
    if (!checarVitoria()) {
      jogadorAtual = jogadorAtual === "X" ? "O" : "X";
      atualizarStatus(`Vez do jogador ${jogadorAtual}`);
    }
  }

  function reiniciarJogo() {
    estado = ["", "", "", "", "", "", "", "", ""];
    jogadorAtual = "X";
    jogoAtivo = true;
    Array.from(tabuleiro.children).forEach(celula => {
      celula.textContent = "";
      celula.classList.remove("x", "o", "vencedor");
    });
    atualizarStatus(`Vez do jogador ${jogadorAtual}`);
  }

  Array.from(tabuleiro.children).forEach(celula => {
    celula.addEventListener("click", cliqueCelula);
  });
  reiniciarBtn.addEventListener("click", reiniciarJogo);

  reiniciarJogo();
});
