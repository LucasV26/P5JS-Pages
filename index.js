const pagesData = [
    {
        name: "Movimento em linha reta",
        description: "Sketch sobre a fórmula de movimento retilínio. Cada bola segue sua própria função de reta",
        picture: "",
        path: "https://lucasv26.github.io/P5JS-Pages/animations/LineMovement/index.html"
    },
    {
        name: "Reflexão com desenho permanente",
        description: "Sketch sobre a reflexão de um corpo nas extremidades na tela. O rastro da bola é fixado na tela",
        picture: "",
        path: "https://lucasv26.github.io/P5JS-Pages/animations/ReflectMovement/index.html"
    },
    {
        name: "Atração gravitacional isolada",
        description: "Sketch sobre a atração gravitacional em sistema isolado (sem forças externas). É possível cirar novos corpos utilizando o mouse",
        picture: "",
        path: "https://lucasv26.github.io/P5JS-Pages/animations/IsolatedGravity/index.html"
    },
    {
        name: "Atração gravitacional acelerada",
        description: "Sketch sobre atração gravitacional com aceleração constante. É possível criar novos corpos, os antigos serão deletados",
        picture: "",
        path: "https://lucasv26.github.io/P5JS-Pages/animations/AceleratedGravity/index.html"
    },
    {
        name: "Planos distintos",
        description: "Estudo sobre ferramenta de múltiplos planos de desenho. O quadrado vermelho nunca ficará afrente dos pontos amarelos",
        picture: "",
        path: "https://lucasv26.github.io/P5JS-Pages/animations/MultipleCanvas/index.html"
    },
    {
        name: "Função de circunferência",
        description: "Sketch sobre a função de uma circunferência, todas as linhas são geradas a partir da função baseada no centro e raio da circunferência",
        picture: "",
        path: "https://lucasv26.github.io/P5JS-Pages/animations/Circle/index.html"
    },
    {
        name: "Gerador de Partículas",
        description: "Sketch sobre a criação e atualização de múltiplas partículas através de um ou mais geradores",
        picture: "",
        path: "https://lucasv26.github.io/P5JS-Pages/animations/ParticleGenerator/index.html"
    }
];

function init() {
    let pagesList = document.getElementById("pages");


    for (p of pagesData) {
        let pageInfo = document.createElement("div");
        pageInfo.setAttribute('class', 'pageCard')

        pageInfo.innerHTML = `
            <h3>${p.name}</h3>
            <p>${p.description}</p>
            <br>
            <a href="${p.path}">Acessar</a>
        `;

        pagesList.appendChild(pageInfo);
    }
}


init();