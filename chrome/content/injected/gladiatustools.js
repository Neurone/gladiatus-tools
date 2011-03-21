// @name            	Gladiatus Tools
// @namespace       	http://www.neurone.it/index.php/gladiatus-tools/
// @autor           	Giuseppe Bertone
// @debuging commiter	Proximilius (H.R Scholten)

//*****************************
// Handle mouseUp event
//*****************************
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

		if(event.target.name == nomePulsanteAcquistaAsta || event.target.name == nomePulsanteAcquistaMercato)
		{
			//Controllo le preferenze di alert sull'acquisto diretto
			var showBuyAlert;
			switch(GM_getValue("buyAlert", "2"))
			{
				case "0":
					return;

				case "1":
					showBuyAlert = (event.target.name == nomePulsanteAcquistaMercato);
					break;

				case "2":
					showBuyAlert = (event.target.name == nomePulsanteAcquistaAsta);
					break;

				default:
					showBuyAlert = true;
					break;
			}
			//Controllo se il click è sul pulsante "acquista" nella pagina dell'asta
			if(showBuyAlert && !confirm(MSG.confirmBuyout))
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
				//@Explicit_RichTextArea_Reference
			    currentAvatarDescriptionField.value += "\n\n[f c="+shadowingColor+"][f s=10]##GTI="+ GTImageUrlField.value +"##[/f][/f]";
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
				//@Explicit_RichTextArea_Reference
			    currentGuildDescriptionField.value += "\n\n[f c="+shadowingColor+"][f s=10]##GTGI="+ GTGuildImageUrlField.value +"##[/f][/f]";
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
            else if(targetUrlMatch("mod=inventory&inv=[0-3]&.*", target.href) ||
					targetUrlMatch("mod=overview&inv=[0-3]&.*", target.href) ||
					targetUrlMatch("mod=packages&inv=[0-3]&.*", target.href) ||
					targetUrlMatch("mod=market&inv=[0-3]&.*", target.href)) {
				//Trovo la linguetta selezionata
				var linguetta = target.href.match(/&inv=[0-3]/);
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
	//@Explicit_RichTextArea_Reference
	var pattern = /\[f s=10\]##GTI=.*##/i;
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

//*****************************
//Hide items not available for purchase
//*****************************
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
(Overwrite a function of the site, to catch the drop object)
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
(Sets the tooltip for an object)
*****************************/
function setNewTooltip(info, id)
{
	//Trovo l'oggetto dell'utente
	//(Find the user's object)
	var oggetto = unsafeWindow.document.getElementById(id).ddObj;
	//Creo un nuovo tooltip. Se l'oggetto non è ancora stato inizializzato o è appena stato spostato
	//il suo tooltip non prevede l'aggiunta fatta dall'addon: in questo modo capisco se aggiornare o meno il tooltip.
	//(Create a new tooltip. In case the object has not been intialized or just been moved the tooltip does not
	//include the addtition made by the adon. : now it would be clear to update the tooltip or not)
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
			//@Explicit_RichTextArea_Reference
			var offset = valore.length - ("  [f c="+shadowingColor+"][f s=10]##GTI="+currentGTAvatarImageUrl+"##[/f][/f]").length;
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
			//@Explicit_RichTextArea_Reference
			var offset = valore.length - ("  [f c="+shadowingColor+"][f s=10]##GTGI="+currentGTGuildImageUrl+"##[/f][/f]").length;
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
/ Collegamento veloce alla messaggistica della gilda
/***********************************/
if(GM_getValue("showSendGuildMessageIcon", true))
{
	showSendGuildMessageIcon();
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
	//(I find it a benchmark from which to look up the number of pages)
	var divs = document.evaluate("//div[@class='title_box']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	//Verifico se le pagine sono più di una (vengono visualizzate 4 linee invece che le solite 3)
	//(Check whether the pages are more than one (4 lines are displayed instead of the usual 3))
	if(divs.snapshotLength > 0 && divs.snapshotItem(0).parentNode.parentNode.parentNode.childNodes.length > 6) {
		var first = "";
		var last = "";
		//Se esiste, carico l'ultima linguetta selezionata dell'inventario
		//(If it exists, load the last selected inventory tab)
		var inv = GM_getValue("GT_lastChoiceInventory_" + window.location.host, "0");
		//Recupero il campo da modificare
		//(Recover the field to edit)
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
		var modifica = "<td style='float:right;'>"+ first + last +"</td>";
		td.innerHTML += modifica;
		//Modifico allo stesso modo anche la seconda linea di footer con la navigazione
		//(I edit the same way the second line with the footer navigation)
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
	window.addEventListener('keydown', grabKeyPress, true);
	window.addEventListener('keyup', grabKeyPress, true);
}