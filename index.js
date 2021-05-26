var gameArr = new Array(10);
var symbol = "0";

document.getElementById("page2").style.display = "none";
document.getElementById("page3").style.display = "none";
document.getElementById("resultDiv").style.display = "none";

for (let i = 0; i < 10; i++) {
  gameArr[i] = new Array(10);
}

for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    gameArr[i][j] = "x";
  }
}

var undoX = undefined;
var undoY = undefined;

function test() {
  document.getElementById("btn").hidden = true;
  document.getElementById("page2").style.display = "block";
  document.getElementById("page1").style.display = "none";
}

function startGame() {
  player1 = document.getElementById("player1").value;
  player2 = document.getElementById("player2").value;
  let numberOfGames = document.getElementById("selectGame").value;
  let turn = document.getElementById("selectTurn").value;

  if (player1 == "" || player2 == "") {
    alert("Enter player names");
    return;
  }

  document.getElementById("page3").style.display = "block";
  document.getElementById("page2").style.display = "none";
  initializeGame();
}

function initializeGame() {
  document.getElementById("announceWin").innerHTML = player1 + "'s Turn";
  document.getElementById("resultDiv").style.display = "block";
  let tbl = document.getElementById("gameTable");
  if (undoX == undefined || undoY == undefined) {
    document.getElementById("undoBtn").disabled = true;
  }
  tbl.style.width = "100%";
  tbl.setAttribute("border", "1");
  for (let i = 0; i < 10; i++) {
    let tr = document.createElement("tr");
    tr.value = i;
    for (let j = 0; j < 10; j++) {
      let td = document.createElement("td");
      td.style.width = "20px";
      td.style.textAlign = "center";
      tr.appendChild(td);
    }
    tbl.appendChild(tr);
  }
  addListener();
}

function addListener() {
  document.querySelectorAll("#gameTable tr").forEach((e) =>
    e.addEventListener("click", function (e) {
      // console.log("clicked ROW", e.path[1].rowIndex);
      // console.log("clicked COL", e.path[0].cellIndex);
      // console.log("clicked EVENT", e);
      fillMatrix(e.path[1].rowIndex, e.path[0].cellIndex);
    })
  );
}

function fillMatrix(x, y) {
  document.getElementById("undoBtn").disabled = false;
  let tempX = x;
  let tempY = y;
  for (let i = 0; i < 10; i++) {
    if (gameArr[i][tempY] != "x") {
      tempX = i - 1;
      break;
    } else {
      tempX = i;
    }
  }
  if (tempX < 0) {
    console.log("INVALID MOVE");
    return;
  }
  undoX = tempX;
  undoY = tempY;
  gameArr[tempX][tempY] = parseInt(symbol);
  let tbl = document.getElementById("gameTable");
  if (symbol == "0") {
    symbol = "1";
    tbl.rows[tempX].cells[tempY].style.backgroundColor = "lightgreen";
    document.getElementById("announceWin").innerHTML = player2 + "'s turn";
  } else {
    symbol = "0";
    tbl.rows[tempX].cells[tempY].style.backgroundColor = "yellow";
    document.getElementById("announceWin").innerHTML = player1 + "'s turn";
  }
  // console.log(gameArr);
  evaluateMatrix(tempX, tempY);
}

function evaluateMatrix(x, y) {
  let checkWinSym = gameArr[x][y];
  checkHorizontalCells(checkWinSym);
  checkVerticalCells(checkWinSym);
  checkDiagonalCells(x, y);
}

function checkHorizontalCells(checkWinSym) {
  let winCounter = 0;
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if (gameArr[i][j] == checkWinSym) {
        winCounter++;
      } else {
        winCounter = 0;
      }
      if (winCounter == 4) {
        console.log(checkWinSym + " Wins");
        displayResult(checkWinSym);
        return;
      }
    }
  }
}

function checkVerticalCells(checkWinSym) {
  let winCounter = 0;
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if (gameArr[j][i] == checkWinSym) {
        winCounter++;
      } else {
        winCounter = 0;
      }
      if (winCounter == 4) {
        console.log(checkWinSym + " Wins");
        displayResult(checkWinSym);
        return;
      }
    }
  }
}

function checkDiagonalCells(x, y) {
  let winCounter = 0;
  let checkWinSym = gameArr[x][y];
  let tempX = x;
  let tempY = y;
  while (tempX < 10 && tempY < 10) {
    if (gameArr[tempX][tempY] == checkWinSym) {
      winCounter++;
    } else {
      winCounter = 0;
    }
    if (winCounter == 4) {
      console.log(checkWinSym + " Wins");
      displayResult(checkWinSym);
      return;
    }
    tempX++;
    tempY++;
  }
  tempX = x;
  tempY = y;
  winCounter = 0;
  while (tempX < 10 && tempY >= 0) {
    if (gameArr[tempX][tempY] == checkWinSym) {
      winCounter++;
    } else {
      winCounter = 0;
    }
    if (winCounter == 4) {
      console.log(checkWinSym + " Wins");
      displayResult(checkWinSym);
      return;
    }
    tempX++;
    tempY--;
  }
  tempX = 0;
  tempY = y;
  winCounter = 0;
  while (tempX < 10 && tempY < 10) {
    if (gameArr[tempX][tempY] == checkWinSym) {
      winCounter++;
    } else {
      winCounter = 0;
    }
    if (winCounter == 4) {
      console.log(checkWinSym + " Wins");
      displayResult(checkWinSym);
      return;
    }
    tempX++;
    tempY++;
  }
  for (y = 0; y <= 10; y++) {
    tempX = 0;
    tempY = y;
    while (tempX < 10 && tempY < 10) {
      if (gameArr[tempY][tempX] == checkWinSym) {
        winCounter++;
      } else {
        winCounter = 0;
      }
      if (winCounter == 4) {
        console.log(checkWinSym + " Wins");
        displayResult(checkWinSym);
        return;
      }
      tempX++;
      tempY++;
    }
    winCounter = 0;
  }
  for (y = 0; y <= 10; y++) {
    tempX = 10;
    tempY = y;
    while (0 <= tempX && tempY < 10) {
      if (gameArr[tempY][tempX] == checkWinSym) {
        winCounter++;
      } else {
        winCounter = 0;
      }
      if (winCounter == 4) {
        console.log(checkWinSym + " Wins");
        displayResult(checkWinSym);
        return;
      }
      tempX--;
      tempY++;
    }
    winCounter = 0;
  }
}

function displayResult(winSym) {
  if (winSym) {
    document.getElementById("announceWin").innerHTML = player2 + " Wins";
  } else {
    document.getElementById("announceWin").innerHTML = player1 + " Wins";
  }
}

function undoMove() {
  gameArr[undoX][undoY] = "x";
  let tbl = document.getElementById("gameTable");
  tbl.rows[undoX].cells[undoY].style.backgroundColor = "white";
  if (symbol == "0") {
    symbol = "1";
    document.getElementById("announceWin").innerHTML = player2 + "'s turn";
  } else {
    symbol = "0";
    document.getElementById("announceWin").innerHTML = player1 + "'s turn";
  }
  document.getElementById("undoBtn").disabled = true;
}

function resetGame() {
  location.reload();
}
