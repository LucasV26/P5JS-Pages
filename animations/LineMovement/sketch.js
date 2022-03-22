//Criando um Mouse e um ponto flutiante que anda em linha reta com ângulos aleatoriamente variados
//Creating a Mouse and a floating point that moves in a strait line with random variated angles
function Aleatorio(maximo, minimo = 0) {
  let numero = Math.floor(Math.random() * maximo + minimo);
  return numero;
};
//Função para retornar número aleatório com range mínimo |--| máximo
//Function to return a random number with a min |--| max range

class Bolinha {
  constructor(posX, posY, tamD, dir) {
    this.X = posX;
    this.Y = posY;
    this.D = tamD;
    this.dir = dir;
    this.incX = Aleatorio(2) == 0 ? -2 : 2;
    this.incY = 1;
    this.p2X = Aleatorio(300, 100);
    this.p2Y = Aleatorio(200, 50);
    this.R = Aleatorio(255);
    this.G = Aleatorio(255);
    this.B = Aleatorio(255);
    this.A = 255;
  }

  trocandoCor() {
    this.R = random(255);
    this.R = random(255);
    this.B = random(255);
  }

  static Rebatendo(bola1, bola2) {
    if (dist(bola1.X, bola1.Y, bola2.X, bola2.Y) <= bola1.D / 2 + bola2.D / 2) {
      bola1.trocandoCor();
      bola2.trocandoCor();
      if (bola1.X > bola2.X) {
        bola1.incX = 2;
        bola2.incX = -2;
      } else {
        bola1.incX = -2;
        bola2.incX = 2;
      }
      if (bola1.Y > bola2.Y) {
        bola1.dir = 'd';
        bola2.dir = 'u';
      } else {
        bola1.dir = 'u';
        bola2.dir = 'd';
      }
    }
  }

  trocandoOpacidade(a) {
    this.A = a;
  }

  pontoDentro(px, py) {
    let d = dist(this.X, this.Y, px, py);
    return (d <= this.D / 2);
  }

  batendoBordas() {
    if (this.X + (this.D / 2) >= width || this.X - (this.D / 2) <= 0 || this.Y + (this.D / 2) >= height || this.Y - (this.D / 2) <= 0) {
      this.p2Y = random(50, 200);
      this.p2X = random(100, 300);
      this.trocandoCor();
    }
    if (this.X + (this.D / 2) >= width) {
      this.incX = -2;
    }
    if (this.X - (this.D / 2) <= 0) {
      this.incX = 2;
    }
    if (this.Y + (this.D / 2) >= height) {
      this.dir = 'u';
    }
    if (this.Y - (this.D / 2) <= 0) {
      this.dir = 'd';
    }
  }

  gerandoReta(aux) {
    let m = (Math.abs(this.Y - (this.Y + this.p2Y)) / Math.abs(this.X - (this.X + this.p2X)));
    let Y = ((aux * m) * Math.abs(this.X - (this.X + this.incX))) + this.Y;
    this.incY = Y;
  }

  movendoBolinha() {
    this.batendoBordas();
    if (this.dir == 'u') {
      this.gerandoReta(-1);
    } else {
      this.gerandoReta(1);
    }

    this.X += this.incX;
    this.Y = this.incY;
  }

  desenharBolinha() {
    fill(this.R, this.G, this.B, this.A);
    stroke(this.B, this.R, this.G);
    ellipse(this.X, this.Y, this.D);
  }
};
//Classe construtora do objeto 'Bolinha' que possui todas as variáveis e métodos para criar e mover a ellipse pela tela 
//Constructor class of the object 'Bolinha' that posses all the variables and methods to create and move an ellipse across the screen

let todasBolinhas = [
  new Bolinha(100, 200, 50, 'd')
];
//O vetor 'todasBolinhas' armazena todos os objetos 'Bolinha' criados, permitindo a criação de N objetos funcionais
//The array 'todasBolinhas' stores all the objects 'Bolinha' created, allowing the creation of N functional objects
let BotaoMenu;
let mouseBotaoMenu;
function setup() {
  createCanvas(1200, 500);
  BotaoMenu = new Triangulo();
};
//A função setup() é executada apenas 1 vez durante todo o fluxo
//The setup() function runs only once during the whole program flow

function draw() {
  background(0);
  stroke(0, 0, 255);

  ///////////////////////////////////////////////////////////////////////////////////////////
  //Ponto:
  for (let i = 0; i < todasBolinhas.length; i++) {
    todasBolinhas[i].desenharBolinha();
    if (todasBolinhas[i].pontoDentro(mouseX, mouseY)) {
      todasBolinhas[i].trocandoOpacidade(100);
    } else {
      todasBolinhas[i].trocandoOpacidade(255);
    }
    todasBolinhas[i].movendoBolinha();
    for (let j = i + 1; j < todasBolinhas.length; j++) {
      Bolinha.Rebatendo(todasBolinhas[i], todasBolinhas[j]);
    }
  }

  mouseBotaoMenu = new mouseTriangles(dist(mouseX, mouseY, BotaoMenu.p1x, BotaoMenu.p1y), dist(mouseX, mouseY, BotaoMenu.p2x, BotaoMenu.p2y), dist(mouseX, mouseY, BotaoMenu.p3x, BotaoMenu.p3y));
  
  fill(255);
  if (mouseBotaoMenu.Areas(BotaoMenu.a, BotaoMenu.b, BotaoMenu.c) == BotaoMenu.Area()) {
    fill(0, 255, 0);
  }
  BotaoMenu.render();
};
//A função draw() é executada em loop infinito
//The draw() function runs infinitely

function mousePressed() {
  let aux = 1;
  if (mouseBotaoMenu.Areas(BotaoMenu.a, BotaoMenu.b, BotaoMenu.c) == BotaoMenu.Area()) {
    location.replace('https://lucasv26.github.io/P5JS-Pages');
  }
  for (let i = todasBolinhas.length - 1; i >= 0; i--) {
    if (todasBolinhas[i].pontoDentro(mouseX, mouseY)) {
      todasBolinhas.splice(i, 1);
      aux = 0;
    }
  }
  if (aux) {
    todasBolinhas.push(new Bolinha(mouseX, mouseY, random(50, 70), random(2) == 0 ? 'u' : 'd'));
  }
};
//A função mousePressed() só é chamada quando o botão do mouse é pressionado (Ela pode nunca ocorrer)
//Funções deste gênero são chamadas de Eventos.
//The mousePressed() function is called only when the mouse is pressed (It can never runs)
//Functions of this kind are called Events.

//Isso significa que se background() estiver em setup() o canvas nunca será limpo
//Já, se background() estiver em draw(), o canvas é 'limpo' à cada atualização