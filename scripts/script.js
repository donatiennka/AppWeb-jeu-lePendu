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
/*function afficherInfos(proposition) {
    let zoneProposition = document.querySelector(".zoneInfos #synthe")
    zoneProposition.innerText = proposition
}*/

/**
 * Cette fonction affiche le nombre de lettres du mot proposé, 
 * dans la zone "nombreDeLettre"
 * @param {string} chaine : La longueur du mot proposé
 *//*
function afficherNbLettres(chaine) {
    let zoneNbLettres = document.querySelector(".nombreDeLettre span")
    zoneNbLettres.innerText = chaine
}*/

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
    let zoneInfos = document.querySelector(".infos span")
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
 * Cette fonction affiche un texte dans la zone table
 * @param {string} text : text
 */
function afficherTexte(text) {
    let zoneTabText = document.querySelector(".autresInfos span")
    zoneTabText.innerText = text
}

/**
 * Cette fonction supprime la table des lettres à jouer
 */
function supprimerTable() {
    let zoneTab = document.querySelector(".zoneSaisie span")
    zoneTab.innerHTML = ""
}

/**
 * Cette fonction supprime la table de résultat
 */
function supprimerTableResul() {
    let zoneTab = document.querySelector(".resultat span")
    zoneTab.innerHTML = ""
}

/**
 * Cette fonction remplace le mot à déviner par une chaine de "#" de même 
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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////// ICI ON GERE LES FONCTIONS POUR LE FORMULAIRE DE PARTAGE ///////////////////////////////////////////////////////////////////////////////////////
/**
 * Cette fonction construit et affiche l'email. 
 * @param {string} nom : le nom du joueur
 * @param {string} email : l'email de la personne avec qui il veut partager son score
 * @param {string} score : le score. 
 */
function afficherEmail(nom, email, score) {
    let mailto = `mailto:${email}?subject=Partage du score LePendu&body=Salut, je suis ${nom} et je viens de réaliser le score de ${score} sur le site du Jeu-LePendu !`
    location.href = mailto
}

/**
 * Cette fonction prend un nom en paramètre et valide qu'il est au bon format
 * ici : deux caractères au minimum
 * @param {string} nom 
 * @throws {Error}
 */
function validerNom(nom) {
    if (nom.length < 2) {
        throw new Error("Le nom est trop court. ")
    }
    
}

/**
 * Cette fonction prend un email en paramètre et valide qu'il est au bon format. 
 * @param {string} email 
 * @throws {Error}
 */
function validerEmail(email) {
    let emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+")
    if (!emailRegExp.test(email)) {
        throw new Error("L'email n'est pas valide.")
    }
    
}

/**
 * Cette fonction affiche le message d'erreur passé en paramètre. 
 * Si le span existe déjà, alors il est réutilisé pour ne pas multiplier
 * les messages d'erreurs. 
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
 * Cette fonction permet de récupérer les informations dans le formulaire
 * de la popup de partage et d'appeler l'affichage de l'email avec les bons paramètres.
 * @param {string} scoreEmail 
 */
function gererFormulaire(scoreEmail) {
    try {
        let baliseNom = document.getElementById("nom")
        let nom = baliseNom.value
        validerNom(nom)
    
        let baliseEmail = document.getElementById("email")
        let email = baliseEmail.value
        validerEmail(email)
        afficherMessageErreur("")
        afficherEmail(nom, email, scoreEmail)

    } catch(erreur) {
        afficherMessageErreur(erreur.message)
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

///////////////////////////////////////////////////////////////////////////////////////

/**
 * Cette fonction choisi un mot à proposer dans la liste des mots 
 * à partir d'un nombre généré au hassard   
 */
function genererLeMotPropose() {
    // On génére le nombre aléatoire
    let i = getRandomInt(0, listeMots.length)
    // On extrait le mot à proposé de la liste des mots
    // de façon aléatoire grâce à la méthode getRandomInt
    let motChoisi = listeMots[i]
    // On affiche le mot proposé mais en le masquant
    motTrouv = masquerLeMot(motChoisi.length)
    //generate_tablePropos(motTrouv)
    // On affiche la longueur du mot proposé
    //afficherNbLettres("...mot de "+motChoisi.length+" lettres")
    //On retoune la liste des valeurs générées
    const valeurs = [i, motChoisi, motTrouv]
    return valeurs
}

/**
 * L’idée derrière l’algorithme de Fisher-Yates est de marcher
 * vers le tableau dans l’ordre inverse et d’échanger chaque 
 * élément avec un élément aléatoire avant lui. 
 * Fisher-Yates est un algorithme simple mais très 
 * efficace et rapide.
 * @param {Array} arr : tableau à mélanger   
 */
function melangerTab(arr) {
    // fisherYatesShuffle
    for (let i = arr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));  // random index
      [arr[i], arr[j]] = [arr[j], arr[i]];          // swap
    }
  }

