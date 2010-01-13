// @name            Gladiatus Tools
// @namespace       http://www.neurone.it/index.php/gladiatus-tools/
// @autor           Giuseppe Bertone

//Valorizza automaticamente con il prezzo più basso gli oggetti all'asta
function autoFillAuctionFields(){
	//Elenco tutti i valori degli oggetti all'asta
	var divs = XQuery(".//div[@class='auction_bid_div']");
	if(divs.snapshotLength) {
		//Per ogni oggetto, valorizzo il campo di input con il valore attuale + 1
		for(var i = 0; i < divs.snapshotLength; i++) {
			//Trovo il valore dell'oggetto all'asta
			var match = divs.snapshotItem(i).innerHTML.match(new RegExp(": ([0-9]*\.*[0-9]*) <"));
			//Se non trovo un valore da incrementare, non faccio nulla
			if(!match) continue;
			//Preparo il nuovo valore sostituendo il punto che gladiatus usa per separare le migliaia
			var valore = match[1].replace(/\./g, "");
			//Inserisco il valore nell'apposito campo
			var input = XQueryFromElement(".//input[@name='bid_amount']", divs.snapshotItem(i));
			if(input.snapshotLength) {
				input.snapshotItem(0).value = valore;
			}
		}
	}
}