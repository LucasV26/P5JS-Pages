//Criando um Mouse e um ponto flutiante que anda em linha reta com ângulos aleatoriamente variados
//Creating a Mouse and a floating point that moves in a strait line with random variated angles

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
}; 
//A função draw() é executada em loop infinito
//The draw() function runs infinitely

function mousePressed(){
  todasBolinhas.push(new Bolinha(mouseX, mouseY, Aleatorio(255), Aleatorio(255), Aleatorio(2)==0?'u':'d'));
}; 
//A função mousePressed() só é chamada quando o botão do mouse é pressionado (Ela pode nunca ocorrer)
//Funções deste gênero são chamadas de Eventos.
//The mousePressed() function is called only when the mouse is pressed (It can never runs)
//Functions of this kind are called Events.

//Isso significa que se background() estiver em setup() o canvas nunca será limpo
//Já, se background() estiver em draw(), o canvas é 'limpo' à cada atualização