/**
 * Cette fonction une table de lettres à jouer 
 * @param {string} chaine : indice du mot à trouver 
 */
function tabLettresAJouer(chaine) {
    // On converti la chaîne de caratère en tableau
    const bonnesLettres = chaine.split("")
    // A chaque mot à proposer, on ajoute quatre lettres inutiles
    const lettresEnPlus = []
    for (let i = 0; i < 4; i++) {
        // On choisi un lettre aléatoirement
        let j = getRandomInt(0, alphabet.length)
        lettresEnPlus.push(alphabet[j])
    }
    // On fusione les deux tableaux (bonnes lettres + lettres inutiles)
    const lettresAJouer = bonnesLettres.concat(lettresEnPlus)
    console.log(lettresAJouer)
    // On fait appel au mélangeur de tableau
    melangerTab(lettresAJouer)

    return lettresAJouer
}

/**
 * Cette fonction crée un tableau avec lettres à jouer 
 * à partir du mot généré au hassard et quatre lettres 
 * suplémentaires choisi au hassard
 * @param {Array} tab : liste des lettres à jouer
 */
function generate_table(tab) {
    // get the reference for the body
    //let body = document.getElementsByTagName("body")[0];
    let zoneTab = document.querySelector(".zoneSaisie span");
    
    // On supprime d'abord ce qui est dans cette zone
    supprimerTable();
    // creates a <table> element and a <tbody> element
    let tbl = document.createElement("table");
    let tblBody = document.createElement("tbody");
  
    // creating all cells
    for (let i = 0; i < 1; i++) {
      // creates a table row
      let row = document.createElement("tr");
  
      for (let j = 0; j < tab.length; j++) {
        // Create a <td> element and a text node, make the text
        // node the contents of the <td>, and put the <td> at
        // the end of the table row
        let cell = document.createElement("td");
        let cellText = document.createTextNode(
         tab[j],
        );
        cell.appendChild(cellText);
        row.appendChild(cell);

        // On ajoute un gestionnaire d'événement pour chaque cellule
        // du tableau de lettres
        cell.addEventListener("click", (event) => {
            // On récupére les coordonnées de la cellule cliqué
            const ncol = event.target
            // On détermine l'id de la celle à partir de ses coordonnées
            const colId = ncol.cellIndex
            // On recupére le contenu de la cellule de l'index correspondant
            const choix = tbl.rows[0].cells[colId].innerText
            console.log(choix)
            validerLettre(choix)
        })
      }
  
      // add the row to the end of the table body
      tblBody.appendChild(row);
    }
  
    // put the <tbody> in the <table>
    tbl.appendChild(tblBody);
    // Ce gestionnaire sera exécuté à chaque fois que le curseur
    // se déplacera sur un autre élément de la liste
    tbl.addEventListener("mouseenter", (event) => {
        event.target.style.cursor = "pointer"
        event.target.style.background = "orange"

        // on réinitialise la couleur après quelques instants
        setTimeout(function() {
            event.target.style.background = ""
        }, 500)
    },
    false,
    )
    // On affiche le tableau des lettres à joueur dans la zone concernée
    zoneTab.appendChild(tbl);
    afficherTexte("Les lettres à jouer sont affichez ci-desous.")
  }

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
function generate_tablePropos(resulTab) {
    // get the reference for the body
    //let body = document.getElementsByTagName("body")[0];
    let zoneProposition = document.querySelector(".resultat span");
    
    // On supprime d'abord ce qui est dans cette zone
    supprimerTableResul();
    // creates a <table> element and a <tbody> element
    let tbl = document.createElement("table");
    let tblBody = document.createElement("tbody");
  
    // creating all cells
    for (let i = 0; i < 1; i++) {
      // creates a table row
      let row = document.createElement("tr");
  
      for (let j = 0; j < resulTab.length; j++) {
        // Create a <td> element and a text node, make the text
        // node the contents of the <td>, and put the <td> at
        // the end of the table row
        let cell = document.createElement("td");
        let cellText = document.createTextNode(
         resulTab[j],
        );
        cell.appendChild(cellText);
        row.appendChild(cell);
      }
  
      // add the row to the end of the table body
      tblBody.appendChild(row);
    }
    // put the <tbody> in the <table>
    tbl.appendChild(tblBody);
    // On affiche le tableau résultat
    zoneProposition.appendChild(tbl);
}

