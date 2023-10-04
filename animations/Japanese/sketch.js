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
  82: () => {flagJogoInvertido = !flagJogoInvertido; setup()},
  70: () => {if(flagEditandoDicionario) { dicionarioCompleto.map((e) => {e[3] = false}); createBotoesDicionario(); }}

};

let dicionarioCompleto = [
  ["あ", "ア", "A", true],
  ["え", "エ", "E", true],
  ["い", "イ", "I", true],
  ["お", "オ", "O", true],
  ["う", "ウ", "U", true],
  ["か", "カ", "KA", true],
  ["け", "ケ", "KE", true],
  ["き", "キ", "KI", true],
  ["こ", "コ", "KO", true],
  ["く", "ク", "KU", true],
  ["さ", "サ", "SA", true],
  ["せ", "セ", "SE", true],
  ["し", "シ", "SHI", true],
  ["そ", "ソ", "SO", true],
  ["す", "ス", "SU", true],
  ["た", "タ", "TA", true],
  ["て", "テ", "TE", true],
  ["ち", "チ", "CHI", true],
  ["と", "ト", "TO", true],
  ["つ", "ツ", "TSU", true],
  ["な", "ナ", "NA", true],
  ["ね", "ネ", "NE", true],
  ["に", "ニ", "NI", true],
  ["の", "ノ", "NO", true],
  ["ぬ", "ヌ", "NU", true],
  ["ざ", "ザ", "ZA", true],
  ["ぜ", "ゼ", "ZE", true],
  ["じ", "ジ", "JI", true],
  ["ぞ", "ゾ", "ZO", true],
  ["ず", "ズ", "ZU", true],
  ["だ", "ダ", "DA", true],
  ["で", "デ", "DE", true],
  ["ぢ", "ヂ", "DI", true],
  ["ど", "ド", "DO", true],
  ["づ", "ヅ", "DU", true],
  ["ば", "バ", "BA", true],
  ["べ", "ベ", "BE", true],
  ["び", "ビ", "BI", true],
  ["ぼ", "ボ", "BO", true],
  ["ぶ", "ブ", "BU", true],
  ["ぱ", "パ", "PA", true],
  ["ぺ", "ペ", "PE", true],
  ["ぴ", "ピ", "PI", true],
  ["ぽ", "ポ", "PO", true],
  ["ぷ", "プ", "PU", true],
  ["が", "ガ", "GA", true],
  ["げ", "ゲ", "GE", true],
  ["ぎ", "ギ", "GI", true],
  ["ご", "ゴ", "GO", true],
  ["ぐ", "グ", "GU", true],
  ["は", "ハ", "HA", true],
  ["へ", "ヘ", "HE", true],
  ["ひ", "ヒ", "HI", true],
  ["ほ", "ホ", "HO", true],
  ["ふ", "フ", "FU", true],
  ["ま", "マ", "MA", true],
  ["め", "メ", "ME", true],
  ["み", "ミ", "MI", true],
  ["も", "モ", "MO", true],
  ["む", "ム", "MU", true],
  ["や", "ヤ", "YA", true],
  ["よ", "ヨ", "YO", true],
  ["ゆ", "ユ", "YU", true],
  ["ら", "ラ", "RA", true],
  ["れ", "レ", "RE", true],
  ["り", "リ", "RI", true],
  ["ろ", "ロ", "RO", true],
  ["る", "ル", "RU", true],
  ["わ", "ワ", "WA", true],
  ["を", "ヲ", "WO", true],
  ["ん", "ン", "N", true]
];

let botoesDicionario = [];

let botaoDicionario, flagEditandoDicionario = false;

function createBotoesDicionario() {

  botoesDicionario = [];

  for(let i = 0; i < dicionarioCompleto.length; i++) {

    botoesDicionario.push(new Botao((i%10 * 110) + 190, (Math.floor(i/10) * 80) + 10, 100, 70, `${dicionarioCompleto[i][0]}, ${dicionarioCompleto[i][1]}, ${dicionarioCompleto[i][2]}`, dicionarioCompleto[i][3], 255, 255, 255));

  }

}

