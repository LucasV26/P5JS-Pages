class Bola {
  constructor(X, Y, R, B) {
    this.X = X;
    this.Y = Y + R;
    this.Hi = Y;
    this.R = R;
    this.M = R;
    this.B = B;
    this.G = 0.3;
    this.V = 1;
    this.Ep = this.M * this.G * Math.abs(this.B - this.Y);
    this.Ec = this.M * this.V ** 2 / 2;
    this.Em = this.Ep + this.Ec;
    this.Sentido = 0;
  }

  gerandoVelocidadeSubindo() {
    this.Ep = this.M * this.G * Math.abs(this.B - this.Y);
    this.Ec = this.Em - this.Ep;
    this.V = -1 * Math.sqrt(this.Ec * 2 / this.M);
  }

  gerandoVelocidadeCaindo() {
    this.Ep = this.M * this.G * Math.abs(this.B - this.Y);
    this.Ec = this.Em - this.Ep;
    this.V = Math.sqrt(this.Ec * 2 / this.M);
  }

  desenandoBola() {
    ellipse(this.X, this.Y, this.R * 2);
    this.Y += this.V;
    if (this.Y + this.R >= this.B) {
      this.Sentido = 1;
    } else if (this.Y - this.R <= this.Hi) {
      this.Sentido = 0;
    }
    if (this.Sentido) {
      this.gerandoVelocidadeSubindo();
    } else {
      this.gerandoVelocidadeCaindo();
    }
  }
}

let bolas = [
];

let BotaoMenu;
let mouseBotaoMenu;

function setup() {
  createCanvas(window.innerWidth , window.innerHeight);
  bolas.push(new Bola(width/2, 0, 25, height));
  BotaoMenu = new Triangulo();
}

function draw() {
  background(0);
  stroke(255);
  fill(255);
  strokeWeight(2);
  for (let i in bolas) {
    bolas[i].desenandoBola();
  }

  mouseBotaoMenu = new mouseTriangles(dist(mouseX, mouseY, BotaoMenu.p1x, BotaoMenu.p1y), dist(mouseX, mouseY, BotaoMenu.p2x, BotaoMenu.p2y), dist(mouseX, mouseY, BotaoMenu.p3x, BotaoMenu.p3y));
  if (mouseBotaoMenu.Areas(BotaoMenu.a, BotaoMenu.b, BotaoMenu.c) == BotaoMenu.Area()) {
    fill(0, 255, 0);
  }
  
  BotaoMenu.render();
}

let time = 0;

function mousePressed() {
  time = 0;
  bolas.length = 0;

  if (mouseBotaoMenu.Areas(BotaoMenu.a, BotaoMenu.b, BotaoMenu.c) == BotaoMenu.Area()) {
    location.replace('https://lucasv26.github.io/P5JS-Pages');
  }
}

function mouseDragged() {
  bolas.push(new Bola(mouseX, mouseY, 5 + time, height));
  
  //Limitar numero de bolas
  // if(bolas.length > 200){
  //   bolas.shift();
  // }

  time > 10 ? time = 0 : time += 0.2;
}