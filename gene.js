class Gene {
  constructor(vec) {
    this.vec = vec;
  }

  copy() {
    return new Gene(this.vec);
  }
}
