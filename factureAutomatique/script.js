// calcule automatique de NCV 
let montant = document.getElementById("montant");
let remise = document.getElementById("pourcentage-remise");

montant.addEventListener("input", calculNCV);
remise.addEventListener("input", calculNCV);

function calculNCV() {
    let montantValue = parseFloat(montant.value) || 0;
    let remiseValue = parseFloat(remise.value) || 0;
    
    // Vérifier si le montant est positif
    if (montantValue <= 0) {
        document.getElementById("NCV").value = "";
        if (montantValue < 0) {
            alert("Le montant ne peut pas être négatif !");
            montant.value = "";
            montant.focus();
        }
        return;
    }
    
    // Calcul NCV
    let NCV = montantValue - (montantValue * remiseValue / 100);
    document.getElementById("NCV").value = NCV.toFixed(2);
    
    // Mettre à jour la remise en valeur absolue
    document.getElementById("remise").value = (montantValue * remiseValue / 100).toFixed(2);
};

// Validation supplémentaire pour montant
montant.addEventListener("blur", function() {
    let montantValue = parseFloat(montant.value) || 0;
    if (montantValue < 0) {
        alert("Le montant ne peut pas être négatif.");
        montant.value = "";
        montant.focus();
    }
});

// calcule automatique de NC-facture
let NCVElement = document.getElementById("NCV");
let transport = document.getElementById("transport");

NCVElement.addEventListener("input", calculNCFacture);
transport.addEventListener("input", calculNCFacture);

function calculNCFacture() {
    let NCVValue = parseFloat(NCVElement.value) || 0;   
    let transportValue = parseFloat(transport.value) || 0;

    // Vérifier si le transport < NCV
    if (transportValue >= NCVValue) {
        document.getElementById("NC-Facture").value = "";
        if (transportValue > 0) {
            alert("Le transport ne peut pas être supérieur ou égal au NCV");
            transport.value = "";
            transport.focus();
        }
        return;
    }
    
    let NC_Facture = NCVValue + transportValue;
    document.getElementById("NC-Facture").value = NC_Facture.toFixed(2);
};

// Validation transport
transport.addEventListener("blur", function() {
    let NCVValue = parseFloat(NCVElement.value) || 0;
    let transportValue = parseFloat(this.value) || 0;
    if (transportValue > NCVValue) {
        alert("Le transport ne peut pas être supérieur au NCV.");
        this.value = "";
        this.focus();
    }
});

// calcule automatique de net financier
let NC_Facture = document.getElementById("NC-Facture");
let escompte_valeur = document.getElementById("escompte-valeur");

NC_Facture.addEventListener("input", calculNetFinancier);
escompte_valeur.addEventListener("input", calculNetFinancier);

function calculNetFinancier() {
    let NCFactureValue = parseFloat(NC_Facture.value) || 0;   
    let escompteValue = parseFloat(escompte_valeur.value) || 0;
    let net_financier = NCFactureValue - (NCFactureValue * escompteValue / 100);
    document.getElementById("net-financier").value = net_financier.toFixed(2);
    
    // Mettre à jour l'escompte en valeur absolue
    document.getElementById("escompte").value = (NCFactureValue * escompteValue / 100).toFixed(2);
};

// calcule automatique de NAP
let net_financier = document.getElementById("net-financier");
let TVA_valeur = document.getElementById("tva-valeur");

net_financier.addEventListener("input", calculNAP);
TVA_valeur.addEventListener("input", calculNAP);

function calculNAP() {
    let netFinancierValue = parseFloat(net_financier.value) || 0;
    let TVAValue = parseFloat(TVA_valeur.value) || 0;
    let NAP = netFinancierValue + (netFinancierValue * TVAValue / 100);
    document.getElementById("NAP").value = NAP.toFixed(2);
    
    // Mettre à jour la TVA en valeur absolue
    document.getElementById("TVA").value = (netFinancierValue * TVAValue / 100).toFixed(2);
};

// on met la date du jour dans le champ date du formulaire
window.onload = function() {
    let aujourdui = new Date(); 
    let jour = aujourdui.getDate().toString().padStart(2, '0'); 
    let mois = (aujourdui.getMonth() + 1).toString().padStart(2, '0'); 
    let annee = aujourdui.getFullYear();
    
    document.getElementById("date").value = jour + "/" + mois + "/" + annee;

    let facture = "D" + (annee.toString().slice(-2)) + mois + jour;
    document.getElementById("num_facture").value = facture;
};  

// selectionner le bouton qui genere la facture et le tableau qui doit l'afficher 
const ajouterfct = document.getElementById("genere-facture");
const tablebody = document.getElementById("tableBody");

// MODIFIER LA PARTIE DU BOUTON "genere-facture"
ajouterfct.addEventListener("click", function() {
    // Récupérer les valeurs CALCULÉES
    let montantValue = parseFloat(document.getElementById("montant").value) || 0;
    let NC_FactureValue = parseFloat(document.getElementById("NC-Facture").value) || 0;
    let net_financierValue = parseFloat(document.getElementById("net-financier").value) || 0;
    let NAPValue = parseFloat(document.getElementById("NAP").value) || 0;
    
    // Vérifier que le montant est rempli
    if (montantValue <= 0) {
        alert("Veuillez saisir un montant valide");
        document.getElementById("montant").focus();
        return;
    }
    
    // Vérifier que NC-Facture est calculé
    if (NC_FactureValue <= 0) {
        alert("Veuillez vérifier les calculs (NC-Facture non calculé)");
        return;
    }
    
    // Créer une ligne au tableau avec seulement les 4 colonnes demandées
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td>${montantValue.toFixed(2)}</td>
        <td>${NC_FactureValue.toFixed(2)}</td>
        <td>${net_financierValue.toFixed(2)}</td>
        <td>${NAPValue.toFixed(2)}</td>
    `;
    
    // Ajouter la ligne au tableau
    tablebody.appendChild(tr);
    
    // Réinitialiser les champs
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
    
    // Garder la date et le numéro de facture actuels
    // (ils sont auto-générés au chargement et restent inchangés)
});

// button supprimer les lignes du tableau
const supprimerfct = document.getElementById("supprimer-facture");
supprimerfct.addEventListener("click", function() {
    if (confirm("Voulez-vous vraiment supprimer toutes les lignes du tableau ?")) {
        tablebody.innerHTML = "";
    }
});