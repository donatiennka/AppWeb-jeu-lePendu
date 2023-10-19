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
 * @param {string} chaine : La longueur du mot proposé
 */
function afficherNbLettres(chaine) {
    let zoneNbLettres = document.querySelector(".nombreDeLettre span")
    zoneNbLettres.innerText = chaine
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
 * @param {string} chaineInfo : pour mettre à jour les information de la partie
 */
function afficherInfos(chaineInfo) {
    let zoneInfos = document.querySelector(".info span")
    zoneInfos.innerText = chaineInfo
}

/**
 * Cette fonction affiche les informations au cours du jeu, 
 * dans la zone "zoneInfos"
 * @param {string} text : pour mettre à jour les coups restants à jouer
 */
function afficherCoupRestant(text) {
    let zoneTentative = document.querySelector(".tentative span")
    zoneTentative.innerText = text
}

/**
 * Cette fonction remplace le mot à déviner par une chaine de "*" de même 
 * longueur que le mot proposé
 * @param {number}nbLettres : la longueur du mot proposé
 */
function masquerLeMot(nbLettres) {
    let masqueMot = ""
    for (i = 0; i < nbLettres; i++){
        masqueMot += "#"
    }
    return masqueMot
}

/**
 * Cette fonction prend la saisie du joueur en paramètre et valide qu'il est au bon format. 
 * @param {string} laSaisie : ce que le joueur à saisi. S'agit-il effectivement d'un lettre
 * de l'alphabet ?
 * @throws {Error}
 */
function validerLaSaisie(laSaisie) {
    let laSaisieRegExp = new RegExp("[a-zA-Z]")
    if (!laSaisieRegExp.test(laSaisie)) {
        throw new Error("Le caractère saisi n'est pas admissible.")
    }  
}

/**
 * Cette fonction affiche le message d'erreur passé en paramètre. 
 * dans la zone d'information.
 * @param {string} message 
 */
function afficherMessageErreur(message) {
    
    let spanErreurMessage = document.getElementById("erreurMessage")

    if (!spanErreurMessage) {
        let popup = document.querySelector(".popup")
        spanErreurMessage = document.createElement("span")
        spanErreurMessage.id = "erreurMessage"
        
        popup.append(spanErreurMessage)
    }
    
    spanErreurMessage.innerText = message
}

/**
 * Cette fonction choisi un mot à proposer dans la liste des mots 
 * à partir d'un nombre généré au hassard   
 */
function genererLeMotPropose() {
    // On génére le nombre aléatoire
    let i = getRandomInt(0, listeMots.length)
    // On extrait le mot à proposé de la liste des mots
    // de façon aléatoire grâce à la méthode getRandomInt
    let motADeviner = listeMots[i]
    // On affiche le mot proposé mais en le masquant
    motTrouver = masquerLeMot(motADeviner.length)
    afficherProposition(motTrouver)
    // On affiche la longueur du mot proposé
    afficherNbLettres("...mot de "+motADeviner.length+" lettres")
    //On retoune la liste des valeurs générées
    const valeurs = [i, motADeviner, motTrouver]
    return valeurs
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
    let gains = 0
    let i = 0
    let motADeviner = ""
    let nbMotsProposes = 0
    let coupRestant = nbCoups
    let motTrouver = ""
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
    // On désactive le champs de saisie pour empêcher toute saisie 
    // avant d'avoir lancez le jeu
    inputEcriture.disabled = true
   
    // Gestion de l'événement click sur le bouton "Lancez le jeu"
    btnDebuterJeu.addEventListener("click", () => {
        // Réinitialisation de certaines variables
        score = 0
        gains = 0
        nbMotsProposes = 0
        // On affiche le score et les gains rénitialisés
        afficherScore(score, nbMotsProposes)
        afficherGains(gains)
        // On appelle la fonction qui génére le mot à proposer 
        let valeurs = genererLeMotPropose()
        // On extrait les valeurs retournées
        i = valeurs[0]
        motADeviner = valeurs[1]
        motTrouver = valeurs[2]
        // On affiche le message qui informe sur le début de la partie
        afficherInfos("C'est partie !")
        // On désactive le bouton "Lancer le jeu"
        btnDebuterJeu.disabled = true
        // On active le champs de saisie
        inputEcriture.disabled = false
        // On met à jour le nombre de mot proposé
        nbMotsProposes ++
        // On active les boutons radios
        for (let indexBtnRadio = 0; indexBtnRadio < listeBtnRadio.length; indexBtnRadio++) {
            listeBtnRadio[indexBtnRadio].disabled = false
        }
        // On coche le bouton radio "sans indice" par défaut
        listeBtnRadio[0].checked = true
        // On active le bouton validé
        btnValiderLettre.disabled = false
        console.log("motTrouver : "+motTrouver +" motADeviner : "+motADeviner)        
    })
    
    // Gestion de l'événement click sur le bouton "valider"
    btnValiderLettre.addEventListener("click", () => {
        // On converti la chaîne de caratère en tableau
        let myTab = motTrouver.split("")
        // On récupère la lettre tapez qu'on met systématique en majuscule
        let inputLettre = inputEcriture.value.toUpperCase()
        // On vide le champs de saisie
        inputEcriture.value = ""           
        // On test si la lettre saisie fait partir des lettres du mot proposé
        // Si oui on démasque les lettres correspondantes
        if (motADeviner.includes(inputLettre)) {
            // Mise à jour du message d'information
            infoContinue = "Bien joué !"
            // On parcours le mot à déviner pour recupérer la position des lettres
            // à remplacer
            for (let x = 0; x < motADeviner.length; x++) {
                if (inputLettre === motADeviner[x]) {
                    // On remplace la lettre masquée
                    myTab[x] = inputLettre 
                }
            }  
        
        } else {
            // On diminue les coups restant d'une unité
            coupRestant --
            // Mise à jour du message d'information
            infoContinue = "Oups, mauvaise pioche."  
        }
        
        // On affiche le mot qu'il soit partiellemnt ou totalement chiffré 
        motTrouver = myTab.join("")
        afficherProposition(motTrouver)
        // On test si le joueur à trouver le mot ou si il n'a plus de coups à jouer.
        if (motTrouver === motADeviner || coupRestant === 0) {
            // On désactive le bouton valider
            btnValiderLettre.disabled = true
            // On désactive le champs de saisie pour empêcher toute nouvelle saisie
            inputEcriture.disabled = true
            // Est-ce que c'est le mot qui à été trouvé ?
            if (motTrouver === motADeviner) {
                // Bingo ! on met à jour le score
                score ++
                // On met à jour les gains
                gains += coupRestant
                afficherProposition("BRAVOOO VOUS AVEZ GAGNE !!!")
            } else {
                afficherProposition("OUPS VOUS AVEZ PERDU !!!")
            }
            infoContinue = "<< Clickez sur Mot Suivant pour continuer ou Quittez le jeu. >>"
            afficherCoupRestant("")
            afficherNbLettres("Le mot à trouver était : "+motADeviner)
            afficherIndiceMot("")
            afficherInfos(infoContinue)
            afficherScore(score, nbMotsProposes)
            afficherGains(gains)
            // On active les boutons Mot Suivant et Quittez le jeu
            //btnDebuterJeu.disabled = false 
            btnMotSuivant.disabled = false
            btnArreterJeu.disabled = false 
            // On réinitialise certaines variables              
            coupRestant = nbCoups
        } else {
            // On affiche l'information à l'issue du traitement
            afficherInfos(infoContinue)
            // On affiche les tentatives restantes
            afficherCoupRestant("encore : "+coupRestant+" coups")    
        }

    })

    // Gestion de l'événement click sur le bouton "Mot Suivant"
    btnMotSuivant.addEventListener("click", () => {
        // On appelle la fonction qui génére le mot à proposer 
        let valeurs = genererLeMotPropose()
        // On extrait les valeurs retournées
        i = valeurs[0]
        motADeviner = valeurs[1]
        motTrouver = valeurs[2]
        // On affiche le message qui informe sur le début de la partie
        afficherInfos("Un autre mot à déviner !")
        // On désactive le bouton "Mot Suivant" et "Quittez le jeu"
        btnMotSuivant.disabled = true
        btnArreterJeu.disabled = true
        // On active le champs de saisie
        inputEcriture.disabled = false
        // On met à jour le nombre de mot proposé
        nbMotsProposes ++
        // On active le bouton validé
        btnValiderLettre.disabled = false
        // On active les boutons radios
        for (let indexBtnRadio = 0; indexBtnRadio < listeBtnRadio.length; indexBtnRadio++) {
            listeBtnRadio[indexBtnRadio].disabled = false
        }
        // On coche le bouton radio "sans indice" par défaut
        listeBtnRadio[0].checked = true
        console.log("motTrouver : "+motTrouver +" motADeviner : "+motADeviner) 
    })

    // Gestion de l'événement click sur le bouton "Quittez le jeu"
    btnArreterJeu.addEventListener("click", () => {
        // On affiche le message d'au revoir
        afficherProposition("AU REVOIR ET A BIENTÔT !")
        // On efface la zone des indices
        afficherNbLettres("")
        afficherIndiceMot("")
        // On désactive le bouton "Mot Suivant" et "Quittez le jeu"
        btnMotSuivant.disabled = true
        btnArreterJeu.disabled = true
        // On active le bonton "lancez le jeu"
        btnDebuterJeu.disabled = false
        // On met à jour la zone d'information
        afficherInfos("Vous avez gagné : " +gains+ " points, avec un score de : " +score+"/" +nbMotsProposes)
     })

    // Gestion de l'événement change sur les boutons radios. 
    for (let index = 0; index < listeBtnRadio.length; index++) {
        listeBtnRadio[index].addEventListener("change", (event) => {
            let indice = ""
            // Si c'est le premier élément qui a été modifié, alors nous voulons
            // jouer sans les indices. 
            if (event.target.value === "1") {
                indice = "N/A"
            } else {
                // Sinon nous voulons jouer ce mot avec l'indice
                indice = listeDesIndices[i]
            }
            // Et on affiche l'indice. 
            afficherIndiceMot("Indice : "+indice)
            // On désactive les boutons radios
            for (let indexBtnRadio = 0; indexBtnRadio < listeBtnRadio.length; indexBtnRadio++) {
                listeBtnRadio[indexBtnRadio].disabled = true
            }
        })
    }

}
    
// On lance le jeu
lancerJeu()
