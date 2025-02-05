const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset");

let currentPlayer = "X";
let boardState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]  // Diagonals
];

function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute("data-index");

    if (boardState[index] !== "" || !gameActive) return;

    boardState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add("taken");

    if (checkWinner()) {
        statusText.textContent = `Player ${currentPlayer} Wins!`;
        gameActive = false;
        return;
    }

    if (boardState.every(cell => cell !== "")) {
        statusText.textContent = "It's a Draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function checkWinner() {
    return winningConditions.some(condition => {
        const [a, b, c] = condition;
        return boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c];
    });
}

function resetGame() {
    boardState = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    statusText.textContent = "Player X's Turn";
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("taken");
    });
}

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", resetGame);
