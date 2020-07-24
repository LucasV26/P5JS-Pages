
function meuDist(p1x, p1y, p2x, p2y) {
  let dist = Math.sqrt((p1x-p2x)**2 + (p1y-p2y)**2);
  return dist;
}

function Heron(a, b, c) {
  let p = (a+b+c)/2;
  let area = Math.sqrt(p * (p-a) * (p-b) * (p-c));
  return area;
}

class triangulo{
  constructor(p1x, p1y, p2x, p2y, p3x, p3y){
    this.p1x = p1x;
    this.p1y = p1y;
    this.p2x = p2x;
    this.p2y = p2y;
    this.p3x = p3x;
    this.p3y = p3y;
    this.a = meuDist(p1x, p1y, p2x, p2y);
    this.b = meuDist(p2x, p2y, p3x, p3y);
    this.c = meuDist(p3x, p3y, p1x, p1y);
  }

  Area(){
    let p = (this.a+this.b+this.c)/2;
    let area = Math.sqrt(p * (p-this.a) * (p-this.b) * (p-this.c));
    return area;
  }
}

function setup() { 
  createCanvas(700, 700);
}; 

function draw() {
  background(255, 50, 150);
  let TE = new triangulo(0.05*width, 0.9*height, 0.15*width, 0.85*height, 0.15*width, 0.95*height);
  let mouseTE = {
    mouseP1: dist(mouseX, mouseY, TE.p1x, TE.p1y),
    mouseP2: dist(mouseX, mouseY, TE.p2x, TE.p2y),
    mouseP3: dist(mouseX, mouseY, TE.p3x, TE.p3y),
  }
  let TD = new triangulo(0.95*width, 0.9*height, 0.85*width, 0.85*height, 0.85*width, 0.95*height);
  let mouseTD = {
    mouseP1: dist(mouseX, mouseY, TD.p1x, TD.p1y),
    mouseP2: dist(mouseX, mouseY, TD.p2x, TD.p2y),
    mouseP3: dist(mouseX, mouseY, TD.p3x, TD.p3y),
  }
  triangle(TE.p1x, TE.p1y, TE.p2x, TE.p2y, TE.p3x, TE.p3y);
  triangle(TD.p1x, TD.p1y, TD.p2x, TD.p2y, TD.p3x, TD.p3y);
  let area1 = Heron(mouseTE.mouseP2, mouseTE.mouseP3, TE.b);
  let area2 = Heron(mouseTE.mouseP1, mouseTE.mouseP3, TE.c);
  let area3 = Heron(mouseTE.mouseP1, mouseTE.mouseP2, TE.a);
  fill(255, 0, 0);
  if(area1 <= TE.Area() && area2 <= TE.Area() && area3 <= TE.Area()){
    fill(0)
  }
}; 