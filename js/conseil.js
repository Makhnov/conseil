console.log('conseil.js');
//console.log(typeof resize);

const scene = document.getElementById("scene");
const box = document.getElementById('salleDuConseil');
const body = document.getElementsByTagName('body')[0];

function resizeEmplacement() { // Fonction qui permet de redimensionner un groupe de personnages en fonction de l'écran de l'utilisateur
    console.log('resize');
    let width = document.documentElement.clientWidth; // On récupère la largeur de l'écran de l'utilisateur
    let height = document.documentElement.clientHeight; // On récupère la hauteur de l'écran de l'utilisateur
    let ratio = (width / height) / (16 / 9); // Le ratio de notre image de fond (la salle du conseil) est de 16/9e

    // On stocke les ratios hauteurs & largeur par rapport à la taille actuelle de l'écran de l'utilisateur minorés de 2,5% pour les marges
    let widthRatio = (width / 1600) * 0.975;
    let heightRatio = (height / 900) * 0.975;

    /* On vérifie si l'écran est plus ou moins au bonnes dimensions (+/-20%) ou si il est beaucoup trop large ou beaucoup trop haut */
    /* On utilisera le ratio le plus réducteur */
    if (ratio > 1.2) {
        widthRatio = heightRatio;
    } else if (ratio < 0.8) {
        heightRatio = widthRatio;
    }

    /* on place la box (#scene) au centre de l'écran puis on scale ses dimensions en fonctions des ratios précédemment calculés */
    box.style.transform = "translate(-50%, -50%) scale(" + widthRatio + ", " + heightRatio + ")";
}

window.addEventListener('resize', debounce(resizeEmplacement, 300));

resizeEmplacement();

/* REQCONSEIL
function reqConseil(bool) {
    // Créer un objet XMLHttpRequest
    const requete = new XMLHttpRequest();
    console.log(bool);

    // Définir la fonction de rappel à appeler lorsque la réponse est reçue
    requete.onload = function () {
        // Si la requête est réussie (code 200)
        if (requete.status === 200) {
            // Analyser les données JSON renvoyées
            const data = JSON.parse(requete.responseText);
            console.log(data);
            console.log(data.length);
            // Créer des tableaux associatifs pour les personnages et les positions
            let salleDuConseil = document.getElementById("salleDuConseil");
            let personnages = {};
            let positions = {};

            // Parcourir les données renvoyées
            for (let i = 0; i < data.length; i++) {
                const row = data[i];

                // Ajouter les données du personnage dans le tableau associatif
                personnages[row.id] = {
                    nom: row.nom,
                    titre: row.titre,
                    role: row.role,
                    description: row.description,
                    position_id: row.position_id
                };


                // Ajouter les données de position dans le tableau associatif
                let positionData = row.position;
                if (positionData !== null) {
                    positions[positionData.id] = {
                        top: positionData.top,
                        left: positionData.left,
                        height: positionData.height,
                        width: positionData.width,
                        scaling: positionData.scaling,
                        zIndex: positionData.zIndex,
                        image: positionData.image
                    };
                }
            }

            if (bool) {
                // Créer le DOM dynamique en utilisant les données des tableaux associatifs
                for (let id in personnages) {
                    let personnage = personnages[id];
                    //console.log(personnage);
                    let position = positions[personnage.position_id];
                    //console.log(position);

                    let div = document.createElement('div');
                    div.id = toClass(personnage.nom);
                    div.classList.add('personnage', toClass(personnage.nom));

                    // Appliquer les styles CSS à la div
                    div.style.top = position.top + '%';
                    div.style.left = position.left + '%';
                    div.style.height = 'calc(' + position.height * 80 + 'px)';
                    div.style.width = 'calc(' + position.width * 50 + 'px)';
                    div.style.backgroundImage = position.image;
                    div.style.zIndex = position.zIndex;

                    // Appliquer les styles CSS au survol de la souris
                    div.addEventListener("mouseover", function () {
                        const imgHover = position.image.replace("Min.png", "2.png");
                        div.style.backgroundImage = imgHover;
                        div.style.transform = "scale(" + position.scaling + ")";
                        //console.log(div.style.transform);
                        div.style.filter = "brightness(1.2)";
                    });

                    // Appliquer les styles CSS lorsque la souris quitte
                    div.addEventListener("mouseleave", function () {
                        div.style.backgroundImage = position.image;
                        div.style.transform = "scale(1)";
                        div.style.filter = "brightness(1)";
                    });

                    let link = document.createElement('a');
                    link.href = "perso.html?id=" + id;

                    // Ajout du lien à la div
                    div.appendChild(link);
                    // Ajouter de la div dans la salle du conseil
                    salleDuConseil.appendChild(div);
                }
            } else {
                const id = getQueryParam("id");
                console.log(id);
                const personnage = personnages[id];
                const position = positions[personnage.position_id];

                // Récupérer les éléments HTML à modifier
                const h1 = document.querySelector("#sceneProfil h1");
                const h2 = document.querySelector("#localiteFonctions h2");
                const h3 = document.querySelector("#localiteFonctions h3");
                const p = document.querySelector("#sceneProfil p");
                const imageConseil = document.querySelector("#imageConseil");

                // Remplir les éléments HTML avec les données du personnage
                h1.textContent = personnage.nom;
                console.log(personnage.nom);
                h2.textContent = "Titre : " + personnage.titre;
                h3.textContent = "Rôle : " + personnage.role;
                p.textContent = personnage.description;
                imageConseil.style.backgroundImage = position.image;
            }

        } else {
            console.log('La requête a échoué: ' + requete.status);
        }
    };
    // Configuration de la requête avec la méthode HTTP GET et l'URL du fichier PHP
    requete.open('GET', './mvc/controller/controller.php', true);
    // Envoie de la requête
    requete.send();
}
*/

/* GETCONSEIL
function getConseil() { //Fonction qui récupère les données de la BDD au chargement de la page
    console.log('getConseil');
    if (resizePage) {
        resizeConseil();
        reqConseil(true);
    } else {
        reqConseil(false);
    }
}
*/

/* */