class Triangulo{
  constructor(p1x, p1y, p2x, p2y, p3x, p3y){
    this.p1x = p1x;
    this.p1y = p1y;
    this.p2x = p2x;
    this.p2y = p2y;
    this.p3x = p3x;
    this.p3y = p3y;
    this.a = dist(p1x, p1y, p2x, p2y);
    this.b = dist(p2x, p2y, p3x, p3y);
    this.c = dist(p3x, p3y, p1x, p1y);
  }

  Area(){
    let p = (this.a+this.b+this.c)/2;
    let area = Math.sqrt(p * (p-this.a) * (p-this.b) * (p-this.c));
    return Math.round(area);
  }
}
class mouseTriangles{
  constructor(mouseP1, mouseP2, mouseP3){
    this.mouseP1 = mouseP1;
    this.mouseP2 = mouseP2;
    this.mouseP3 = mouseP3;
  }

  Areas(a, b, c){
    let p1 = (this.mouseP2+b+this.mouseP3)/2;
    let area1 = Math.sqrt(p1 * (p1-this.mouseP2) * (p1-b) * (p1-this.mouseP3));
    let p2 = (this.mouseP1+this.mouseP3+c)/2;
    let area2 = Math.sqrt(p2 * (p2-this.mouseP1) * (p2-this.mouseP3) * (p2-c));
    let p3 = (a+this.mouseP1+this.mouseP2)/2;
    let area3 = Math.sqrt(p3 * (p3-a) * (p3-this.mouseP1) * (p3-this.mouseP2));
    return Math.round(area1+area2+area3);
  }
}

class Circunferencia{
  constructor(cenX, cenY, R, move){
    this.cenX = cenX;
    this.cenY = cenY;
    this.R = R;
    this.X = this.cenX+this.R;
    this.Y;
    this.X2;
    this.Y2 = this.cenY+this.R;
    this.move = move;
    this.move2 = move;
  }

  moverCirculoYX(){
    let par = {a: 1, b: -2*this.cenY, c: this.cenY**2 + this.cenX**2 - 2*this.cenX*this.X + this.X**2 - this.R**2};
    let delta = (par.b**2) - (4 * par.a * par.c);
    let result = {Y1: (-1*(par.b + sqrt(delta)))/2*par.a, Y2: (-1*(par.b - sqrt(delta)))/2*par.a};
    if(this.move < 0){
      this.Y = result.Y2;
    }else{
      this.Y = result.Y1;
    }
  }

  moverCirculoXY(){
    let par = {a: 1, b: -2*this.cenX, c: this.cenY**2 + this.cenX**2 - 2*this.cenY*this.Y2 + this.Y2**2 - this.R**2};
    let delta = (par.b**2) - (4 * par.a * par.c);
    let result = {X1: (-1*(par.b + sqrt(delta)))/2*par.a, X2: (-1*(par.b - sqrt(delta)))/2*par.a};
    if(this.move2 < 0){
      this.X2 = result.X2;
    }else{
      this.X2 = result.X1;
    }
  }

  desenharCirculo(r=0, g=0, b=0){
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
    if(this.X > this.R+this.cenX || this.X < this.cenX-this.R){
      this.move *= -1;
    }
    if(this.Y2 > this.R+this.cenY || this.Y2 < this.cenY-this.R){
      this.move2 *= -1;
    }
  }
}

let circunferencias = [
  new Circunferencia(350, 350, 150, 1)
];


function setup() { 
  createCanvas(700, 700);
  background(0, 0, 255);
}; 
//A função setup() é executada apenas 1 vez durante todo o fluxo
//The setup() function runs only once during the whole program flow

function draw() {
  stroke(255);
  for(let i in circunferencias){
    circunferencias[i].desenharCirculo(i*20, i, i*20);
  }

  let TE = new Triangulo(0.05*width, 0.9*height, 0.15*width, 0.85*height, 0.15*width, 0.95*height);
  let mouseTE = new mouseTriangles(dist(mouseX, mouseY, TE.p1x, TE.p1y), dist(mouseX, mouseY, TE.p2x, TE.p2y), dist(mouseX, mouseY, TE.p3x, TE.p3y));

  fill(0);
  if(mouseTE.Areas(TE.a, TE.b, TE.c) == TE.Area()){
    fill(255, 0, 0);
  }
  triangle(TE.p1x, TE.p1y, TE.p2x, TE.p2y, TE.p3x, TE.p3y);
}; 
//A função draw() é executada em loop infinito
//The draw() function runs infinitely

function mousePressed(){
  circunferencias.push(new Circunferencia(mouseX, mouseY, random(100, 300), 1));
  let TE = new Triangulo(0.05*width, 0.9*height, 0.15*width, 0.85*height, 0.15*width, 0.95*height);
  let mouseTE = new mouseTriangles(dist(mouseX, mouseY, TE.p1x, TE.p1y), dist(mouseX, mouseY, TE.p2x, TE.p2y), dist(mouseX, mouseY, TE.p3x, TE.p3y));

  if(mouseTE.Areas(TE.a, TE.b, TE.c) == TE.Area()){
    location.replace('https://lucasv26.github.io/Estudando-p5js/animations/index_graphics.html');
  }
}; 