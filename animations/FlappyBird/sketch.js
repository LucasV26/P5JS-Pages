class Force {
  constructor(x, y) {
    this.position = new p5.Vector(x, y);
    this.velocity = new p5.Vector(0, 0);
    this.acceleration = new p5.Vector(0, 0);
  }

  applyForce(f) {
    this.acceleration.add(f);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

}

class Rectangle extends Force {
  constructor(x, y, w, h, v = 0, _r = 255, _g = 255, _b = 255) {
    super(x, y)
    this.width = w
    this.height = h
    this.velocity = new p5.Vector(-v, 0)
    this.r = _r
    this.g = _g
    this.b = _b
    this.passed = false
  }

  collision(body) {

      if(body.position.x+body.radius >= this.position.x 
        && body.position.x+body.radius <= this.position.x+this.width
        && body.position.y >= this.position.y
        && body.position.y <= this.position.y+this.height)
        return true

      if(body.position.x-body.radius >= this.position.x 
        && body.position.x-body.radius <= this.position.x+this.width
        && body.position.y >= this.position.y
        && body.position.y <= this.position.y+this.height)
        return true

      if(body.position.x >= this.position.x 
        && body.position.x <= this.position.x+this.width
        && body.position.y+body.radius >= this.position.y
        && body.position.y+body.radius <= this.position.y+this.height)
        return true

      if(body.position.x >= this.position.x 
        && body.position.x <= this.position.x+this.width
        && body.position.y-body.radius >= this.position.y
        && body.position.y-body.radius <= this.position.y+this.height)
        return true
      
      return false

  }

  draw() {

    fill(this.r, this.g, this.b)
    stroke(0)

    rect(this.position.x, this.position.y, this.width, this.height)

  }

}

class Circle extends Force {
  constructor(x, y, r) {
    super(x, y)
    this.radius = r
    this.alive = true
    this.r = 255
    this.g = 255
    this.b = 0
    this.points = 0
  }

  collision(body) {

    if(this.position.dist(body) <= this.radius)
      return true

    return false

  }

  respawn(x, y) {

    this.position = new p5.Vector(x, y)

  }

  kill() {
    this.alive = false
    this.velocity = new p5.Vector(0, 0)
    this.g = 0
  }

  draw() {

    fill(this.r, this.g, this.b)
    stroke(0)

    ellipse(this.position.x, this.position.y, this.radius*2, this.radius*2);

    stroke(255)
    fill(255)
    text(`${this.points}`, this.position.x, this.position.y - this.radius);

  }

}

let executaFuncao = {

  38: () => {
    if(flappy.alive)
      flappy.applyForce(new p5.Vector(0, -3))
  },
  32: () => {
    if(flappy.alive)
      flappy.applyForce(new p5.Vector(0, -3))
  }

};

let gravity
let flappy
let floor
let pipesLoop

let botaoMenu;
let mouseBotaoMenu;
let countTempo;

function setup() {

  createCanvas(window.innerWidth , window.innerHeight);
  background(0);
  botaoMenu = new Triangulo();
  
  flappy = new Circle(width/2, height/2, height*0.03)
  floor = new Rectangle(0, height - 10, width, 80, 0, 165, 100, 65)

  gravity = new p5.Vector(0, 0.07)

  pipesLoop = []

  countTempo = 1

};

function draw() {

  background(0)

  if(!floor.collision(flappy))
    flappy.update()
  else
    setup()
  
  if(flappy.position.y - flappy.radius < 0)
    flappy.kill()

  flappy.applyForce(gravity)
  
  flappy.draw()

  for(i=pipesLoop.length-1;i>=0;i--){

    pipes = pipesLoop[i]

    for(p of pipes){
      p.update()
      p.draw()

      if(p.collision(flappy) && flappy.alive)
        flappy.kill()
      
    }

    if(pipes[0].position.x + pipes[0].width <= 0)
      pipesLoop.splice(i, 1)
    
    if(!pipes[0].passed && (pipes[0].position.x < flappy.position.x && (pipes[0].position.x + pipes[0].width) > flappy.position.x)){
      flappy.points += 1

      pipes[0].passed = true
    }

  }

  countTempo += 0.005

  if(countTempo >= 1) {
    countTempo = 0
    throwPipes()
  }
  
  floor.draw()

  mouseBotaoMenu = new mouseTriangles(dist(mouseX, mouseY, botaoMenu.p1x, botaoMenu.p1y), dist(mouseX, mouseY, botaoMenu.p2x, botaoMenu.p2y), dist(mouseX, mouseY, botaoMenu.p3x, botaoMenu.p3y));

  fill(255);
  if (mouseBotaoMenu.Areas(botaoMenu.a, botaoMenu.b, botaoMenu.c) == botaoMenu.Area()) {
    fill(0, 255, 0);
  }

  botaoMenu.render();

  console.log(pipesLoop.length)

};

function mousePressed() {
  if (mouseBotaoMenu.Areas(botaoMenu.a, botaoMenu.b, botaoMenu.c) == botaoMenu.Area()) {
    location.replace('https://lucasv26.github.io/P5JS-Pages');
  }

  if(flappy.alive)
    flappy.applyForce(new p5.Vector(0, -3))

};

function keyPressed() {
  console.log(keyCode);
  
  if(executaFuncao[keyCode])
    executaFuncao[keyCode]();

  background(0);
};

function throwPipes() {
    
    pipes = []

    mult = (Math.random() * 0.7) + 0.1

    pipes.push(new Rectangle(width + 300, 0, width*0.05, height*mult, 2, 0, 255, 0))
    pipes.push(new Rectangle(width + 300, height*(mult+0.15), width*0.05, height*(1-mult+0.15), 2, 0, 255, 0))

    pipesLoop.push(pipes)

}