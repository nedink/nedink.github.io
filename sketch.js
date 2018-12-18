const BOIDS = 200;

const boids = [];

let paused = false;

function setup() {
  createCanvas(600, 400);

  for (let i = 0; i < BOIDS; i++) {
    boids.push(new Boid(random(width), random(height), random(PI * 2), 1));
  }

  for (boid of boids) {
    boid.step();
  }

  // frameRate(10);
}

function drawBoid(boid) {
  stroke(255);
  strokeWeight(2);
  point(boid.position.x, boid.position.y);
}

function drawBoidFov(boid) {
  stroke(255, 127);
  strokeWeight(1);
  noFill();
  ellipse(boid.position.x, boid.position.y, BOID_RADIUS * 2, BOID_RADIUS * 2);
}

function drawBoidVector(boid) {
  stroke(255, 127);
  strokeWeight(1);
  noFill();
  const boidPlusSpeed = p5.Vector.add(
    boid.position,
    p5.Vector.mult(boid.heading, boid.speed).mult(10)
  );
  line(boid.position.x, boid.position.y, boidPlusSpeed.x, boidPlusSpeed.y);
}

function drawAvgPos(boid) {
  stroke(0, 255, 0);
  strokeWeight(1);
  if (boid.avgPosition.x && boid.avgPosition.y)
    line(
      boid.position.x,
      boid.position.y,
      boid.avgPosition.x,
      boid.avgPosition.y
    );
}

function draw() {
  if (paused) return;

  background(0);

  // draw boids
  for (boid of boids) {
    drawBoid(boid);
    // drawBoidFov(boid);
    // drawBoidVector(boid);
    // drawAvgPos(boid);
  }

  for (boid of boids) {
    boid.step();
  }
}

function mousePressed() {
  paused = !paused;
}
