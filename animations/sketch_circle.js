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

const cenX = 350;
const cenY = 350;
const R = 300;
var X = cenX;
var Y;
var move = 1;

function moverCirculo(cenX, cenY, R, X, move){
  let par = {a: 1, b: -2*cenY, c: cenY**2 + cenX**2 - 2*cenX*X + X**2 - R**2};
  let delta = (par.b**2) - (4 * par.a * par.c);
  let result = {Y1: (-1*(par.b + sqrt(delta)))/2*par.a, Y2: (-1*(par.b - sqrt(delta)))/2*par.a};
  if(move < 0){
    return result.Y2;
  }else{
    return result.Y1;
  }
}


function setup() { 
  createCanvas(700, 700);
  background(0, 0, 255);
}; 
//A função setup() é executada apenas 1 vez durante todo o fluxo
//The setup() function runs only once during the whole program flow

function draw() {
  fill(0);
  ellipse(cenX, cenY, 50, 50);
  Y = moverCirculo(cenX, cenY, R, X, move);
  stroke(0);
  fill(255);
  //Apague os seguintes comentários para ter um desenho maneiro:
  //ellipse(100, 100, Y, X);
  //ellipse(width-100, height-100, Y, X);
  line(cenX, cenY, X, Y);
  stroke(255);
  fill(0);
  //ellipse(100, height-100, X, Y);
  //ellipse(width-100, 100, X, Y);
  line(cenX, cenY, Y, X);
  X += move;
  if(X > R+cenX || X < cenX-R){
    move *= -1;
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
  let TE = new Triangulo(0.05*width, 0.9*height, 0.15*width, 0.85*height, 0.15*width, 0.95*height);
  let mouseTE = new mouseTriangles(dist(mouseX, mouseY, TE.p1x, TE.p1y), dist(mouseX, mouseY, TE.p2x, TE.p2y), dist(mouseX, mouseY, TE.p3x, TE.p3y));

  if(mouseTE.Areas(TE.a, TE.b, TE.c) == TE.Area()){
    location.replace('https://lucasv26.github.io/Estudando-p5js/animations/index_graphics.html');
  }
}; 
