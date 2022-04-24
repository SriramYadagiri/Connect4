const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");

const cols = 7;
const rows = 6;
let chosenCol = null;
let destination = null;
let chosenX = null;
let chosenY = null;
let velocity = 1;
const w = Math.floor(canvas.width/cols);
const rad = w/2.4;

const resultP = document.getElementById("result");
const displayField = document.getElementById("displayField");

let heights;
let player;

setupBoard();
drawBoard();
document.getElementsByTagName("button")[0].textContent = "Play Game";

function animate() {
    animateId = requestAnimationFrame(animate);
    drawBoard();
    if (chosenY + velocity >= destination*w+w/2) {
        cancelAnimationFrame(animateId);
        chosenY = destination*w+w/2;
        circle(chosenX, chosenY, rad, player == 1 ? "GoldenRod" : "salmon");
        let winner = checkWinner(board);
        if (winner != null) {
            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    if (board[i][j] == 1 || board[i][j] == 2) {
                        circle(i*w+w/2, j*w+w/2, rad, "Gainsboro");
                        ctx.save();
                        ctx.globalAlpha = 0.4;
                        circle(i*w+w/2, j*w+w/2, rad, board[i][j] == 1 ? "salmon" : "GoldenRod");
                        ctx.restore();
                    }
                }
            }
            resultP.textContent = `${winner == 1 ? "Red" : "Yellow"} Won!`;
            resultP.style.color = winner == 1 ? "salmon" : "GoldenRod";
            resultP.style.opacity = "0.75";
            canvas.removeEventListener("click", handleMousePress);
            canvas.removeEventListener("mousemove", handleMouseMove);
            document.getElementsByTagName("button")[0].textContent = "Play Again";
            displayField.style.display = "block";
        }
    } else {
        velocity += 4;
        chosenY+=velocity;
    }
    circle(chosenX, chosenY, rad, player == 1 ? "GoldenRod" : "salmon");
}

function handleMousePress(e) {
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
    player = 1;
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