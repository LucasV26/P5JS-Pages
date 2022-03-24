class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.xS = (Math.random() * 6) - 3;
    this.yS = (Math.random() * -10);
    this.xA = 0;
    this.yA = 0.5;
  }

  update() {
    this.xS += this.xA;
    this.yS += this.yA;

    this.x += this.xS;
    this.y += this.yS;
  }

  render() {
    fill(255);
    stroke(255);
    ellipse(this.x, this.y, 1, 1);
  }
};

class Generator {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.particles = [new Particle(this.x, this.y)];
  }

  update() {
    this.particles.push(new Particle(this.x, this.y));
  }

  render() {
    for(let p of this.particles){
      
      p.update();
      p.render();
      if(p.y > height)
        this.particles.splice(this.particles.indexOf(p), 1);
    }
  }
};

let geradores = [
  
];

let BotaoMenu;
let mouseBotaoMenu;
function setup() {
  createCanvas(1200, 500);
  BotaoMenu = new Triangulo();
};

function draw() {
  background(0);
  stroke(0, 0, 255);

  for(let gerador of geradores) {
    gerador.update();
    gerador.render();
  }

  if(geradores.length >= 50)
    geradores.shift();

  mouseBotaoMenu = new mouseTriangles(dist(mouseX, mouseY, BotaoMenu.p1x, BotaoMenu.p1y), dist(mouseX, mouseY, BotaoMenu.p2x, BotaoMenu.p2y), dist(mouseX, mouseY, BotaoMenu.p3x, BotaoMenu.p3y));
  
  fill(255);
  if (mouseBotaoMenu.Areas(BotaoMenu.a, BotaoMenu.b, BotaoMenu.c) == BotaoMenu.Area()) {
    fill(0, 255, 0);
  }
  BotaoMenu.render();
};


function mousePressed() {
  if (mouseBotaoMenu.Areas(BotaoMenu.a, BotaoMenu.b, BotaoMenu.c) == BotaoMenu.Area()) {
    location.replace('https://lucasv26.github.io/P5JS-Pages');
  }

  geradores = [];
};

function mouseDragged() {
  geradores.push(new Generator(mouseX, mouseY));
}
