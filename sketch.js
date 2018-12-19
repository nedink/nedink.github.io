const BOIDS = 100;

const boids = [];

let paused = false;

function drawBoid(boid) {
  stroke(255);
  strokeWeight(8);
  point(boid.position.x, boid.position.y);
}

function drawBoidFov(boid) {
  stroke(255, 127);
  strokeWeight(1);
  noFill();
  ellipse(boid.position.x, boid.position.y, BOID_RADIUS * 2, BOID_RADIUS * 2);
}

function drawBoidVector(boid) {
  stroke(255);
  strokeWeight(1);
  noFill();
  const boidPlusSpeed = p5.Vector.add(
    boid.position,
    p5.Vector.mult(boid.heading, boid.speed).mult(12)
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

function drawAvoidVector(boid) {
  stroke(255, 0, 0, 200);
  strokeWeight(1);
  if (boid.avgPosition.x && boid.avgPosition.y)
    line(
      boid.position.x,
      boid.position.y,
      p5.Vector.add(boid.position, boid.avoidVectorNorm).x,
      p5.Vector.add(boid.position, boid.avoidVectorNorm).y
    );
}

function drawHalo(boid, radius, color, weight, fillColor) {
  stroke(color);
  strokeWeight(weight);
  fill(fillColor);
  ellipse(boid.position.x, boid.position.y, radius * 2, radius * 2);
}

function setup() {
  createCanvas(innerWidth, innerHeight);

  for (let i = 0; i < BOIDS; i++) {
    boids.push(
      new Boid(
        width / 4 + random(width - width / 2),
        height / 4 + random(height - height / 2),
        random(PI * 2),
        2
      )
    );
  }

  for (boid of boids) {
    boid.step();
  }

  // const c = color("rgba(255,0,0,200)");
  // console.log(c);
  // stroke(c);
  // stroke(color('#ff0000'))
  // ellipse()

  // frameRate(10);
}

function draw() {
  if (paused) return;

  background(0);

  // draw boids
  for (boid of boids) {
    // drawBoidFov(boid);

    drawHalo(
      boid,
      boid.cohesionRadius,
      color("#ff000080"),
      1,
      color("#ff000080")
    );

    drawHalo(
      boid,
      boid.separationRadius,
      color("#ff006640"),
      1,
      color("#ff006640")
    );

    drawHalo(
      boid,
      boid.alignmentRadius,
      color("#ff00ff20"),
      1,
      color("#ff00ff20")
    );

    // drawBoidVector(boid);
    // drawAvoidVector(boid);
    // drawAvgPos(boid);

    strokeWeight(1);
    stroke(255);
    for (n of boid.alignmentNeighbors) {
      if (
        dist(boid.position.x, boid.position.y, n.position.x, n.position.y) <
        max(max(SEPARATION_RADIUS, ALIGNMENT_RADIUS), SEPARATION_RADIUS)
      )
        line(boid.position.x, boid.position.y, n.position.x, n.position.y);
    }

    drawBoid(boid);
  }

  for (boid of boids) {
    boid.step();
  }
}

function mousePressed() {
  paused = !paused;
}
