/*********************************************************************************
 * 
 * Ce fichier contient toutes les fonctions nécessaires au fonctionnement du jeu. 
 * 
 *********************************************************************************/
/**
 * Cette fonction affiche dans la partie dédiée le score du joueur
 * @param {number} score : le score du joueur
 * @param {number} nbMotsProposes : le nombre de mots proposés au joueur
 */
function afficherScore(score, nbMotsProposes) {
    // Récupération de la zone dans laquelle on va écrire le score
    let spanScore = document.querySelector(".zoneScore span")
    // Ecriture du texte
    let affichageScore = `${score} / ${nbMotsProposes}` 
    // On place le texte à l'intérieur du span. 
    spanScore.innerText = affichageScore
}

/**
 * Cette fonction affiche dans la partie dédiée les gains du joueur
 * @param {number} gains : les gains de la partie libéllés en unité (U)
 */
function afficherGains(gains) {
    // Récupération de la zone dans laquelle on va écrire le score
    let spanGains = document.querySelector(".zoneGains span")
    // Ecriture du texte
    let affichageGains = `${gains}U` 
    // On place le texte à l'intérieur du span. 
    spanGains.innerText = affichageGains
}

/**
 * Cette fonction génére un numéro aléatoire qui servira pour choisir le mot
 * à proposer au joueur.
 * @param {number} min : ici c'est 0 le premier indice d'un tableau
 * @param {number} max : ici c'est la longueur de la liste des mots
 * le maximum est exclu et le minimum est inclu (de 0 à max - 1)
 */
function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
}

/**
 * Cette fonction affiche une proposition, que le joueur devra déviner, 
 * dans la zone "zoneProposition"
 * @param {string} proposition : la proposition à afficher
 */
function afficherProposition(proposition) {
    let zoneProposition = document.querySelector(".zoneProposition")
    zoneProposition.innerText = proposition
}

/**
 * Cette fonction renvoie la longueur du mot proposé 
 * @param {number} indice : le numéro d'indice du mot
 */
function longueurMot (indice) {
    return listeMots[indice].length
}

/**
 * Cette fonction affiche le nombre de lettres du mot proposé, 
 * dans la zone "nombreDeLettre"
 * @param {number} nbLettres : La longueur du mot proposé
 */
function afficherNbLettres(nbLettres) {
    let zoneNbLettres = document.querySelector(".nombreDeLettre span")
    zoneNbLettres.innerText = nbLettres
}

/**
 * Cette fonction affiche un indice, pour aider le joueur qui le souhaite, 
 * dans la zone "zoneDesIndices"
 * @param {string} indiceMot : pour mettre le joueur su r la piste
 */
function afficherIndiceMot(indiceMot) {
    let zoneIndiceMot = document.querySelector(".indice span")
    zoneIndiceMot.innerText = indiceMot
}

/**
 * Cette fonction remplace le mot à déviner par une chaine de "*" de même 
 * longueur que le mot proposé
 * @param {number}nbLettres : la longueur du mot proposé
 */
function masquerLeMot(nbLettres) {
    let masqueMot = ""
    for (i = 0; i < nbLettres; i++){
        masqueMot += "*"
    }
    return masqueMot
}

