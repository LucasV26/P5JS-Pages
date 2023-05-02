class Force{
  constructor(massa) {
    this.mass = massa;
    this.position = new p5.Vector(random(0, width), random(0, height));
    this.velocity = new p5.Vector(0, 0);
    this.acceleration = new p5.Vector(0, 0);
  }

  applyForce(f) {
    let force = p5.Vector.div(f, this.mass);
    this.acceleration.add(force);
  }

  attract(other) {
    let att = p5.Vector.sub(other.position, this.position);
    let dist = att.magSq();
    dist = constrain(dist, 10, 500);

    let strength = (this.mass * other.mass) / dist;

    att.setMag(strength);
    this.applyForce(att);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  borders() {

    if(this.position.x + this.mass > width) {
      this.position.x = width - this.mass;
      this.velocity.x *= -0.8;
   }
   if(this.position.x - this.mass < 0) { 
     this.position.x = 0 + this.mass; 
     this.velocity.x *= -0.8;
   }
   if(this.position.y + this.mass > height) {
     this.position.y = height - this.mass;
     this.velocity.y *= -0.5;
   }
   if(this.position.y - this.mass < 0) {
     this.position.y = 0 + this.mass;
     this.velocity.y *= -0.9;
   }

  }

  show() {
    noFill();
    stroke(255, 100);
    point(this.position.x, this.position.y);
  }

}

class Attractor{
  constructor(_x, _y, _g, _mass, _r) {
    this.position = new p5.Vector(_x, _y);
    this.g = _g;
    this.mass = _mass;
    this.repele = _r;
  }

  move(m) {
    this.position.add(m);
  }

  attract(f) {
    let att = this.repele ? p5.Vector.sub(f.position, this.position) : p5.Vector.sub(this.position, f.position);
  
    let dist = att.magSq();
    dist = constrain(dist, 10, 500);

    let strength = (this.g * this.mass * f.mass) / dist;
    att.setMag(strength);

    return att;
  }

  show() {
    ellipse(this.position.x, this.position.y, this.mass*2, this.mass*2);
  }

}

function createSuns() {

  suns = [];

  switch(quant){
    case 1:
      //Sol no meio da tela
      suns[0] = new Attractor(width/2, height/2, 1, 150, false);
      break;
    case 2:
      //2 sóis nas extremidades da tela
      suns[0] = new Attractor(width/4, height/2, 1, 150, false);
      suns[1] = new Attractor(3*width/4, height/2, 1, 150, false);
      break;
    case 3:
      //3 sóis alternados
      suns[0] = new Attractor(0, 0, 1, 150, false);
      suns[1] = new Attractor(0, height, 1, 150, false);
      suns[2] = new Attractor(width, height, 1, 150, false);
      break;
    case 4:
      //Sóis nos quatro pontos da tela
      suns[0] = new Attractor(width, height, 1, 150, false);
      suns[1] = new Attractor(0, 0, 1, 150, false);
      suns[2] = new Attractor(width, 0, 1, 150, false);
      suns[3] = new Attractor(0, height, 1, 150, false);
      break;
    case 5:
      //Sóis nos quatro pontos da tela
      suns[0] = new Attractor(width, height, 1, 150, false);
      suns[1] = new Attractor(0, 0, 1, 150, false);
      suns[2] = new Attractor(width, 0, 1, 150, false);
      suns[3] = new Attractor(0, height, 1, 150, false);
      suns[4] = new Attractor(width/2, height/2, 1, 100, true);
      break;
  }

}

let executaFuncao = {

  80: () => {clearLines = !clearLines},
  83: () => {showSuns = !showSuns},
  97: () => {quant = 1; createSuns()},
  98: () => {quant = 2; createSuns()},
  99: () => {quant = 3; createSuns()},
  100: () => {quant = 4; createSuns()},
  101: () => {quant = 5; createSuns()},

};

let forces = [];
let suns = [];
let mAtual, mAnterior, quant;
let showSuns = false;
let clearLines = false;

let BotaoMenu;
let mouseBotaoMenu;

function setup() {

  createCanvas(window.innerWidth , window.innerHeight);
  background(0);
  BotaoMenu = new Triangulo();

  quant = 1;

  createSuns();

  for(let i = 0; i < 1000; i++) {
    forces.push(new Force(1));
  }
  
  background(0);
};

function draw() {

  if(clearLines)
    background(0);

  stroke(190, 255, 0);
  noFill();
  let move = new p5.Vector(0, 0);
  if(mousePressed) {
    mAnterior = mAtual;
    mAtual = new p5.Vector(mouseX, mouseY);
    move = p5.Vector.sub(mAtual, mAnterior);
  }

  let attraction;
  for(f of forces) {

    // for(f2 of forces) {
    //   if(f2 != f)
    //     f.attract(f2);
    // }

    for(s of suns) {
      attraction = s.attract(f);
      f.applyForce(attraction);

      if(showSuns)
        s.show();
    }


    f.update();
    f.show();
  }

  mouseBotaoMenu = new mouseTriangles(dist(mouseX, mouseY, BotaoMenu.p1x, BotaoMenu.p1y), dist(mouseX, mouseY, BotaoMenu.p2x, BotaoMenu.p2y), dist(mouseX, mouseY, BotaoMenu.p3x, BotaoMenu.p3y));

  fill(255);
  if (mouseBotaoMenu.Areas(BotaoMenu.a, BotaoMenu.b, BotaoMenu.c) == BotaoMenu.Area()) {
    fill(0, 255, 0);
  }

  BotaoMenu.render();

  stroke(0);
  fill(255);
  textSize(16);
  text("Mostrar Sóis -> 'S'", width - 130, 20);
  text("Mostrar Rastros -> 'P'", width - 156, 40);
  text("Modificar disposição dos Sóis -> '(1 ao 5)'", width - 300, 60);
};

function mousePressed() {
  if (mouseBotaoMenu.Areas(BotaoMenu.a, BotaoMenu.b, BotaoMenu.c) == BotaoMenu.Area()) {
    location.replace('https://lucasv26.github.io/P5JS-Pages');
  }
};

function keyPressed() {
  executaFuncao[keyCode]();
  background(0);
};