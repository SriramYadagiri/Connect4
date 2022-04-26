const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");

const cols = 7;
const rows = 6;
let games = 0;
let redWins = 0;
let yellowWins = 0;
let draws = 0;
let chosenCol = null;
let destination = null;
let chosenX = null;
let chosenY = null;
let velocity = 1;
let finished = true;
const w = Math.floor(canvas.width/cols);
const rad = w/2.4;

const redWinsP = document.getElementById("red");
const yellowWinsP = document.getElementById("yellow");
const drawsP = document.getElementById("draws");
const resultP = document.getElementById("result");
const displayField = document.getElementById("displayField");

let heights;
let player;

setupBoard();
drawBoard();
document.getElementsByTagName("button")[0].textContent = "Play Game";

function animate() {
    animateId = requestAnimationFrame(animate);
    finished = false;
    drawBoard();
    if (chosenY + velocity >= destination*w+w/2) {
        cancelAnimationFrame(animateId);
        finished = true;
        chosenY = destination*w+w/2;
        circle(chosenX, chosenY, rad, player == 1 ? "GoldenRod" : "salmon");
        let winner = checkWinner(board);
        if (winner != null) handleWin(winner);
    } else {
        velocity += 4;
        chosenY+=velocity;
    }
    circle(chosenX, chosenY, rad, player == 1 ? "GoldenRod" : "salmon");
}

function handleWin(winner) {
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            if (board[i][j] == 1 || board[i][j] == 2) {
                circle(i*w+w/2, j*w+w/2, rad, "Gainsboro");
                ctx.save();
                ctx.globalAlpha = 0.3;
                circle(i*w+w/2, j*w+w/2, rad, board[i][j] == 1 ? "salmon" : "GoldenRod");
                ctx.restore();
            }
        }
    }
    if (winner != "draw") {
        resultP.textContent = `${winner == 1 ? "Red" : "Yellow"} Won!`;
        if (winner == 1) redWins++;
        else yellowWins++;
    }
    else {
        resultP.textContent = "Draw";
        draws++;
    }
    resultP.style.color = winner == 1 ? "salmon" : winner == 2 ? "GoldenRod" : "#008bba53";
    resultP.style.opacity = "0.75";
    redWinsP.textContent = redWins;
    yellowWinsP.textContent = yellowWins;
    drawsP.textContent = draws;
    canvas.removeEventListener("click", handleMousePress);
    canvas.removeEventListener("mousemove", handleMouseMove);
    document.getElementsByTagName("button")[0].textContent = "Play Again";
    displayField.style.display = "block";
}

function handleMousePress(e) {
    if (!finished) return;
    var x = Math.floor(e.offsetX/w);
    move(x);
}

function handleMouseMove(e) {
    let x = Math.floor(e.offsetX/w);
    let y = heights[x];
    if (y < 0) return;
    drawBoard();
    ctx.save();
    ctx.globalAlpha = 0.4;
    circle(x*w+w/2, y*w+w/2, rad, player == 1 ? "salmon" : "GoldenRod");
    ctx.restore();
}

function startGame() {
    displayField.style.display = "none";
    games++;
    player = games%2 == 0 ? 2 : 1;
    heights = [5, 5, 5, 5, 5, 5, 5];
    setupBoard();
    drawBoard();
    canvas.addEventListener("click", handleMousePress);
    canvas.addEventListener("mousemove", handleMouseMove);
}

function rect(x, y, width, height, color="black") {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

function circle(x, y, radius, color="black") {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(x, y, radius, 0, Math.PI*2, false);
    ctx.fill();
}