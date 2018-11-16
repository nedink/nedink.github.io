
// pause
let running;
function mouseClicked() {
  running = !running;
  if (running)
    doTimer();
}

// timer
let timer = 0;
const doTimer = () => {
  if (!running)
    return;
  setTimeout(() => {
    timer++;
    doTimer()
  }, 1000);
}

const gVecs = [];
let x = 0, y = 400 + Math.random() * 20;
for (i = 0; i < 6; i++) {
  gVecs.push(new Vec(x, y, x += 100, y = 400 + Math.random() * 20));
}
const ground = new Ground(gVecs);

const tx = 600;

const hVecs = [];
// x = 0;
// y = 400 + Math.random() * 20;
// for (i = 0; i < 8; i++) {
//   hVecs.push(new Vec(x, y, x += 100, y = 400 + Math.random() * 20));
// }
const hazard = new Hazard(hVecs);

let plebs = [];
for (i = 0; i < PLEB_COUNT; i++) {
  plebs.push(new Pleb(10 + Math.random() * 20, HEIGHT));
}


/**
 * SETUP -----------------------------------------------------------
 */
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  for (vec of ground.vecs) {
    stroke(255);
  }

  running = true;
  doTimer();
}



/**
 * DRAW -----------------------------------------------------------
 */
function draw() {
  
  // pause
  if (!running)
    return;
  
  // check time
  if (timer > 10) {
    timer = 0;

    /**
     * do next gen -----------------------------------------------------------
     */
    // for pleb count
    // - pick 2 plebs
    //   - 
    // - create new pleb
    // 
    
    plebs.sort((a, b) => b.fitness - a.fitness);
    // console.log(plebs);
    
    let plebCount = 0;
    const r = Math.random();
    
    plebs.forEach((pleb, i) => {
      pleb.r = Math.pow(0.5, 1 + i);
    })

    newPlebs = [];
    while(newPlebs.length < PLEB_COUNT) {
      
      // choose p1
      // choose p2

      Math.sqrt(Math.pow(plebs.length, 2))
      
      // let p1, p2;
      let p1 = plebs[0];
      let p2 = plebs[1];
      
      // const r = Math.random();
      // for (pleb of plebs) {
      //   if (Math.random() < pleb.r) {
      //     console.log(pleb);
      //     break;
      //   }
      // }
      
      newPleb = new Pleb(10 + Math.random() * 20, HEIGHT, p1, p2);

      newPlebs.push(newPleb);
    }

    plebs = newPlebs.slice();
  }

  // update plebs
  for (pleb of plebs) {
    pleb.step();
  }

  /**
   * draw -----------------------------------------------------------
   */
  background(0);
  
  // draw time
  fill(255);
  noStroke();
  text(timer, 10, 20);

  // draw ground
  for (vec of ground.vecs) {
    stroke(255);
    line(vec.sx, vec.sy, vec.ex, vec.ey);
  }

  // draw hazard
  for (vec of hazard.vecs) {
    stroke(255, 0, 0);
    line(vec.sx, vec.sy, vec.ex, vec.ey);
  }

  // draw plebs
  for (pleb of plebs) {

    // draw pleb
    stroke(pleb.shade);
    line(pleb.x, pleb.y, pleb.tx(), pleb.ty());

    
    // pleb info
    
    // text(Math.floor(100 * pleb.vx) / 100, pleb.tx(), pleb.ty() - 10);
    // text(Math.floor(pleb.fitness) / 100, pleb.tx(), pleb.ty() - 10);
    
    let fittest = true;
    for (p of plebs) {
      if (pleb === p)
        continue;
      if (p.fitness > pleb.fitness) {
        fittest = false;
      }
    }
    if (fittest) {
      stroke(Math.abs(tx - pleb.x), 255 * pleb.fitness * 100, 0);
      text(pleb.fitness, pleb.tx(), pleb.ty() - 10);
    }
    // stroke(Math.abs(tx - pleb.x), 255 * pleb.fitness * 100, 0);
    // text(Math.floor(10000 * pleb.fitness) / 10000, pleb.tx(), pleb.ty() - 10);

    // draw target
    // if (pleb.target) {
    //   stroke(255, 0, 0)
    //   line(pleb.x, pleb.y - 10, pleb.target.tx(), pleb.target.ty());
    // }
  }
}