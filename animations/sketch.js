//Criando um Mouse e um ponto flutiante que anda em linha reta com ângulos aleatoriamente variados
//Creating a Mouse and a floating point that moves in a strait line with random variated angles

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

function Aleatorio(maximo, minimo=0){
  let numero = Math.floor(Math.random() * maximo + minimo);
  return numero;
}; 
//Função para retornar número aleatório com range mínimo |--| máximo
//Function to return a random number with a min |--| max range

class Bolinha{
  constructor(posX, posY, tamW, tamH, dir){
    this.X = posX;
    this.Y = posY;
    this.W = tamW;
    this.H = tamH;
    this.dir = dir;
    this.incX = Aleatorio(2)==0?-2:2;
    this.incY = 1;
    this.p2X = Aleatorio(300, 100);
    this.p2Y = Aleatorio(200, 50);
    this.R = Aleatorio(255);
    this.G = Aleatorio(255);
    this.B = Aleatorio(255);
  }

  batendoBordas(){
    if(this.X+(this.W/2) >= width || this.X-(this.W/2) <= 0 || this.Y+(this.H/2) >= height || this.Y-(this.H/2) <= 0){
      this.p2Y = Aleatorio(200, 50);
      this.p2X = Aleatorio(300, 100);
      this.R = Aleatorio(255);
      this.R = Aleatorio(255);
      this.B = Aleatorio(255);
    }
    if(this.X+(this.W/2) >= width){
      this.incX = -2;
    }
    if(this.X-(this.W/2) <= 0){
      this.incX = 2;
    }
    if(this.Y+(this.H/2) >= height){
      this.dir = 'u';
    }
    if(this.Y-(this.H/2) <= 0){
      this.dir = 'd';
    }
  }

  gerandoReta(aux){
    let m = (Math.abs(this.Y - (this.Y+this.p2Y)) / Math.abs(this.X - (this.X+this.p2X)));
    let Y = ((aux*m)*Math.abs(this.X - (this.X+this.incX))) + this.Y;
    return Y;
  }

  movendoBolinha(){
    this.batendoBordas();
    if(this.dir == 'u'){
      this.incY = this.gerandoReta(-1);
    }else{
      this.incY = this.gerandoReta(1);
    }
    
    this.X += this.incX;
    this.Y = this.incY;
  }
}; 
//Classe construtora do objeto 'Bolinha' que possui todas as variáveis e métodos para criar e mover a ellipse pela tela 
//Constructor class of the object 'Bolinha' that posses all the variables and methods to create and move an ellipse across the screen

let todasBolinhas = [
  new Bolinha(100, 200, 50, 50, 'd')
]; 
//O vetor 'todasBolinhas' armazena todos os objetos 'Bolinha' criados, permitindo a criação de N objetos funcionais
//The array 'todasBolinhas' stores all the objects 'Bolinha' created, allowing the creation of N functional objects

function setup() { 
  createCanvas(700, 700);
}; 
//A função setup() é executada apenas 1 vez durante todo o fluxo
//The setup() function runs only once during the whole program flow

function draw() {
  background(255, 50, 150);
  stroke(0, 0, 255);
  //Mouse:
  rectMode(CENTER);
  fill(255, 255, 0);
  triangle(mouseX+10, mouseY+10, mouseX+10, mouseY+40, mouseX+30, mouseY+40); //Criando ponteiro que segue o mouse
  line((mouseX+10 + mouseX+30)/2, mouseY+40, ((mouseX+15 + mouseX+30)/2) + 5, mouseY+50); //Criando barrinha do ponteiro
  ///////////////////////////////////////////////////////////////////////////////////////////
  //Ponto:
  for(let i in todasBolinhas){
    fill(todasBolinhas[i].R, todasBolinhas[i].G, todasBolinhas[i].B);
    stroke(todasBolinhas[i].B, todasBolinhas[i].R, todasBolinhas[i].G);
    ellipse(todasBolinhas[i].X, todasBolinhas[i].Y, todasBolinhas[i].W, todasBolinhas[i].H);
    todasBolinhas[i].movendoBolinha();
  }

  let TD = new Triangulo(0.95*width, 0.9*height, 0.85*width, 0.85*height, 0.85*width, 0.95*height);
  let mouseTD = new mouseTriangles(dist(mouseX, mouseY, TD.p1x, TD.p1y), dist(mouseX, mouseY, TD.p2x, TD.p2y), dist(mouseX, mouseY, TD.p3x, TD.p3y));
  
  fill(0);
  if(mouseTD.Areas(TD.a, TD.b, TD.c) == TD.Area()){
    fill(0,255,0);
  }
  triangle(TD.p1x, TD.p1y, TD.p2x, TD.p2y, TD.p3x, TD.p3y);
}; 
//A função draw() é executada em loop infinito
//The draw() function runs infinitely

function mousePressed(){
  let TD = new Triangulo(0.95*width, 0.9*height, 0.85*width, 0.85*height, 0.85*width, 0.95*height);
  let mouseTD = new mouseTriangles(dist(mouseX, mouseY, TD.p1x, TD.p1y), dist(mouseX, mouseY, TD.p2x, TD.p2y), dist(mouseX, mouseY, TD.p3x, TD.p3y));

  todasBolinhas.push(new Bolinha(mouseX, mouseY, Aleatorio(255), Aleatorio(255), Aleatorio(2)==0?'u':'d'));
  if(mouseTD.Areas(TD.a, TD.b, TD.c) == TD.Area()){
    location.replace('https://lucasv26.github.io/Estudando-p5js/animations/index_graphics.html');
  }
}; 
//A função mousePressed() só é chamada quando o botão do mouse é pressionado (Ela pode nunca ocorrer)
//Funções deste gênero são chamadas de Eventos.
//The mousePressed() function is called only when the mouse is pressed (It can never runs)
//Functions of this kind are called Events.

//Isso significa que se background() estiver em setup() o canvas nunca será limpo
//Já, se background() estiver em draw(), o canvas é 'limpo' à cada atualização