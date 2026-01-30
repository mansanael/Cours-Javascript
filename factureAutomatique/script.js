// calcule automatique de NCV 
let montant = document.getElementById("montant");
montant.addEventListener("input", calculNCV);

let remise = document.getElementById("pourcentage-remise");
remise.addEventListener("input", calculNCV);

function calculNCV() {
    let montantValue = parseFloat(montant.value) || 0;
    let remiseValue = parseFloat(remise.value) || 0;
    
    // Vérifier si le montant est positif
    if (montantValue <= 0) {
        // Si montant est négatif ou zéro, vider NCV et montrer un message
        document.getElementById("NCV").value = "";
        if (montantValue < 0) {
            alert("Le montant ne peut pas être négatif !");
            montant.value = ""; // Optionnel : vider le champ montant
            montant.focus(); // Remettre le focus sur le champ
        }
        return; // Arrêter le calcul
    }
    
    // Si montant est positif, faire le calcul normal
    let NCV = montantValue - (montantValue * remiseValue / 100);
    document.getElementById("NCV").value = NCV.toFixed(2);
};

// lancer une alerte si le montant est inferieur a 0
montant.addEventListener("input", function() {
    let montantValue = parseFloat(montant.value) || 0;
    if (montantValue < 0) {
        alert("Le montant ne peut pas être négatif.");
        document.getElementById("montant").value = "";
    }
});

// remplire le champ remise quand on ecrit dans le champ pourcentage-remise
document.getElementById("pourcentage-remise").addEventListener("input", function() {
    let montantValue = parseFloat(document.getElementById("montant").value) || 0;
    let remisePourcentage = parseFloat(this.value) || 0;
    let remiseValue = (montantValue * remisePourcentage) / 100;
    document.getElementById("remise").value = remiseValue.toFixed(2);
});
 
    
// calcule automatique de NC-facture
let NCV = document.getElementById("NCV");
NCV.addEventListener("input", calculNCFacture);
let transport = document.getElementById("transport");
transport.addEventListener("input", calculNCFacture);
function calculNCFacture() {
    let NCVValue = parseFloat(document.getElementById("NCV").value) || 0;   
    let transportValue = parseFloat(transport.value) || 0;

     
    // Vérifier si le transport < NCV
    if (transportValue >= NCVValue ) {
        // Si transport < NCV, vider NC-facture et montrer un message
        document.getElementById("NC-Facture").value = "";
        if (montantValue < 0) {
            alert("Le transport ne peut pas être supérieur au NCV");
            transport.value = ""; // Optionnel : vider le champ montant
            transport.focus(); // Remettre le focus sur le champ
        }
        return; // Arrêter le calcul
    }
    let NC_Facture = NCVValue + transportValue;
    document.getElementById("NC-Facture").value = NC_Facture.toFixed(2);
};

//lancer une alerte si le transport est superieur au NCV
transport.addEventListener("input", function() {
    let NCVValue = parseFloat(document.getElementById("NCV").value) || 0;
    let transportValue = parseFloat(this.value) || 0;
    if (transportValue > NCVValue) {
        alert("Le transport ne peut pas être supérieur au NCV.");
        document.getElementById("transport").value = "";
    }
});

// calcule automatique de net financier
let NC_Facture = document.getElementById("NC-Facture");
NC_Facture.addEventListener("input", calculNetFinancier);
let escompte_valeur = document.getElementById("escompte-valeur");
escompte_valeur.addEventListener("input", calculNetFinancier);
function calculNetFinancier() {
    let NCFactureValue = parseFloat(document.getElementById("NC-Facture").value) || 0;   
    let escompteValue = parseFloat(escompte_valeur.value) || 0;
    let net_financier = NCFactureValue - (NCFactureValue * escompteValue / 100);
    document.getElementById("net-financier").value = net_financier.toFixed(2);
};
// remplire le champ escompte-valeur quand on ecrit dans le champ escompte
document.getElementById("escompte-valeur").addEventListener("input", function() {
    let NC_FactureValue = parseFloat(document.getElementById("NC-Facture").value) || 0;
    let escomptePourcentage = parseFloat(this.value) || 0;
    let escompteValue = (NC_FactureValue * escomptePourcentage) / 100;
    document.getElementById("escompte").value = escompteValue.toFixed(2);
});

