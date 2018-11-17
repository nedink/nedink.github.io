
// pause
let running;
// function mouseClicked() {
//   running = !running;
//   if (running)
//     doTimer();
// }

// timer
let timer = 0;
const doTimer = () => {
  if (!running)
    return;
  setTimeout(() => {
    timer++;
    doTimer()
  }, TIME);
}

const gVecs = [];
let x = 0, y = 400 + Math.random() * 20;
for (i = 0; i < 6; i++) {
  gVecs.push(new Vec(x, y, x += 100, y = 400 + Math.random() * 20));
}
const ground = new Ground(gVecs);

const tx = 600;
const ty = 300;

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

let iteration = 1;

let prvAvg = 0;
let avg = 0;

const outcomes = [];


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
  if (timer >= (TIME / 100)) {
    
    timer = 0;

    // record outcomes
    for (const pleb of plebs) {
      outcomes.push(pleb.x);
    }
    // get updated avg
    const sum = plebs.map(pleb => pleb.x).reduce((acc, cur) => acc + cur);
    prvAvg = avg;
    avg = sum / plebs.length;
    

    /**
     * do next gen -----------------------------------------------------------
     */
    
    plebs.sort((a, b) => b.fitness - a.fitness);
    
    plebs.forEach((pleb, i) => {
      pleb.r = Math.pow(0.5, i);
    })

    newPlebs = [];
    while(newPlebs.length < PLEB_COUNT) {

      plebs.sort((a, b) => a.r - b.r);
      
      let p1, p2;
      const r1 = Math.random(), r2 = Math.random();
      
      for (const pleb of plebs) {
        if (r1 < pleb.r) {
          p1 = pleb;
          break;
        }
      }
      for (const pleb of plebs) {
        if (r2 < pleb.r) {
          p2 = pleb;
          break;
        }
      }
      
      newPleb = new Pleb(10 + Math.random() * 20, HEIGHT, p1, p2);

      newPlebs.push(newPleb);
    }

    plebs = newPlebs.slice();
    iteration++;
  }

  // update plebs
  for (pleb of plebs) {
    pleb.step();
  }

  /**
   * draw -----------------------------------------------------------
   */
  background(0);
  
  // draw info
  fill(255);
  noStroke();
  // iteration
  text('Iteration: ' + iteration, 10, 20);
  // time
  text('Time left (sec): ' + ((TIME / 100) - timer), 10, 40);

  // target
  stroke(0, 180, 0);
  line(tx, 0, tx, ty);
  line(tx, ty, tx - 10, ty - 10);
  line(tx, ty, tx + 10, ty - 10);
  
  // avg
  stroke(255, 25500 * (1 / Math.abs(tx - avg)), 0);
  line(avg, 0, avg, HEIGHT);
  fill(255, 25500 * (1 / Math.abs(tx - avg)), 0);
  noStroke();
  text('Average', avg + 8, HEIGHT);

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
      fill(255);
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