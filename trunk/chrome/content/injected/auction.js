// @name            Gladiatus Tools
// @namespace       http://www.neurone.it/index.php/gladiatus-tools/
// @autor           Giuseppe Bertone

//Aggiunge 1 al valore di ogni oggetto all'asta
function bidOneMore(){
	//Elenco tutti i valori degli oggetti all'asta
	var divs = XQuery(".//div[@class='auction_bid_div']");
	if(divs.snapshotLength) {
		//Per ogni oggetto, valorizzo il campo di input con il valore attuale + 1
		for(var i = 0; i < divs.snapshotLength; i++) {
			//Trovo il valore dell'oggetto all'asta
			var match = divs.snapshotItem(i).innerHTML.match(new RegExp(": ([0-9]*\.*[0-9]*) <"));
			//Se non trovo un valore da incrementare, non faccio nulla
			if(!match) continue;
			//Preparo il nuovo valore (non uso direttamente il parseInt perché in inglese il punto è 
			//utilizzato come separatore delle decine, mentre in gladiatus è utilizzato per le migliaia
			var valore = parseInt(match[1].replace(/\./g, "")) + 1;
			//Inserisco il valore nell'apposito campo
			var input = XQueryFromElement(".//input[@name='bid_amount']", divs.snapshotItem(i));
			if(input.snapshotLength) {
				input.snapshotItem(0).value = valore;
			}
		}
	}
}