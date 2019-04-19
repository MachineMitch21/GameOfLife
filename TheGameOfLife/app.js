let cells = [];

let canvas;

let canvasScalar = .85;
let gridScale = 20;

let gridWidth;
let gridHeight;

let shouldSimulate = false;

let framesPerSecond = 1;

let isRandomized = false;

let numGenerations = 0;

let aliveState = 0;
let deadState = .95;

function getState() {
    let probability = Math.random();
    // probability of state being off
    return (probability > .5 ? aliveState : deadState);
}

function getCell(cells, i, j) {
    return cells[i * gridWidth + j];
}

function setCell(cells, i, j, cell) {
    cells[i * gridWidth + j] = cell;
}

function canvasToGridCoords(x, y) {
    return { x: Math.floor(x / gridScale), y: Math.floor(y / gridScale) };
}

function gridToCanvasCoords(x, y) {
    return { x: x * gridScale, y: y * gridScale };
}

function createGrid(randomize) {
    gridWidth = Math.floor(width / gridScale);
    gridHeight = Math.floor(height / gridScale);

    cells.length = (gridWidth) * (gridHeight);

    for (let i = 0; i < gridWidth; i++) {
        for (let j = 0; j < gridHeight; j++) {
            if (randomize) {
                setCell(cells, i, j, new Cell(gridScale, gridScale, getState()));
            } else {
                setCell(cells, i, j, new Cell(gridScale, gridScale, deadState));
            }
        }
    }

    numGenerations = 0;
    shouldSimulate = false;
}

function resizeGrid(randomize) {
    gridWidth = Math.floor(width / gridScale);
    gridHeight = Math.floor(height / gridScale);

    cells.length = (gridWidth) * (gridHeight);

    for (let i = 0; i < gridWidth; i++) {
        for (let j = 0; j < gridHeight; j++) {
            let cell = getCell(cells, i, j);
            if (cell == undefined) {
                if (randomize) {
                    setCell(cells, i, j, new Cell(gridScale, gridScale, getState()));
                } else {
                    setCell(cells, i, j, new Cell(gridScale, gridScale, deadState));
                }
            } else {
                setCell(cells, i, j, new Cell(gridScale, gridScale, cell.state));
            }
        }
    }
}

let debugCount = 0;

function getNeighbors(cells, i, j) {
    let neighbors = 0;
    let igr0 = false;
    let ilgw = false;

    if (i > 0) {
        neighbors += (getCell(cells, i - 1, j).state == aliveState ? 1 : 0);
        igr0 = true;
    }
    if (i < gridWidth - 1) {
        neighbors += (getCell(cells, i + 1, j).state == aliveState ? 1 : 0);
        ilgw = true;
    }
    if (j > 0) {
        neighbors += (getCell(cells, i, j - 1).state == aliveState ? 1 : 0);
        if (igr0) {
            neighbors += (getCell(cells, i - 1, j - 1).state == aliveState ? 1 : 0);
        }
        if (ilgw) {
            neighbors += (getCell(cells, i + 1, j - 1).state == aliveState ? 1 : 0);
        }
    }
    if (j < gridHeight - 1) {
        neighbors += (getCell(cells, i, j + 1).state == aliveState ? 1 : 0);
        if (igr0) {
            neighbors += (getCell(cells, i - 1, j + 1).state == aliveState ? 1 : 0);
        }
        if (ilgw) {
            neighbors += (getCell(cells, i + 1, j + 1).state == aliveState ? 1 : 0);
        }
    }

    return neighbors;
}

function updateGrid(shouldSimulate) {
    let cellsBackBuffer = cells.map(c => Object.assign({}, c));

    for (let i = 0; i < gridWidth; i++) {
        for (let j = 0; j < gridHeight; j++) {

            let cell = getCell(cells, i, j);
            let backBufferCell = getCell(cellsBackBuffer, i, j);
            
            strokeWeight(1);
            stroke(.5);
            fill(cell.state);
            rect(i * gridScale, j * gridScale, cell.width, cell.height);

            if (shouldSimulate) {
                let neighbors = getNeighbors(cells, i, j);
                if (cell.state == deadState && neighbors == 3) {
                    backBufferCell.state = aliveState;
                } else if (cell.state == aliveState) {
                    if (neighbors <= 1 || neighbors >= 4) {
                        backBufferCell.state = deadState;
                    }
                }
            }
        }
    }
    cells = cellsBackBuffer.map(c => Object.assign({}, c));
    if (shouldSimulate)
        ++numGenerations;
}

function setup() {
    colorMode(RGB, 1);
    canvas = createCanvas(windowWidth * canvasScalar, windowHeight * canvasScalar);
    Utilities.centerCanvas(canvas);

    createGrid();
}

function draw() {
    background(1);
    if (shouldSimulate && numGenerations == 0) {
        frameRate(framesPerSecond);
    } else if (!shouldSimulate) {
        frameRate(60);
    }

    updateGrid(shouldSimulate);

    
    textSize(16);
    fill(1, 0, 0);
    text(`Target frames per second ${framesPerSecond}`, 20, 20);
    text(`Actual framerate ${frameRate()}`, 20, 50);
    text(`Grid Scale ${gridScale}`, 20, 70);
    text(`Generation ${numGenerations}`, 20, 90);
}

function windowResized() {
    resizeCanvas(windowWidth * canvasScalar, windowHeight * canvasScalar);
    Utilities.centerCanvas(canvas);   

    // resizeGrid();
}

function mousePressed() {
    if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
        let gridCoords = canvasToGridCoords(mouseX, mouseY);
        let cell = getCell(cells, gridCoords.x, gridCoords.y);
        cell.state = (cell.state == aliveState ? deadState : aliveState);
    }
}

function keyPressed() {
    if (keyCode === 13) {
        shouldSimulate = !shouldSimulate;
    }

    if (keyCode === 71) {
        updateGrid(true);
    }

    if (keyCode === 82) {
        createGrid(true);
        isRandomized = true;
    } else if (keyCode === 67) {
        createGrid(false);
        isRandomized = false;
    }

    if (keyCode === DOWN_ARROW) {
        framesPerSecond--;
        frameRate(framesPerSecond);
    }

    if (keyCode === UP_ARROW) {
        framesPerSecond++;
        frameRate(framesPerSecond);
    }

    if (!shouldSimulate) {
        if (keyCode === RIGHT_ARROW) {
            gridScale++;
        }
        if (keyCode === LEFT_ARROW) {
            gridScale--;
        }
        gridScale = (gridScale < 0 ? 0 : gridScale);
        resizeGrid(false);
    }
}