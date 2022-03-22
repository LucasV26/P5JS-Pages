//Utilizando createGraphics() para animar objetos sem deixar rastros enquanto outros objetos animados deixam rastros
//Using createGraphics() to animate objects without leaving trails while other animated objects leave trails where they pass

let extraCanvas;
let X;
let Y;
let BotaoMenu;
let mouseBotaoMenu;

function setup() {
  createCanvas(1200, 500);
  extraCanvas = createGraphics(width, height); // createGraphics() cria um 'novo canvas'
  X = width / 2;
  Y = height / 2;
  BotaoMenu = new Triangulo();
};
//A função setup() é executada apenas 1 vez durante todo o fluxo
//The setup() function runs only once during the whole program flow

function draw() {
  background(0);
  stroke(0, 0, 255);
  fill(255, 0, 0);
  X += random(-5, 5);
  Y += random(-5, 5);
  rectMode(CENTER);
  rect(X, Y, 25, 25);

  extraCanvas.fill(255, 255, 0, 100);
  extraCanvas.ellipse(random(width), random(height), 15, 15);

  if (mouseIsPressed) {
    extraCanvas.fill(255, 100);
    extraCanvas.noStroke();
    extraCanvas.ellipse(mouseX, mouseY, 25, 25);
    // Para que os elementos sejam desenhados ou configurados ao 'novo canvas' eles devem ser escritos como métodos do mesmo
  }
  image(extraCanvas, 0, 0); // image() é o que exibe o 'novo canvas' na tela

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
  extraCanvas.background(0); // Apagando os pontos amarelos a cada clique
  extraCanvas.clear(); // O método clear() deixa este 'novo canvas' transparente

  if (mouseBotaoMenu.Areas(BotaoMenu.a, BotaoMenu.b, BotaoMenu.c) == BotaoMenu.Area()) {
    location.replace('https://lucasv26.github.io/P5JS-Pages');
  }
}
