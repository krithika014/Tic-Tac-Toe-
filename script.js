let board = document.getElementById("board");
let statusDiv = document.getElementById("status");
let modeSelect = document.getElementById("mode");

let currentPlayer = "X";
let gameActive = true;
let boardState = Array(9).fill(null);
let mode = "2p";

const winPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

function startGame() {
  mode = modeSelect.value;
  resetGame();
}

function createBoard() {
  board.innerHTML = "";
  boardState = Array(9).fill(null);
  gameActive = true;
  currentPlayer = "X";
  statusDiv.textContent = "Player X's turn";

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.addEventListener("click", handleMove);
    board.appendChild(cell);
  }
}

function handleMove(e) {
  const index = e.target.dataset.index;
  if (!gameActive || boardState[index]) return;

  boardState[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.classList.add("taken");

  if (checkWin()) {
    statusDiv.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  if (boardState.every(cell => cell)) {
    statusDiv.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDiv.textContent = `Player ${currentPlayer}'s turn`;

  if (mode === "ai" && currentPlayer === "O") {
    setTimeout(aiMove, 500);
  }
}

function checkWin() {
  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c];
  });
}

function aiMove() {
  if (!gameActive) return;

  const emptyIndices = boardState
    .map((val, idx) => val === null ? idx : null)
    .filter(idx => idx !== null);

  const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  const cell = document.querySelector(`.cell[data-index='${randomIndex}']`);
  handleMove({ target: cell });
}

function resetGame() {
  createBoard();
}
