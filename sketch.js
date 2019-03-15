
let zoom = 10;

board.hexes.forEach(hex => {
  resources.sort(() => Math.random() - 0.5);
  hex.resource = resources.pop();

  if (hex.resource === "desert") return;
  rolls.sort(() => Math.random() - 0.5);
  hex.roll = rolls.pop();
});



// ---------------------------

function setup() {
  colors.desert = color(255, 238, 160);
  colors.wood = color(44, 94, 69);
  colors.brick = color(185, 105, 68);
  colors.wheat = color(255, 238, 0);
  colors.sheep = color(125, 214, 73);
  colors.ore = color(111, 114, 134);
  colors.player1 = color(224, 26, 26);
  colors.player2 = color(247, 151, 8);
  colors.player3 = color(255, 255, 255);
  colors.player4 = color(31, 84, 255);
  
  createCanvas(innerWidth, innerHeight);
  background(0);

  translate(width / 2, height / 2);
  scale(zoom);

  board.hexes.forEach(hex => {
    const c = colors[hex.resource];
    fill(c);
    strokeWeight(0.1);
    beginShape();
    vertex(hex.x, hex.y - 7);
    vertex(hex.x + 6, hex.y - 3);
    vertex(hex.x + 6, hex.y + 3);
    vertex(hex.x, hex.y + 7);
    vertex(hex.x - 6, hex.y + 3);
    vertex(hex.x - 6, hex.y - 3);
    endShape(CLOSE);
    fill(brightness(colors[hex.resource]) > 80 ? 0 : 255);
    textAlign(CENTER, CENTER);
    textSize(4);
    text(hex.roll, hex.x, hex.y);
  });
};

function draw() {};



// ---------------------------

function keyPressed() {
  console.log(keyCode === 32)
  switch(keyCode) {
    case 32: // space 
      console.log()
      break;
  }
}