/**
 * Cette fonction en sorte que même en dessous de 10 on garde 
 * deux chiffres, en insérant un zéro à la gauche du chiffre restant
 * @param {number} nb : un nombre quelconque  
 */
function tjrs2Chiffres(nb) {
    return (nb < 10) ? "0" + nb : nb
}

/**
 * Cette fonction gére le singulier/pluriel 
 * en fonction d'une valeur numérique donné, il rajoute un 's' ou non
 * au libellé qui lui est fourni en paramètre 
 * @param {number} nb : un nombre à tester
 * @param {string} libelle : le texte à modifier le cas écheant  
 */
function singuPluriel(nb, libelle) {
    return (nb > 1) ? libelle+"s" : libelle
}

/**
 * Cette fonction réalise un compte à rebours à partir du nombre de seconde
 * qui lui ai passé en paramètre
 * @param {number} temps : le nombre de seconde fourni  
 */
function timeCounter(temps) {
    // On récupère la balise html correspondante
    const timerElement = document.getElementById("timer")
    
    if (!myTimerId) {
       myTimerId = setInterval( () => {
        // On separe le temps en heures, minutes en en secondes
        let heures = Math.floor(temps / 3600)                     
        let minutes = Math.floor((temps - (heures * 3600))/60)
        let secondes = parseInt(temps - (heures * 3600) - (minutes * 60))

        // On fait en sorte que même en dessous de 10 on garde deux chiffres
        // en insérant un zéro à la gauche du chiffre restant
        heures = tjrs2Chiffres(heures)
        minutes = tjrs2Chiffres(minutes)
        secondes = tjrs2Chiffres(secondes)
        
        // On raffraichi l'affichage du timer à chaque seconde
        timerElement.innerText = `${heures}:${minutes}:${secondes}`
        // On s'assure que le timer s'arrête dés qu'il atteint zéro
        temps = temps <= 0 ? 0 : temps + 1       
        }, 1000)  
    } 
} 

/**
 * Cette fonction permet d'arrêté le chronomètre 
 */
function stopTimer() {
    clearInterval(myTimerId)
    // On réinitilise notre letiable
    myTimerId = null
}


/**
 * Cette fonction gére l'évement click sur une lettre du tableau 
 */
