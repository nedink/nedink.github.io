/**
 * pause
 */
function pause() {
  running = !running;
  if (!running) noLoop();
  else loop();
  if (running) document.querySelector("#pause").innerHTML = `||`;
  else document.querySelector("#pause").innerHTML = `>`;
}

// timer
let timer = 0;
let frame = 0;

let gVecs = [];
let x = 0,
  y = 400 + Math.random() * 20;
for (i = 0; i < 6; i++) {
  gVecs.push(new Vec(x, y, (x += 100), (y = 400 + Math.random() * 20)));
}
let ground = new Ground(gVecs);

let tx = 300;
let ty = 300;

let hVecs = [];
let hazard = new Hazard(hVecs);

let plebs = [];
for (i = 0; i < PLEB_COUNT; i++) {
  plebs.push(new Pleb(10 + Math.random() * 20, HEIGHT));
}

let iteration = 1;

let prvAvg = 0;
let avg = 0;
let best = 0;

let outcomes = [];

/**
 * initial state
 */
function reset() {
  // timer
  timer = 0;
  frame = 0;

  gVecs = [];
  (x = 0), (y = 400 + Math.random() * 20);
  for (i = 0; i < 6; i++) {
    gVecs.push(new Vec(x, y, (x += 100), (y = 400 + Math.random() * 20)));
  }
  ground = new Ground(gVecs);

  tx = 300;
  ty = 300;

  hVecs = [];
  // x = 0;
  // y = 400 + Math.random() * 20;
  // for (i = 0; i < 8; i++) {
  //   hVecs.push(new Vec(x, y, x += 100, y = 400 + Math.random() * 20));
  // }
  hazard = new Hazard(hVecs);

  plebs = [];
  for (i = 0; i < PLEB_COUNT; i++) {
    plebs.push(new Pleb(10 + Math.random() * 20, HEIGHT));
  }

  iteration = 1;

  prvAvg = 0;
  avg = 0;
  best = 0;

  outcomes = [];
}

/**
 * runs for a number of iterations
 * @param {Number} iterations
 */

function run(iterations) {
  for (let i = 0; i < iterations; i++) {
    // pause
    // if (!running) return;

    // time
    frame++;

    // exit
    if (frame > 10) window.stop();

    if (frame >= TIME) {
      timer = 0;
      frame = 0;

      // record outcomes
      for (const pleb of plebs) {
        outcomes.push(pleb.x);
      }
      // get updated avg
      const sum = plebs.map(pleb => pleb.x).reduce((acc, cur) => acc + cur);
      prvAvg = avg;
      avg = sum / plebs.length;
      // get updated best
      best = plebs.sort((a, b) => a.fitness > b.fitness)[0];

      /**
       * do next gen -----------------------------------------------------------
       */

      plebs.sort((a, b) => b.fitness - a.fitness);

      plebs.forEach((pleb, i) => {
        pleb.r = Math.pow(0.8, i);
      });

      newPlebs = [];
      while (newPlebs.length < PLEB_COUNT) {
        plebs.sort((a, b) => a.r - b.r);

        let p1, p2;
        const r1 = Math.random(),
          r2 = Math.random();

        for (const pleb of plebs) {
          if (r1 < pleb.r) {
            p1 = pleb;
            break;
          }
        }
        for (const pleb of plebs) {
          if (r2 < pleb.r) {
            p2 =
              pleb !== p1
                ? pleb
                : plebs[(plebs.indexOf(pleb) + 1) % plebs.length];
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
  }
}

/**
 * SETUP -----------------------------------------------------------
 */
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  reset();
  running = true;
}

/**
 * DRAW -----------------------------------------------------------
 */
function draw() {
  run(1);

  /**
   * draw -----------------------------------------------------------
   */
  background(0);

  // draw info
  fill(255);
  noStroke();
  // iteration
  text("Iteration: " + iteration, 10, 20);
  // time
  text("Time left (sec): " + (TIME - frame) / 100, 10, 40);
  // FPS
  // text("FPS: " + Math.floor(frameCount), 10, 60);
  // frame
  text("Frame: " + frame, 10, 60);

  // target
  stroke(0, 180, 0);
  line(tx, 0, tx, ty);
  line(tx, ty, tx - 10, ty - 10);
  line(tx, ty, tx + 10, ty - 10);

  // avg
  stroke(255, 25500 * (1 / Math.abs(tx - avg)), 0);
  // line(avg, 0, avg, HEIGHT);
  fill(255, 25500 * (1 / Math.abs(tx - avg)), 0);
  noStroke();
  // text("Average", avg + 8, 20);
  stroke(255, 25500 * (1 / Math.abs(tx - best)), 0);
  // line(best, 0, best, HEIGHT);
  fill(255, 25500 * (1 / Math.abs(tx - best)), 0);
  noStroke();
  // text("Best", best + 8, HEIGHT);

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
    if (!pleb.isAlive) continue;

    // draw pleb
    stroke(255);
    if (pleb.genome[frame] && pleb.genome[frame].isMutant) stroke(255, 0, 0);
    line(pleb.x, pleb.y, pleb.tx(), pleb.ty());

    // pleb info

    // text(Math.floor(100 * pleb.vx) / 100, pleb.tx(), pleb.ty() - 10);
    // text(Math.floor(pleb.fitness) / 100, pleb.tx(), pleb.ty() - 10);

    let fittest = true;
    for (p of plebs) {
      if (pleb === p) continue;
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
