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

  desenharCirculo(r = 0, g = 0, b = 0) {
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

let circunferencias = [
  new Circunferencia(350, 350, 150, 1)
];

let TE;
let mouseTE;

function setup() {
  createCanvas(700, 700);
  background(0, 0, 255);
  TE = new Triangulo(0.04 * width, 0.1 * height, 0.15 * width, 0.05 * height, 0.15 * width, 0.15 * height);
};
//A função setup() é executada apenas 1 vez durante todo o fluxo
//The setup() function runs only once during the whole program flow

function draw() {
  stroke(255);
  fill(0);
  for (let i in circunferencias) {
    circunferencias[i].desenharCirculo(i * 20, i, i * 20);
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
//A função draw() é executada em loop infinito
//The draw() function runs infinitely

function mousePressed() {
  circunferencias.push(new Circunferencia(mouseX, mouseY, random(100, 300), 1));

  if (mouseTE.Areas(TE.a, TE.b, TE.c) == TE.Area()) {
    location.replace('https://lucasv26.github.io/P5JS-Pages');
  }
};