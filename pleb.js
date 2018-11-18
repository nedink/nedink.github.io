class Pleb {
  constructor(x, y, p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
    this.x = this.px = x;
    this.y = this.py = y;
    this.vx = this.pvx = 0;
    this.vy = this.pvy = 0;
    this.shade = 100;
    this.target = null;
    this.isAlive = true;

    /**
     * genetics
     */
    this.running = true;
    this.fitness = 0;

    // from parents
    if (!(p1 && p2)) {
      this.stop = Math.random() * WIDTH;
      this.jumpFreq = Math.pow(Math.random(), 10);
      this.genome = [];
      for (let i = 0; i < TIME; i++) {
        this.genome.push(new Gene(Math.random() * 2 * Math.PI));
      }
      // console.log(this.genome);
    } else {
      /**
       * inherit
       */
      // stop
      this.stop = p1.stop;
      if (Math.random() < 0.5) this.stop = p1.stop;
      // jump freq
      this.jumpFreq = p1.jumpFreq;
      if (Math.random() < 0.5) this.jumpFreq = p1.jumpFreq;
      // vecs
      this.genome = [];
      for (let i = 0; i < p1.genome.length; i++)
        this.genome[i] =
          Math.random() < 0.5 ? p1.genome[i].copy() : p2.genome[i].copy();
      // console.log(this.genome);

      /**
       * mutate
       */
      let r = Math.pow(Math.random(), 10) * 100;
      this.stop += Math.random() < 0.5 ? r : -r;

      r = Math.pow(Math.random(), 10) * 100;
      this.jumpFreq = p1.jumpFreq;

      // genome
      this.genome.forEach((g, i) => {
        if (Math.random() < MUT_RATE) {
          this.genome[i].vec = random(Math.random() * Math.PI * 2);
          this.genome[i].isMutant = true;
        }
      });
    }
    // console.log(this.genome);
  }

  tx() {
    return this.x - this.vx;
  }

  ty() {
    return this.y - 10;
  }

  die() {
    this.isAlive = false;
  }

  step() {
    if (!this.isAlive) return;
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
     * velocity -----------------------------------------------------------
     */

    // set previous velocity
    this.pvx = this.vx;
    this.pvy = this.vy;

    this.shade = 100;
    this.vy += GRAV;

    // stop for cliff
    if (this.running) {
      if (this.x < this.stop) {
        // if (this.grounded) this.vx += ACC_GROUND;
      } else {
        this.running = false;
      }
    } else {
      // this.vx = Math.max(0, this.vx - 0.01);
    }

    // jump
    if (this.jumpFreq < Math.random() && this.grounded) {
      // this.vy -= JUMP_HEIGHT;
    }

    // do vecs
    // console.log(this.genome);
    if (this.genome[frame] && this.grounded) {
      // console.log(this);
      this.vx += Math.sin(this.genome[frame].vec);
      this.vy += Math.cos(this.genome[frame].vec) * 4;
    }

    // fric
    if (this.grounded) this.vx -= this.vx * FRIC;

    // max vel
    if (this.vx < -MAX_WALK) this.vx = -MAX_WALK;
    else if (this.vx > MAX_WALK) this.vx = MAX_WALK;

    /**
     * position -----------------------------------------------------------
     */

    // set previous position
    this.px = this.x;
    this.py = this.y;

    // add velocity
    this.x += this.vx;
    this.y += this.vy;

    /**
     * collision -----------------------------------------------------------
     */

    // edges
    if (this.x < 0 || this.x > WIDTH) {
      this.die();
      return;
      // this.vx = -this.vx;
    }
    // ground
    this.grounded = false;
    if (ground.vecs.length) {
      const groundY = ground.getY(this.x, this.y);
      if (this.y > groundY) {
        this.y = groundY;
        this.vy = 0;
        this.grounded = true;
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
