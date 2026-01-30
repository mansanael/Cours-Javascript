// On met la date du jour dans le champ "date" du formulaire 
window.onload = function() {
    // On  prend la date du jour et on l'affiche dans le champ "date"
    let aujourdui = new Date();
    console.log("La date en entier : " + aujourdui);
    console.log("Le jour : " + aujourdui.getDate());
    console.log("Le mois : " + (aujourdui.getMonth() +1)); // Les mois commencent à 0
    let jour = aujourdui.getDate().toString().padStart(2, '0');
    let mois = (aujourdui.getMonth() + 1).toString().padStart(2, '0'); // Les mois commencent à 0
    let annee = aujourdui.getFullYear();

    calculncv = function() {
        let montantHT = document.getElementById("montantht").value || 0;
        let remisePourcentage = parseFloat(document.getElementById("tauxremise").value) || 0;
        console.log("Remise : " + remisePourcentage);
        let montantRemise = montantHT * (remisePourcentage / 100);
        let montantNCV = montantHT - montantRemise;

        document.getElementById("remise").value = montantRemise.toFixed(2);
        document.getElementById("ncv").value = montantNCV.toFixed(2);
    }

    calculncf = function(){
        let montantNCV = document.getElementById("ncv").value || 0;
        let transport = document.getElementById("transport").value || 0;

         document.getElementById("ncf").value = (parseFloat(montantNCV) + parseFloat(transport)).toFixed(2);
  }

  function calculNAP() {
    let totalHTVal = parseFloat(totalht.value) || 0;
    let tauxTVA = parseFloat(tauxtva.value) || 0;

    let tvaVal = totalHTVal * (tauxTVA / 100);
    let ttcVal = totalHTVal + tvaVal;

    tva.value = tvaVal.toFixed(2);
    totalttc.value = ttcVal.toFixed(2);
}


 /* ================= TOTAL HT + ESCOMPTE ================= */
 function calculTotalHT() {
    let ncfVal = parseFloat(ncf.value) || 0;
    let tauxEsc = parseFloat(tauxescompte.value) || 0;

    let escompteVal = ncfVal * (tauxEsc / 100);
    let totalHTVal = ncfVal - escompteVal;

    escompte.value = escompteVal.toFixed(2);
    totalht.value = totalHTVal.toFixed(2);

}




    // On recupère le champ date et on lui assigne la date formatée
    document.getElementById("date").value = `${annee}-${mois}-${jour}`;

    // On met le numéro de facture automatique en utilisant DAAMJ avec AA les deux derniers chiffres de l'année, MM le mois et JJ le jour
    let numeroFacture = `D${annee.toString().slice(-2)}${mois}${jour}`;
    document.getElementById("numero").value = numeroFacture;

    document.getElementById("montantht").addEventListener("input",  calculncv );

    document.getElementById("tauxremise").addEventListener("input", calculncv );

    document.getElementById("transport").addEventListener("input", calculncf );

    tauxescompte.addEventListener("input", calculTotalHT);
    tauxtva.addEventListener("input", calculNAP);

    const form = document.getElementById("formulaire");
    const tbody = document.getElementById("tbody");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        let tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${parseFloat(montantht.value).toFixed(2)}</td>
            <td>${parseFloat(ncf.value).toFixed(2)}</td>
            <td>${parseFloat(escompte.value).toFixed(2)}</td>
            <td>${parseFloat(totalttc.value).toFixed(2)}</td>
        `;

        tbody.appendChild(tr);
    });


};

