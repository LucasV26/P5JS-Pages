class Bola{
  constructor(X, Y, R, B){
    this.X = X;
    this.Y = Y;
    this.Hi = Y;
    this.R = R;
    this.M = R/2;
    this.B = B;
    this.G = 1;
    this.Em = this.M * this.G * Math.abs(this.B - this.Y);
    this.V = 1;
    this.Rebateu = false;
  }

  gerandoVelocidadeSubindo(){
    let Ep = this.M * this.G * Math.abs(this.B - this.Y);
    let Ec = this.Em - Ep;
    this.V = -1*Math.sqrt(Ec*2/this.M);
  }

  gerandoVelocidadeCaindo(){
    let Ep = this.M * this.G * Math.abs(this.B - this.Y);
    let Ec = this.Em - Ep;
    this.V = Math.sqrt(Ec*2/this.M);
  }

  desenandoBola(){
    ellipse(this.X, this.Y, this.R*2);
    this.Y += this.V;
    if(this.Y >= this.B || this.Y <= this.Hi){
      this.Rebateu = !this.Rebateu;
    }
    if(this.Rebateu){
      this.gerandoVelocidadeSubindo();
    }else{
      this.gerandoVelocidadeCaindo();
    }
  }
}

let bola;

function setup() {
  createCanvas(700, 700);
  bola = new Bola(350, 100, 25, height);
}

function draw() {
  background(255, 50, 150);
  bola.desenandoBola();
}