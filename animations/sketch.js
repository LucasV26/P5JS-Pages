//Criando um Mouse e um ponto flutiante que anda em linha reta com ângulos aleatoriamente variados

var circX = 50;
var circY = 50;
var circW = 100;
var circH = 100;
var X = -2;
var Y;
var dir = 'u';
var segundoPontoX = 1;
var segundoPontoY = 1;
var angulo = 1;

function gerandoReta(p1X, p1Y, p2X, p2Y, aux=1){
  m = (Math.abs(p1Y - p2Y) / Math.abs(p1X - p2X));
  let Y = ((aux*m)*Math.abs(p1X - (p1X+X))) + p1Y;
  return Y;
}

function setup() { 
  createCanvas(700, 700);
}// A função setup() é executada apenas 1 vez durante todo o fluxo

function draw() {
  background(255, 50, 150);
  fill(255, 255, 0);
  stroke(0, 0, 255);
  rectMode(CENTER);
  //Mouse:
  triangle(mouseX+10, mouseY+10, mouseX+10, mouseY+40, mouseX+30, mouseY+40); //Criando ponteiro que segue o mouse
  line((mouseX+10 + mouseX+30)/2, mouseY+40, ((mouseX+15 + mouseX+30)/2) + 5, mouseY+50); //Criando barrinha do ponteiro
  ///////////////////////////////////////////////////////////////////////////////////////////
  //Ponto:
  ellipse(circX, circY, circW, circH);
  if(circX+(circW/2) >= width){
    segundoPontoX = Math.floor(Math.random() * 300 + 100);
    X = -2;
  }
  if(circX-(circW/2) <= 0){
    segundoPontoX = Math.floor(Math.random() * 300 + 100);
    X = 2;
  }
  if(circY+(circW/2) >= height){
    segundoPontoY = Math.floor(Math.random() * 200 + 50);
    dir = 'u';
  }
  if(circY-(circW/2) <= 0){
    segundoPontoY = Math.floor(Math.random() * 200 + 50);
    dir = 'd'
  }
  if(dir == 'u'){
    Y = gerandoReta(circX, circY, Math.abs(circX + segundoPontoX), Math.abs(circY + segundoPontoY), -1);
  }else{
    Y = gerandoReta(circX, circY, Math.abs(circX + segundoPontoX), Math.abs(circY + segundoPontoY));
  }
  
  circX += X;
  circY = Y;
}// A função draw() é executada em loop infinito 

function mousePressed(){
  background(255, 50, 150);
  circX = mouseX;
  circY = mouseY;
}// A função mousePressed() só é chamada quando o botão do mouse é pressionado (Ela pode nunca ocorrer)
// Funções deste gênero são chamadas de Eventos.


//Isso significa que se background() estiver em setup() o canvas nunca será limpo
//Já, se background() estiver em draw(), o canvas é 'limpo' à cada atualização
//Por outro lado,