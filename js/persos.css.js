console.log(personnages);
/*
const persosDivs = document.querySelectorAll('main > div > div > a > div');
const stockageImages = '/jdr/img/personnages/';
const imgDiv = getBaseUrl() + stockageImages;

persosDivs.forEach((div) => {//INFOS SUR (mouseover) & ZOOM CIBLE "click"
    const id = div.id;
    const obj = personnages[id - 1];
    const data = obj['position'];
    //console.log(div);

    //URL DES IMAGES 
    const url = data['image'];
    const image = url.replace(/..\//g, imgDiv);
    const hover = image.replace(/Min/g, "Hover");

    //CLASSE(S) CSS
    const listeClasse = div.classList;
    let classes = '';
    for (let i = 0; i < listeClasse.length; i++) {
        classes = classes + '.' + listeClasse[i];
    }

    //DONNEES CSS 
    const dataCSS = {
        classe: classes,
        image: image,
        imageHover: hover,
        top: data['top'],
        left: data['left'],
        height: data['height'],
        width: data['width'],
        scaling: data['scaling'],
        zIndex: data['zIndex'],
    };

    //CODE CSS
    const codeCSS = `
        ${dataCSS.classe} {
            background-image: ${dataCSS.image};
            top: ${dataCSS.top}%;
            left: ${dataCSS.left}%;
            width: calc(${dataCSS.width} * 50px);
            height: calc(${dataCSS.height} * 80px);
            z-index: ${dataCSS.zIndex};
        }

        ${dataCSS.classe}:hover {
            background-image: ${dataCSS.imageHover};
            transform: scale(${dataCSS.scaling});
        }
    `;

    //INJECTION DU STYLE DANS LA BALISE HEAD
    const style = document.createElement('style');
    style.appendChild(document.createTextNode(codeCSS));
    document.head.appendChild(style);
});

*/