class Bolinha{
  constructor(X, Y, H){
    this.X = X;
    this.Y = Y;
    this.V = 0;
    this.G = 0.3;
    this.H = H;
  }

  moverBola(){
    this.Y += this.V;
    this.Y = constrain(this.Y, 0, height);

    if(this.Y >= height){
      if(this.V > 0){
        this.V *= -1;
      }
    }

    this.V += this.G;
  }

  desenharBola(){
    ellipse(this.X, this.Y, 30, 30);
  }
}

let bolas = []; 

let TE;
let mouseTE;

function setup() {
  createCanvas(700, 700);
  TE = new Triangulo(0.05*width, 0.9*height, 0.15*width, 0.85*height, 0.15*width, 0.95*height);
  bolas[0] = new Bolinha(350, 350, height);
  // put setup code here
}

function draw() {
  background(255, 50, 150);
  fill(0);
  stroke(255);
  for(let b of bolas){
    b.desenharBola();
    b.moverBola();
  }

  mouseTE = new mouseTriangles(dist(mouseX, mouseY, TE.p1x, TE.p1y), dist(mouseX, mouseY, TE.p2x, TE.p2y), dist(mouseX, mouseY, TE.p3x, TE.p3y));
  if(mouseTE.Areas(TE.a, TE.b, TE.c) == TE.Area()){
    fill(255, 0, 0);
  }
  triangle(TE.p1x, TE.p1y, TE.p2x, TE.p2y, TE.p3x, TE.p3y);
  // put drawing code here
}

function mousePressed(){
  bolas.length = 0;

  if(mouseTE.Areas(TE.a, TE.b, TE.c) == TE.Area()){
    location.replace('https://lucasv26.github.io/Estudando-p5js/animations/index_gravity.html');
  }
}

function mouseDragged(){
  bolas.push(new Bolinha(mouseX, mouseY, height));
}