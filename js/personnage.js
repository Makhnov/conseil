console.log('personnage.js');

let personnage = new Personnage(
    window.personnage.id,
    window.personnage.nom,
    window.personnage.slug,
    window.personnage.titre,
    window.personnage.role,
    window.personnage.description,
    window.personnage.id_localite,
    window.personnage.id_emplacement
);

let position = new Position(
    window.position.id,
    window.position.top,
    window.position.left,
    window.position.height,
    window.position.width,
    window.position.scaling,
    window.position.zIndex,
    window.position.image,
    window.position.idLocalite,
    window.position.idPersonnage,
    window.position.idRegion,
    window.position.idEmplacement
);

console.log(personnage);
console.log(position);

const MODIF = document.querySelector('#modifier');
const SUBMIT = document.querySelector('#validation');
const CANCEL = document.querySelector('#annulation');
const IMAGE = document.querySelector('#imageConseil');
const FORM = document.querySelector('section.formulaire');
const TEXTAREA = document.querySelector('textarea');
const SCENE = document.querySelector('#sceneProfil');
const NAV1 = document.getElementsByTagName('nav')[0];
const NAV2 = document.getElementsByTagName('nav')[1];

const PERSO = document.getElementById('imageConseil');
const ARRIEREPLAN = document.getElementById('bgConseil');

let fullScreen = false; // Booléen qui permet de vérifier si le personnage est en plein écran ou non. Fonction:  fullscreenCharacter()

function edition(bool) {
    if (bool) {//Ouverture de la zone d'édition
        FORM.style.clipPath = "inset(0 0 0 0)";
        SCENE.style.filter = "grayscale(1.5) blur(1px)";
        NAV1.style.transform = "rotateX(180deg)";
        NAV2.style.transform = "rotateX(0deg)"

    } else {//Fermeture de la zone d'édition
        SCENE.style.clipPath = "inset(0 0 0 0)";
        FORM.style.clipPath = "inset(50% 50% 50% 50%)";
        SCENE.style.filter = "none";
        NAV2.style.transform = "rotateX(180deg)";
        NAV1.style.transform = "rotateX(0deg)"
    }
}

function validation() {  // Fonction qui permet de valider le formulaire (Methode GET) et lance index2.php
    const val = document.getElementById('validationPhp');
    let str = TEXTAREA.value;
    str = str.replace(/'/g, '’'); // Les ' interfèrent avec les commandes php, on utilise les expressions régulières (regex) les remplacer par des ’
    FORM.value = str;
    val.click();
}

function fullscreenCharacter() { // Fonction qui permet de lancer un zoom sur les personnages afin de les mettre en "plein écran"

    fullScreen = !fullScreen;

    if (fullScreen) {
        PERSO.style.height = "100%";
        PERSO.style.width = "100%";
        PERSO.style.setProperty('top', '0', 'important');
        PERSO.style.setProperty('left', '0', 'important');
        ARRIEREPLAN.style.filter = "brightness(1.5) contrast(.5) blur(2px)";
    } else {
        PERSO.style.height = "60%";
        PERSO.style.width = "50%";
        PERSO.style.top = "38%";
        PERSO.style.left = "40%";
        ARRIEREPLAN.style.filter = "brightness(1)";
    }
}

//LISTENERS 
TEXTAREA.addEventListener('click', function (event) {
    event.stopPropagation();
});

//OUVERTURE DE LA ZONE D'EDITION
MODIF.addEventListener('click', function () {
    edition(true);
});

//FERMETURE EDITION (CLICK SUR BOUTON)
CANCEL.addEventListener('click', function () {
    edition(false);
});

//FERMETURE EDITION (CLICK SUR ARRIERE-PLAN)
FORM.addEventListener('click', function () {
    edition(false);
});

//IMAGE EN PLEIN ECRAN 
IMAGE.addEventListener('click', fullscreenCharacter);
