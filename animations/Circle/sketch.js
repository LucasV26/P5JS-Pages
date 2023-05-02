class Circunferencia {
  constructor(cenX, cenY, R, move) {
    this.cenX = cenX;
    this.cenY = cenY;
    this.R = R;
    this.X = this.cenX + this.R;
    this.Y;
    this.X2;
    this.Y2 = this.cenY + this.R;
    this.move = move;
    this.move2 = move;
  }

  moverCirculoYX() {
    let par = { a: 1, b: -2 * this.cenY, c: this.cenY ** 2 + this.cenX ** 2 - 2 * this.cenX * this.X + this.X ** 2 - this.R ** 2 };
    let delta = (par.b ** 2) - (4 * par.a * par.c);
    let result = { Y1: (-1 * (par.b + sqrt(delta))) / 2 * par.a, Y2: (-1 * (par.b - sqrt(delta))) / 2 * par.a };
    if (this.move < 0) {
      this.Y = result.Y2;
    } else {
      this.Y = result.Y1;
    }
  }

  moverCirculoXY() {
    let par = { a: 1, b: -2 * this.cenX, c: this.cenY ** 2 + this.cenX ** 2 - 2 * this.cenY * this.Y2 + this.Y2 ** 2 - this.R ** 2 };
    let delta = (par.b ** 2) - (4 * par.a * par.c);
    let result = { X1: (-1 * (par.b + sqrt(delta))) / 2 * par.a, X2: (-1 * (par.b - sqrt(delta))) / 2 * par.a };
    if (this.move2 < 0) {
      this.X2 = result.X2;
    } else {
      this.X2 = result.X1;
    }
  }

  desenharCirculo(r = 255, g = 255, b = 255) {
    ellipse(this.cenX, this.cenY, 25, 25);
    //Gerar Y em função de X (Y = f(x)):
    this.moverCirculoYX();
    //Gerar X em função de Y (X = f(y)):
    this.moverCirculoXY();
    stroke(r, g, b);
    //Respectivamente: círculo de Y em função de X e círculo de X em função de Y:
    line(this.cenX, this.cenY, this.X, this.Y);
    line(this.cenX, this.cenY, this.X2, this.Y2);
    this.X += this.move;
    this.Y2 += this.move2;
    if (this.X > this.R + this.cenX || this.X < this.cenX - this.R) {
      this.move *= -1;
    }
    if (this.Y2 > this.R + this.cenY || this.Y2 < this.cenY - this.R) {
      this.move2 *= -1;
    }
  }
}

let circunferencias = [];

let BotaoMenu;
let mouseBotaoMenu;

function setup() {
  createCanvas(window.innerWidth , window.innerHeight);
  background(0);
  BotaoMenu = new Triangulo();

  circunferencias.push(new Circunferencia(width/2, height/2, 150, 1));
};
//A função setup() é executada apenas 1 vez durante todo o fluxo
//The setup() function runs only once during the whole program flow

function draw() {
  stroke(0);
  fill(255);
  for (let i in circunferencias) {
    circunferencias[i].desenharCirculo(255 - (i * 20),255 - i, 255 - (i * 20));
  }

  mouseBotaoMenu = new mouseTriangles(dist(mouseX, mouseY, BotaoMenu.p1x, BotaoMenu.p1y), dist(mouseX, mouseY, BotaoMenu.p2x, BotaoMenu.p2y), dist(mouseX, mouseY, BotaoMenu.p3x, BotaoMenu.p3y));

  fill(255);
  if (mouseBotaoMenu.Areas(BotaoMenu.a, BotaoMenu.b, BotaoMenu.c) == BotaoMenu.Area()) {
    fill(0, 255, 0);
  }

  BotaoMenu.render();

  stroke(0);
  fill(255);
  textSize(16);
  text("Limpar Tela -> 'C'", width - 150, 20);
};
//A função draw() é executada em loop infinito
//The draw() function runs infinitely

function mousePressed() {
  circunferencias.push(new Circunferencia(mouseX, mouseY, random(100, 300), 1));

  if (mouseBotaoMenu.Areas(BotaoMenu.a, BotaoMenu.b, BotaoMenu.c) == BotaoMenu.Area()) {
    location.replace('https://lucasv26.github.io/P5JS-Pages');
  }
};

function keyPressed() {
  if(keyCode === 67){
    circunferencias = [];
    background(0);
  }
}