const BOID_RADIUS = 20;

class Boid {
  constructor(x, y, direction, initialSpeed) {
    this.position = createVector(x, y);
    this.heading = createVector(cos(direction), sin(direction));
    this.speed = initialSpeed;
  }

  step() {
    // look at all other boids in radius
    const neighbors = boids.filter(
      boid => this.position.dist(boid.position) < BOID_RADIUS && this !== boid
    );

    // if (neighbors.includes(this)) console.log("includes");

    // separation: steer to avoid crowding local flockmates
    this.avoidVector = neighbors
      .map(boid =>
        createVector(
          this.position.x - boid.position.x,
          this.position.y - boid.position.y
        )
      ) // get position difference (normalized vec pointing away from neighbor)
      .reduce((a, b) => a.add(b), createVector()); // sum vecs
    const avoidVectorNorm = this.avoidVector.copy().normalize();
    this.heading.add(avoidVectorNorm);

    // alignment: steer towards the average heading of local flockmates
    this.avgHeading = neighbors
      .map(n => n.heading) // get headings
      .reduce((acc, heading) => acc.add(heading), createVector()) // sum headings
      .div(neighbors.length || 1); // divide by total neighbors (avg neighbor heading)
    const avgHeadingNorm = this.avgHeading.copy().normalize(); // normalize (this step is hopefully redundant)
    this.heading.add(avgHeadingNorm); // add to own heading

    // cohesion: steer to move toward the average position (center of mass) of local flockmates
    this.avgPosition = neighbors
      .map(n => n.position) // get positions
      .reduce((acc, position) => acc.add(position), createVector()) // sum positions
      .div(neighbors.length || 1); // divide by total neighbors (avg neightbor heading)
    const avgPositionNorm = this.avgPosition.copy().normalize(); // normalize
    this.heading.add(avgPositionNorm); // add to own heading

    // normalize heading
    this.heading.normalize();

    // move
    const displacement = p5.Vector.mult(this.heading, this.speed);
    this.position.add(displacement);

    // wrap
    if (this.position.x > width) this.position.x = 0;
    if (this.position.x < 0) this.position.x = width;
    if (this.position.y > height) this.position.y = 0;
    if (this.position.y < 0) this.position.y = height;
  }
}