function setup() {

  createCanvas(window.innerWidth , window.innerHeight);
  background(0);

  let dicionario = dicionarioCompleto.filter((e) => {return e[3]});

  if(dicionario.length <= 3) {

    dicionario = dicionarioCompleto;
    dicionarioCompleto.map((e) => {e[3] = true})

  }

  if(flagAcerto == true) 
    countAcertos++;
  if(flagAcerto == false)
    countErros++;

  flagAcerto = -1;

  BotaoMenu = new Triangulo();

  botaoDicionario = new Botao(50, 100, 100, 50, "Dicionário", null, 255, 255, 255);

  posicaoRespostaCerta = Math.floor(Math.random() * 4);

  objetoPergunta = dicionario.splice(Math.floor(Math.random() * dicionario.length), 1)[0];

  objetoOpcoes = [dicionario.splice(Math.floor(Math.random() * dicionario.length), 1)[0], dicionario.splice(Math.floor(Math.random() * dicionario.length), 1)[0], dicionario.splice(Math.floor(Math.random() * dicionario.length), 1)[0]];

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

  createBotoesDicionario();

};

function draw() {

  background(0);

  textSize(15);
  textAlign(CENTER);
  botaoDicionario.text = flagEditandoDicionario ? "Jogo" : "Dicionário";
  botaoDicionario.render();


  fill(0, 250, 247, 100);
  stroke(0, 100, 255, 80);
  textAlign(LEFT);

  if(flagEditandoDicionario) {

    fill(255);
    text("F: Limpar Seleção", 40, 200);
    
    fill(0, 250, 247, 100);
    textSize(13);
    textAlign(CENTER);
    for(let d of botoesDicionario){

      if(d.flagRightAnswer){
        d.R = 0;
        d.G = 255;
        d.B = 0;
      }else {
        d.R = 255;
        d.G = 0;
        d.B = 0;
      }

      d.render();
    }

  }else {

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

    textSize(25);
    for(let b of botoes)
      b.render();

  }

  mouseBotaoMenu = new mouseTriangles(dist(mouseX, mouseY, BotaoMenu.p1x, BotaoMenu.p1y), dist(mouseX, mouseY, BotaoMenu.p2x, BotaoMenu.p2y), dist(mouseX, mouseY, BotaoMenu.p3x, BotaoMenu.p3y));

  fill(255);
  if (mouseBotaoMenu.Areas(BotaoMenu.a, BotaoMenu.b, BotaoMenu.c) == BotaoMenu.Area()) {
    fill(0, 255, 0);
  }

  BotaoMenu.render();

};

function mouseDragged() {

  if(flagEditandoDicionario) {

    for(let i = 0; i < botoesDicionario.length; i++) {

      if(botoesDicionario[i].isInside(mouseX, mouseY)) {

        botoesDicionario[i].flagRightAnswer = !botoesDicionario[i].flagRightAnswer;
        dicionarioCompleto[i][3] = !dicionarioCompleto[i][3];

      }

    }

  }

}

function mousePressed() {
 
  if (mouseBotaoMenu.Areas(BotaoMenu.a, BotaoMenu.b, BotaoMenu.c) == BotaoMenu.Area()) {
    location.replace('https://lucasv26.github.io/P5JS-Pages');
  }

  if(botaoDicionario.isInside(mouseX, mouseY)) {

    flagEditandoDicionario = !flagEditandoDicionario;
    createBotoesDicionario();

  }

  if(flagEditandoDicionario) {

    for(let i = 0; i < botoesDicionario.length; i++) {

      if(botoesDicionario[i].isInside(mouseX, mouseY)) {

        botoesDicionario[i].flagRightAnswer = !botoesDicionario[i].flagRightAnswer;
        dicionarioCompleto[i][3] = !dicionarioCompleto[i][3];

      }

    }

  }else{

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

  }

};

function keyPressed() {
  // console.log(keyCode);
  executaFuncao[keyCode]();
}
