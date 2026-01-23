window.onload=function(){
    let aujourdui=new Date();
    let jour=aujourdui.getDate().toString().padStart(2,"0");
    let mois=(aujourdui.getMonth()+1).toString().padStart(2,"0");
    let annee=aujourdui.getFullYear();

    document.getElementById("date").value=`${annee}-${mois}-${jour}`;
    // On met le numéro de facture automatique en utilisant DAAMJ avec AA les deux derniers chiffres de l'année, MM le mois et JJ le jour
    let numero=`D ${annee.toString().slice(-2)}${mois}${jour}`;
    document.getElementById("numero").value=numero;

}
    document.getElementById("montant_ht").addEventListener("input", function() {
        let montantHT = parseFloat(this.value) ||0;
        let remisePourcentage = parseFloat(document.getElementById("taux_remise").value) || 0;
        
        let montantRemise = montantHT * (remisePourcentage / 100);
        let montantNCV = montantHT - montantRemise;

        document.getElementById("montant_remise").value = montantRemise.toFixed(0);
        document.getElementById("ncv").value = montantNCV.toFixed(0);
    });

    document.getElementById("taux_remise").addEventListener("input", function() {
        let montantHT = parseFloat(document.getElementById("montant_ht").value) || 0;
        let remisePourcentage = parseFloat(this.value) || 0;
        
        let montantRemise = montantHT * (remisePourcentage / 100);
        let montantNCV = document.getElementById("ncv").value;

        document.getElementById("montant_remise").value = montantRemise.toFixed(0);
        document.getElementById("ncv").value = montantNCV.toFixed(0);
    });
      document.getElementById("montant_transport").addEventListener("input", function() {
        let ncv = parseFloat(document.getElementById("ncv").value) || 0;
        let transport = parseFloat(this.value) || 0;
        let taux_escompte=parseFloat(document.getElementById("taux_escompte").value) || 0;
        
        let ncf = ncv + transport;
        let montantEscompte =  ncf*(taux_escompte/100);
        let net_financiere=ncf-montantEscompte;

        document.getElementById("nc_facture").value =ncf.toFixed(0);
        document.getElementById("montant_escompte").value = montantEscompte.toFixed(0);
        document.getElementById("net_financiere").value=net_financiere.toFixed(0);
    });
    document.getElementById("taux_escompte").addEventListener("input", function() {
        let taux_escompte=parseFloat(this.value) || 0;
        let ncf = document.getElementById("nc_facture").value || 0;

        let montantEscompte =  ncf*(taux_escompte/100);
        let net_financiere=ncf-montantEscompte;

        document.getElementById("montant_escompte").value = montantEscompte.toFixed(0);
        document.getElementById("net_financiere").value=net_financiere.toFixed(0);
        
    });
    
    document.getElementById("taux_tva").addEventListener("input", function() {
        let net_financiere = parseFloat(document.getElementById("net_financiere").value) || 0;
        let taux_tva = parseFloat(this.value) || 0;
        
        let montant_tva= net_financiere * (taux_tva / 100);
        let nap = net_financiere + montant_tva;

        document.getElementById("montant_tva").value = montant_tva.toFixed(0);
        document.getElementById("nap").value = nap.toFixed(0);
    });
    
let form = document.getElementById("formulaire").addEventListener("submit", function(e){
    e.preventDefault();

    const montant_ht=document.getElementById("montant_ht").value;
    const date=document.getElementById("date").value;
    const net_facture=document.getElementById("nc_facture").value;
    const net_financiere=document.getElementById("net_financiere").value;
    const nap=document.getElementById("nap").value;
    

    const table=document.getElementById("table");
    let ligne=document.createElement("tr");
    
    ligne.innerHTML=
        `
        <td>${date}</td>
        <td>${montant_ht}</td>
        <td>${net_facture}</td>
        <td>${net_financiere}</td>
        <td>${nap}</td>
        `
    ;
    table.appendChild(ligne);
    
    form.reset()
});