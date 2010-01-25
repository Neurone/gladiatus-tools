// @name            Gladiatus Tools
// @namespace       http://www.neurone.it/index.php/gladiatus-tools/
// @autor           Giuseppe Bertone

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
			var inizio = eval("contenuto.search(/" + first + "/i);");
			var fine = eval("contenuto.search(/" + last + "/i);");
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
//Gestisce l'evento mouseUp
*****************************/
function grabClick(event)
{
    //Controllo il click con il tasto sinistro
    if(event.button == 0) {
	
		var target = event.target;
		if (target.href == undefined) target = event.target.parentNode;
	
	    //Controllo se il click è stato effettuato sul pulsante Simula
	    if(event.target.id == idSimula) {
            simulateBattle();
            return;
	    }
		//Controllo se il click è sul pulsante "acquista" nella pagina dell'asta
		if(event.target.name == nomePulsanteAcquistaAsta || event.target.name == nomePulsanteAcquistaMercato) {
			if(!confirm(MSG.confirmBuyout))
			{
				event.stopPropagation();
				event.preventDefault();
			}
			return;
		}
		
        //Controllo se è attiva e utilizzabile la funzionalità smart combat report
        if(event.target.id == "moreDetails1")
	    {
	        setReportDetailsLevel(++SCRLevel);
	        if(SCRLevel == 2) event.target.style.display = "none";
	        event.stopPropagation();
	        event.preventDefault();
	        return;
        }
	    
	    //Controllo se il click è il salva impostazioni	per il profilo utente
	    if(isSettingsPage && event.target.type == "submit") {
		    //Recupero il campo immagine
		    var GTImageUrlField = document.getElementById("GTImageUrl");
            //Salvo la url nelle propery della estensione, così da poterla eventualmente riutilizzare
            //in futuro senza richiamare la pagina di overview
		    GM_setValue("GTImageUrl_" + window.location.host, GTImageUrlField.value)
		    if(GTImageUrlField.value != "")
		    {
			    //Inserisco la nuova impostazione
			    currentAvatarDescriptionField.value += "\n\n[fc]"+shadowingColor+"[fs]10##GTI="+ GTImageUrlField.value +"##[/f][/f]";
		    }
		    return;
	    }
	    
	    //Controllo se il click è il salva impostazioni per la corporazione
	    if(isModAllyPage && event.target.type == "submit" && event.target.name != "dd") {
		    //Recupero il campo immagine
		    var GTGuildImageUrlField = document.getElementById("GTGuildImageUrl");
		    if(GTGuildImageUrlField.value != "")
		    {
			    //Inserisco la nuova impostazione
			    currentGuildDescriptionField.value += "\n\n[fc]"+shadowingColor+"[fs]10##GTGI="+ GTGuildImageUrlField.value +"##[/f][/f]";
		    }
		    return;
	    }
	    
	    if(GM_getValue("rememberTabs", false)) {
	        //Controllo se il click punta ad uno dei negozi
	        if(targetUrlMatch("mod=inventory&sh=.*", target.href) || targetUrlMatch("mod=inventory&sub=[1-5]&sh=.*", target.href)) {
                //Trovo il negozio selezionato
                var negozio = target.href.match(/&sub=[1-5]/);
                if(negozio != null) {
                    //Se esiste, carico l'ultima linguetta selezionata del negozio
                    var subsub = GM_getValue("GT_lastChoiceShop"+ negozio.toString().substr(5,1) + "_" + window.location.host, "0");
                    if(subsub)target.href += "&subsub="+ subsub;
					//Se esiste, carico l'ultima linguetta selezionata dell'inventario
					var inv = GM_getValue("GT_lastChoiceInventory_" + window.location.host, "0");
					if(inv) target.href += "&inv="+ inv;
                }				
	        }
			//Controllo se il click punta al riepilogo, alla selezione dei pacchetti o al mercato
			else if(targetUrlMatch("mod=overview&sh=.*", target.href) ||
					targetUrlMatch("mod=packages&sh=.*", target.href) ||
					targetUrlMatch("mod=packages&o=.*&sh=.*", target.href) ||
					targetUrlMatch("mod=market&sh=.*", target.href) ||
					targetUrlMatch("mod=market&f=.*&sh=.*", target.href)) {
				//Se esiste, carico l'ultima linguetta selezionata dell'inventario
                var inv = GM_getValue("GT_lastChoiceInventory_" + window.location.host, "0");
                if(inv) target.href += "&inv="+ inv;
			}
	        //Controllo se il click punta ad una linguetta di un negozio
            else if(targetUrlMatch("mod=inventory&subsub=[0-2]&.*", target.href)) {
                //Trovo il negozio selezionato
                var negozio = target.href.match(/&sub=[1-5]/);
                if(negozio != null) {
                    //Trovo la linguetta selezionata
                    var linguetta = target.href.match(/&subsub=[0-2]/);
                    if(linguetta) {
                        //Salvo la linguetta selezionata per la visualizzazione successiva
                        GM_setValue("GT_lastChoiceShop"+ negozio.toString().substr(5,1) + "_" + window.location.host, linguetta.toString().substr(8,1));
                    }
                }
	        }
			//Controllo se il click punta ad una linguetta dell'inventario
            else if(targetUrlMatch("mod=inventory&inv=[0-2]&.*", target.href) ||
					targetUrlMatch("mod=overview&inv=[0-2]&.*", target.href) ||
					targetUrlMatch("mod=packages&inv=[0-2]&.*", target.href) ||
					targetUrlMatch("mod=market&inv=[0-2]&.*", target.href)) {
				//Trovo la linguetta selezionata
				var linguetta = target.href.match(/&inv=[0-2]/);
				if(linguetta) {
					//Salvo la linguetta selezionata per la visualizzazione successiva
					GM_setValue("GT_lastChoiceInventory_" + window.location.host, linguetta.toString().substr(5,1));
				}
			}
	        return;
        }
    }
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

/**********************************************************************************************************************/
/**********************************************************************************************************************/
/**********************************************************************************************************************/
/**********************************************************************************************************************/

/*****************************
Recupera il nome dell'utente
*****************************/
function getIDUtente(paginaHTML)
{
	var pattern = /uid=.+<\/b/i;
	var tmpString = pattern.exec(paginaHTML).toString();
	//Recupero solo l'id numerico
	pattern = /[0-9]+/i;
	tmpString = pattern.exec(tmpString).toString();
	return tmpString;
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

/*****************************
Decido se inviare il messaggio della corp all'utente loggato
*****************************/
function excludeMe()
{
	//Trovo l'id dell'utente loggato
	getDatiUtente(gestisciRispostaDatiUtente);	
}

/**********************************************************************************************************************/
/**********************************************************************************************************************/
/**********************************************************************************************************************/
/**********************************************************************************************************************/

function GTImageVersion(stringa)
{
    //Trovo la url
	var pattern = /\[fs\]10##GTI=.*##/i;
	if(pattern.exec(stringa) == null) return 161;
	return versionID;
}

/*****************************
Trova la url dell'immagine impostata per l'avatar personalizzato
*****************************/
function getGTImageUrl(stringa)
{
	//Trovo la url
	var pattern = /##GTI=.*##/i;
	var tmpString = pattern.exec(stringa);
	if(tmpString != null)
	{
		tmpString = tmpString.toString();
		return tmpString.substring(6, tmpString.length - 2);
	}
	return "";
}

/*****************************
Trova la url dell'immagine impostata per la corporazione
*****************************/
function getGTGuildImageUrl(stringa)
{
	//Trovo la url
	var pattern = /##GTGI=.*##/i;
	var tmpString = pattern.exec(stringa);
	if(tmpString != null)
	{
		tmpString = tmpString.toString();
		return tmpString.substring(7, tmpString.length - 2);
	}
	return "";
}

/**********************************************************************************************************************/
/**********************************************************************************************************************/
/**********************************************************************************************************************/
/**********************************************************************************************************************/

/*****************************
Nasconde gli oggetti non acquistabili
*****************************/
function hideNotAffordableObjects()
{
    if( isShopPage && GM_getValue("hideNotAffordable", false) &&
        unsafeWindow.res1 != null && unsafeWindow.res2 != null )
    {
	    //Recupero tutti gli spazi del negozio
	    var allDivs = document.evaluate("div", document.getElementById("shop"), null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	    for (var i = 0; i < allDivs.snapshotLength; i++)
	    {
		    var oggetto = allDivs.snapshotItem(i);
            var info = unsafeWindow.document.getElementById(oggetto.id).ddObj;
            if(info)
            {
                //Aggiungo della trasparenza all'oggetto se il suo prezzo è troppo alto
                if(info.iid && (info.preis > unsafeWindow.res1 || info.preis2 > unsafeWindow.res2)) oggetto.style.opacity = objectTransparency;
                else oggetto.style.opacity = 1;
            }
	    }	
	}
}

/**********************************************************************************************************************/
/**********************************************************************************************************************/
/**********************************************************************************************************************/
/**********************************************************************************************************************/

/*****************************
Per intercettare il drop dell'oggetto, sovrascrivo una funzione del sito
*****************************/
oldSetToolTip = unsafeWindow.SetToolTip;
unsafeWindow.SetToolTip = function (updateTooltip)
{
    if(updateTooltip)
    {
        setTimeout(hideNotAffordableObjects, 900);
    	setTimeout(showAdditionalTooltips, 1000);
    }
	return oldSetToolTip(updateTooltip);
}

/*****************************
Imposta il tooltip per un oggetto
*****************************/
function setNewTooltip(info, id)
{
	//Trovo l'oggetto dell'utente
	var oggetto = unsafeWindow.document.getElementById(id).ddObj;
	//Creo un nuovo tooltip. Se l'oggetto non è ancora stato inizializzato o è appena stato spostato
	//il suo tooltip non prevede l'aggiunta fatta dall'addon: in questo modo capisco se aggiornare o meno il tooltip.
	if(info.tooltip.indexOf("<!--GT-->") < 0) {
	    info.tooltip = "<!--GT--><table><tr><td>"+ oggetto.tooltip +"</td></tr><tr><td>"+ info.tooltip +"</td></tr></table>";
    }
}

/*****************************
Imposta il tooltip per due oggetti
*****************************/
function setNewTooltip2Obj(info, id1, id2)
{
	//Trovo l'oggetto dell'utente
	var oggetto1 = unsafeWindow.document.getElementById(id1).ddObj;
	var oggetto2 = unsafeWindow.document.getElementById(id2).ddObj;
	//Creo un nuovo tooltip
	if(!info.originalTooltip)
	{
		info.originalTooltip = info.tooltip;
	}
	info.tooltip = "<table><tr><td>"+ oggetto1.tooltip +"</td></tr><tr><td>"+	
    				oggetto2.tooltip +"</td></tr><tr><td>"+	
    				info.originalTooltip +"</td></tr></table>";
}

/*****************************
Reimposta i tooltip
*****************************/
function showAdditionalTooltips()
{
    if((isMyselfOverviewPage || isShopPage || isMyBuddiesOverviewPage) &&
        GM_getValue("showAdditionalTooltips", false) &&
        unsafeWindow.DDObj )
    {
        //Definisco un nuovo attributo
        unsafeWindow.DDObj.originalTooltip;
	    //Recupero tutti gli spazi dell'inventario
	    allDivs = document.evaluate("div", document.getElementById("inv"), null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);	
	    for (var i = 0; i < allDivs.snapshotLength; i++)
	    {
		    var oggetto = allDivs.snapshotItem(i);
            var info = unsafeWindow.document.getElementById(oggetto.id).ddObj;
            if(info)
            {
                //Controllo le varie tipologie di oggetti
                switch(info.contenttype)
		        {
		            case 1:
		    	        //Nulla oppure cappuccio
		    	        if(info.preis > 0) setNewTooltip(info, "p2_1_1");
			            break;
		            case 2:
		    	        //Arma
		                setNewTooltip(info, "p3_1_1");
			            break;			    
		            case 4:
		    	        //Scudo
		                setNewTooltip(info, "p4_1_1");
			            break;
			        case 8:
		    	        //Armatura
		                setNewTooltip(info, "p5_1_1");
			            break;
			        case 48:
		    	        //Anello
		                setNewTooltip2Obj(info, "p6_1_1", "p7_1_1");
			            break;
			        case 256:
		    	        //Guanti
		                setNewTooltip(info, "p9_1_1");
			            break;
			        case 512:
		    	        //Stivali
		                setNewTooltip(info, "p10_1_1");
			            break; 
                    case 1024:
            	        //Collana
                        setNewTooltip(info, "p11_1_1");
			            break;
                    default:
			            break;
		        }
            }
	    }
        //Reinizializzo i tooltip
        if(unsafeWindow.tt_Init) unsafeWindow.tt_Init(1);
    }
}

/**********************************************************************************************************************/
/**********************************************************************************************************************/
/**********************************************************************************************************************/
/**********************************************************************************************************************/

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

/************************************
Gestione pagina del profilo
************************************/	
if(isSettingsPage)
{
	//Creo le nuove impostazioni
	var desc = document.getElementsByName("rpg");
	if (desc.length == 1) {
		//Gestisco la scomparsa dell'impostazione dalla textarea, così che l'utente non possa modificarla direttamente
		currentAvatarDescriptionField = desc[0];
		currentGTAvatarImageUrl = getGTImageUrl(currentAvatarDescriptionField.value);
		if(currentGTAvatarImageUrl != "")
		{
			//Rimuovo dalla text area la stringa
			var valore = currentAvatarDescriptionField.value;
			var offset = valore.length - ("  "+"[fc]"+shadowingColor+"[fs]10##GTI="+currentGTAvatarImageUrl+"##[/f][/f]").length;
			//Dalla versione 1.7.0 è stata aggiunta in testa alla formattazione "[fs]10" e "[/f]", cioè 10 caratteri in più.
			//Per supportare al meglio l'upgrade, controllo se è presente una vecchia versione e aggiorno l'offset di conseguenza
			if(GTImageVersion(currentAvatarDescriptionField.value) < 170) offset += 10;
			currentAvatarDescriptionField.value = valore.substring(0, offset);
		}
		//Creo l'impostazione nella pagina dei settings, iniziando dal titolo
		var title;
		if(serverVersion == "v0.4.0") {
		    title = document.createElement("h2");
		    title.innerHTML = MSG.customAvatarImageUrl;		    
		}
		else {
            title = document.createElement("span");
		    title.innerHTML = "<br/><br/><strong>"+ MSG.customAvatarImageUrl +"</strong>";
		}
		//Creo il paragrafo
		var paragraph = document.createElement("p");
		//Creo l'immagine
		var imageUrlField = document.createElement("input");
		imageUrlField.id = "GTImageUrl";
		imageUrlField.size = "73";
		imageUrlField.value = currentGTAvatarImageUrl;
		//Aggiungo gli elementi creati al DOM
		currentAvatarDescriptionField.parentNode.insertBefore(title, currentAvatarDescriptionField.nextSibling);
		title.parentNode.insertBefore(paragraph, title.nextSibling);
		paragraph.parentNode.insertBefore(imageUrlField, paragraph.nextSibling);
	}
	
	//attivo un listener sull'evento onclick
	activateClickListener = true;
}

/************************************
Gestione pagina della descrizione della corporazione
************************************/	
if(isModAllyPage)
{
	//Creo le nuove impostazioni
	var desc = document.getElementsByName("description");
	if(serverVersion == "v0.4.0") desc = document.getElementsByName("bes");
	if (desc.length == 1) {
		//Gestisco la scomparsa dell'impostazione dalla textarea, così che l'utente non possa modificarla direttamente
		currentGuildDescriptionField = desc[0];
		currentGTGuildImageUrl = getGTGuildImageUrl(currentGuildDescriptionField.value);
		if(currentGTGuildImageUrl != "")
		{
			//Rimuovo dalla text area la stringa
			var valore = currentGuildDescriptionField.value;
			var offset = valore.length - ("  "+"[fc]"+shadowingColor+"[fs]10##GTGI="+currentGTGuildImageUrl+"##[/f][/f]").length;
			currentGuildDescriptionField.value = valore.substring(0, offset);
		}
		//Creo l'impostazione nella pagina dei settings, iniziando dal titolo
		var title;
		if(serverVersion == "v0.4.0") {
		    title = document.createElement("h2");
		    title.innerHTML = MSG.customGuildImageUrl;	    
		}
		else {
            title = document.createElement("span");
		    title.innerHTML = "<br/><br/><strong>"+ MSG.customGuildImageUrl +"</strong>";
		}
		//Creo il paragrafo
		var paragraph = document.createElement("p");
		//Creo l'immagine
		var imageUrlField = document.createElement("input");
		imageUrlField.id = "GTGuildImageUrl";
		imageUrlField.size = "73";
		imageUrlField.value = currentGTGuildImageUrl;
		//Aggiungo gli elementi creati al DOM
		currentGuildDescriptionField.parentNode.insertBefore(title, currentGuildDescriptionField.nextSibling);
		title.parentNode.insertBefore(paragraph, title.nextSibling);
		paragraph.parentNode.insertBefore(imageUrlField, paragraph.nextSibling);
	}
	
	//attivo un listener sull'evento onclick
	activateClickListener = true;
}

/************************************
 Esclusione messaggistica corporazione
************************************/
if(isSendGuildMessagePage && GM_getValue("excludeMeFromCorporateMessages", false))
{
    excludeMe();
}

/************************************
Gestione statistiche utente complete
************************************/
if((isMyselfOverviewPage || isPlayerOverviewPage || isMyBuddiesOverviewPage || isPlayerBuddiesOverviewPage) && GM_getValue("showFullStats", false))
{
    //Guarigione
    var guarigione = document.getElementById("char_healing_tt");
    if(guarigione != null) guarigione.style.display = "";
    //Minaccia
    var minaccia = document.getElementById("char_threat_tt");
    if(minaccia != null) minaccia.style.display = "";
}

/************************************
Gestione timer
************************************/
if(GM_getValue("showTimers", false))
{
    showTimers();
}

/************************************
//Controllo i tooltip aggiuntivi
************************************/
showAdditionalTooltips();

/************************************
//Nascondo gli oggetti non acquistabili
************************************/
hideNotAffordableObjects();

/************************************
/ Gestione della dimensione dei campi
************************************/
if(isMemoPage) {
	showBigNotes();
}

if(isWriteMessagePage || isGenericMessagePage) {
	showBigWriteMessage();
}

/************************************
/ Gestione dei contatori di caratteri sui campi
************************************/
if(GM_getValue("showCharactersLeft", false))
{
	if(isMemoPage) updateNotesTextArea(maxCharsExtraLarge);
	if(isWriteMessagePage || isGenericMessagePage) updateWriteMessageTextArea(maxCharsSmall);
	if(isAllySendMessagePage) updateAllyMessageTextArea(maxCharsMedium);
	if(isModAllyPage) updateAllyDescriptionTextArea(maxCharsLarge);
	if(isSettingsPage) {
		updatePlayerDescriptionTextArea(maxCharsSmall);
		updateCatchTextArea(maxCharsSmall);
	}
	if(isMemoPage || isWriteMessagePage || isGenericMessagePage ||
		isModAllyPage || isSettingsPage || isAllySendMessagePage) {
		activateKeyPressListener = true;
	}
}

/************************************
/ Statistiche avanzate
************************************/
if((isPlayerStatsPage || isOpponentStatsPage) && GM_getValue("showAdditionalStats", false)) showAdvancedStats();

/************************************
/ Smart combat report
************************************/
if(isCombatReportPage && (SCRLevel < 2)) showSmartCombatReport();

/************************************
/ Valorizzazione automatica dei campi dell'asta
************************************/
if(GM_getValue("enableAutoFillAuctionFields", false) && isAuctionPage) autoFillAuctionFields();

/************************************
/ Pulsanti di prima / ultima pagina nell'elenco dei pacchetti
************************************/
if(isPackagesListPage) {
	//Trovo un valore di riferimento dal quale partire per cercare il numero di pagine
	var divs = document.evaluate("//div[@class='title_box']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	//Verifico se le pagine sono più di una (vengono visualizzate 4 linee invece che le solite 3)
	if(divs.snapshotLength > 0 && divs.snapshotItem(0).parentNode.parentNode.parentNode.childNodes.length > 6) {
		var first = "";
		var last = "";
		//Se esiste, carico l'ultima linguetta selezionata dell'inventario
		var inv = GM_getValue("GT_lastChoiceInventory_" + window.location.host, "0");
		//Recupero il campo da modificare
		var td = divs.snapshotItem(0).parentNode.parentNode.parentNode.childNodes[4].childNodes[1];
		//Verifico il numero totale di pagine
		var pagine = safeParseInt(td.innerHTML.match(/\d+ \/ (\d+)/)[1]);
		//Se non sono alla prima, visualizzo il simbolo di ritorno alla prima pagina
		var pagina = safeParseInt(getURLParam("p"));
		if(pagina > 1) {
			first = "<a style='text-decoration:none;' href='http://"+ window.location.host +"/game/index.php?mod=packages&inv="+ inv +"&p=0&sh="+ secureHash +"'>|&lt;&lt;</a>";
		}
		//Se non sono all'ultima, visualizzo il simbolo per andare all'ultima pagina
		if(pagina < pagine) {
			last = "&nbsp;&nbsp;&nbsp;<a style='text-decoration:none;' href='http://"+ window.location.host +"/game/index.php?mod=packages&inv="+ inv +"&p=9999&sh="+ secureHash +"'>&gt;&gt;|</a>"
		}
		//Modifico la linea
		var modifica = "<div style='float:right;'>"+ first + last +"</div>";
		td.innerHTML += modifica;
		//Modifico allo stesso modo anche la seconda linea di footer con la navigazione
		divs = document.evaluate("//div[@class='title2_inner']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		if(divs.snapshotLength > 0) {
			//Recupero la posizione, variabile a seconda del numero di oggetti nella lista
			td = divs.snapshotItem(0).childNodes[1].childNodes[1].childNodes[2];
			//Se non è definito, significa che ci sono 3 o 4 oggetti nella pagina
			if(td.innerHTML == undefined) {
				td = divs.snapshotItem(0).childNodes[1].childNodes[1].childNodes[3];
			}
		}
		td.childNodes[1].innerHTML += modifica;
	}
}

/************************************
/ Gestione grab del click dell'utente
/***********************************/
//A causa dell'introduzione del remember last selected tab, non posso più
//basarmi solamente sulla url corrente per capire se devo grabbare il click,
//quindi per ora lo attivo sempre, in attesa di una revisione generale più performante
if(true) {
    activateClickListener = true;
}

/************************************
 Se necessario, attivo la gestione dell'evento click
************************************/	
if(activateClickListener)
{
	//Imposto un listener sull'evento onclick
    window.addEventListener('click', grabClick, true);
}

/************************************
 Se necessario, attivo la gestione della tastiera
************************************/	
if(activateKeyPressListener)
{
	//alert("grab key attivo");
	window.addEventListener('keydown', grabKeyPress, true);
	window.addEventListener('keyup', grabKeyPress, true);
}