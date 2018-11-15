class Pleb {
  
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.shade = 100;
    this.target = null;
    this.MAX_WALK = 1;

  }

  tx() {
    return this.x;
  }

  ty() {
    return this.y - 10;
  }

  step() {

    // target
    if (Math.random() < 0.01) {
      this.target = plebs[Math.floor(Math.random() * plebs.length)];
    }
    if (Math.random() < 0.01) {
      this.target = null;
    }
    if (this.target) {
      if (this.x < this.target.tx()) this.vx += 0.01;
      else this.vx -= 0.01;
      // this.vx += (this.target.tx() - this.x) * ;
    }

    // jump
    if (Math.random() < 0.001) {
      this.vy -= Math.random() * 4;
    }

    // vel
    this.shade = 100;
    this.vy += GRAV
    // max vel
    if (this.vx < -this.MAX_WALK) this.vx = -this.MAX_WALK;
    else if (this.vx > this.MAX_WALK) this.vx = this.MAX_WALK;

    // vel -> pos
    this.x += this.vx
    this.y += this.vy

    // collision
    // edges
    if (this.x < 0 || this.x > WIDTH) {
      this.vx = -this.vx;
    }
    // ground
    const groundY = ground.getY(this.x);
    if (this.y > groundY) {

      // print(ground.vecs[0])
      // print(ground.getY(this.y))

      this.y = groundY;
      this.vy = 0;
      this.shade = 255;

      // this.x = Math.random() * WIDTH;
      // this.y = 0;
    }
  }
}