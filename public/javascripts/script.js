var gameStatus = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
var canvas;
var width = 500;
var height = 500;
var cellWidth = width / 3; //width for one cell
var cellHeight = height / 3; //height for one cell
var currentPlayer;

window.onload = function () {
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;
    canvas.onclick = onClick;
    newGame(); //clear board + draw board
    currentPlayer = 1; // x
};

//clear board + draw new board
function newGame() {
    context.clearRect(0, 0, width, height); //clears board
    drawGameBoard(); //draws new game board
    drawMoves();
}

function drawGameBoard() {
    // first vertical line
    context.beginPath();
    context.moveTo(cellWidth, 0); //start here
    context.lineTo(cellWidth, height); //end here
    context.stroke();

    // second vertical line
    context.beginPath();
    context.moveTo(cellWidth * 2, 0);
    context.lineTo(cellWidth * 2, height);
    context.stroke();

    // first hor line
    context.beginPath();
    context.moveTo(0, cellHeight);
    context.lineTo(width, cellHeight);
    context.stroke();

    // second hor line
    context.beginPath();
    context.moveTo(0, cellHeight * 2);
    context.lineTo(width, cellHeight * 2);
    context.stroke();
}

function drawX(cellX, cellY) {
    context.font = "222px Calibri";
    context.fillStyle = 'red';
    context.fillText("X", (cellX * cellWidth), (cellY * cellHeight + cellHeight));
}

function drawY(cellX, cellY) {
    context.font = "222px Calibri";
    context.fillStyle = 'blue';
    context.fillText("Y", (cellX * cellWidth), (cellY * cellHeight + cellHeight));
}

// draw moves so far
function drawMoves() {
    for (var i = 0; i <= 2; i++) {
        for (var j = 0; j <= 2; j++) {
          if (gameStatus[i][j] == 1) {
            drawX(i, j);
          }
          else if (gameStatus[i][j] == 2) {
            drawY(i, j);
          }
        }
    }
}

//on click, run this:
function onClick(event) {
    var mouseCoordinate = findMouse(event); //find mouse
    var cell = mouseOnCell(mouseCoordinate); //find cell mouse is oin
    checkMove(cell); //new game or check for winner
}

// find mouse relative to canvas from them internets
function findMouse(event) {
    var mouseX = event.pageX - canvas.offsetLeft;
    var mouseY = event.pageY - canvas.offsetTop;
    return { x: mouseX, y: mouseY };
}

// which cell is the mouse on?
function mouseOnCell(mouseCoord) {
    var cellCoord = { x: 0, y: 0 };
    if (mouseCoord.x > cellWidth * 2) {
      cellCoord.x = 2;
    }
    else if (mouseCoord.x > cellWidth) {
      cellCoord.x = 1;
    }
    if (mouseCoord.y > cellHeight * 2) {
      cellCoord.y = 2;
    }
    else if (mouseCoord.y > cellHeight) {
      cellCoord.y = 1;
    }
    return cellCoord;
}

// new game or check for winner
function checkMove(cell) {
    if (gameStatus[cell.x][cell.y] != 0) {
      return
    }
    gameStatus[cell.x][cell.y] = currentPlayer;
    newGame();
    if (currentPlayer == 1) {
      currentPlayer = 2;
    }
    else {
      currentPlayer = 1;
    }
    checkWinner();
}

// Check if win or draw
function checkWinner() {
    var canvasFilled = true; //if all cells are occupied
    for (var i = 0; i < 3; i++) {
        var player1Row = 0, player1Col = 0;
        var player2Row = 0, player2Col = 0;
        for (var j = 0; j < 3; j++) {
            // Check rows
            if (gameStatus[j][i] == 1) {
              player1Row++;
            }
            else if (gameStatus[j][i] == 2) {
              player2Row++;
            }
            else {
                canvasFilled = false;
            }
            // Check columns
            if (gameStatus[i][j] == 1) {
              player1Col++;
            }
            else if (gameStatus[i][j] == 2) {
              player2Col++;
            }
        }

        // Check diag
        var player1Diag = gameStatus[0][0] == 1 && gameStatus[1][1] == 1 && gameStatus[2][2] == 1;
        player1Diag = player1Diag || gameStatus[0][2] == 1 && gameStatus[1][1] == 1 && gameStatus[2][0] == 1;

        var player2Diag = gameStatus[0][0] == 2 && gameStatus[1][1] == 2 && gameStatus[2][2] == 2;
        player2Diag = player2Diag || gameStatus[0][2] == 2 && gameStatus[1][1] == 2 && gameStatus[2][0] == 2;

        // if there's a winner
        if (player1Row == 3 || player1Col == 3 || player1Diag) {
            endGame("X wins!");
            return;
        }
        else if (player2Row == 3 || player2Col == 3 || player2Diag) {
            endGame("Y wins!");
            return;
        }
    }
    // Check draw
    if (canvasFilled) {
        endGame("Draw!");
    }
}

// display winner/draw info and restart game
function endGame(message) {
    alert(message);
    gameStatus = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    currentPlayer = 1;
    newGame();
}
