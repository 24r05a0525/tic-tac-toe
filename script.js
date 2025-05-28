const board = document.getElementById('gameBoard');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('resetButton');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

function checkWinner() {
  const winningCombos = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  for (let combo of winningCombos) {
    const [a, b, c] = combo;
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      gameActive = false;
      statusText.textContent = `Player ${gameState[a]} Wins!`;
      return;
    }
  }

  if (!gameState.includes("")) {
    gameActive = false;
    statusText.textContent = "It's a Draw!";
  }
}

function handleCellClick(e) {
  const cell = e.target;
  const index = cell.getAttribute('data-index');

  if (!gameState[index] && gameActive) {
    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    checkWinner();
    if (gameActive) {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      statusText.textContent = `Player ${currentPlayer}'s Turn`;
    }
  }
}

function createBoard() {
  board.innerHTML = '';
  gameState = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = 'X';
  gameActive = true;
  statusText.textContent = `Player ${currentPlayer}'s Turn`;

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.setAttribute('data-index', i);
    cell.addEventListener('click', handleCellClick);
    board.appendChild(cell);
  }
}

resetButton.addEventListener('click', createBoard);

createBoard(); // Initialize the game
