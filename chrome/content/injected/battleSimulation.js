// @name            	Gladiatus Tools
// @namespace       	http://www.neurone.it/index.php/gladiatus-tools/
// @autor           	Giuseppe Bertone

/*****************************
Abilita o disabilita il pulsante Simula
*****************************/
function switchEnabled()
{
	if(simulaButton != null)
	{
		if(simulaButton.disabled)
		{
			simulaButton.disabled = "";
			simulaButton.value = MSG.simulate;
		}
		else
		{
			simulaButton.disabled = "disabled";
			messaggio.innerHTML = "<strong>"+ MSG.simulating +"</strong><br/>";
		}
	}
}

/*****************************
Modifica la pagina
*****************************/
function modifyLayout(winner, risultato)
{
	var colore;
	//Imposto le variabili a seconda che sia una vittoria o una sconfitta
	if(winner)
	{
		colore = "green";
		vai.value = MSG.go;
		vai.disabled = "";
	}
	else
	{
		colore = "red";
		vai.value = MSG.stop;
	}
	//Formatto il dettaglio dei risultati
	risultato = MSG.winning +" "+ risultato +"%";
	var testo = "<span style=\"color:"+ colore +";font-weight:bold;\">"+ risultato +"</span>";
	messaggio.innerHTML = testo + "<br />";
	//Formatto il pulsante vai correttamente
	vai.style.color = colore;
}

/*****************************
Gestisce il risultato della simulazione
*****************************/
function gestisciRisultato(risultato)
{
	//Modifico il layout per visualizzare la risposta
	modifyLayout(((risultato * 1) > 50), risultato);
	//Ripristina il pulsante
	switchEnabled();
}

/*****************************
Gestisce la risposta del simulatore
*****************************/
function gestisciRispostaDaSimulatore(risposta)
{
	//Percentuale di vittoria dell'attaccante
	var risultato = 0;
	var error = false;

	switch(simulatore)
	{
		case "www.playerutils.com":
			//Effettuo il parsing della risposta per capire chi ha vinto
			var first = "simulations out of ";
			var firstOffset = first.length + " 1000 <b>(".length - 1;
			var last = "% of the time";
			var contenuto = risposta.responseText;
			var inizio = contenuto.search(/simulations out of /i);
			var fine = contenuto.search(/% of the time/i);
			if(inizio < 0 || fine < 0) error = true;
			else risultato = contenuto.substring(inizio + firstOffset, fine);
			break;

		case "www.georged.eu":
			var pattern = /<tr><td>Attacker win in : <\/td><td>.+<\/td><\/tr>/i;
			var stringFound = pattern.exec(risposta.responseText);
			if(stringFound != null)
			{
				var tmpString = stringFound.toString();
				risultato = tmpString.substring("<tr><td>Attacker win in : </td><td>".length, tmpString.length - "</td></tr>".length);
				//Trovo la percentuale
				risultato /= 5;
			}
			else
			{
				error = true;
			}
			break;

		default:
			break;
	}

	//Visualizzo il risultato
	if(error) gestisciErroreSimulazione();
	else gestisciRisultato(risultato);
}

/*****************************
Gestisce l'errore da parte del simulatore
*****************************/
function gestisciErroreSimulazione()
{
	//Formatto il dettaglio dell'errore
	messaggio.innerHTML = "<span style=\"color:red;font-weight:bold;\">"+ MSG.simulationFailed +"</span><br/>";
	//Ripristina il pulsante
	switchEnabled();
}

/*****************************
Invia la richiesta al simulatore
*****************************/
function inviaDatiAlSimulatore(dataString, callbackFunction)
{
	//Effettuo la richiesta al simulatore
	GM_xmlhttpRequest
	({
		method: 'POST',
		url: urlSimulatore,
		headers: {
			'Host': hostSimulatore,
			'User-agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.0.4) Gecko/2008102920 Firefox/3.0.4',
			'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
			'Accept-Language':'en-us,en;q=0.5',
			'Accept-Encoding':'gzip,deflate',
			'Accept-Charset':'ISO-8859-1,utf-8;q=0.7,*;q=0.7',
			'Keep-Alive':'300',
			'Connection':'keep-alive',
			'Referer': refererUrlSimulatore,
			'Content-type': 'application/x-www-form-urlencoded',
		},
		data : dataString,
		onload: callbackFunction
	});
}


