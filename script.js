
// On met la date du jour dans le champ "date" du formulaire 
window.onload = function () {
    // On  prend la date du jour et on l'affiche dans le champ "date"
    let aujourdui = new Date();
    console.log("La date en entier : " + aujourdui);
    console.log("Le jour : " + aujourdui.getDate());
    console.log("Le mois : " + (aujourdui.getMonth() + 1)); // Les mois commencent à 0
    let jour = aujourdui.getDate().toString().padStart(2, '0');
    let mois = (aujourdui.getMonth() + 1).toString().padStart(2, '0'); // Les mois commencent à 0
    let annee = aujourdui.getFullYear();

    // On recupère le champ date et on lui assigne la date formatée
    document.getElementById("date").value = `${annee}-${mois}-${jour}`;

    // On met le numéro de facture automatique en utilisant DAAMJ avec AA les deux derniers chiffres de l'année, MM le mois et JJ le jour
    let numeroFacture = `D${annee.toString().slice(-2)}${mois}${jour}`;
    document.getElementById("numero").value = numeroFacture;

    // Quand le montant ht est donné on calcule le montant de la remise et le montant ncv
    document.getElementById("montantht").addEventListener("input", function () {
        let montantHT = parseFloat(this.value);
        let remisePourcentage = parseFloat(document.getElementById("tauxremise").value) || 0;
        console.log("Remise : " + remisePourcentage);
        let montantRemise = montantHT * (remisePourcentage / 100);
        let montantNCV = montantHT - montantRemise;

        document.getElementById("remise").value = montantRemise.toFixed(2);
        document.getElementById("ncv").value = montantNCV.toFixed(2);
    });

    document.getElementById("tauxremise").addEventListener("input", function () {
        let montantHT = parseFloat(document.getElementById("montantht").value) || 0;
        let remisePourcentage = parseFloat(this.value) || 0;
        console.log("Remise : " + remisePourcentage);
        let montantRemise = montantHT * (remisePourcentage / 100);
        let montantNCV = montantHT - montantRemise;

        document.getElementById("remise").value = montantRemise.toFixed(2);
        document.getElementById("ncv").value = montantNCV.toFixed(2);
    } );
      document.getElementById("ncv").addEventListener("input", function () {
        let montantNCV=parseFloat(document.getElementById("ncv").value)||0;
        let transport = parseFloat(document.getElementById("transport").value) || 0;
        let montantncf = montantNCV+transport;

        document.getElementById("ncf").value = montantncf.toFixed(2);
        document.getElementById("transport").addEventListener("input",calculNCF);
        
    } );
    document.getElementById("ncf").addEventListener("input"),function(){
        
    }
    
   
};


