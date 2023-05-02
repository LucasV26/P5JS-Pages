class Bolinha {
  constructor(X, Y, H) {
    this.X = X;
    this.Y = Y;
    this.V = 0;
    this.G = 0.3;
    this.H = H;
  }

  moverBola() {
    this.Y += this.V;
    this.Y = constrain(this.Y, 0, height);

    if (this.Y >= height) {
      if (this.V > 0) {
        this.V *= -1;
      }
    }

    this.V += this.G;
  }

  desenharBola() {
    ellipse(this.X, this.Y, 30, 30);
  }
}

let bolas = [];

let BotaoMenu;
let mouseBotaoMenu;

function setup() {
  createCanvas(window.innerWidth , window.innerHeight);
  BotaoMenu = new Triangulo();
  bolas[0] = new Bolinha(350, 350, height);
  // put setup code here
}

function draw() {
  background(0);
  fill(255);
  stroke(255);
  for (let b of bolas) {
    b.desenharBola();
    b.moverBola();
  }

  mouseBotaoMenu = new mouseTriangles(dist(mouseX, mouseY, BotaoMenu.p1x, BotaoMenu.p1y), dist(mouseX, mouseY, BotaoMenu.p2x, BotaoMenu.p2y), dist(mouseX, mouseY, BotaoMenu.p3x, BotaoMenu.p3y));
  if (mouseBotaoMenu.Areas(BotaoMenu.a, BotaoMenu.b, BotaoMenu.c) == BotaoMenu.Area()) {
    fill(0, 255, 0);
  }
  
  BotaoMenu.render();
}

function mousePressed() {
  bolas.length = 0;

  if (mouseBotaoMenu.Areas(BotaoMenu.a, BotaoMenu.b, BotaoMenu.c) == BotaoMenu.Area()) {
    location.replace('https://lucasv26.github.io/P5JS-Pages');
  }
}

function mouseDragged() {
  bolas.push(new Bolinha(mouseX, mouseY, height));
}