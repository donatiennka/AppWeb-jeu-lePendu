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
 * Cette fonction affiche les informations au cours du jeu, 
 * dans la zone "zoneInfos"
 * @param {string} info : pour mettre à jour les information de la partie
 */
function afficherInfos(info) {
    let zoneInfos = document.querySelector(".zoneInfos .info")
    zoneInfos.innerText = info
}

/**
 * Cette fonction remplace le mot à déviner par une chaine de "*" de même 
 * longueur que le mot proposé
 * @param {number}nbLettres : la longueur du mot proposé
 */
function masquerLeMot(nbLettres) {
    let masqueMot = ""
    for (i = 0; i < nbLettres; i++){
        masqueMot += "@"
    }
    return masqueMot
}

/**
 * Cette fonction permet de savoir si la lettre entrée appartient ou non 
 * au mot proposé si c'est le cas, cette lettre remplacera l'étoile correspondant
 * dans le mot à découvrir 
 * @param {string}lettre : la lettre entrée
 * @param {string}mot : le mot proposé
 * @param {string}motCacher : le mot masqué par les '*'
 */
function RemplacerSiLettreDansMot(lettre, mot, motCacher) {
    motCacher = motCacher.split("")
    let infoTraitement = ""
    for (i = 0; i < mot.length; i++){
        if (lettre === mot[i]) {
            motCacher[i] = lettre
            infoTraitement = "Bien joué !"
        } else {
            infoTraitement = "... non cette lettre ne figure pas dans le mot."
        } 
    }
    motCacher = motCacher.join("")
    return motCacher, infoTraitement
}

/**
 * Cette fonction lance le jeu. 
 * Dès que le joueur clique sur "Lancez le jeu" la boucle de jeu se lance 
 * et s'arrêtera lorsque celui-ci cliquera sur "Quittez le jeu"
 */
function lancerJeu() {
    // Initialisations
    //initAddEventListenerPopup()
    let score = 0
    let motADeviner = ""
    let nbMotsProposes = 0
    let i = 0
    let coupRestant = nbCoups
    let nbLettres = 0
    let motChiffrer = ""
    let infoContinue = ""

    let btnValiderLettre = document.getElementById("btnValiderLettre")
    let listeBtnRadio = document.querySelectorAll(".optionSource input")
    let inputEcriture = document.getElementById("inputEcriture")

    let btnDebuterJeu = document.getElementById("btnDebuterJeu")
    let btnMotSuivant = document.getElementById("btnMotSuivant")
    let btnArreterJeu = document.getElementById("btnArreterJeu")

    // On désactive tous les boutons qui doivent l'être au départ
    btnValiderLettre.disabled = true
    btnMotSuivant.disabled = true
    btnArreterJeu.disabled = true

    //afficherProposition(listeProposition[i])
    
    // Gestion de l'événement click sur le bouton "Lancez le jeu"
    btnDebuterJeu.addEventListener("click", () => {
        // On génére i pour afficher le premier mot de la partie
        i = getRandomInt(0, listeMots.length)
        // On extrait le mot à proposé de la liste des mots
        motADeviner = listeMots[i]
        // On mesure la longueur du mot
        nbLettres = longueurMot(i)
        // On affiche le mot proposé mais en le masquant
        motChiffrer = masquerLeMot(nbLettres)
        afficherProposition(motChiffrer)
        // On affiche la longueur du mot proposé
        afficherNbLettres(nbLettres)
        // On désactive le bouton "Lancer le jeu"
        btnDebuterJeu.disabled = true
        // On affiche le message qui informe sur le début de la partie
        afficherInfos("C'est partie !")
        // On incrémente le nombre de mot proposé
        nbMotsProposes ++
        // On active le bouton validé
        btnValiderLettre.disabled = false

        
        // Gestion de l'événement click sur le bouton "valider"
        btnValiderLettre.addEventListener("click", () => {
            // On converti la chaîne de caratère en tableau
            let myTab = motChiffrer.split("")
            // On récupère la lettre tapez
            let inputLettre = inputEcriture.value
            // On la met en majuscule
            inputLettre = inputLettre.toUpperCase()
            for (let x = 0; x < nbLettres; x++){
                if (inputLettre === motADeviner[x]) {
                    myTab[x] = inputLettre
                    // On met à jour la zone d'information
                    infoContinue
                }
            }
            
            })
    })
   

    // Gestion de l'événement click sur le bouton "valider"
   /* btnValiderLettre.addEventListener("click", () => {
        if (inputEcriture.value === listeProposition[i]) {
            score++
        }
        console.log(inputEcriture.value)
        i++
        afficherResultat(score, i)
        inputEcriture.value = ''
        if (listeProposition[i] === undefined) {
            afficherProposition("Le jeu est fini")
            // On désactive le bouton valider
            btnValiderMot.disabled = true
            // On désactive les boutons radios
            for (let indexBtnRadio = 0; indexBtnRadio < listeBtnRadio.length; indexBtnRadio++) {
                listeBtnRadio[indexBtnRadio].disabled = true
            }

        } else {
            afficherProposition(listeProposition[i])
        }
    })

    // Gestion de l'événement change sur les boutons radios. 
    
    for (let index = 0; index < listeBtnRadio.length; index++) {
        listeBtnRadio[index].addEventListener("change", (event) => {
            // Si c'est le premier élément qui a été modifié, alors nous voulons
            // jouer avec la listeMots. 
            if (event.target.value === "1") {
                listeProposition = listeMots
            } else {
                // Sinon nous voulons jouer avec la liste des phrases
                listeProposition = listePhrases
            }
            // Et on modifie l'affichage en direct. 
            afficherProposition(listeProposition[i])
        })
    }

    // Gestion de l'événement submit sur le formulaire de partage. 
    let form = document.querySelector("form")
    form.addEventListener("submit", (event) => {
        event.preventDefault()
        let scoreEmail = `${score} / ${i}`
        gererFormulaire(scoreEmail)
    })

    afficherResultat(score, i)*/
}

/* 
afficherScore(5, 10)
afficherGains(7)
console.log("La liste des mots a : " +listeMots.length + " élements") 
console.log("La liste des indices a : " +listeDesIndices.length + " élements")

let nombreEntier = getRandomInt(0, listeMots.length)
console.log("le nombre aléatoire entier est : " +nombreEntier)
afficherProposition(listeMots[nombreEntier])
let nbLettres = longueurMot(nombreEntier)
afficherNbLettres(nbLettres)
afficherIndiceMot(listeDesIndices[nombreEntier])

console.log(masquerLeMot(nbLettres))

let test = "ihjPTUao"
test = test.toUpperCase()
console.log(test)

let myString = "BANANE"
let tabString = myString.split("")
console.log(tabString)
let newString = tabString.join("")
console.log(newString)*/

lancerJeu()

const monTab = ["a", "e", "d", "m"]
const trouver = []
let maLetr = "d"
if (monTab.includes(maLetr)){
    console.log("Vrai")
    trouver.push(maLetr)
    
} else {
    console.log("Faux")
}
console.log(trouver)
