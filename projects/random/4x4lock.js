/* GLOBAL VARIABLES FOR THE WIN!!!! */
var board;
var boardUI;
var boardLength = 4;

/* Creates the internal grid representing the board */
function genBoard() {
    var b = new Array();
    for(var i = 0; i < boardLength; i++)
    {
	b[i] = new Array();
	for(var j = 0; j < boardLength; j++)
	{
	    b[i][j] = Math.floor(Math.random() * 2);
	}
    }
    return b;
}

/* Creates the UI (buttons) of the board */
function genUI() {
    var b = document.getElementById("board");
    var ui = new Array();
    for(var i = 0; i < board.length; i++)
    {
	ui[i] = new Array();
	for(var j = 0; j < board[i].length; j++)
	{
	    box = document.createElement("button");
	    box.setAttribute("onclick", "change(" + i + "," + j + ")");
	    b.appendChild(box);
	    ui[i][j] = box;
	}
	b.appendChild(document.createElement("br"));
    }
    return ui;
}

function updateUI() {
    for(var i = 0; i < board.length; i++)
    {
	for(var j = 0; j < board.length; j++)
	{
	    boardUI[i][j].innerHTML = (board[i][j] == 1) ? "X" : "&nbsp;";
	}
    }

    var win = document.getElementsByClassName("win");
    if(checkWin())
    {
	for(var i = 0; i < win.length; i++)
	    win[i].style.display = "block";
    }
    else
    {
	for(var i = 0; i < win.length; i++)
	    win[i].style.display = "none";
    }
}

function change(x,y) {
    // Only if unfinished
    if(!checkWin())
    {
        // Change same x
        for(var i = 0; i < board[x].length; i++)
        {
	    board[x][i] = (board[x][i] == 0) ? 1 : 0;
        }
        // Same y
        for(var j = 0; j < board.length; j++)
        {
	    board[j][y] = (board[j][y] == 0) ? 1 : 0;
        }
        // Change the clicked one back since it got changed twice
        board[x][y] = (board[x][y] == 0) ? 1 : 0;
    }

    updateUI();
}

function checkWin() {
    var wins = true;
    for(var i = 0; i < board.length; i++)
    {
	for(var j = 0; j < board.length; j++)
	    wins = wins && (board[i][j] == 0);
    }
    return wins;
}

function reset() {
    board = genBoard();
    updateUI();
}

board = genBoard();
boardUI = genUI();
updateUI();
