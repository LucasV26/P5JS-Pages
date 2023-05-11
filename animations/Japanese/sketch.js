class Botao{
  constructor(posX, posY, sizeW, sizeH, text, flagRightAnswer, R, G, B) {

    this.posX = posX;
    this.posY = posY;
    this.sizeW = sizeW;
    this.sizeH = sizeH;
    this.text = text;
    this.flagRightAnswer = flagRightAnswer;
    this.R = R;
    this.G = G;
    this.B = B;

  }

  render() {

    if(this.isInside(mouseX, mouseY))
      stroke(0, 250, 247, 100);
    else
      stroke(this.R, this.G, this.B);

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

let posicaoRespostaCerta, objetoPergunta, objetoOpcoes, flagAcerto;

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


  let dicionario = [
    ["あ", "ア", "A"],
    ["え", "エ", "E"],
    ["い", "イ", "I"],
    ["お", "オ", "O"],
    ["う", "ウ", "U"],
    ["か", "カ", "KA"],
    ["け", "ケ", "KE"],
    ["き", "キ", "KI"],
    ["こ", "コ", "KO"],
    ["く", "ク", "KU"],
    ["さ", "サ", "SA"],
    ["せ", "セ", "SE"],
    ["し", "シ", "SHI"],
    ["そ", "ソ", "SO"],
    ["す", "ス", "SU"],
    ["た", "タ", "TA"],
    ["て", "テ", "TE"],
    ["ち", "チ", "CHI"],
    ["と", "ト", "TO"],
    ["つ", "ツ", "TSU"],
    ["な", "ナ", "NA"],
    ["ね", "ネ", "NE"],
    ["に", "ニ", "NI"],
    ["の", "ノ", "NO"],
    ["ぬ", "ヌ", "NU"],
    ["ざ", "ザ", "ZA"],
    ["ぜ", "ゼ", "ZE"],
    ["じ", "ジ", "JI"],
    ["ぞ", "ゾ", "ZO"],
    ["ず", "ズ", "ZU"],
    ["だ", "ダ", "DA"],
    ["で", "デ", "DE"],
    ["ぢ", "ヂ", "DI"],
    ["ど", "ド", "DO"],
    ["づ", "ヅ", "DU"],
    ["ば", "バ", "BA"],
    ["べ", "ベ", "BE"],
    ["び", "ビ", "BI"],
    ["ぼ", "ボ", "BO"],
    ["ぶ", "ブ", "BU"],
    ["ぱ", "パ", "PA"],
    ["ぺ", "ペ", "PE"],
    ["ぴ", "ピ", "PI"],
    ["ぽ", "ポ", "PO"],
    ["ぷ", "プ", "PU"],
    ["が", "ガ", "GA"],
    ["げ", "ゲ", "GE"],
    ["ぎ", "ギ", "GI"],
    ["ご", "ゴ", "GO"],
    ["ぐ", "グ", "GU"],
    ["は", "ハ", "HA"],
    ["へ", "ヘ", "HE"],
    ["ひ", "ヒ", "HI"],
    ["ほ", "ホ", "HO"],
    ["ふ", "フ", "FU"],
    ["ま", "マ", "MA"],
    ["め", "メ", "ME"],
    ["み", "ミ", "MI"],
    ["も", "モ", "MO"],
    ["む", "ム", "MU"],
    ["や", "ヤ", "YA"],
    ["よ", "ヨ", "YO"],
    ["ゆ", "ユ", "YU"],
    ["ら", "ラ", "RA"],
    ["れ", "レ", "RE"],
    ["り", "リ", "RI"],
    ["ろ", "ロ", "RO"],
    ["る", "ル", "RU"],
    ["わ", "ワ", "WA"],
    ["を", "ヲ", "WO"],
    ["ん", "ン", "N"]
  ]

  if(flagAcerto == true) 
    countAcertos++;
  if(flagAcerto == false)
    countErros++;

  flagAcerto = -1;

  BotaoMenu = new Triangulo();

  posicaoRespostaCerta = Math.floor(Math.random() * 4);

  objetoPergunta = dicionario.splice(Math.floor(Math.random() * dicionario.length), 5)[0];

  objetoOpcoes = [dicionario.splice(Math.floor(Math.random() * dicionario.length), 5)[0], dicionario.splice(Math.floor(Math.random() * dicionario.length), 5)[0], dicionario.splice(Math.floor(Math.random() * dicionario.length), 5)[0]];

  let countAux = 0;
  botoes = [];
  for(let i = 0 ; i < 4; i++) {

    if(i == posicaoRespostaCerta) {
      botoes.push(new Botao(width/mapaPosicoes[i][0], height/mapaPosicoes[i][1], 200, 100, `${objetoPergunta[flagJogoInvertido ? 2 : chaveHiraganaKatakana]}`, true, 255, 255, 255));
    }else{
      botoes.push(new Botao(width/mapaPosicoes[i][0], height/mapaPosicoes[i][1], 200, 100, `${objetoOpcoes[countAux][flagJogoInvertido ? 2 : chaveHiraganaKatakana]}`, false, 255, 255, 255))
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
    text(`Qual o som da grafia ' ${objetoPergunta[chaveHiraganaKatakana]} '`, width/2.7, 70);
  else  
    text(`Qual grafia representa o som ' ${objetoPergunta[2]} '`, width/3, 70);

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

      if(b.flagRightAnswer) {

        if(flagAcerto == -1)
          flagAcerto = true;

        setup();

      }else {

        if(flagAcerto == -1)
          flagAcerto = false;
        
        botoes[posicaoRespostaCerta].R = 0;
        botoes[posicaoRespostaCerta].G = 255;
        botoes[posicaoRespostaCerta].B = 0;

        b.R = 255;
        b.G = 0;
        b.B = 0;

      }

    }

  }

};

function keyPressed() {
  executaFuncao[keyCode]();
}