var board = [];
let animateId;

function setupBoard() {
    for(var x = 0; x<cols; x++) {
        board[x] = [];
        for(var y = 0; y<rows; y++) {
            board[x][y] = 0;
        }
    }
}

function drawBoard() {
    rect(0, 0, canvas.width, canvas.height, "lightblue");
    for(var x = 0; x<cols; x++) {
        for(var y = 0; y<rows; y++) {
            let cell = board[x][y];
            var xp = x*w+w/2;
            var yp = y*w+w/2;
            if (cell == 0) circle(xp, yp, rad, "Gainsboro");
            else if (cell == 1 || cell == 2) circle(xp, yp, rad, cell == 1 ? "salmon" : "GoldenRod");
        }
    }
}

function move(col) {
    if (heights[col] < 0) return;
    chosenCol = col;
    destination = heights[col];
    chosenX = chosenCol*w+w/2;
    chosenY = w/2;
    velocity = 1;
    if (heights[col] > 0) animate();
    board[col][heights[col]] = player;
    if (heights[col] <= 0) {
        drawBoard();
        console.log(board);
        let winner = checkWinner(board);
        if (winner != null) handleWin(winner);
    }
    heights[col]--;
    player = player == 1 ? 2 : 1;
}

function checkWinner(board) {
    let draw = true;

    for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
            if (board[x][y] == 0) {
                draw = false;
                break;
            }
        }
    }

    if (draw) return "draw";

    //vertical
    for(var x = 0; x<cols-3; x++) {
        for(var y = 0; y<rows; y++) {
            if(board[x][y]>0) {
                if(board[x][y] == board[x+1][y] && board[x+1][y] == board[x+2][y] && board[x+2][y] == board[x+3][y]) {
                    let winner = board[x][y];
                    board[x][y] = 3;
                    board[x+1][y] = 3;
                    board[x+2][y] = 3;
                    board[x+3][y] = 3;
                    return winner;
                }
            }
        }
    }

    //horizontal
    for(var x = 0; x<cols; x++) {
        for(var y = 0; y<rows-3; y++) {
            if(board[x][y]>0) {
                if(board[x][y] == board[x][y+1] && board[x][y+1] == board[x][y+2] && board[x][y+2] == board[x][y+3]) {
                    let winner = board[x][y];
                    board[x][y] = 3;
                    board[x][y+1] = 3;
                    board[x][y+2] = 3;
                    board[x][y+3] = 3;
                    return winner;
                }
            }
        }
    }

    //positive slope
    for(var x = 0; x<cols-3; x++) {
        for(var y = 3; y<rows; y++) {
            if(board[x][y]>0) {
                if(board[x][y] == board[x+1][y-1] && board[x+1][y-1] == board[x+2][y-2] && board[x+2][y-2] == board[x+3][y-3]) {
                    let winner = board[x][y];
                    board[x][y] = 3;
                    board[x+1][y-1] = 3;
                    board[x+2][y-2] = 3;
                    board[x+3][y-3] = 3;
                    return winner;
                }
            }
        }
    }
    
    //negative slope
    for(var x = 0; x<cols-3; x++) {
        for(var y = 0; y<rows-3; y++) {
            if(board[x][y]>0) {
                if(board[x][y] == board[x+1][y+1] && board[x+1][y+1] == board[x+2][y+2] && board[x+2][y+2] == board[x+3][y+3]) {
                    let winner = board[x][y];
                    board[x][y] = 3;
                    board[x+1][y+1] = 3;
                    board[x+2][y+2] = 3;
                    board[x+3][y+3] = 3;
                    return winner;
                }
            }
        }
    }

    return null;
}