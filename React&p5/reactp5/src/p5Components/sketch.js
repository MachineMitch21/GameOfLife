
let Sketch = function(s) {
    s.onSetAppState = () => {}

    s.setup = function() {
        s.createCanvas(s.windowWidth, s.windowHeight);
        s.pixelDensity(1);
    }

    s.draw = function() {
        // let circles = s.props.circles;
        // s.background(51);
        // s.textSize(32);
        // s.fill(255);
        // s.text(s.props.test, s.windowWidth / 2.5, s.windowHeight / 2);
        // for (let i = 0; i < circles.length; i++) {
        //     let c = circles[i];
        //     s.ellipse(c.pos.x, c.pos.y, c.radius, c.radius);
        // }
        s.background(0);

        s.loadPixels();
        for (let i = 0; i < s.height; i++) {
            for (let j = 0; j < s.width; j++) {
                s.pixels[i * s.width + j] = s.color(255 * Math.sin(i + (new Date().getMilliseconds())));
            }
        }
        s.updatePixels();
    }

    s.windowResized = function() {
        s.resizeCanvas(s.windowWidth, s.windowHeight);
    }

    s.mousePressed = function(e) {
        console.log(e);
        s.props.onMousePressed({
            mouseX: s.mouseX,
            mouseY: s.mouseY
        });
    }
}

export default Sketch;