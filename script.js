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

    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    if (checkWin()) {
        statusElement.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
    } else if (board.every(cell => cell)) {
        statusElement.textContent = 'Draw!';
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusElement.textContent = `Player ${currentPlayer}'s turn`;
    }
});

function checkWin() {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return board[index] === currentPlayer;
        });
    });
}
