//Criando um Mouse e um ponto flutiante que anda em linha reta com ângulos aleatoriamente variados
class Bolinha{
  constructor(posX, posY, tamW, tamH, dir){
    this.X = posX;
    this.Y = posY;
    this.W = tamW;
    this.H = tamH;
    this.dir = dir;
    this.incX = 1;
    this.incY = 1;
    this.p2X = 1;
    this.p2Y = 1;
    this.R = Math.floor(Math.random() * 255);
    this.G = Math.floor(Math.random() * 255);
    this.B = Math.floor(Math.random() * 255);
  }

  batendoBordas(){
    if(this.X+(this.W/2) >= width || this.X-(this.W/2) <= 0 || this.Y+(this.H/2) >= height || this.Y-(this.H/2) <= 0){
      this.p2Y = Math.floor(Math.random() * 200 + 50);
      this.p2X = Math.floor(Math.random() * 300 + 100);
      this.R = Math.floor(Math.random() * 255);
      this.R = Math.floor(Math.random() * 255);
      this.B = Math.floor(Math.random() * 255);
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
}

let todasBolinhas = [
  new Bolinha(100, 200, 50, 50, 'd')
];

function setup() { 
  createCanvas(700, 700);
}// A função setup() é executada apenas 1 vez durante todo o fluxo

function draw() {
  background(255, 50, 150);
  stroke(0, 0, 255);
  rectMode(CENTER);
  //Mouse:
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
}// A função draw() é executada em loop infinito 

function mousePressed(){
  background(255, 50, 150);
  todasBolinhas.push(new Bolinha(mouseX, mouseY, Math.floor(Math.random() * 200), Math.floor(Math.random() * 255), Math.floor(Math.random() * 1)==0?'u':'d'));
  for(let i in todasBolinhas){
    todasBolinhas[i].X = mouseX;
    todasBolinhas[i].Y = mouseY;
  }
}// A função mousePressed() só é chamada quando o botão do mouse é pressionado (Ela pode nunca ocorrer)
// Funções deste gênero são chamadas de Eventos.


//Isso significa que se background() estiver em setup() o canvas nunca será limpo
//Já, se background() estiver em draw(), o canvas é 'limpo' à cada atualização
//Por outro lado,