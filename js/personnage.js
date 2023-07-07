console.log('personnage.js');

const EDITIN = document.querySelector('#modifier');
const EDITOUT = document.querySelector('#edition');
const IMAGE = document.querySelector('#imageConseil');
const FORM = document.querySelector('form');
const TEXTAREA = document.querySelector('textarea');

let editActive = false; // Booléen qui permet de vérifier si l'utilisateur est en train d'éditer une description ou non. Fonction: edition()
let fullscreenActive = false; // Booléen qui permet de vérifier si le personnage est en plein écran ou non. Fonction:  fullscreenCharacter()

function edition() { // Fonction qui permet de modifier le style de la page lors de l'édition
    console.log(FORM);
    const textArea = document.getElementById('inputText');
    const edit = document.getElementById('edition');
    const logo = document.getElementById('sceneProfil');
    const val = document.getElementById('validation');
    const nav1 = document.getElementsByTagName('nav')[0];
    const nav2 = document.getElementsByTagName('nav')[1];

    editActive = !editActive;

    if (editActive) {
        edit.textContent = "Annuler";
        edit.style.backgroundColor = "rgba(175, 0, 0, 0.25)";
        edit.style.visibility = "visible";
        FORM.style.clipPath = "inset(0 0 0 0)";
        logo.style.filter = "grayscale(1.25) blur(1px)";
        val.style.opacity = "1";
        nav1.style.transform = "rotateX(180deg)";
        nav2.style.transform = "rotateX(0deg)"

    } else {
        edit.textContent = "Editer";
        edit.style.backgroundColor = "rgba(0, 128, 0, 0.25)";
        edit.style.visibility = "hidden";
        logo.style.clipPath = "inset(0 0 0 0)";
        FORM.style.clipPath = "inset(50% 50% 50% 50%)";
        logo.style.filter = "none";
        val.style.opacity = "0";
        nav2.style.transform = "rotateX(180deg)";
        nav1.style.transform = "rotateX(0deg)"
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

    const perso = document.getElementById('imageConseil');
    const chateau = document.getElementById('bgConseil');

    fullscreenActive = !fullscreenActive;

    if (fullscreenActive) {
        perso.style.height = "100%";
        perso.style.width = "100%";
        perso.style.setProperty('top', '0', 'important');
        perso.style.setProperty('left', '0', 'important');
        chateau.style.opacity = "1";
        chateau.style.filter = "brightness(1.5) contrast(.5) blur(2px)";
        chateau.style.backgroundSize = "cover";
    } else {
        perso.style.top = "38%";
        perso.style.left = "40%";
        perso.style.height = "60%";
        perso.style.width = "50%";
        chateau.style.opacity = "1";
        chateau.style.filter = "brightness(1)";
        chateau.style.backgroundSize = "cover";
    }
}

//LISTENERS 
TEXTAREA.addEventListener('click', function (event) {
    event.stopPropagation();
});
EDITIN.addEventListener('click', edition);
EDITOUT.addEventListener('click', edition);
FORM.addEventListener('click', edition);
IMAGE.addEventListener('click', fullscreenCharacter);
