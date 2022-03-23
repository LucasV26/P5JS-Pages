var bolinha = {
  X: 350,
  Y: 350,
  Xspeed: 5,
  Yspeed: 10
};

let BotaoMenu;
let mouseBotaoMenu;

function setup() {
  createCanvas(1200, 500);
  background(0);

  BotaoMenu = new Triangulo();
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

  mouseBotaoMenu = new mouseTriangles(dist(mouseX, mouseY, BotaoMenu.p1x, BotaoMenu.p1y), dist(mouseX, mouseY, BotaoMenu.p2x, BotaoMenu.p2y), dist(mouseX, mouseY, BotaoMenu.p3x, BotaoMenu.p3y));
  fill(255);
  if (mouseBotaoMenu.Areas(BotaoMenu.a, BotaoMenu.b, BotaoMenu.c) == BotaoMenu.Area()) {
    fill(0, 255, 0);
  }
  
  BotaoMenu.render();
};

function mousePressed() {
  if (mouseBotaoMenu.Areas(BotaoMenu.a, BotaoMenu.b, BotaoMenu.c) == BotaoMenu.Area()) {
    location.replace('https://lucasv26.github.io/P5JS-Pages');
  }
};