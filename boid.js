const BOID_RADIUS = 40;
const SEPARATION_RADIUS = 50;
const ALIGNMENT_RADIUS = 60;
const COHESION_RADIUS = 20;

const SEPARATION_FORCE = 0.5;
const ALIGNMENT_FORCE = 0.4;
const COHESION_FORCE = 1;

class Boid {
  constructor(x, y, direction, initialSpeed) {
    this.position = createVector(x, y);
    this.heading = createVector(cos(direction), sin(direction));
    this.speed = initialSpeed;
    this.separationRadius = SEPARATION_RADIUS;
    this.alignmentRadius = ALIGNMENT_RADIUS;
    this.cohesionRadius = COHESION_RADIUS;
  }

  step() {
    // separation: steer to avoid crowding local flockmates
    this.separationNeighbors = boids.filter(
      boid =>
        this.position.dist(boid.position) < SEPARATION_RADIUS && this !== boid
    );
    this.avoidVector = this.separationNeighbors
      .map(boid =>
        createVector(
          this.position.x - boid.position.x,
          this.position.y - boid.position.y
        )
      ) // get position difference (vec pointing away from neighbor)
      .reduce((a, b) => a.add(b), createVector()); // sum vecs
    this.avoidVectorNorm = this.avoidVector.copy().normalize();
    this.separationVector = this.avoidVectorNorm.copy().mult(SEPARATION_FORCE);
    this.heading.add(this.separationVector);

    // alignment: steer towards the average heading of local flockmates
    this.alignmentNeighbors = boids.filter(
      boid =>
        this.position.dist(boid.position) < ALIGNMENT_RADIUS && this !== boid
    );
    this.avgHeading = this.alignmentNeighbors
      .map(n => n.heading) // get headings
      .reduce((acc, heading) => acc.add(heading), createVector()) // sum headings
      .div(this.alignmentNeighbors.length || 1); // divide by total this.neighbors (avg neighbor heading)
    this.avgHeadingNorm = this.avgHeading.copy().normalize(); // normalize (this step is hopefully redundant)
    this.alignmentVector = this.avgHeadingNorm.copy().mult(ALIGNMENT_FORCE); // normalize (this step is hopefully redundant)
    this.heading.add(this.alignmentVector);

    // cohesion: steer to move toward the average position (center of mass) of local flockmates
    this.cohesionNeighbors = boids.filter(
      boid =>
        this.position.dist(boid.position) < COHESION_RADIUS && this !== boid
    );
    this.avgPosition = this.cohesionNeighbors
      .map(n => n.position) // get positions
      .reduce((acc, position) => acc.add(position), createVector()) // sum positions
      .div(this.cohesionNeighbors.length || 1); // divide by total this.cohesionNeighbors (avg neightbor heading)
    this.avgPositionNorm = this.avgPosition.copy().normalize(); // normalize
    this.cohesionVector = this.avgPositionNorm.copy().mult(COHESION_FORCE); // normalize
    this.heading.add(this.cohesionVector);

    // normalize heading
    // this.heading.normalize();

    this.heading.limit(4);

    // move
    // const displacement = this.heading;
    const displacement = p5.Vector.mult(this.heading, this.speed);
    this.position.add(displacement);

    // wrap
    if (this.position.x > width + BOID_RADIUS) this.position.x = -BOID_RADIUS;
    if (this.position.x < -BOID_RADIUS) this.position.x = width + BOID_RADIUS;
    if (this.position.y > height + BOID_RADIUS) this.position.y = -BOID_RADIUS;
    if (this.position.y < -BOID_RADIUS) this.position.y = height + BOID_RADIUS;
  }
}
