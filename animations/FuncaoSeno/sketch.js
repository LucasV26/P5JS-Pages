let x_space = 2;
let maxWaves = 2;

let theta = 0;
let amplitude = [];
let angular_velocity = [];
let Y = [];
let H = 0;

acoes = {
  "37": () => { if(maxWaves > 0) maxWaves -= 1; },
  "38": () => { x_space += 1; },
  "39": () => { maxWaves += 1; },
  "40": () => { if(x_space > 1) x_space -= 1; }
}

function setup() {
  createCanvas(window.innerWidth , window.innerHeight);
  background(0);

  for (let i=0; i<maxWaves; i++) {
    amplitude[i] = height / (maxWaves * random(1, 5));
    angular_velocity[i] = random(0.001, 0.1);
  }

  BotaoMenu = new Triangulo();
};

function draw() {
  background(0);
  fill(0, 250, 247, 100);
  stroke(0, 100, 255, 80);
  applyMatrix();
  translate(0, height/2);

  let i=0;
  for (let x=0; x<width; x+=x_space) {
    Y[i] = 0;
    for (let j=0; j<maxWaves; j++) {
      Y[i] += amplitude[j] * sin(theta + (i * angular_velocity[j]));
    }
    rect(x, Y[i], x_space, H);
    i++;
  }

  for (let k=0; k<maxWaves; k++) {
    theta += (angular_velocity[k]) / maxWaves;
    H += amplitude[k];
  }

  resetMatrix();

  mouseBotaoMenu = new mouseTriangles(dist(mouseX, mouseY, BotaoMenu.p1x, BotaoMenu.p1y), dist(mouseX, mouseY, BotaoMenu.p2x, BotaoMenu.p2y), dist(mouseX, mouseY, BotaoMenu.p3x, BotaoMenu.p3y));

  fill(255);
  if (mouseBotaoMenu.Areas(BotaoMenu.a, BotaoMenu.b, BotaoMenu.c) == BotaoMenu.Area()) {
    fill(0, 255, 0);
  }

  BotaoMenu.render();

  stroke(0);
  fill(255);
  textSize(16);
  text("Use as setas para controlar as configurações das ondas", width - 410, 20);
  text("Esquerda e Direita --> Quantidade de ondas somadas", width - 410, 40);
  text("Cima e Baixo --> distância entre retângulos desenhados", width - 410, 60);
};

function mousePressed() {
  if (mouseBotaoMenu.Areas(BotaoMenu.a, BotaoMenu.b, BotaoMenu.c) == BotaoMenu.Area()) {
    location.replace('https://lucasv26.github.io/P5JS-Pages');
  }

  setup();
};

function keyPressed() {
  acoes[keyCode]();
  setup();
}