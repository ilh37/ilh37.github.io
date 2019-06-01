// Handles to canvases
var boardCtx
var nextCtx

var ROWS = 20
var COLUMNS = 10
var WIDTH = 20

// "Dead" pieces (null means not filled)
var prevPieces

// Current piece information (refer to tetrominoes for interpretation)
var currentPiece
var nextPiece

// Tetromino definitions
var tetrominos 

// Instance of game loop/graphics loop
var loop
var drawLoop

var isNewPiece = false
var gameOver = false
var score = 0
var totalRows = 0
var prevTime = Date.now()
var accumulatedTime = 0
var level = 1

function init() {
    // Tetromino definitions
    tetrominoes = {
        I: {configs: [[[-1,0],[0,0],[1,0],[2,0]],
                      [[0,-1],[0,0],[0,1],[0,2]]],
            start: [Math.floor((COLUMNS-1)/2),0],
            color: "red" },
        O: {configs: [[[0,0],[1,0],[0,1],[1,1]]],
            start: [Math.floor((COLUMNS-1)/2),0],
            color: "orange"},
        J: {configs: [[[1,1],[1,0],[0,0],[-1,0]],
                      [[-1,1],[0,1],[0,0],[0,-1]],
                      [[-1,-1],[-1,0],[0,0],[1,0]],
                      [[1,-1],[0,-1],[0,0],[0,1]]],
            start: [Math.floor(COLUMNS/2), 0],
            color: "gold"},
        L: {configs: [[[-1,1],[-1,0],[0,0],[1,0]],
                      [[-1,-1],[0,-1],[0,0],[0,1]],
                      [[1,-1],[1,0],[0,0],[-1,0]],
                      [[1,1],[0,1],[0,0],[0,-1]]],
            start: [Math.floor(COLUMNS/2), 0],
            color: "green"},
        S: {configs: [[[-1,1],[0,1],[0,0],[1,0]],
                      [[0,-1],[0,0],[1,0],[1,1]]],
            start: [Math.floor(COLUMNS/2), 0],
            color: "blue"},
        Z: {configs: [[[-1,-1],[0,-1],[0,0],[1,0]],
                      [[1,-1],[1,0],[0,0],[0,1]]],
            start: [Math.floor(COLUMNS/2), 1],
            color: "purple"},
        T: {configs: [[[-1,0],[0,0],[1,0],[0,1]],
                      [[0,-1],[0,0],[0,1],[-1,0]],
                      [[1,0],[0,0],[-1,0],[0,-1]],
                      [[0,1],[0,0],[0,-1],[1,0]]],
            start: [Math.floor(COLUMNS/2), 0],
            color: "magenta"}
    }
    
    // Initialize canvas handles
    boardCtx = document.getElementById("boardCanvas").getContext("2d")
    nextCtx = document.getElementById("nextCanvas").getContext("2d")
    
    // Initialize board
    prevPieces = []
    for(x = 0; x < COLUMNS; x++) {
        prevPieces[x] = []
        for(y = 0; y < ROWS; y++) {
            prevPieces[x][y] = null
        }
    }

    // Initialize current piece
    currentPiece = newPiece()
    nextPiece = newPiece()

    isNewPiece = false
    gameOver = false
    score = 0
    level = 1
    updateScore(0)

    prevTime = Date.now()
    accumulatedTime = 0
    
    loop = setInterval(gameLoop,1)
    drawLoop = setInterval(drawBoard, 17) // ~60 FPS
}

// Logic functions
function gameLoop() {
    t = Date.now()
    accumulatedTime += t - prevTime
    prevTime = t

    if(accumulatedTime >= tickThreshold()) {
        tick()
        accumulatedTime -= tickThreshold()
    }   
}

function tickThreshold() {
    return 17 + Math.floor(483.0 / Math.pow(1+0.4*level, 1.2))
}
    
function tick() {
    if(gameOver) {
        clearInterval(loop)
    }
    else {
        clearRows()
        if(!isNewPiece) {
            if(validPos(nextPos(currentPiece))) {
                currentPiece = nextPos(currentPiece)
            }
            else {
                destroyCurrent()
                isNewPiece = true
            }
        }
        else {
            currentPiece = nextPiece
            nextPiece = newPiece()
            if(validPos(currentPiece)) {
                isNewPiece = false
            }
            else {
                gameOver = true
            }
        }
    }  
}

function newPiece() {
    tetros = [tetrominoes.I, tetrominoes.O, tetrominoes.J, tetrominoes.L,
              tetrominoes.S, tetrominoes.Z, tetrominoes.T]
    selection = tetros[Math.floor(Math.random()*tetros.length)];
    piece = {location: selection.start, config: 0, type: selection}
    return piece
}

function destroyCurrent() {
    for(i = 0; i < currentPiece.type.configs[currentPiece.config].length; i++) {
        pt = addPt(currentPiece.location, currentPiece.type.configs[currentPiece.config][i])
        prevPieces[pt[0]][pt[1]] = currentPiece.type.color
    }
}

function validPos(piece) {
    for(i = 0; i < piece.type.configs[piece.config].length; i++) {
        pt = addPt(piece.location, piece.type.configs[piece.config][i])
        if(pt[0] < 0 || pt[0] >= COLUMNS || pt[1] < 0 || pt[1] >= WIDTH)
            return false
        if(prevPieces[pt[0]][pt[1]] != null)
            return false
    }
    return true
}