/*****************************
Recupera il nome dell'utente
*****************************/
function getNomeUtente(paginaHTML)
{
    var elemento = document.createElement("div");
	elemento.innerHTML = paginaHTML;
	var ex = ".//span[@class='playername_achievement']"; //v0.5
	if(serverVersion == "v0.4.0") ex = ".//span[@class='playername']";
	tag = document.evaluate(
			ex,
			elemento,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null
	);
	if (tag.snapshotLength) return(tag.snapshotItem(0).innerHTML);
	else return "";
}

/*****************************
Recupera ogni singola statistica
*****************************/
function getStat(statId, paginaHTML)
{
	var elemento = document.createElement("div");
	elemento.innerHTML = paginaHTML;
	var ex = ".//span[@id='"+statId+"']";
	tag = document.evaluate(
			ex,
			elemento,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null
	);
	if (tag.snapshotLength) return(tag.snapshotItem(0).innerHTML);
	else return 0;
}

/*****************************
Gestisce la risposta per la richiesta dei dati dello sfidante (l'utente connesso)
*****************************/
function gestisciRispostaDatiAttaccante(risposta)
{
	//Trovo i parametri dell'attaccante
	paramAttaccante = getParam(risposta.responseText);
	//Invio la richiesta al simulatore, indicando la funzione che gestirà la risposta
	inviaDatiAlSimulatore(impostaDatiSimulatore(), gestisciRispostaDaSimulatore);
}

/*****************************
Trova i parametri dell'utente
*****************************/
function getParam(paginaHTML)
{
	param = new Array();

	//Trovo il nome
	param["nome"] = getNomeUtente(paginaHTML);
	//Trovo le caratteristiche
	param["livello"] = getStat("char_level", paginaHTML);
	param["forza"] = getStat("char_f0", paginaHTML);
	param["abilita"] = getStat("char_f1", paginaHTML);
	param["agilita"]= getStat("char_f2", paginaHTML);
	param["costituzione"]= getStat("char_f3", paginaHTML);
	param["carisma"] = getStat("char_f4", paginaHTML);
	param["intelligenza"] = getStat("char_f5", paginaHTML);
	param["armatura"] = getStat("char_panzer", paginaHTML);
	//Trovo il danno minimo e massimo
	var danno = getStat("char_schaden", paginaHTML);
	danno = danno.split(' - ');
	param["dannoMin"] = danno[0];
	param["dannoMax"] = danno[1];
	//TODO
	param["resistenza_percento"] = "1";
	param["blocco_percento"] = "1";
	param["dannoCritico_percento"] = "1";

	return param;
}

/*****************************
Invia la richiesta dei dati dello sfidante
*****************************/
function getDatiUtente(callbackFunction)
{
	GM_xmlhttpRequest
	({
		method: 'GET',
		url: 'http://'+ window.location.host +'/game/index.php?mod=overview&sh=' + secureHash,
		onload: callbackFunction
	});
}

/*****************************
//Simula la battaglia
*****************************/
function impostaDatiSimulatore()
{
	var stringa = "";

	switch(simulatore)
	{
		case "www.playerutils.com":
			//Imposto le caratteristiche del simulatore
			urlSimulatore = 'http://www.playerutils.com/calc04.php';
			hostSimulatore = 'www.playerutils.com';
			refererUrlSimulatore = 'http://www.playerutils.com/sim.php';
			//Imposto la stringa per il post

			break;

		case "www.georged.eu":
			//Imposto le caratteristiche del simulatore
			urlSimulatore = 'http://www.georged.eu/gladiatus/avyhodnoceni.php?lang=eng';
			hostSimulatore = 'www.georged.eu';
			refererUrlSimulatore = 'http://www.georged.eu/gladiatus/simulatorareny.php?lang=eng';
			//Imposto la stringa per il post
			stringa += "form_utocnikjmeno=" + paramAttaccante["nome"] +
						"&form_utocniklevel=" + paramAttaccante["livello"] +
						"&form_utocniksila=" + paramAttaccante["forza"] +
						"&form_utocnikdovednost=" + paramAttaccante["abilita"] +
						"&form_utocnikobratnost=" + paramAttaccante["agilita"] +
						"&form_utocnikodolnost=" + paramAttaccante["costituzione"] +
						"&form_utocnikcharizma=" + paramAttaccante["carisma"] +
						"&form_utocnikpruznost=" + paramAttaccante["resistenza_percento"] +
						"&form_utocnikblokovani=" + paramAttaccante["blocco_percento"] +
						"&form_utocnikzbroj=" + paramAttaccante["armatura"] +
						"&form_utocnikposkozenidolnihranice=" + paramAttaccante["dannoMin"] +
						"&form_utocnikposkozenihornihranice=" + paramAttaccante["dannoMax"] +
						"&form_utocnikkritickeposkozeni=" + paramAttaccante["dannoCritico_percento"]+
						"&form_obrancejmeno=" + paramDifensore["nome"] +
						"&form_obrancelevel=" + paramDifensore["livello"] +
						"&form_obrancesila=" + paramDifensore["forza"] +
						"&form_obrancedovednost=" + paramDifensore["abilita"] +
						"&form_obranceobratnost=" + paramDifensore["agilita"] +
						"&form_obranceodolnost=" + paramDifensore["costituzione"] +
						"&form_obrancecharizma=" + paramDifensore["carisma"] +
						"&form_obrancepruznost=" + paramDifensore["resistenza_percento"] +
						"&form_obranceblokovani=" + paramDifensore["blocco_percento"] +
						"&form_obrancezbroj=" + paramDifensore["armatura"] +
						"&form_obranceposkozenidolnihranice=" + paramDifensore["dannoMin"] +
						"&form_obranceposkozenihornihranice=" + paramDifensore["dannoMax"] +
						"&form_obrancekritickeposkozeni=" + paramDifensore["dannoCritico_percento"]+
						"&proklik=&submit13=Send";
			break;

		default:
			break;
	}

    return stringa;
}

