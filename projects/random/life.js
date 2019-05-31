var boxen = new Array();
var boxenSwap = new Array();
// size of checkbox is 20px
var pool_x = 20;
var pool_y = 20;
var ALIVE = 1;
var DEAD = 0;

function init() {
    var boxLocation = document.getElementById("boxen");
	for(i = 0; i < pool_x; i++)
	{
		boxen[i] = new Array();
		boxenSwap[i] = new Array();
        var row = document.createElement("div");
        boxLocation.appendChild(row);
		for(j = 0; j < pool_y; j++)
		{
			var box = document.createElement("input");
			box.setAttribute("type", "checkbox");
			row.appendChild(box);
			boxen[i][j] = box;
			boxenSwap[i][j] = DEAD;
		}
		row.appendChild(document.createElement("br"));
	}
}

var amtAlive = 0.3;
function randomize() {
    for(i = 0; i < pool_x; i++)
    {
        for(j = 0; j < pool_y; j++)
        {
            var r = Math.random();
            if(r > amtAlive)
                boxenSwap[i][j] = DEAD;
            else
                boxenSwap[i][j] = ALIVE;
            setBox(i, j, boxenSwap[i][j]);
        }
    }
    update();
}

function step() {
    for(i = 0; i < pool_x; i++)
	{
		for(j = 0; j < pool_y; j++)
		{
			updateBox(i, j);
		}
	}
	for(i = 0; i < pool_x; i++)
	{
		for(j = 0; j < pool_y; j++)
		{
			setBox(i, j, boxenSwap[i][j]);
		}
	}
}

function update()
{
	if(document.getElementById("s").checked)
	    step();
}

function mod(n, m)
{
	return n % m >= 0 ? n % m : (n % m) + m;
}

function getState(x, y)
{
	if(boxen[mod(x, pool_x)][mod(y, pool_y)].checked === false)
		return DEAD;
	else
		return ALIVE;
}

function setState(x, y, s)
{
	boxenSwap[x][y] = s;
}

function setBox(x, y, s)
{
	if(s === DEAD)
	{
		boxen[x][y].checked = false;
	}
	else if(s === ALIVE)
	{
		boxen[x][y].checked = true;
	}
	else
		throw "Invalid state for checkbox";
}

function updateBox(x, y)
{
	var next = adjacent(x, y);
	if(getState(x, y) === ALIVE)
	{
		if(next < 2)
			setState(x, y, DEAD);
		else if(next > 3)
			setState(x, y, DEAD);
		else
			setState(x, y, ALIVE);
	}
	else
	{
		if(next === 3)
			setState(x, y, ALIVE);
		else
			setState(x, y, DEAD);
	}
}

function adjacent(x, y)
{
	return getState(x-1, y-1) + getState(x, y-1) + getState(x+1, y-1)
		+ getState(x-1, y) + getState(x+1, y)
		+ getState(x-1, y+1) + getState(x, y+1) + getState(x+1, y+1);
}

var interval =50;
setInterval(update, interval);
