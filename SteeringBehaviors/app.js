
let canvas;

let canvasScalar = .75;

let agents = [];
let points = [];

let displayText = "Starter text"
var displayFontSize = 192;

let displayTextInput = document.getElementById("display-text");
let displayTextFontSizeInput = document.getElementById("font-size");
let canvasScaleInput = document.getElementById("canvas-scale");

function setDisplayText(dispText, fontSize) {
    displayText = dispText;
    displayFontSize = (fontSize != undefined ? fontSize : displayFontSize);
    points = font.textToPoints(displayText, 0, height * .5);
    editAgents(agents, points);
}

function createEventListeners() {
    displayTextInput.addEventListener("input", () => {
        setDisplayText(displayTextInput.value);
    });

    displayTextFontSizeInput.addEventListener("change", () => {
        displayFontSize = parseInt(displayTextFontSizeInput.value, 10);
        setDisplayText(displayText, displayFontSize);
    });

    canvasScaleInput.addEventListener("change", () => {
        canvasScalar = parseFloat(canvasScaleInput.value, 10) * .01;  
        resizeCanvas(windowWidth * canvasScalar, windowHeight * canvasScalar);
        Utilities.centerCanvas(canvas);
    });
}

function editAgents(agents, points) {
    agents.length = points.length;
    
    for (let i = 0; i < agents.length; i++) {
        let p = points[i];

        if (agents[i] == undefined) {
            let startPos = p5.Vector.random2D();
            startPos.x = Math.abs(startPos.x);
            startPos.y = Math.abs(startPos.y);
            startPos.x *= Math.random() * (width * .2) + startPos.x;
            startPos.y *= Math.random() * (height * .2) + startPos.y;
            agents[i] = new Agent(startPos);
        }

        agents[i].target = createVector(p.x, p.y);
    }
}

let font;

function preload() {
    font = loadFont('Dokdo-Regular.ttf');
}

function setup() {
    canvas = createCanvas(windowWidth * canvasScalar, windowHeight * canvasScalar);
    canvas.parent("canvas-container");
    Utilities.centerCanvas(canvas);

    displayTextInput.value = "";
    displayFontSize = parseInt(displayTextFontSizeInput.value, 10);  
    canvasScalar = parseFloat(canvasScaleInput.value, 10) * .01;  
    createEventListeners();
}

function currentTime() {
    return new Date().getTime()/100;
}

let previousTime = 0;

function draw() {
    background(51);

    let time = currentTime();
    let deltaTime = time - previousTime;

    textFont(font);
    textSize(displayFontSize);
    // textAlign(CENTER, CENTER);
    // text(displayText, width * .5, height * .5);

    for (let i = 0; i < agents.length; i++) {
        if (agents[i] != undefined) {
            let p = agents[i].pos;
            let t = agents[i].target;
            fill(255);
            let wh = map(displayFontSize, 0, 200, 2, 10);
            ellipse(p.x, p.y, wh, wh)
            ;
    
            // fill(0, 255, 0);
            // ellipse(t.x, t.y, 10, 10);
            agents[i].tick(deltaTime);
        }
    }

    previousTime = time;
}

function windowResized() {
    resizeCanvas(windowWidth * canvasScalar, windowHeight * canvasScalar);
    Utilities.centerCanvas(canvas);
}