/* script.js */
let board = Array(9).fill(null);
let currentPlayer = "X";
let gameOver = false;

function createBoard() {
    const boardContainer = document.getElementById("board");
    boardContainer.innerHTML = "";
    board.forEach((value, index) => {
        const cell = document.createElement("button");
        cell.classList.add("cell");
        cell.innerText = value || "";
        cell.disabled = value !== null || gameOver;
        cell.onclick = () => makeMove(index);
        boardContainer.appendChild(cell);
    });
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for (let combo of winningCombinations) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            document.getElementById("winner").innerText = `Winner: ${board[a]}`;
            gameOver = true;
            return;
        }
    }
    if (!board.includes(null)) {
        document.getElementById("winner").innerText = "It's a draw!";
        gameOver = true;
    }
}

function makeMove(index) {
    if (!board[index] && !gameOver) {
        board[index] = currentPlayer;
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        createBoard();
        checkWinner();
    }
}

function resetGame() {
    board = Array(9).fill(null);
    currentPlayer = "X";
    gameOver = false;
    document.getElementById("winner").innerText = "";
    createBoard();
}

createBoard();
