class Ground {

  constructor(vecs) {
    this.vecs = vecs;
  }

  getY(x) {
    for (const vec of this.vecs) {
      if (x >= vec.sx && x <= vec.ex) { // found vec to collide
        return (x - vec.sx) * vec.slope() + vec.sy;
        // return vec.sy;
        // const offX = x - vec.sx;
        // return offX * vec.slope() + x;
      }
    }
    return 0;
  }
}