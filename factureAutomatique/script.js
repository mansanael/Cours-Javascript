


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

    calculncv = function () {
        let montantHT = document.getElementById("montantht").value || 0;
        let remisePourcentage = parseFloat(document.getElementById("tauxremise").value) || 0;
        console.log("Remise : " + remisePourcentage);
        let montantRemise = montantHT * (remisePourcentage / 100);
        let montantNCV = montantHT - montantRemise;

        document.getElementById("remise").value = montantRemise.toFixed(2);
        document.getElementById("ncv").value = montantNCV.toFixed(2);
    }

    calculncf = function () {
        let montantNCV = document.getElementById("ncv").value || 0;
        let transport = document.getElementById("transport").value || 0;

        document.getElementById("ncf").value = (parseFloat(montantNCV) + parseFloat(transport)).toFixed(2);
    }

    calculTotalHorsTaxe = function () {
        let ncf = document.getElementById("ncf").value || 0;
        let tauxescompte = document.getElementById("tauxescompte").value || 0;
        let escompte = parseFloat(ncf) * tauxescompte / 100;

        document.getElementById("escompte").value = escompte.toFixed(2);
        document.getElementById("totalht").value = parseFloat(ncf) - parseFloat(escompte);
    }

    calculNetAPayer = function () {
        let ncf = document.getElementById("ncf").value || 0;
        let tauxTva = document.getElementById("tauxtva").value || 0;
        let montantTva = parseFloat(ncf) * tauxTva / 100;

        document.getElementById("tva").value = montantTva.toFixed(2);
        document.getElementById("totalttc").value = parseFloat(ncf) - parseFloat(montantTva);
    }

    // On recupère le champ date et on lui assigne la date formatée
    document.getElementById("date").value = `${annee}-${mois}-${jour}`;

    // On met le numéro de facture automatique en utilisant DAAMJ avec AA les deux derniers chiffres de l'année, MM le mois et JJ le jour
    let numeroFacture = `D${annee.toString().slice(-2)}${mois}${jour}`;
    document.getElementById("numero").value = numeroFacture;

    document.getElementById("montantht").addEventListener("input", calculncv);

    document.getElementById("tauxremise").addEventListener("input", calculncv);

    document.getElementById("transport").addEventListener("input", calculncf);

    document.getElementById("tauxescompte").addEventListener("input", calculTotalHorsTaxe);

    document.getElementById("tauxtva").addEventListener("input", calculNetAPayer);

}
function button(){
    let montantht=document.getElementById("montantht").value;
    let ncf=document.getElementById("ncf").value;
    let nap=document.getElementById("totalttc").value;
    let nf=document.getElementById("totalht").value;
    let date=document.getElementById("date").value;

    let table=document.getElementById("tbody");
    let liste=document.createElement("tr");
    liste.innerHTML=
        `
        <td>${date}</td>
        <td>${montantht}</td>
        <td>${ncf}</td>
        <td>${nf}</td>
        <td>${nap}</td>
        `;
    table.appendChild(liste);
};
