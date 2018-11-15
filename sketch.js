


const vecs = [];
let x = -100, y = HEIGHT - 40 - Math.random() * 20;
for (i = 0; i < 20; i++) {
  vecs.push(new Vec(x, y, x += 100, y = HEIGHT - 40 - Math.random() * 20));
}
const ground = new Ground(vecs);
const plebs = [];
for (i = 0; i < 10; i++) {
  plebs.push(new Pleb(Math.random() * WIDTH, Math.random() * HEIGHT));
}

// setup
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  for (vec of ground.vecs) {
    stroke(255);
  }
}



// draw
function draw() {
  
  background(0);

  // update plebs
  for (pleb of plebs) {
    pleb.step();
  }

  // draw ground
  for (vec of ground.vecs) {
    stroke(255);
    line(vec.sx, vec.sy, vec.ex, vec.ey);
  }

  // draw plebs
  for (pleb of plebs) {

    // draw pleb
    stroke(pleb.shade);
    line(pleb.x, pleb.y, pleb.x, pleb.ty());

    // draw target
    if (pleb.target) {
      stroke(255, 0, 0)
      line(pleb.x, pleb.y - 10, pleb.target.tx(), pleb.target.ty());
    }
  }
  

}