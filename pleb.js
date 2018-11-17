class Pleb {
  
  constructor(x, y, p1, p2) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.shade = 100;
    this.target = null;
    this.MAX_WALK = 3;

    this.stop = Math.random() * WIDTH;
    this.running = true;
    this.fitness = 0;

    // from parents
    if (p1 && p2) {

      // inherit
      this.stop = p1.stop;
      if (Math.random() < 0.5) {
        this.stop = p2.stop;
      }
  
      // mutate
      const r = Math.pow(Math.random(), 10) * 100;
      this.stop += Math.random() < 0.5 ? r : -r;
    }
  }

  tx() {
    return this.x - this.vx;
  }

  ty() {
    return this.y - 10;
  }

  step() {

    // target
    // if (Math.random() < 0.01) {
    //   this.target = plebs[Math.floor(Math.random() * plebs.length)];
    // }
    // if (Math.random() < 0.01) {
    //   this.target = null;
    // }
    // if (this.target) {
    //   if (this.x < this.target.tx()) this.vx += 0.01;
    //   else this.vx -= 0.01;
    // }

    // jump
    // if (Math.random() < 0.001) {
    //   this.vy -= Math.random() * 4;
    // }

    /**
     * vel -----------------------------------------------------------
     */

    this.shade = 100;
    this.vy += GRAV

    // stop for cliff
    if (this.running) {
      if (this.x < this.stop) {
        this.vx += 0.01;
      } else {
        this.running = false;
      }
    }
    else {
      this.vx = Math.max(0, this.vx - 0.01);
    }
    
    // max vel
    if (this.vx < -this.MAX_WALK) this.vx = -this.MAX_WALK;
    else if (this.vx > this.MAX_WALK) this.vx = this.MAX_WALK;

    // vel -> pos
    this.x += this.vx
    this.y += this.vy

    /**
     * collision -----------------------------------------------------------
     */

     // edges
    if (this.x < 0 || this.x > WIDTH) {
      this.vx = -this.vx;
    }
    // ground
    if (ground.vecs.length) {
      const groundY = ground.getY(this.x, this.y);
      if (this.y > groundY) {
        this.y = groundY;
        this.vy = 0;
        this.shade = 255;
      }
    }
    // hazard
    if (hazard.vecs.length) {
      const hazardY = hazard.getY(this.x, this.y);
      if (this.y > hazardY) {
        this.y = hazardY;
        this.vy = 0;
        this.shade = 255;
        // TODO: spawn pleb bits
      }
    }

    /**
     * other -----------------------------------------------------------
     */
    this.fitness = this.x > tx ? 0 : 1 / Math.abs(tx - this.x);
  }
}

class PlebBits {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}