function nextPos(piece) {
    return {location: addPt(piece.location,[0,1]), config: piece.config, type: piece.type}
}

function addPt(p1, p2) {
    return [p1[0] + p2[0], p1[1] + p2[1]]
}

function clearRows() {
    rows = []
    for(y = 0; y < ROWS; y++) {
        fullRow = true
        for(x = 0; x < COLUMNS; x++) {
            if(prevPieces[x][y] == null)
                fullRow = false
        }
        if(fullRow)
            rows.push(y)
    }
    for(i = 0; i < rows.length; i++)
        clearRow(rows[i])

    updateScore(rows.length)
}

function clearRow(row) {
    // Initialize new array
    newPrevPieces = []
    for(x = 0; x < COLUMNS; x++) {
        newPrevPieces[x] = []
    }

    // Fill everything above the deleted row
    for(y = 0; y < row+1; y++) {
        for(x = 0; x < COLUMNS; x++) {
            newPrevPieces[x][y+1] = prevPieces[x][y]
        }
    }
    // Fill everything below the deleted row
    for(y = row+1; y < ROWS; y++) {
        for(x = 0; x < COLUMNS; x++) {
            newPrevPieces[x][y] = prevPieces[x][y]
        }
    }
    for(x = 0; x < COLUMNS; x++) {
        newPrevPieces[x][0] = null
    }

    prevPieces = newPrevPieces
}

function updateScore(rows) {
    if(rows == 1)
        score += 20 + 20 * level
    else if(rows == 2)
        score += 50 + 50 * level
    else if(rows == 3)
        score += 100 + 200 * level
    else if(rows >= 4)
        score += 1200 * level

    totalRows += rows
    level = Math.floor(totalRows / 10) + 1
    
    document.getElementById("score").innerHTML = "<p>Score: " + score + "</p>"
    document.getElementById("level").innerHTML = "<p><b>Level: " + level + "</b></p>"
}

// Control functions
document.addEventListener('keydown', function(event) {
    if(event.code == "ArrowLeft")
        go([-1,0])
    else if(event.code == "ArrowRight")
        go([1,0])
    else if(event.code == "ArrowDown")
        go([0,1])
    else if(event.code == "KeyX")
        rotateC()
    else if(event.code == "KeyZ")
        rotateCC()
    else if(event.code == "Space")
        if(gameOver)
            init()
});

function go(delta) {
    next = {location: addPt(currentPiece.location,delta), config: currentPiece.config, type: currentPiece.type}
    if(validPos(next))
        currentPiece = next
}

function rotateC() {
    next = {location: currentPiece.location,
            config: (currentPiece.config + 1) % currentPiece.type.configs.length,
            type: currentPiece.type}
    if(validPos(next))
        currentPiece = next
}

function rotateCC() {
    n = currentPiece.type.configs.length
    next = {location: currentPiece.location,
            config: (((currentPiece.config - 1) % n) + n) % n,
            type: currentPiece.type}
    if(validPos(next))
        currentPiece = next
}

// UI functions
function drawBoard() {
    // Clear canvas and draw border
    boardCtx.clearRect(0, 0, WIDTH * COLUMNS, WIDTH * ROWS)
    nextCtx.clearRect(0, 0, 100, 40)
    
    // Draw dead pieces
    for(x = 0; x < COLUMNS; x++) {
        for(y = 0; y < ROWS; y++) {
            if(prevPieces[x][y])
                fillTile(x, y, WIDTH, prevPieces[x][y], boardCtx)
        }
    }

    // Draw active pieces
    if(!gameOver) {
        for(i = 0; i < currentPiece.type.configs[currentPiece.config].length; i++) {
            newPt = addPt(currentPiece.location, currentPiece.type.configs[currentPiece.config][i])
            fillTile(newPt[0], newPt[1], WIDTH, currentPiece.type.color, boardCtx)
        }
    }

    // Draw border
    boardCtx.strokeStyle = "black"
    boardCtx.strokeRect(0, 0,  WIDTH * COLUMNS, WIDTH * ROWS)

    // Game over message
    if(gameOver) {
        boardCtx.fillStyle = "white"
        boardCtx.textAlign = "center"; 
        boardCtx.font = "35px Arial"
        boardCtx.fillText("Game Over!", 100, 200)
        boardCtx.fillStyle = "black"
        boardCtx.font = "bold 18px Arial"
        boardCtx.fillText("Press space to restart", 100, 230)

        boardCtx.strokeStyle = "black"
        boardCtx.font = "35px Arial"
        boardCtx.strokeText("Game Over!", 100, 200)
    }

    // Draw next piece
    nextLoc = [2,0]
    switch(nextPiece.type) {
    case tetrominoes.I:
    case tetrominoes.O:
        nextLoc = [1,0]
        break
    case tetrominoes.Z:
        nextLoc = [2,1]
    }
    
    for(i = 0; i < nextPiece.type.configs[nextPiece.config].length; i++) {
        newPt = addPt(nextLoc, nextPiece.type.configs[nextPiece.config][i])
        fillTile(newPt[0], newPt[1], WIDTH, nextPiece.type.color, nextCtx)
    }
}

function fillTile(x, y, width, color, ctx) {
    ctx.fillStyle = color
    ctx.fillRect(width * x, width * y, width, width)

    ctx.strokeStyle = "white"
    ctx.strokeRect(width * x, width * y, width, width)
}
