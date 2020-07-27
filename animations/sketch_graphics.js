//Utilizando createGraphics() para animar objetos sem deixar rastros enquanto outros objetos animados deixam rastros
//Using createGraphics() to animate objects without leaving trails while other animated objects leave trails where they pass

let extraCanvas;
let X;
let Y;
let TE;
let mouseTE;
let TD;
let mouseTD;

function setup() { 
  createCanvas(700, 700);
  extraCanvas = createGraphics(700, 700); // createGraphics() cria um 'novo canvas'
  X = width/2;
  Y = height/2;
  TE = new Triangulo(0.05*width, 0.9*height, 0.15*width, 0.85*height, 0.15*width, 0.95*height);
  TD = new Triangulo(0.95*width, 0.9*height, 0.85*width, 0.85*height, 0.85*width, 0.95*height);
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

  if(mouseIsPressed){
    extraCanvas.fill(255, 100);
    extraCanvas.noStroke();
    extraCanvas.ellipse(mouseX, mouseY, 25, 25);
    // Para que os elementos sejam desenhados ou configurados ao 'novo canvas' eles devem ser escritos como métodos do mesmo
  }
  image(extraCanvas, 0, 0); // image() é o que exibe o 'novo canvas' na tela

  mouseTE = new mouseTriangles(dist(mouseX, mouseY, TE.p1x, TE.p1y), dist(mouseX, mouseY, TE.p2x, TE.p2y), dist(mouseX, mouseY, TE.p3x, TE.p3y));
 
  mouseTD = new mouseTriangles(dist(mouseX, mouseY, TD.p1x, TD.p1y), dist(mouseX, mouseY, TD.p2x, TD.p2y), dist(mouseX, mouseY, TD.p3x, TD.p3y));
  
  fill(0);
  if(mouseTE.Areas(TE.a, TE.b, TE.c) == TE.Area()){
    fill(255, 0, 0);
  }
  triangle(TE.p1x, TE.p1y, TE.p2x, TE.p2y, TE.p3x, TE.p3y);
  fill(0);
  if(mouseTD.Areas(TD.a, TD.b, TD.c) == TD.Area()){
    fill(0, 255, 0);
  }
  triangle(TD.p1x, TD.p1y, TD.p2x, TD.p2y, TD.p3x, TD.p3y);
}; 
//A função draw() é executada em loop infinito
//The draw() function runs infinitely

function mousePressed(){
  extraCanvas.background(0); // Apagando os pontos amarelos a cada clique
  extraCanvas.clear(); // O método clear() deixa este 'novo canvas' transparente

  if(mouseTE.Areas(TE.a, TE.b, TE.c) == TE.Area()){
    location.replace('https://lucasv26.github.io/Estudando-p5js/animations/');
  }
  if(mouseTD.Areas(TD.a, TD.b, TD.c) == TD.Area()){
    location.replace('https://lucasv26.github.io/Estudando-p5js/animations/index_circle.html');
  }
}
