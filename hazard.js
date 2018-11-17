class Hazard {
  
  constructor(vecs) {
    this.vecs = vecs;
  }

  getY(x) {
    for (const vec of this.vecs) {
      if (x >= vec.sx && x <= vec.ex) { // found vec to collide
        return (x - vec.sx) * vec.slope() + vec.sy;
      }
    }
    return 0;
  }
}