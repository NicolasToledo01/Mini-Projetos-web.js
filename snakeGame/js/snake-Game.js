const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreSpan = document.getElementById('score');
const restartBtn = document.getElementById('restart');

const gridSize = 16;
const tileCount = 20;
let snake, direction, food, score, gameOver, moveQueue, intervalId;

function iniciarJogo() {
  snake = [{ x: 10, y: 10 }];
  direction = { x: 0, y: 0 };
  moveQueue = [];
  score = 0;
  gameOver = false;
  gerarComida();
  scoreSpan.textContent = score;
  direction = { x: 1, y: 0 }; // começa indo para direita
  clearInterval(intervalId);
  intervalId = setInterval(gameLoop, 100);
}

function gerarComida() {
  food = {
    x: Math.floor(Math.random() * tileCount),
    y: Math.floor(Math.random() * tileCount)
  };
  // Evita comida em cima da cobra
  if (snake.some(s => s.x === food.x && s.y === food.y)) {
    gerarComida();
  }
}

function gameLoop() {
  if (gameOver) return;

  // Movimento
  if (moveQueue.length) {
    direction = moveQueue.shift();
  }
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

  // Verifica colisão com paredes
  if (
    head.x < 0 || head.x >= tileCount ||
    head.y < 0 || head.y >= tileCount
  ) {
    fimDeJogo();
    return;
  }

  // Verifica colisão com o próprio corpo
  if (snake.some(s => s.x === head.x && s.y === head.y)) {
    fimDeJogo();
    return;
  }

  snake.unshift(head);

  // Verifica se comeu a comida
  if (head.x === food.x && head.y === food.y) {
    score++;
    scoreSpan.textContent = score;
    gerarComida();
  } else {
    snake.pop();
  }

  desenhar();
}

function desenhar() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Desenha comida
  ctx.fillStyle = "#ff6cff";
  ctx.shadowColor = "#ff6cff";
  ctx.shadowBlur = 10;
  ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
  ctx.shadowBlur = 0;

  // Desenha cobra
  snake.forEach((segment, i) => {
    ctx.fillStyle = i === 0 ? "#b47cff" : "#6c2eb7";
    ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
    ctx.strokeStyle = "#1a0022";
    ctx.strokeRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
  });

  // Game Over
  if (gameOver) {
    ctx.fillStyle = "#fff";
    ctx.font = "bold 22px Segoe UI";
    ctx.textAlign = "center";
    ctx.fillText("Game Over!", canvas.width / 2, canvas.height / 2);
  }
}

function fimDeJogo() {
  gameOver = true;
  desenhar();
  clearInterval(intervalId);
}

document.addEventListener('keydown', function (e) {
  if (gameOver) return;
  let novaDirecao;
  switch (e.key) {
    case 'ArrowUp':
      novaDirecao = { x: 0, y: -1 };
      break;
    case 'ArrowDown':
      novaDirecao = { x: 0, y: 1 };
      break;
    case 'ArrowLeft':
      novaDirecao = { x: -1, y: 0 };
      break;
    case 'ArrowRight':
      novaDirecao = { x: 1, y: 0 };
      break;
    default:
      return;
  }
  // Evita reversão direta
  if (
    snake.length > 1 &&
    snake[0].x + novaDirecao.x === snake[1].x &&
    snake[0].y + novaDirecao.y === snake[1].y
  ) {
    return;
  }
  moveQueue.push(novaDirecao);
});

restartBtn.addEventListener('click', iniciarJogo);

iniciarJogo();
