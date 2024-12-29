
// Game instellingen
const mazeSize = 5; // Grootte van het doolhof (5x5)
const mazeElement = document.getElementById("maze");
const startBtn = document.getElementById("startBtn");
const message = document.getElementById("message");

let maze;
let playerPosition;
let isGameStarted = false;

// Functie om een doolhof te genereren
function generateMaze() {
    maze = [];
    for (let i = 0; i < mazeSize; i++) {
        maze.push([]);
        for (let j = 0; j < mazeSize; j++) {
            if (Math.random() < 0.2) {
                maze[i].push(1); // 1 = muur
            } else {
                maze[i].push(0); // 0 = pad
            }
        }
    }
    // Zorg ervoor dat het start- en eindpunt altijd een pad zijn
    maze[0][0] = 0;
    maze[mazeSize - 1][mazeSize - 1] = 0;
}

// Functie om de weergave van het doolhof bij te werken
function updateMaze() {
    mazeElement.innerHTML = "";
    for (let i = 0; i < mazeSize; i++) {
        for (let j = 0; j < mazeSize; j++) {
            const cell = document.createElement("div");
            if (maze[i][j] === 1) {
                cell.classList.add("wall");
            } else {
                cell.classList.add("path");
            }
            if (i === playerPosition.row && j === playerPosition.col) {
                cell.style.backgroundColor = "blue"; // Speler
            }
            mazeElement.appendChild(cell);
        }
    }
}

// Functie om het spel te starten
function startGame() {
    if (isGameStarted) return;
    isGameStarted = true;
    playerPosition = { row: 0, col: 0 };
    generateMaze();
    updateMaze();
    startBtn.style.display = "none";
    message.textContent = "Use arrow keys to move. Reach the bottom-right corner!";
}

// Functie om de speler te verplaatsen
function movePlayer(direction) {
    if (!isGameStarted) return;
    let newRow = playerPosition.row;
    let newCol = playerPosition.col;
    if (direction === "up" && newRow > 0) newRow--;
    if (direction === "down" && newRow < mazeSize - 1) newRow++;
    if (direction === "left" && newCol > 0) newCol--;
    if (direction === "right" && newCol < mazeSize - 1) newCol++;

    // Check of de nieuwe positie een pad is
    if (maze[newRow][newCol] === 0) {
        playerPosition = { row: newRow, col: newCol };
        updateMaze();
        if (newRow === mazeSize - 1 && newCol === mazeSize - 1) {
            message.textContent = "Congratulations, you've reached the goal!";
        }
    }
}

// Event listeners voor bewegingen
document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowUp") movePlayer("up");
    if (event.key === "ArrowDown") movePlayer("down");
    if (event.key === "ArrowLeft") movePlayer("left");
    if (event.key === "ArrowRight") movePlayer("right");
});

// Start het spel
startBtn.addEventListener("click", startGame);
