console.log('main.js');
let space = " ";
let br = "\n";

window.toClass = function (str) { // Remplace une chaine de caractère par une chaine équivalente utilisable en tant que classe css
    // Enlever les accents et convertir en minuscules
    const cleanStr = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    // Enlever les caractères non-alphanumériques et remplacer les espaces par des tirets
    return cleanStr.replace(/[^a-z0-9]+/g, "-");
}

window.getQueryParam = function (name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

window.getBaseUrl = function () {
    const currentURL = window.location.href;
    const pathArray = currentURL.split('/');
    const protocol = pathArray[0];
    const host = pathArray[2];
    return protocol + '//' + host;
}

window.getSlash = function (url) {
    const slashes = url.match(/\//g);
    return slashes ? slashes.length : 0;
}

//DEBOUNCE
window.debounce = function (func, delay) {//FONCTION POUR DELAI
    let timer;
    return function () {
        const context = this;
        const args = arguments;
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(context, args), delay);
    };
};

/* SYNTAXE */
window.dataToTxt = function (str) {
    const mots = str.split('_');
    const liaisons = ['le', 'la', 'les', 'the', 'of', 'and', 'in']; // Mots de liaison en français et en anglais

    const string = mots.map((word) => {
        if (liaisons.includes(word.toLowerCase())) {
            return word.toLowerCase();
        } else {
            return word.charAt(0).toUpperCase() + word.slice(1); // Met la première lettre des autres mots en majuscule
        }
    });

    return string.join(' ');
}

window.sansPrefixe = function (str) {
    const prefixes = ["The_", "Le_", "La_", "Les_"];

    for (const prefix of prefixes) {
        if (str.startsWith(prefix)) {
            return str.slice(prefix.length);
        }
    }
    return str;
}