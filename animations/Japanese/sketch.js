class Botao{
  constructor(posX, posY, sizeW, sizeH, text, flagRightAnswer) {

    this.posX = posX;
    this.posY = posY;
    this.sizeW = sizeW;
    this.sizeH = sizeH;
    this.text = text;
    this.flagRightAnswer = flagRightAnswer;

  }

  render() {

    if(this.isInside(mouseX, mouseY))
      stroke(0, 250, 247, 100);
    else
      stroke(255);

    fill(0);

    rect(this.posX, this.posY, this.sizeW, this.sizeH);
   
    stroke(255);
    fill(255);
    textSize(16);
    text(this.text, this.posX + (this.sizeW / 2.7), this.posY + (this.sizeH / 2));

  }

  isInside(x, y) {

    return (x >= this.posX && x <= this.posX + this.sizeW && y >= this.posY && y <= this.posY + this.sizeH);

  }

}

let dicionario = {
  "A": ["あ", "ア"],
  "E": ["え", "エ"],
  "I": ["い", "イ"],
  "O": ["お", "オ"],
  "U": ["う", "ウ"],
  "KA": ["か", "カ"],
  "KE": ["け", "ケ"],
  "KI": ["き", "キ"],
  "KO": ["こ", "コ"],
  "KU": ["く", "ク"],
  "SA": ["さ", "サ"],
  "SE": ["せ", "セ"],
  "SI": ["し", "シ"],
  "SO": ["そ", "ソ"],
  "SU": ["す", "ス"],
  "TA": ["た", "タ"],
  "TE": ["て", "テ"],
  "TI": ["ち", "チ"],
  "TO": ["と", "ト"],
  "TU": ["つ", "ツ"],
  "NA": ["な", "ナ"],
  "NE": ["ね", "ネ"],
  "NI": ["に", "ニ"],
  "NO": ["の", "ノ"],
  "NU": ["ぬ", "ヌ"],
  "ZA": ["ざ", "ザ"],
  "ZE": ["ぜ", "ゼ"],
  "ZI": ["じ", "ジ"],
  "ZO": ["ぞ", "ゾ"],
  "ZU": ["ず", "ズ"],
  "DA": ["だ", "ダ"],
  "DE": ["で", "デ"],
  "DI": ["ぢ", "ヂ"],
  "DO": ["ど", "ド"],
  "DU": ["づ", "ヅ"],
  "BA": ["ば", "バ"],
  "BE": ["べ", "ベ"],
  "BI": ["び", "ビ"],
  "BO": ["ぼ", "ボ"],
  "BU": ["ぶ", "ブ"],
  "PA": ["ぱ", "パ"],
  "PE": ["ぺ", "ペ"],
  "PI": ["ぴ", "ピ"],
  "PO": ["ぽ", "ポ"],
  "PU": ["ぷ", "プ"],
  "GA": ["が", "ガ"],
  "GE": ["げ", "ゲ"],
  "GI": ["ぎ", "ギ"],
  "GO": ["ご", "ゴ"],
  "GU": ["ぐ", "グ"],
  "HA": ["は", "ハ"],
  "HE": ["へ", "ヘ"],
  "HI": ["ひ", "ヒ"],
  "HO": ["ほ", "ホ"],
  "HU": ["ふ", "フ"],
  "MA": ["ま", "マ"],
  "ME": ["め", "メ"],
  "MI": ["み", "ミ"],
  "MO": ["も", "モ"],
  "MU": ["む", "ム"],
  "YA": ["や", "ヤ"],
  "YO": ["よ", "ヨ"],
  "YU": ["ゆ", "ユ"],
  "RA": ["ら", "ラ"],
  "RE": ["れ", "レ"],
  "RI": ["り", "リ"],
  "RO": ["ろ", "ロ"],
  "RU": ["る", "ル"],
  "WA": ["わ", "ワ"],
  "WO": ["を", "ヲ"],
  "N": ["ん", "ン"]
}

let chaves = [
  "A",
  "E",
  "I",
  "O",
  "U",
  "KA",
  "KE",
  "KI",
  "KO",
  "KU",
  "SA",
  "SE",
  "SI",
  "SO",
  "SU",
  "TA",
  "TE",
  "TI",
  "TO",
  "TU",
  "NA",
  "NE",
  "NI",
  "NO",
  "NU",
  "ZA",
  "ZE",
  "ZI",
  "ZO",
  "ZU",
  "DA",
  "DE",
  "DI",
  "DO",
  "DU",
  "BA",
  "BE",
  "BI",
  "BO",
  "BU",
  "PA",
  "PE",
  "PI",
  "PO",
  "PU",
  "GA",
  "GE",
  "GI",
  "GO",
  "GU",
  "HA",
  "HE",
  "HI",
  "HO",
  "HU",
  "MA",
  "ME",
  "MI",
  "MO",
  "MU",
  "YA",
  "YO",
  "YU",
  "RA",
  "RE",
  "RI",
  "RO",
  "RU",
  "WA",
  "WO",
  "N"
];

let posicaoRespostaCerta;

let chavePergunta;

let outrasChaves;

let botoes = [];

let mapaPosicoes = {

  0: [4, 4],
  1: [1.5, 4],
  2: [4, 1.5],
  3: [1.5, 1.5]

}

let countAcertos = 0, countErros = 0;

function setup() {

  createCanvas(1200, 500);
  background(0);

  BotaoMenu = new Triangulo();

  posicaoRespostaCerta = Math.floor(Math.random() * 4);

  chavePergunta = Math.floor(Math.random() * 70);

  outrasChaves = [Math.floor(Math.random() * 70), Math.floor(Math.random() * 70), Math.floor(Math.random() * 70)];

  while(outrasChaves.indexOf(chavePergunta) != -1)
    outrasChaves[outrasChaves.indexOf(chavePergunta)] = Math.floor(Math.random() * 70);


  let countAux = 0;
  botoes = [];
  for(let i = 0 ; i < 4; i++) {

    if(i == posicaoRespostaCerta) {
      botoes.push(new Botao(width/mapaPosicoes[i][0], height/mapaPosicoes[i][1], 200, 100, `${dicionario[chaves[chavePergunta]][0]} and ${dicionario[chaves[chavePergunta]][1]}`, true));
    }else{
      botoes.push(new Botao(width/mapaPosicoes[i][0], height/mapaPosicoes[i][1], 200, 100, `${dicionario[chaves[outrasChaves[countAux]]][0]} and ${dicionario[chaves[outrasChaves[countAux]]][1]}`, false))
      countAux++;
    }

  }

};

function draw() {

  background(0);
  fill(0, 250, 247, 100);
  stroke(0, 100, 255, 80);

  rect(width/4, 20, 700, 70);

  stroke(0);
  fill(255);
  textSize(16);
  
  text("Selecione a Opção Correta", width/2.1, 50);
  text(`Quais grafias representam o som '${chaves[chavePergunta]}'`, width/2.3, 70);

  text(`Totais: \n✔ ${countAcertos} \n❌ ${countErros}`, width/1.1, 20);

  for(let b of botoes)
    b.render();

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

  for(b of botoes) {

    if(b.isInside(mouseX, mouseY)){

      b.flagRightAnswer ? countAcertos++ : countErros++;
      setup();

    }

  }

};