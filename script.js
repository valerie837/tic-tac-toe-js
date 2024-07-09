const boardElement = document.getElementById('board');
const statusElement = document.getElementById('status');
let board = Array(9).fill(null);
let currentPlayer = 'X';
let gameActive = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

boardElement.addEventListener('click', (event) => {
    const index = event.target.dataset.index;

    if (!index || !gameActive || board[index]) return;

    makeMove(index, currentPlayer);

    if (gameActive) {
        currentPlayer = 'O';
        statusElement.textContent = `Player ${currentPlayer}'s turn`;
        setTimeout(computerMove, 500);
    }
});

function makeMove(index, player) {
    board[index] = player;
    document.querySelector(`[data-index="${index}"]`).textContent = player;

    if (checkWin(player)) {
        statusElement.textContent = `Player ${player} wins!`;
        gameActive = false;
    } else if (board.every(cell => cell)) {
        statusElement.textContent = 'Draw!';
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusElement.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function checkWin(player) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return board[index] === player;
        });
    });
}

function computerMove() {
    let availableCells = board.map((cell, index) => cell === null ? index : null).filter(index => index !== null);
    let randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];

    if (randomIndex !== undefined) {
        makeMove(randomIndex, 'O');
    }
}