function validerLettre(choix) {
    // On récupére les paramètres    
    let listeBtnRadio = document.querySelectorAll(".optionSource input")    
    // On lance le chronomètre si ce dernier n'est pas déjà lancé
    if (!myTimerId) {
        timeCounter(1)
    }

    // On converti la chaîne de caratère en tableau
    let myTab = motTrouver.split("")
    // On récupère la lettre tapez qu'on met systématique en majuscule
    //let inputLettre = inputEcriture.value.toUpperCase()
    // On vide le champs de saisie
    //inputEcriture.value = ""         
    // On test si la lettre saisie fait partir des lettres du mot proposé
    // Si oui on démasque les lettres correspondantes
    if (deja.includes(choix)){
        infoContinue = "Lettre déjà tapée, soyez vigilent 🤦‍♀️💤⁉️"
        afficherInfos("Dommage, vous perdez 2 coups 🤧😱🥶")
        coupRestant -= 2
    } else {
        afficherTexte("")
        if (motADeviner.includes(choix)) {
            // Mise à jour du message d'information
            infoContinue = "Bien joué 🔥👍💃!"
            afficherInfos("Vous vous débrouillez très bien 😎👍🤑 ")
            // On parcours le mot à déviner pour recupérer la position des lettres
            // à remplacer
            for (let x = 0; x < motADeviner.length; x++) {
                if (choix === motADeviner[x]) {
                    // On remplace la lettre masquée
                    myTab[x] = choix 
                }
            }  
        
        } else {
            // On diminue les coups restant d'une unité
            coupRestant --
            // Mise à jour du message d'information
            afficherInfos("Un peu plus d'effort... 🏋️😶‍🌫️😤 ")
            infoContinue = "Oups, mauvaise pioche 😒🤦‍♀️."  
        }
        deja += choix
        console.log(deja)
    }

    // On affiche le mot qu'il soit partiellemnt ou totalement chiffré 
    motTrouver = myTab.join("")
    supprimerTableResul()
    generate_tablePropos(motTrouver)
    // On test si le joueur à trouver le mot ou si il n'a plus de coups à jouer.
    if (motTrouver === motADeviner || coupRestant <= 0) {
        // On désactive le bouton valider
        //btnValiderLettre.disabled = true
        // On arrête le chronomètre
        stopTimer()
        // On désactive le champs de saisie pour empêcher toute nouvelle saisie
        //inputEcriture.disabled = true
        // On désactive les boutons radios
        for (let indexBtnRadio = 0; indexBtnRadio < listeBtnRadio.length; indexBtnRadio++) {
        listeBtnRadio[indexBtnRadio].disabled = true
        }
        supprimerTableResul
        // Est-ce que c'est le mot qui à été trouvé ?
        if (motTrouver === motADeviner) {
            // Bingo ! on met à jour le score
            score ++
            // On met à jour les gains
            gains += coupRestant
            afficherInfos("BRAVOOO VOUS AVEZ GAGNE 💪!!!")
            infoContinue = "🎉🎊🎊🎆🎈✨👑🎉🎉🎊"
        } else {
            afficherInfos("OUPS VOUS AVEZ PERDU 😰!!!")
            infoContinue = "La prochaine fois sera la bonne 👌"
        }
        
        supprimerTable()
        afficherTexte(" Clickez sur Mot Suivant ou Quittez le jeu ")
        afficherCoupRestant("")
        //afficherNbLettres("Le mot à trouver était : "+motADeviner)
        afficherIndiceMot("")
        afficherTexte(infoContinue)
        afficherScore(score, nbMotsProposes)
        afficherGains(gains)
        // On active les boutons Mot Suivant et Quittez le jeu 
        btnMotSuivant.disabled = false
        btnArreterJeu.disabled = false 
        // On réinitialise certaines letiables              
        coupRestant = nbCoups
        deja = ""
    } else {
        // On affiche l'information à l'issue du traitement
        afficherTexte(infoContinue)
        // On affiche les tentatives restantes
        afficherCoupRestant("encore : "+coupRestant+" coups")    
    }
}

/**
 * Cette fonction lance le jeu. 
 * Dès que le joueur clique sur "Lancez le jeu" la boucle de jeu se lance 
 * et s'arrêtera lorsque celui-ci cliquera sur "Quittez le jeu"
 */
