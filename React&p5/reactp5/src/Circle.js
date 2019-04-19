
let Circle = function(p5Inst, x, y, r) {
    this.pos = p5Inst.createVector(x, y);
    this.radius = r;
}

export default Circle;