var bolinha = {
  X: 350,
  Y: 350,
  Xspeed: 5,
  Yspeed: 10
};

let TE;
let mouseTE;

function setup() {
  createCanvas(700, 700);
  background(0);

  TE = new Triangulo(0.04 * width, 0.1 * height, 0.15 * width, 0.05 * height, 0.15 * width, 0.15 * height);
};

function draw() {
  fill(random(255));
  ellipse(bolinha.X, bolinha.Y, 50, 50);
  bolinha.X += bolinha.Xspeed;
  bolinha.Y += bolinha.Yspeed;
  if (bolinha.X + 25 >= width || bolinha.X - 25 <= 0) {
    bolinha.Xspeed *= -1;
  }
  if (bolinha.Y + 25 >= height || bolinha.Y - 25 <= 0) {
    bolinha.Yspeed *= -1;
  }

  mouseTE = new mouseTriangles(dist(mouseX, mouseY, TE.p1x, TE.p1y), dist(mouseX, mouseY, TE.p2x, TE.p2y), dist(mouseX, mouseY, TE.p3x, TE.p3y));
  fill(0);
  if (mouseTE.Areas(TE.a, TE.b, TE.c) == TE.Area()) {
    fill(255, 0, 0);
  }
  triangle(TE.p1x, TE.p1y, TE.p2x, TE.p2y, TE.p3x, TE.p3y);
  stroke(255);
  text("MENU", 0.09 * width, 0.105 * height);
};

function mousePressed() {
  if (mouseTE.Areas(TE.a, TE.b, TE.c) == TE.Area()) {
    location.replace('https://lucasv26.github.io/P5JS-Pages');
  }
};