function lancerJeu() {
    let i = 0
    //let infoContinue = ""      

    //let btnValiderLettre = document.getElementById("btnValiderLettre")
    let listeBtnRadio = document.querySelectorAll(".optionSource input")
    //let inputEcriture = document.getElementById("inputEcriture")

    let btnDebuterJeu = document.getElementById("btnDebuterJeu")
    let btnMotSuivant = document.getElementById("btnMotSuivant")
    let btnArreterJeu = document.getElementById("btnArreterJeu")

    // On désactive tous les boutons qui doivent l'être au départ
    //btnValiderLettre.disabled = true
    btnMotSuivant.disabled = true
    btnArreterJeu.disabled = true
    for (let indexBtnRadio = 0; indexBtnRadio < listeBtnRadio.length; indexBtnRadio++) {
        listeBtnRadio[indexBtnRadio].disabled = true
    }

    // On désactive le champs de saisie pour empêcher toute saisie 
    // avant d'avoir lancez le jeu
    //inputEcriture.disabled = true

    // Gestion de l'événement click sur le bouton "Lancez le jeu"
    btnDebuterJeu.addEventListener("click", () => {
        // Réinitialisation de certaines letiables
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
        
        // On récupére les lettres à jouer
        const arr = tabLettresAJouer(motADeviner)
        // On affiche le tableau des lettres du jeu
        generate_table(arr)
        // On affiche le message qui informe sur le début de la partie
        afficherInfos("C'est partie ⁉️😎")
        // On désactive le bouton "Lancer le jeu"
        btnDebuterJeu.disabled = true
        // On active le champs de saisie
        //inputEcriture.disabled = false
        // On met à jour le nombre de mot proposé
        nbMotsProposes ++
        // On supprime l'ancien resultat
        supprimerTableResul()
        // on affiche notre table de résultat
        generate_tablePropos(motTrouver)
                
        console.log(arr)
        console.log("motTrouver : "+motTrouver +" motADeviner : "+motADeviner)      
    })   
    // On associé l'événement clavier sur la touche "Entrer" au clic sur 
    // le bouton "validez"
    /*inputEcriture.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            btnValiderLettre.click()
        }
    })
    // Gestion de l'événement click sur le bouton "valider"
    btnValiderLettre.addEventListener("click", () => {
        // On lance le chronomètre si ce dernier n'est pas déjà lancé
        if (!myTimerId) {
            timeCounter(1)
        }
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
        afficherInfos(motTrouver)
        // On test si le joueur à trouver le mot ou si il n'a plus de coups à jouer.
        if (motTrouver === motADeviner || coupRestant === 0) {
            // On désactive le bouton valider
            btnValiderLettre.disabled = true
            // On arrête le chronomètre
            stopTimer()
            // On désactive le champs de saisie pour empêcher toute nouvelle saisie
            inputEcriture.disabled = true
            // On désactive les boutons radios
            for (let indexBtnRadio = 0; indexBtnRadio < listeBtnRadio.length; indexBtnRadio++) {
            listeBtnRadio[indexBtnRadio].disabled = true
            }
            // Est-ce que c'est le mot qui à été trouvé ?
            if (motTrouver === motADeviner) {
                // Bingo ! on met à jour le score
                score ++
                // On met à jour les gains
                gains += coupRestant
                afficherInfos("BRAVOOO VOUS AVEZ GAGNE !!!")
            } else {
                afficherInfos("OUPS VOUS AVEZ PERDU !!!")
            }
            infoContinue = "<< Clickez sur Mot Suivant pour continuer ou Quittez le jeu. >>"
            afficherCoupRestant("")
            afficherNbLettres("Le mot à trouver était : "+motADeviner)
            afficherIndiceMot("")
            afficherInfos(infoContinue)
            afficherScore(score, nbMotsProposes)
            afficherGains(gains)
            // On active les boutons Mot Suivant et Quittez le jeu 
            btnMotSuivant.disabled = false
            btnArreterJeu.disabled = false 
            // On réinitialise certaines letiables              
            coupRestant = nbCoups
        } else {
            // On affiche l'information à l'issue du traitement
            afficherInfos(infoContinue)
            // On affiche les tentatives restantes
            afficherCoupRestant("encore : "+coupRestant+" coups")    
        }
    })*/

    // Gestion de l'événement click sur le bouton "Mot Suivant"
    btnMotSuivant.addEventListener("click", () => {
        // On appelle la fonction qui génére le mot à proposer 
        let valeurs = genererLeMotPropose()
        // On extrait les valeurs retournées
        i = valeurs[0]
        motADeviner = valeurs[1]
        motTrouver = valeurs[2]
        // On supprime l'ancien resultat
        supprimerTableResul()
        // on affiche notre table de résultat
        generate_tablePropos(motTrouver)
        // On affiche le message qui informe sur le début de la partie
        afficherInfos("C'est partie ⁉️😎")
        // On affiche le message qui informe sur le début de la partie
        afficherTexte("Un autre mot à déviner !")
        // On désactive le bouton "Mot Suivant" et "Quittez le jeu"
        btnMotSuivant.disabled = true
        btnArreterJeu.disabled = true
        // On active le champs de saisie
        //inputEcriture.disabled = false
        // On met à jour le nombre de mot proposé
        nbMotsProposes ++
        // On active le bouton validé
        //btnValiderLettre.disabled = false
        // On active les boutons radios à condition que les gains soient supérieur à 4U
        if (gains >= 5) {
            for (let indexBtnRadio = 0; indexBtnRadio < listeBtnRadio.length; indexBtnRadio++) {
            listeBtnRadio[indexBtnRadio].disabled = false
            afficherIndiceMot("Gains >= 5 : indice activé")
            }
        } else {
            afficherIndiceMot("Gains < 5 : indice désactivé")
        }
        // On récupére les lettres à jouer
        const arr = tabLettresAJouer(motADeviner)
        // On affiche le tableau des lettres du jeu
        generate_table(arr)
        console.log("motTrouver : "+motTrouver +" motADeviner : "+motADeviner) 
    })

    // Gestion de l'événement click sur le bouton "Quittez le jeu"
    btnArreterJeu.addEventListener("click", () => {
        // On affiche le message d'au revoir
        supprimerTableResul()
        afficherInfos("AU REVOIR ET A BIENTÔT 🎈!")
        // On efface la zone des indices
        //afficherNbLettres("")
        //afficherIndiceMot("")
        // On désactive le bouton "Mot Suivant" et "Quittez le jeu"
        btnMotSuivant.disabled = true
        btnArreterJeu.disabled = true
        // On désactive les boutons radios
        for (let indexBtnRadio = 0; indexBtnRadio < listeBtnRadio.length; indexBtnRadio++) {
            listeBtnRadio[indexBtnRadio].disabled = true
        }
        // On initialise la popup pour le partage
        initAddEventListenerPopup()
        
        // On active le bonton "lancez le jeu"
        btnDebuterJeu.disabled = false
        // On met à jour la zone d'information
        afficherTexte("Vous avez gagné : " +gains+ " "+singuPluriel(gains, "point")+", avec un score de : " +score+"/" +nbMotsProposes)
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
                // On retranche 5U pour l'achat de l'indice
                gains -= 5
                // On met à jour l'affichage des gains
                afficherGains(gains)
            }
            // Et on affiche l'indice. 
            afficherIndiceMot("Indice : "+indice)
            // On réinitialise les boutons radios
            listeBtnRadio[0].checked = true
            // On désactive les boutons radios
            for (let indexBtnRadio = 0; indexBtnRadio < listeBtnRadio.length; indexBtnRadio++) {
                listeBtnRadio[indexBtnRadio].disabled = true
            }
        })
    }

    // Gestion de l'événement submit sur le formulaire de partage. 
    let form = document.querySelector("form")
    form.addEventListener("submit", (event) => {
        event.preventDefault()
        let scoreEmail = `${score} / ${nbMotsProposes} avec un total des gains de : ${gains}U`
        gererFormulaire(scoreEmail)
    })
}