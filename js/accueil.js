console.log('accueil.js');
const main = document.querySelector('main.content');

const container = document.querySelector('section.container');
const containerUtils = document.querySelector('section.utilitaires');
const containerInfos = document.querySelector('section.informations');

const background = document.querySelector('img#background');
const svg = document.querySelector('svg#data');
const bordure = document.querySelector('div.bordure');
const boussole = document.querySelector('div.boussole');
const echelle = document.querySelector('div.echelle');
const valeursP = document.querySelectorAll('.graduations > div > p');
const valeursTab = [0, 200, 400, 600, 800, 1000];
const max = document.querySelector('div.plein-ecran');

const ggs = document.querySelectorAll('#data > g:not(.divers):not(.nom)');
const paths = document.querySelectorAll('section.container path');
const valbalafre = document.getElementById('valbalafre');
const carte = document.querySelector('div.feerune');

const infosNom = document.querySelector('div.nom p');
const infosCapitale = document.querySelector('div.capitale p');
const infosPopulation = document.querySelector('div.population p');
const description = document.querySelector('div.description p');
const infosRegions = document.querySelector('div.regions ul');
const infosLienFr = document.querySelector('div.lien p.fr a');
const infosLienEng = document.querySelector('div.lien p.eng a');


let redimensionnement = 4;
let hauteurCarte = 10200 / redimensionnement;
let largeurCarte = 6600 / redimensionnement;

let newScrollLeft;
let newScrollTop;
let width;
let height;
let newWidth;
let newHeight;
let longueur;
let largeur;
let newLongueur;
let newLargeur;
const scaleAmount = 0.5;
let carteScale = 1;
let containerScale;

let dataG = {};

function init() {
    console.log('Hello World!');
    resize();
    originalData();
    //console.log(dataG);
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
    for (let i = 0; i < valeursP.length - 1; i++) {
        valeursP[i + 1].textContent = Math.floor(valeursTab[i] / carteScale);
    }
}

function zoom(event) {
    let scaleDelta;

    if (event.deltaY < 0) {
        // Zoom in
        scaleDelta = scaleAmount;
    } else {
        // Zoom out
        scaleDelta = -scaleAmount;
    }

    // Calculate new scale
    const newScale = Math.max(Math.min((carteScale + scaleDelta), 10), 1);

    // Get mouse position relative to the carte
    const rect = carte.getBoundingClientRect();

    carte.style.transform = `scale(${newScale})`;


    width = largeurCarte * containerScale * carteScale;
    height = hauteurCarte * containerScale * carteScale;
    newWidth = largeurCarte * containerScale * newScale;
    newHeight = hauteurCarte * containerScale * newScale;
    longueur = event.clientX + Math.abs(rect.left);
    largeur = event.clientY + Math.abs(rect.top);
    newLongueur = (longueur / width) * newWidth;
    newLargeur = (largeur / height) * newHeight;

    newScrollLeft = (newLongueur - event.clientX) / containerScale;
    newScrollTop = (newLargeur - event.clientY) / containerScale;

    container.scrollLeft = newScrollLeft;
    container.scrollTop = newScrollTop;
    carteScale = newScale;

    echelleZoom();
}

function resize() { // Fonction qui permet de redimensionner un groupe de personnages en fonction de l'écran de l'utilisateur
    //console.log('resize');

    container.style.removeProperty('transform');
    containerUtils.style.removeProperty('transform');
    containerInfos.style.removeProperty('height');
    containerInfos.style.removeProperty('width');
    containerInfos.style.removeProperty('transform');
    max.style.removeProperty('display');

    const width = document.documentElement.clientWidth; // On récupère la largeur de l'écran de l'utilisateur
    const height = document.documentElement.clientHeight; // On récupère la hauteur de l'écran de l'utilisateur
    const ratio = (width / height) / (51 / 33); // Le ratio de notre image de fond (la salle du conseil) est de 16/9e

    // On stocke les ratios hauteurs & largeur par rapport à la taille actuelle de l'écran de l'utilisateur minorés de 2,5% pour les marges
    let widthRatio = (width / hauteurCarte);
    let heightRatio = (height / largeurCarte);

    /* On vérifie si l'écran est plus ou moins au bonnes dimensions (+/-20%) ou si il est beaucoup trop large ou beaucoup trop haut */
    /* On utilisera le ratio le plus réducteur */
    containerScale = widthRatio;
    if (ratio > 1) {
        containerScale = heightRatio;
    }

    const containerHauteur = container.offsetHeight * containerScale;
    const containerLargeur = container.offsetWidth * containerScale;
    const hauteurTemp = height - containerHauteur;
    const largeurTemp = width - containerLargeur;

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
    /* on place la box (#scene) au centre de l'écran puis on scale ses dimensions en fonctions des ratios précédemment calculés */
}

// DONNES
function originalData() {
    for (let g of ggs) {
        let rect = g.getBoundingClientRect();
        dataG[g.id] = {
            left: rect.left,
            top: rect.top,
            width: rect.width,
            height: rect.height
        };
    }
}

//LISTENERS
window.addEventListener('load', function () {
    init();
});

carte.addEventListener('wheel', (event) => {//ZOOM
    event.preventDefault();
    zoom(event);
});

//REDIMENSIONNEMENT DE LA CARTE ET DE LA ZONE DES INFOS
window.addEventListener('resize', debounce(resize, 300));

ggs.forEach((g) => {//INFOS SUR (mouseover) & ZOOM CIBLE "click"
    g.addEventListener('mouseover', () => {
        infos(g);
    });
    g.addEventListener('click', function (event) {
        event.stopPropagation();
        console.log(g.id);

        // Données initiales
        let initData = dataG[g.id];
        console.log(initData);

        const box = carte.getBoundingClientRect();

        const xRatio = initData.width / (box.width / carteScale);
        const yRatio = initData.height / (box.height / carteScale);
        console.log(xRatio);

        let ratio = yRatio;
        if (xRatio > yRatio) {
            ratio = xRatio;
        }


        // Calculer le nouveau niveau de zoom
        let newScale = 1 / ratio * .94;
        console.log(newScale);

        // Appliquer le nouveau zoom
        carte.style.transform = "scale(" + newScale + ")";

        window.getComputedStyle(carte).transform;
        const xBox = container.getBoundingClientRect();
        const newObj = g.getBoundingClientRect();

        // Mise à jour de carteScale
        carteScale *= newScale;

        // Nouvelles valeurs de positionnement de l'objet :
        let newTop = (newObj.top - xBox.top) / xBox.height
        let newLeft = (newObj.left - xBox.left) / xBox.width;

        // Positionner le conteneur après le zoom
        container.scrollTop = (newTop * container.offsetHeight);
        container.scrollLeft = (newLeft * container.offsetWidth);
    });
    /*
    g.addEventListener('click', function (event) {
        event.stopPropagation();
        console.log(g.id);

    });
    */
});

max.addEventListener('click', () => {//OUVERTURE DU MENU INFOS (Uniquement si la carte est en plein écran)
    resize();
    main.classList.toggle('max');
});

valbalafre.addEventListener('click', () => {//PARTIE PERSONNAGE (jdr)
    window.location.href = "http://localhost/jdr/localite/valbalafre";
});