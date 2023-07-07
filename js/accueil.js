console.log('accueil.js');
const main = document.querySelector('main.content');

const container = document.querySelector('section.container');
const containerUtils = document.querySelector('section.utilitaires');
const containerInfos = document.querySelector('section.informations');
const TOOLTIP = document.querySelector('section.tooltip');

const background = document.querySelector('img#background');
const svg = document.querySelector('svg#data');
const bordure = document.querySelector('div.bordure');
const boussole = document.querySelector('div.boussole');
const echelle = document.querySelector('div.echelle');
const valeursP = document.querySelectorAll('.graduations > div > p');
const valeursTab = [0, 200, 400, 600, 800, 1000];
const max = document.querySelector('div.plein-ecran');

const GGS = document.querySelectorAll('#data > g:not(.divers):not(.nom)');
let previousG;
const LOCALITE = document.querySelectorAll('path.localite')
const carte = document.querySelector('div.feerune');

const infosNom = document.querySelector('div.nom p');
const infosCapitale = document.querySelector('div.capitale p');
const infosPopulation = document.querySelector('div.population p');
const description = document.querySelector('div.description p');
const infosRegions = document.querySelector('div.regions ul');
const infosLienFr = document.querySelector('div.lien p.fr a');
const infosLienEng = document.querySelector('div.lien p.eng a');

const ROOT = document.documentElement;
const REDIM = 4;
const VIEWBOX_X = 10200 / REDIM;
const VIEWBOX_Y = 6600 / REDIM;
const WINDOWRATIO = 51 / 33;
const BORDURE = 40;


let newScrollLeft;
let newScrollTop;
let largeurContainer;
let hauteurContainer;
let newLargeurContainer;
let newHauteurContainer;
let largeurCarte;
let hauteurCarte;
let newLargeurCarte;
let newHauteurCarte;
const scaleAmount = 0.5;
let carteScale = 1;
let containerScale;

//Les objets qui récupèrent les données originales.
let dataGG = {};
let box = {};

function init() {
    console.log('Hello World!');
    resize();
    originalData();
    //console.log(dataGG);
    //utilsInit();
    console.log('startloading');
    // Appel de la fonction asynchrone après les autres fonctions
    imgAsync().then(() => {
        background.src = "./img/highRes.jpg";
        console.log('High-resolution image loaded');
        // Effectuez ici les opérations supplémentaires que vous souhaitez effectuer après le chargement de l'image haute résolution.
    }).catch((error) => {
        console.error('Failed to load high-resolution image:', error);
    });
}

function imgAsync() {
    return new Promise((resolve, reject) => {
        let Newbackground = new Image();
        Newbackground.src = "./img/highRes.jpg";
        Newbackground.onload = () => resolve();
        Newbackground.onerror = (error) => reject(error);
    });
}

function infos(g) {
    infosRegions.innerHTML = '';
    const lienFr = g.getAttribute('data-nom');
    const nomFr = dataToTxt(lienFr);
    const nomEng = g.id;
    infosNom.textContent = nomFr;
    infosLienFr.textContent = nomFr;
    infosLienFr.href = "https://forgottenrealms.fandom.com/wiki/" + lienFr;
    infosLienEng.textContent = nomEng;
    infosLienEng.href = "https://forgottenrealms.fandom.com/wiki/" + nomEng;
    infosCapitale.textContent = g.getAttribute('data-capitale');
    infosPopulation.textContent = g.getAttribute('data-population') + " habitants";
    description.textContent = g.getAttribute('data-description');

    if (g.children.length < 3) {
        infosRegions.innerHTML = 'Aucune information';
    } else {
        for (let i = 0; i < g.children.length; i++) {
            const path = g.children[i];
            if (path.tagName === 'g') {
                let nom = path.getAttribute('data-nom');
                const li = document.createElement('li');
                li.textContent = dataToTxt(nom);
                infosRegions.appendChild(li);
            } else if (path.classList.contains('localite')) {
                let nom = path.id;
                const li = document.createElement('li');
                li.textContent = dataToTxt(nom);
                infosRegions.appendChild(li);
            }
        }
    }
}

function echelleZoom() {

    //Calcul des nouvelles graduations
    for (let i = 0; i < valeursP.length - 1; i++) {
        valeursP[i + 1].textContent = Math.floor(valeursTab[i] / carteScale);
    }

    // Calcul de la nouvelle opacité du hover
    const opacity = 0.8 - (0.08 * carteScale);

    ROOT.style.setProperty('--opacity', opacity);
    // console.log('Zoom:', carteScale);
    // console.log('Opacité:', opacity);
}

