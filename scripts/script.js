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
 * @param {number} gains : les gains de la partie
 */
function afficherGains(gains) {
    // Récupération de la zone dans laquelle on va écrire le score
    let spanGains = document.querySelector(".zoneGains span")
    // Ecriture du texte
    let affichageGains = `${gains}U` 
    // On place le texte à l'intérieur du span. 
    spanGains.innerText = affichageGains
}

afficherScore(5, 10)
afficherGains(7)
console.log("La liste des mots a : " +listeMots.length + " élements") 
console.log("La liste des indices a : " +listeDesIndices.length + " élements")