// calcule automatique de NAP
let net_financier = document.getElementById("net-financier");
net_financier.addEventListener("input", calculNAP);
let TVA_valeur = document.getElementById("tva-valeur");
TVA_valeur.addEventListener("input", calculNAP);
function calculNAP() {
    let netFinancierValue = parseFloat(document.getElementById("net-financier").value) || 0;
    let TVAValue = parseFloat(TVA_valeur.value) || 0;
    let NAP = netFinancierValue + (netFinancierValue * TVAValue / 100);
    document.getElementById("NAP").value = NAP.toFixed(2);
};
// remplir le champ TVA quand on ecrit dans le champ NAP
document.getElementById("tva-valeur").addEventListener("input", function() {
    let netFinancierValue = parseFloat(document.getElementById("net-financier").value) || 0;
    let TVAPourcentage = parseFloat(this.value) || 0;
    let TVAValue = (netFinancierValue * TVAPourcentage) / 100;
    document.getElementById("TVA").value = TVAValue.toFixed(2);
});


// on met la date du jour dans le champ date du formulaire
window.onload = function() {
    // on prend la date du jour et on le met dans le champ "date"
    let aujourdui = new Date(); 
    let jour = aujourdui.getDate().toString().padStart(2, '0'); 
    let mois = (aujourdui.getMonth() + 1).toString().padStart(2, '0'); 
    let annee = aujourdui.getFullYear();
    // on recuperer le champ date et on lui assigne la date formater 
    document.getElementById("date").value = jour + "/" + mois + "/" + annee;

    // on met le numero de facture automatique un utilisant DAAMMJJ avec AA l'annee sur 2 chiffres
    let facture = "D" + (annee.toString().slice(-2)) + mois + jour;
    document.getElementById("num_facture").value = facture;
};

// selectionner le bouton qui genere la facture et le tableau qui doit l'afficher 
const ajouterfct = document.getElementById("genere-facture");
const tablebody = document.getElementById("tableBody");

// ajouter un evenement au clic sur le bouton
// MODIFIER LA PARTIE DU BOUTON "genere-facture"
ajouterfct.addEventListener("click", function() {
    // Récupérer les valeurs DIRECTEMENT des champs (déjà calculées)
    let num_facture = document.getElementById("num_facture").value;
    let client = document.getElementById("client").value;
    
    // Récupérer les valeurs CALCULÉES (pas besoin de recalculer)
    let montant = parseFloat(document.getElementById("montant").value) || 0;
    let NCV = parseFloat(document.getElementById("NCV").value) || 0;
    let NC_Facture = parseFloat(document.getElementById("NC-Facture").value) || 0;
    let net_financier = parseFloat(document.getElementById("net-financier").value) || 0;
    let NAP = parseFloat(document.getElementById("NAP").value) || 0;
    
    // Plus besoin de recalculer ! Les valeurs sont déjà correctes
    
    // Créer une ligne au tableau
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td>${montant.toFixed(2)}</td>
        <td>${NC_Facture.toFixed(2)}</td>
        <td>${net_financier.toFixed(2)}</td>
        <td>${NAP.toFixed(2)}</td>
    `;
    
    // Ajouter la ligne au tableau
    tablebody.appendChild(tr);
    
    // Optionnel : réinitialiser les champs
    document.getElementById("montant").value = "";
    document.getElementById("pourcentage-remise").value = "";
    document.getElementById("remise").value = "";
    document.getElementById("transport").value = "";
    document.getElementById("escompte").value = "";
    document.getElementById("escompte-valeur").value = "";
    document.getElementById("NCV").value = "";
    document.getElementById("NC-Facture").value = "";
    document.getElementById("net-financier").value = "";
    document.getElementById("NAP").value = "";  
    document.getElementById("TVA").value = "";
    document.getElementById("tva-valeur").value = "";
    document.getElementById("client").value = "";
    document.getElementById("fournisseur").value = "";
});
// button supprimer les lignes du tableau
const supprimerfct = document.getElementById("supprimer-facture");
supprimerfct.addEventListener("click", function() {
    // vider le tableau
    tablebody.innerHTML = "";
});



