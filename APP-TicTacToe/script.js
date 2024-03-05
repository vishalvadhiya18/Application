let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

function startGame() {
  gameState = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;
  document.getElementById('winOverlay').style.display = 'none';
  document.querySelectorAll('.game-board div').forEach(cell => {
    cell.innerText = '';
    cell.classList.remove('hover-X', 'hover-O');
  });
}

function showOverlay(message) {
  const overlay = document.getElementById('winOverlay');
  const winMessage = document.getElementById('winMessage');
  winMessage.innerText = message;
  overlay.classList.add('fade-in');
  overlay.style.display = 'flex';

  setTimeout(() => {
    overlay.classList.remove('fade-in');
    overlay.classList.add('fade-out');
  }, 2000); // Adjust the duration as needed, here it's set to 2 seconds (2000ms)
}

function checkWin() {
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  return winningConditions.some(condition => {
    return condition.every(index => {
      return gameState[index] === currentPlayer;
    });
  });
}

function handleCellClick(clickedCell, clickedCellIndex) {
  if (!gameActive || gameState[clickedCellIndex] !== '') return;

  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.innerText = currentPlayer;
  clickedCell.classList.add(currentPlayer);

  if (checkWin()) {
    showOverlay(`Player ${currentPlayer} wins!`);
    gameActive = false;
    return;
  }

  if (!gameState.includes('')) {
    showOverlay('Game ended in a draw!');
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function handleCellHover() {
  if (!gameActive || this.innerText !== '') return;
  this.classList.add('hover-' + currentPlayer);
}

function handleCellLeave() {
  this.classList.remove('hover-' + currentPlayer);
}

function createGameBoard() {
  const gameBoard = document.getElementById('gameBoard');
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    gameBoard.appendChild(cell);
    cell.addEventListener('click', () => handleCellClick(cell, i));
    cell.addEventListener('mouseover', handleCellHover);
    cell.addEventListener('mouseleave', handleCellLeave);
  }
}

function restartAnimation() {
  const restartBtn = document.querySelector('.restart-button');
  restartBtn.style.animation = 'none';
  restartBtn.offsetHeight; /* Trigger reflow */
  restartBtn.style.animation = null;
}

createGameBoard();
