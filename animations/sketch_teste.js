var bolinha = {
  X: 350,
  Y: 350,
  Xspeed: 5,
  Yspeed: 10
};

function setup() { 
  createCanvas(700, 700);
  background(0);
}; 

function draw() {
  fill(random(255));
  ellipse(bolinha.X, bolinha.Y, 50, 50);
  bolinha.X += bolinha.Xspeed;
  bolinha.Y += bolinha.Yspeed;
  if(bolinha.X+25 >= width || bolinha.X-25 <= 0){
    bolinha.Xspeed *= -1;
  }
  if(bolinha.Y+25 >= height || bolinha.Y-25 <= 0){
    bolinha.Yspeed *= -1;
  }
}; 