function zoom(event) {

    //On suppose un zoom IN
    let scaleDelta = scaleAmount;
    if (event.deltaY > 0) {
        //C'était un zoom OUT
        scaleDelta = -scaleAmount;
    }

    //On calcule le nouveau scaling.
    const newScale = Math.max(Math.min((carteScale + scaleDelta), 10), 1);

    // Get mouse position relative to the carte
    const rect = carte.getBoundingClientRect();

    carte.style.transform = `scale(${newScale})`;

    //dimensions actuelles du conteneur
    largeurContainer = VIEWBOX_X * containerScale * carteScale;
    hauteurContainer = VIEWBOX_Y * containerScale * carteScale;

    //nouvelles dimensions (après zoom)
    newLargeurContainer = VIEWBOX_X * containerScale * newScale;
    newHauteurContainer = VIEWBOX_Y * containerScale * newScale;

    //dimensions actuelles de la carte
    largeurCarte = event.clientX + Math.abs(rect.left);
    hauteurCarte = event.clientY + Math.abs(rect.top);

    //nouvelles dimensions (après zoom)
    newLargeurCarte = (largeurCarte / largeurContainer) * newLargeurContainer;
    newHauteurCarte = (hauteurCarte / hauteurContainer) * newHauteurContainer;

    //positionnement de la carte (avec les nouvelles dimensions)
    newScrollLeft = (newLargeurCarte - event.clientX) / containerScale;
    newScrollTop = (newHauteurCarte - event.clientY) / containerScale;

    container.scrollLeft = newScrollLeft;
    container.scrollTop = newScrollTop;
    carteScale = newScale;

    echelleZoom();
}

function zoomRegion(g) {
    //Nom de la région
    //console.log(g.id);

    if (g.classList.contains('zoomed')) {
        // On récupère les données initiales
        const GDATA = dataGG[g.id];
        const newScale = GDATA.scale;
        const posGauche = GDATA.left;
        const posHaut = GDATA.top;
        // console.log(newScale);
        // console.log(posGauche);
        // console.log(posHaut);

        // Appliquer le nouveau zoom
        carte.style.transform = "scale(" + newScale + ")";
        // Positionner la région en haut à gauche
        container.scrollLeft = posGauche;
        container.scrollTop = posHaut;

        // Mise à jour de carteScale
        carteScale = newScale;
    } else {

        // Appliquer le nouveau zoom
        carte.style.transform = "scale(1)";
        // Positionner la région en haut à gauche
        container.scrollLeft = 0;
        container.scrollTop = 0;

        // Mise à jour de carteScale
        carteScale = 1;
    }
    echelleZoom();
}

//DONNES POUR LE ZOOM DES REGIONS
function originalData() {
    let box = carte.getBoundingClientRect();
    let x = box.width;
    let y = box.height;

    for (let g of GGS) {
        let rect = g.getBoundingClientRect();
        const largeurObj = rect.width;
        const hauteurObj = rect.height;

        const xRatio = largeurObj / x;
        const yRatio = hauteurObj / y;

        let ratio = yRatio;
        let vertical = true;
        if (xRatio > yRatio) {
            vertical = false;
            ratio = xRatio;
        }

        //On récupère le scaling de cet objet
        const scaling = 1 / ratio * 0.94;//0.94 = marges

        const largeurBox = VIEWBOX_X * scaling;
        const hauteurBox = VIEWBOX_Y * scaling;

        const posLeft = rect.left / x;
        const posTop = rect.top / y;

        //on récupère le positionnement de cet objet
        let scrollY;
        let scrollX;

        if (vertical) {
            scrollY = posTop * hauteurBox - BORDURE;
            scrollX = posLeft * largeurBox - (5 * BORDURE);
        } else {
            scrollY = posTop * hauteurBox - (5 * BORDURE);
            scrollX = posLeft * largeurBox - BORDURE;
        }

        //On met les données dans le tableau associatif.
        dataGG[g.id] = {
            left: scrollX,
            top: scrollY,
            scale: scaling,
        };
    }
}


container.addEventListener('contextmenu', function (event) {
    event.preventDefault(); // Empêche l'affichage du menu contextuel par défaut
    console.log('scrollTop:', container.scrollTop / yqc);
    console.log('scrollLeft:', container.scrollLeft / xqc);
});


