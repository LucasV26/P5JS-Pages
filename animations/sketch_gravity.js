class Bola{
  constructor(X, Y, R, B){
    this.X = X;
    this.Y = Y+R;
    this.Hi = Y;
    this.R = R;
    this.M = R;
    this.B = B;
    this.G = 0.3;
    this.V = 1;
    this.Ep = this.M * this.G * Math.abs(this.B - this.Y);
    this.Ec = this.M * this.V**2 / 2;
    this.Em = this.Ep + this.Ec;
    this.Sentido = 0;
  }

  gerandoVelocidadeSubindo(){
    this.Ep = this.M * this.G * Math.abs(this.B - this.Y);
    this.Ec = this.Em - this.Ep;
    this.V = -1*Math.sqrt(this.Ec*2/this.M);
  }

  gerandoVelocidadeCaindo(){
    this.Ep = this.M * this.G * Math.abs(this.B - this.Y);
    this.Ec = this.Em - this.Ep;
    this.V = Math.sqrt(this.Ec*2/this.M);
  }

  desenandoBola(){
    ellipse(this.X, this.Y, this.R*2);
    this.Y += this.V;
    if(this.Y+this.R >= this.B){
      this.Sentido = 1;
    }else if(this.Y-this.R <= this.Hi){
      this.Sentido = 0;
    }
    if(this.Sentido){
      this.gerandoVelocidadeSubindo();
    }else{
      this.gerandoVelocidadeCaindo();
    }
  }
}

let bolas = [
];

let TE;
let mouseTE;

function setup() {
  createCanvas(700, 700);
  bolas.push(new Bola(350, 0, 25, height));
  TE = new Triangulo(0.05*width, 0.9*height, 0.15*width, 0.85*height, 0.15*width, 0.95*height);
}

function draw() {
  background(255, 50, 150);
  stroke(255);
  strokeWeight(2);
  for(let i in bolas){
    bolas[i].desenandoBola();
  }

  mouseTE = new mouseTriangles(dist(mouseX, mouseY, TE.p1x, TE.p1y), dist(mouseX, mouseY, TE.p2x, TE.p2y), dist(mouseX, mouseY, TE.p3x, TE.p3y));
  fill(0);
  if(mouseTE.Areas(TE.a, TE.b, TE.c) == TE.Area()){
    fill(255, 0, 0);
  }
  triangle(TE.p1x, TE.p1y, TE.p2x, TE.p2y, TE.p3x, TE.p3y);
}

let time = 0;

function mousePressed(){
  time = 0;
  bolas.length = 0;

  if(mouseTE.Areas(TE.a, TE.b, TE.c) == TE.Area()){
    location.replace('https://lucasv26.github.io/Estudando-p5js/animations/index_circle.html');
  }
}

function mouseDragged(){
  bolas.push(new Bola(mouseX, mouseY, 5 + time, height));
  /*if(bolas.length > 50){
    bolas.shift();
  }*/
  time>10 ? time = 0 : time += 0.5;
}