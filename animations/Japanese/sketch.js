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
    textSize(25);
    text(this.text, this.posX + (this.sizeW / 2.4), this.posY + (this.sizeH / 1.8));

  }

  isInside(x, y) {

    return (x >= this.posX && x <= this.posX + this.sizeW && y >= this.posY && y <= this.posY + this.sizeH);

  }

}

let dicionario = {
  0: ["あ", "ア", "A"],
  1: ["え", "エ", "E"],
  2: ["い", "イ", "I"],
  3: ["お", "オ", "O"],
  4: ["う", "ウ", "U"],
  5: ["か", "カ", "KA"],
  6: ["け", "ケ", "KE"],
  7: ["き", "キ", "KI"],
  8: ["こ", "コ", "KO"],
  9: ["く", "ク", "KU"],
  10: ["さ", "サ", "SA"],
  11: ["せ", "セ", "SE"],
  12: ["し", "シ", "SI"],
  13: ["そ", "ソ", "SO"],
  14: ["す", "ス", "SU"],
  15: ["た", "タ", "TA"],
  16: ["て", "テ", "TE"],
  17: ["ち", "チ", "TI"],
  18: ["と", "ト", "TO"],
  19: ["つ", "ツ", "TU"],
  20: ["な", "ナ", "NA"],
  21: ["ね", "ネ", "NE"],
  22: ["に", "ニ", "NI"],
  23: ["の", "ノ", "NO"],
  24: ["ぬ", "ヌ", "NU"],
  25: ["ざ", "ザ", "ZA"],
  26: ["ぜ", "ゼ", "ZE"],
  27: ["じ", "ジ", "ZI"],
  28: ["ぞ", "ゾ", "ZO"],
  29: ["ず", "ズ", "ZU"],
  30: ["だ", "ダ", "DA"],
  31: ["で", "デ", "DE"],
  32: ["ぢ", "ヂ", "DI"],
  33: ["ど", "ド", "DO"],
  34: ["づ", "ヅ", "DU"],
  35: ["ば", "バ", "BA"],
  36: ["べ", "ベ", "BE"],
  37: ["び", "ビ", "BI"],
  38: ["ぼ", "ボ", "BO"],
  39: ["ぶ", "ブ", "BU"],
  40: ["ぱ", "パ", "PA"],
  41: ["ぺ", "ペ", "PE"],
  42: ["ぴ", "ピ", "PI"],
  43: ["ぽ", "ポ", "PO"],
  44: ["ぷ", "プ", "PU"],
  45: ["が", "ガ", "GA"],
  46: ["げ", "ゲ", "GE"],
  47: ["ぎ", "ギ", "GI"],
  48: ["ご", "ゴ", "GO"],
  49: ["ぐ", "グ", "GU"],
  50: ["は", "ハ", "HA"],
  51: ["へ", "ヘ", "HE"],
  52: ["ひ", "ヒ", "HI"],
  53: ["ほ", "ホ", "HO"],
  54: ["ふ", "フ", "HU"],
  55: ["ま", "マ", "MA"],
  56: ["め", "メ", "ME"],
  57: ["み", "ミ", "MI"],
  58: ["も", "モ", "MO"],
  59: ["む", "ム", "MU"],
  60: ["や", "ヤ", "YA"],
  61: ["よ", "ヨ", "YO"],
  62: ["ゆ", "ユ", "YU"],
  63: ["ら", "ラ", "RA"],
  64: ["れ", "レ", "RE"],
  65: ["り", "リ", "RI"],
  66: ["ろ", "ロ", "RO"],
  67: ["る", "ル", "RU"],
  68: ["わ", "ワ", "WA"],
  69: ["を", "ヲ", "WO"],
  70: ["ん", "ン", "N"]
}

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

let chaveHiraganaKatakana = 0;

let flagJogoInvertido = false;

let countAcertos = 0, countErros = 0;

let executaFuncao = {

  84: () => {chaveHiraganaKatakana = chaveHiraganaKatakana ? 0 : 1; setup()},
  82: () => {flagJogoInvertido = !flagJogoInvertido; setup()}

};

function setup() {

  createCanvas(window.innerWidth , window.innerHeight);
  background(0);

  BotaoMenu = new Triangulo();

  posicaoRespostaCerta = Math.floor(Math.random() * 4);

  chavePergunta = Math.floor(Math.random() * 71);

  outrasChaves = [Math.floor(Math.random() * 71), Math.floor(Math.random() * 71), Math.floor(Math.random() * 71)];

  while(outrasChaves.indexOf(chavePergunta) != -1)
    outrasChaves[outrasChaves.indexOf(chavePergunta)] = Math.floor(Math.random() * 71);


  let countAux = 0;
  botoes = [];
  for(let i = 0 ; i < 4; i++) {

    if(i == posicaoRespostaCerta) {
      botoes.push(new Botao(width/mapaPosicoes[i][0], height/mapaPosicoes[i][1], 200, 100, `${dicionario[chavePergunta][flagJogoInvertido ? 2 : chaveHiraganaKatakana]}`, true));
    }else{
      botoes.push(new Botao(width/mapaPosicoes[i][0], height/mapaPosicoes[i][1], 200, 100, `${dicionario[outrasChaves[countAux]][flagJogoInvertido ? 2 : chaveHiraganaKatakana]}`, false))
      countAux++;
    }

  }

};

function draw() {

  background(0);
  fill(0, 250, 247, 100);
  stroke(0, 100, 255, 80);

  rect(width/4, 20, 770, 70);

  stroke(0);
  fill(255);
  textSize(20);
  
  text("Selecione a Opção Correta", width/2.8, 50);

  if(flagJogoInvertido)
    text(`Qual o som da grafia ' ${dicionario[chavePergunta][chaveHiraganaKatakana]} '`, width/2.7, 70);
  else  
    text(`Qual grafia representa o som ' ${dicionario[chavePergunta][2]} '`, width/3, 70);

  text(`Pontuação: \n✔ ${countAcertos} \n❌ ${countErros}`, width/1.1, 20);

  text(`Grafia atual: ${chaveHiraganaKatakana ? 'Katakana' : 'Hiragana'}`, 100, height - 100);

  text(`Mapa botões: \n'T': Alterar Grafia\n'R': Inverter Jogo`, width/1.15, height - 100);

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

function keyPressed() {
  executaFuncao[keyCode]();
}