function resize() { // Fonction qui permet de redimensionner un groupe de personnages en fonction de l'écran de l'utilisateur
    //console.log('resize');

    container.style.removeProperty('transform');
    containerUtils.style.removeProperty('transform');
    containerInfos.style.removeProperty('height');
    containerInfos.style.removeProperty('width');
    containerInfos.style.removeProperty('transform');
    max.style.removeProperty('display');

    const widthScreen = document.documentElement.clientWidth; // On récupère la largeur de l'écran de l'utilisateur
    const heightScreen = document.documentElement.clientHeight; // On récupère la hauteur de l'écran de l'utilisateur
    const ratio = (widthScreen / heightScreen) / (51 / 33); // Le ratio de notre image de fond (la salle du conseil) est de 16/9e

    // On stocke les ratios hauteurs & largeur par rapport à la taille actuelle de l'écran de l'utilisateur minorés de 2,5% pour les marges
    let widthRatio = (widthScreen / VIEWBOX_X);
    let heightRatio = (heightScreen / VIEWBOX_Y);

    /* On vérifie si l'écran est plus ou moins au bonnes dimensions (+/-20%) ou si il est beaucoup trop large ou beaucoup trop haut */
    /* On utilisera le ratio le plus réducteur */
    containerScale = widthRatio;
    if (ratio > 1) {
        containerScale = heightRatio;
    }

    const containerHauteur = container.offsetHeight * containerScale;
    const containerLargeur = container.offsetWidth * containerScale;
    const hauteurTemp = heightScreen - containerHauteur;
    const largeurTemp = widthScreen - containerLargeur;

    if (hauteurTemp > 150 || largeurTemp > 200) {
        if (ratio < 1) {//HAUTEUR DE LA CARTE REDUITE
            containerInfos.style.height = hauteurTemp + "px";
        } else if (ratio > 1) {//LARGEUR DE LA CARTE REDUITE
            containerInfos.style.width = largeurTemp + "px";
        }
        container.style.transform = "scale(" + containerScale + ")";
        containerUtils.style.transform = "scale(" + containerScale + ")";
    } else {
        containerInfos.style.height = "40vh";
        containerInfos.style.transform = "scaleY(0)"
        container.style.transform = "scaleX(" + widthRatio + ") scaleY(" + heightRatio + ")";
        containerUtils.style.transform = "scaleX(" + widthRatio + ") scaleY(" + heightRatio + ")";
        max.style.display = "block";
    }
}

//LISTENERS
window.addEventListener('load', function () {//CHARGEMENT
    init();
});

carte.addEventListener('wheel', (event) => {//ZOOM
    event.preventDefault();
    zoom(event);
});

//REDIMENSIONNEMENT DE LA CARTE ET DE LA ZONE DES INFOS
window.addEventListener('resize', debounce(resize, 300));

GGS.forEach((g) => {//INFOS ('mouseover') & ZOOM ('click')
    g.addEventListener('mouseover', () => {
        g.classList.add('survol');
        if (previousG) {
            if (!previousG.classList.contains('zoomed')) {
                infos(g);
            }
        } else {
            infos(g);
        }
    });
    g.addEventListener('mouseleave', function () {
        g.classList.remove('survol');
    });
    g.addEventListener('click', function (event) {
        event.stopPropagation();
        g.classList.toggle('zoomed');
        if (previousG) { previousG.classList.remove('zoomed') };
        zoomRegion(g);
        infos(g);
        previousG = g;
    });
});

max.addEventListener('click', () => {//OUVERTURE DU MENU INFOS (Uniquement si la carte est en plein écran)
    resize();
    main.classList.toggle('max');
});

LOCALITE.forEach(function (loc) {
    ['mouseenter', 'mouseleave', 'mouseover', 'mouseout', 'mousedown', 'mouseup', 'click'].forEach(function (action) {
        loc.addEventListener(action, function (event) {
            event.stopPropagation();
        });
    });
    loc.addEventListener('mouseover', function () {
        loc.classList.add('survol');
    });
    loc.addEventListener('mouseleave', function () {
        loc.classList.remove('survol');
    });
    loc.addEventListener('click', () => {//PARTIE PERSONNAGE (jdr)
        window.location.href = "http://localhost/jdr/localite/" + loc.id;
    });
});