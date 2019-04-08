var board;
var boardUI;
var boardLength = 15;

function genBoard() {
    var b = new Array();
    for(var i = 0; i < boardLength; i++)
    {
	b[i] = new Array();
	for(var j = 0; j < boardLength; j++)
	    b[i][j] = 0;
    }
    b[0][0] = 1;
    return b;
}

function reset() {
    for(var i = 0; i < board.length; i++)
    {
	for(var j = 0; j < board[i].length; j++)
	{
	    board[i][j] = 0;
	}
    }
    board[0][0] = 1;

    updateUI()
}

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
	    if(i+j <= 3)
		box.setAttribute("class", "special");
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
	for(var j = 0; j < board[i].length; j++)
	{
	    boardUI[i][j].innerHTML = board[i][j] === 1 ? "O" : "&nbsp;";
	}
    }
}

function change(x,y) {
    if(x < boardLength && y < boardLength && board[x][y] === 1 &&
       board[x+1][y] === 0 && board[x][y+1] === 0)
    {
	board[x][y] = 0;
	board[x+1][y] = 1;
	board[x][y+1] = 1;
    }
    updateUI();
}

board = genBoard();
boardUI = genUI();

updateUI();
