const cenX = 350;
const cenY = 350;
const R = 300;
var Xfake;
var Yfake = R+cenY;
var X = cenX;
var Y;
var move = -1;
var movefake = 1;

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

function moverCirculoFake(cenX, cenY, R, Y, move){
  let par = {a: 1, b: -2*cenX, c: cenY**2 + cenX**2 - 2*cenX*Y + Y**2 - R**2};
  let delta = (par.b**2) - (4 * par.a * par.c);
  let result = {X1: (-1*(par.b + sqrt(delta)))/2*par.a, X2: (-1*(par.b - sqrt(delta)))/2*par.a};
  if(movefake > 0){
    return result.X2;
  }else{
    return result.X1;
  }
}

function setup() { 
  createCanvas(700, 700);
  background(255, 0, 0);
}; 
//A função setup() é executada apenas 1 vez durante todo o fluxo
//The setup() function runs only once during the whole program flow

function draw() {
  ellipse(cenX, cenY, 50, 50);
  Y = moverCirculo(cenX, cenY, R, X, move);
  Xfake = moverCirculoFake(cenX, cenY, R, Yfake, move);
  stroke(0);
  fill(255);
  //Apague os seguintes comentários para ter um desenho maneiro:
  //ellipse(100, 100, X, Y);
  //ellipse(width-100, height-100, X, Y);
  line(cenX, cenY, X, Y);
  stroke(255);
  fill(0);
  //ellipse(100, height-100, X, Y);
  //ellipse(width-100, 100, X, Y);
  line(cenX, cenY, Xfake, Yfake);
  X += move;
  Yfake += movefake;
  if(X > R+cenX || X < cenX-R){
    move *= -1;
  }
  if(Yfake > R+cenY || Yfake < cenY-R){
    movefake *= -1;
  }
}; 
//A função draw() é executada em loop infinito
//The draw() function runs infinitely
