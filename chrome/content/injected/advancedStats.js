// @name            Gladiatus Tools
// @namespace       http://www.neurone.it/index.php/gladiatus-tools/
// @autor           Giuseppe Bertone
// @version         2.0.0
// @date            07 Feb 2009

function newRow() {
	var row = document.createElement("tr");
	row.innerHTML = "<td>&nbsp;</td>";  
	return row;
}
    
function showAdvancedStats() {    
    //Trovo il valore degli oggetti posseduti
    var tds = XQuery(".//div[@id='stats_wealth']//table//tr//td");
	if(tds.snapshotLength) {
		//Formatto meglio le td
		for(var i = 0; i < tds.snapshotLength; i++) {
			tds.snapshotItem(i).style.whiteSpace = "nowrap";
		}
	}
    //Trovo le statistiche di combattimento
	tds = XQuery(".//div[@id='stats_combat']//table//tr//td");
	if(tds.snapshotLength) {
		//Formatto meglio le td
		for(var i = 0; i < tds.snapshotLength; i++) {
			tds.snapshotItem(i).style.whiteSpace = "nowrap";
		}
		
		var battaglie = tds.snapshotItem(0).innerHTML.replace(/\./g, "");
		var vittorie = tds.snapshotItem(1).innerHTML.replace(/\./g, "");
		var vittoriaPercento = (vittorie / battaglie * 100).toFixed(2);
		var rigaVittoriaPercento = document.createElement("tr");
		var coloreVittoriaPercento = (vittoriaPercento >= 50 ? "green" : "red");
				
		var oroRazziato = tds.snapshotItem(4).innerHTML.replace(/\./g, "").replace(/<.*/g,"");
		var oroPerso = tds.snapshotItem(5).innerHTML.replace(/\./g, "").replace(/<.*/g,"");
		var oroGuadagnato = oroRazziato - oroPerso;
		var coloreOroGuadagnato = (oroGuadagnato >= 0 ? "green" : "red");
		
		var rigaOroGuadagnato = document.createElement("tr");
				
		var trs = XQuery(".//div[@id='stats_combat']//table//tr");		
		if(trs.snapshotLength) {
			trs.snapshotItem(3).parentNode.insertBefore(rigaVittoriaPercento, trs.snapshotItem(3).nextSibling);
			rigaVittoriaPercento.parentNode.insertBefore(newRow(), rigaVittoriaPercento.nextSibling);
			
			trs.snapshotItem(5).parentNode.insertBefore(rigaOroGuadagnato, trs.snapshotItem(5).nextSibling);
			rigaOroGuadagnato.parentNode.insertBefore(newRow(), rigaOroGuadagnato.nextSibling);
		}
		
		rigaVittoriaPercento.innerHTML = "<th>"+ MSG.winPercentage +"</th><td style=\"white-space:nowrap;color:"+coloreVittoriaPercento+";\">"+vittoriaPercento+"%</td>";
    	rigaOroGuadagnato.innerHTML = "<th>"+ MSG.totalEarnedGold +"</th><td style=\"white-space:nowrap;color:"+coloreOroGuadagnato+";\">"+
    									formatNumber(oroGuadagnato,".")+
    									" <img border=\"0\" align=\"absmiddle\" title=\"Oro\" alt=\"Oro\" src=\"img/res2.gif\"/></td>";
    }
}