/*****************************
//Simulate the battle
*****************************/
function simulateBattle()
{
    //Imposto il pulsante in waiting
	switchEnabled();
	//Recupero i dati dello sfidato dalla pagina corrente
	paramDifensore = getParam(document.getElementsByTagName("body")[0].innerHTML);
	//Recupero i dati dello sfidante (l'utente connesso) dalla pagina di overview
	getDatiUtente(gestisciRispostaDatiAttaccante);
}

/*****************************
Funzione di inizializzazione della grafica
*****************************/
function createLayout()
{
	//Creo il pulsante Simula
	simulaButton = document.createElement('input');
	simulaButton.value = MSG.simulate;
	simulaButton.className = "button3";
	simulaButton.type = "button";
	simulaButton.id = idSimula;
	//Affianco il pulsante Simula al pulsante Vai!
	vai.parentNode.insertBefore(simulaButton, vai.nextSibling);
}

/*****************************
Gestisce la risposta per la richiesta dei dati dell'utente connesso)
*****************************/
function gestisciRispostaDatiUtente(risposta)
{
	//Recupero il testo della risposta
	paginaHTML = risposta.responseText;
	//Trovo il nome dell'utente
	var idUtente = getIDUtente(paginaHTML);
	//Trovo il checkbox corrispondente
	var allCheckbox = document.evaluate("//input[@name='qq"+ idUtente +"']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if(allCheckbox.snapshotLength > 0)
	{
		var checkbox = allCheckbox.snapshotItem(0);
		checkbox.checked = "";
		return true;
	}
	//Non ho trovato i dati che mi servivano, significa che l'utente non sta visualizzando la pagina correttamente
	return false;
}

/********************
Simulazione battaglia
********************/
if(isPlayerOverviewPage)
{
	//Trovo il pulsante Vai!
	var allInput;
	if(serverVersion == "v0.4.0") allInput = document.evaluate("//input[@onclick='startFightWidthName();']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	else allInput = document.evaluate("//input[@onclick='startFightWithName();']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if(allInput.snapshotLength > 0)
	{
		vai = allInput.snapshotItem(0);
		//Creo un messaggio vuoto prima del pulsante
		messaggio = document.createElement('span');
		messaggio.id = idMessaggio;
		//Inserisco il messaggio
		vai.parentNode.insertBefore(messaggio, vai);
		//Imposto il simulatore
		simulatore = GM_getValue("simulatorEngine", "www.georged.eu");
		//Controllo se la simulazione è automatica
		if(GM_getValue("autoSimulateBattle", false))
		{
			messaggio.innerHTML = "<strong>"+ MSG.simulating +"</strong><br/>";
			//Simulo la battaglia
			simulateBattle();
		}
		else
		{
			messaggio.innerHTML = "&nbsp;";
			//Inizializzo la grafica
			createLayout();
			//attivo un listener sull'evento onclick
			activateClickListener = true;
		}
	}
}