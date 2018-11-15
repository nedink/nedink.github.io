class Vec {
  constructor(sx, sy, ex, ey) {
    this.sx = sx;
    this.sy = sy;
    this.ex = ex;
    this.ey = ey;
  }

  slope() {
    // return (ey - sy) / (ex - sx);
    return (this.ey - this.sy) / (this.ex - this.sx);
  }
}