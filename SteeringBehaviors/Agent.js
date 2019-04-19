
let Agent = function(startPos) {
    this.pos = startPos;
    this.velocity = createVector();
    this.acceleration = createVector();
    this.target = startPos;
    this.speed = 5;
    this.maxForce = 0.3;
}

Agent.prototype.tick = function(deltaTime) {
    this.pos.add(this.velocity);
    this.velocity.add(this.acceleration);

    this.acceleration.mult(0);

    let desiredVelocity = p5.Vector.sub(this.target, this.pos);
    let d = desiredVelocity.mag();
    let s = this.speed;
    if (d < 100) {
        s = map(d, 0, 100, 0, this.speed);
    }
    desiredVelocity.limit(s);

    let steering = p5.Vector.sub(desiredVelocity, this.velocity);
    steering.limit(this.maxForce);
    this.applyForce(steering);
}

Agent.prototype.applyForce = function(force) {
    this.acceleration.add(force);
}