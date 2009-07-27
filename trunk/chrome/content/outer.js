// @name            Gladiatus Tools
// @namespace       http://www.neurone.it/index.php/gladiatus-tools/
// @autor           Giuseppe Bertone

it.neurone.gladiatustools.outer = function() {

	var sb, isOverview;
	var avatarImageWidth = "168";
	var avatarImageHeight = "194";
	var guildImageWidth = "209";
	var guildImageHeight = "232";
	var HIDDEN = "hidden";
	
	var common_siteUrl, common_siteUrlAjax, common_siteMod, secureHash, serverVersion;
	var common_regexp = /^(.*\?)mod=(\w+).*sh=([0-9a-fA-F]+)/;
	
	var leftThrobber, rightThrobber;
	
	/*****************************
	Funzioni accessorie per la selezione di elementi DOM, supportate da FF3.5 in poi
	*****************************/
	function $ (selector, el) {
		 if (!el) {el = sb.document;}
		 return el.querySelector(selector);
	}

	function $$ (selector, el) {
		 if (!el) {el = sb.document;}
		 return el.querySelectorAll(selector);
	}
	
	function insertAfter(baseElement, elementToAdd) {
		baseElement.parentNode.insertBefore(elementToAdd, baseElement.nextSibling);
	}
	
	/*****************************
	Recupera la versione del server
	*****************************/
	function getServerVersion() {
		var serverVersionElement = $("span[class='footer_link']", sb.document);
		if(serverVersionElement != null) return serverVersionElement.firstChild.innerHTML;
		return "v0.0.0";
	}
	
	/*****************************
	Recupera il nome dell'utente
	*****************************/
	function getUsername(HTMLPage)
	{
		var elemento = sb.document.createElement("div");
		elemento.innerHTML = HTMLPage;
		var username = $("span[class='playername_achievement']", elemento);
		if(username != null) return username.innerHTML.trim();
		else return "NOT_FOUND";
	}
	
	/*****************************
	Creazione del throbber per il caricamento delle immagini
	*****************************/
	function createThrobber(left, top) 
	{
		var el = sb.document.createElement("div");
		el.setAttribute("style", "float:left");
		el.style.position = "relative";
		el.style.top = top + "px";
		el.style.left = left + "px";
		el.style.width = "16px";
		el.style.height = "16px";
		el.style.background = "url(data:image/png;base64,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)";
		return el;
	}
	
	/*****************************
	Recupera il nome della gilda
	*****************************/
	function getGuildName(HTMLPage)
	{
		var elemento = sb.document.createElement("div");
		elemento.innerHTML = HTMLPage;
		var mainBox = $("div#mainbox", elemento);
		if (mainBox == null) return "NOT_FOUND";
		var THs = $$("th", mainBox);
		if (THs != null) return THs[0].innerHTML.trim();
		return "NOT_FOUND";
	}
	
	/*****************************
	Gestisco la risposta ad una chiamata a GM_xmlhttpRequest per 
	la ricerca dell'immagine dell'avatar di un gladiatore
	*****************************/
	function handleResponse_getCustomAvatarImage(HTMLPage)
	{
		var imageUrl = getGTImageUrl(HTMLPage.responseText);
		var username = getUsername(HTMLPage.responseText);
		if(imageUrl != "")
		{	
			isOverview = false;
			//Imposta l'avatar corretto distinguendo le immagine per nome utente
			setAvatarByName(username, imageUrl);
		} else {
			//L'utente non ha impostato una immagine personalizzata, nascondo il throbber corrispondente
			var gladiators = $$("span[class='playername_achievement']");
			if(gladiators.length == 2)
			{
				if(username == gladiators[0].innerHTML.trim()) leftThrobber.style.visibility = HIDDEN;
				else rightThrobber.style.visibility = HIDDEN;
			}
		}
	}
	
	/*****************************
	Gestisco la risposta ad una chiamata a GM_xmlhttpRequest per 
	la ricerca dell'immagine della gilda
	*****************************/
	function handleResponse_getCustomGuildImage(HTMLPage)
	{
		//Trovo la url
		var imageUrl = getGTGuildImageUrl(HTMLPage.responseText);
		var guildName = getGuildName(HTMLPage.responseText);
		if(imageUrl != "")
		{	
			//Imposta l'immagine della gilda corretta distinguendo per nome utente
			setGuildByName(guildName, imageUrl);
		} else {
			//La gilda non ha un'immagine personalizzata: nascondo il throbber corrispondente
			var guilds = $$("span[class='guildname']");
			if(guilds.length == 2)
			{
				if(guildName == guilds[0].innerHTML.trim()) leftThrobber.style.visibility = HIDDEN;
				else rightThrobber.style.visibility = HIDDEN;
			}
		}
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

	/*****************************
	Cambia effettivamente l'immagine dell'avatar
	*****************************/
	function changeAvatarImage()
	{
		try
		{
			//Nascondo l'eventuale throbber
			if(this.throbber) {
				this.throbber.style.visibility = HIDDEN;
			}
			//Variabili per l'immagine
			var imgWidth = this.width;
			var imgHeight = this.height;
			var aspectRatio = imgWidth / imgHeight;
			//Reimposto l'immagine perché calzi con la dimensione preimpostata
			if(imgWidth > avatarImageWidth)
			{
				imgWidth = avatarImageWidth;
				imgHeight = imgWidth / aspectRatio;
			}
			if(imgHeight > avatarImageHeight)
			{
				imgHeight = avatarImageHeight;
				imgWidth = aspectRatio * imgHeight;
			}
			//Creo la nuova immagine
			var newImg = "<img src=\""+ this.src +"\" style=\"width: "+ imgWidth +"px; height: "+ imgHeight +"px; z-index: 0;\">";
			//Sostituisco l'immagine
			this.imageToSwap.style.backgroundImage = "";
			this.imageToSwap.style.backgroundRepeat = "";
			//Se è la schermata di riepilogo, devo inserire l'immagine all'interno del div p8_1_1
			if(isOverview)
			{
				//Imposto alcune modifiche per preservare le funzionalità di
				//trascinamento sull'immagine del cibo
				var myDiv = sb.document.getElementById("p8_1_1");
				myDiv.style.zIndex = 1;
				//Inserisco la nuova immagine
				myDiv.innerHTML = newImg + myDiv.innerHTML;
			}
			else
			{
				//Inserisco la nuova immagine
				this.imageToSwap.innerHTML = newImg + this.imageToSwap.innerHTML;
			}
		} catch (e) {
			//Null
		}
	}
	
    /*****************************
	Cambia effettivamente il logo della corporazione
	*****************************/
	function changeGuildImage()
	{
		try
		{
			//Nascondo l'eventuale throbber
			if(this.throbber) {
				this.throbber.style.visibility = HIDDEN;
			}
			//Variabili per l'immagine
			var imgWidth = this.width;
			var imgHeight = this.height;
			var aspectRatio = imgWidth / imgHeight;
			//Reimposto l'immagine perché calzi con la dimensione 
			if(imgWidth > guildImageWidth)
			{
				imgWidth = guildImageWidth;
				imgHeight =  imgWidth / aspectRatio;
			}
			if(imgHeight > guildImageHeight)
			{
				imgHeight = guildImageHeight;
				imgWidth = aspectRatio * imgHeight;
			}
			//Assegno un padding all'immagine in base allo spazio non coperto, così che rimaga sempre centrale
			this.imageToSwap.style.paddingTop = parseInt((guildImageHeight - imgHeight) / 2) + "px";
			this.imageToSwap.style.paddingLeft = parseInt((guildImageWidth - imgWidth) / 2) + "px";
			this.imageToSwap.style.paddingRight = parseInt((guildImageWidth - imgWidth) / 2) + "px";
			this.imageToSwap.style.paddingBottom = parseInt((guildImageHeight - imgHeight) / 2) + "px";
			//Sostituisco l'immagine
            this.imageToSwap.src = this.src;
			//Reimposto le dimensioni
			this.imageToSwap.style.width = parseInt(imgWidth) +"px";
			this.imageToSwap.style.height = parseInt(imgHeight) +"px";
		} catch (e) {
			//Null
		}
	}

	/*****************************
	Prepara l'immagine dell'avatar da sostituire
	*****************************/
	function setAvatar(imageUrl)
	{
		try
		{
			//Creo un'immagine con all'interno i dati che mi servono per effettuare lo swap
			var newLogo = new Image();
			newLogo.throbber = leftThrobber;
			newLogo.onload = changeAvatarImage;
			newLogo.src = imageUrl;
			//Imposto il loading dell'immagine
			var allDivs = sb.document.getElementsByTagName("div");
			var imageUrlPattern = /img\/faces\/gladiator_.*jpg/i;
			for (var i = 0; i < allDivs.length; i++) {
				//Controllo se è il div che cerco
				if(imageUrlPattern.test(allDivs[i].style.backgroundImage))
				{
					//Salvo il riferimento all'immagine
					newLogo.imageToSwap = allDivs[i];
					break;
				}
			}			
		} catch (e) {
			//Capita un eccezione quando viene caricata la pagina e allo stesso tempo arrivano
			//nuove merci nei negozi
		}
	}
	
	/*****************************
	Prepara l'immagine dell'avatar da sostituire nelle pagine di report dei combattimenti
	*****************************/
	function setAvatarByName(username, imageUrl)
	{
		try
		{
			var gladiators = $$("span[class='playername_achievement']");
			if(gladiators.length == 2)
			{
				//Assegno il primo gladiatore e successivamente lo riassegno se necessario
				//Salvo l'id del throbber nell'id dell'immagine, così da farlo sparire a caricamento avvenuto
				var elemento = gladiators[0];
				var throbber = leftThrobber;
				if(username == gladiators[1].innerHTML.trim()) {
					elemento = gladiators[1];
					throbber = rightThrobber;
				}
				//Creo un'immagine con all'interno i dati che mi servono per effettuare lo swap
				var newLogo = new Image();
				newLogo.throbber = throbber;
				newLogo.onload = changeAvatarImage;					
				newLogo.src = imageUrl;
				newLogo.imageToSwap = elemento.parentNode.parentNode.childNodes[3];
			}
		} catch (e) {
			//Capita un eccezione quando viene caricata la pagina e allo stesso tempo arrivano
			//nuove merci nei negozi
		}
	}
	
	/*****************************
	Prepara l'immagine dell'avatar da sostituire nelle pagine di report dei combattimenti
	*****************************/
	function setGuildByName(guildName, imageUrl)
	{
		try
		{
			//Trovo i nomi delle gilde sulla pagina
			var guilds = $$("span[class='guildname']");
			if(guilds.length == 2) {
				//Assegno il primo logo e successivamente lo riassegno se necessario
				var elemento = guilds[0];
				var throbber = leftThrobber;
				if(guildName == guilds[1].innerHTML.trim()){
					elemento = guilds[1];
					throbber = rightThrobber;
				}
				//Creo un'immagine con all'interno i dati che mi servono per effettuare lo swap
				var newLogo = new Image();
				newLogo.throbber = throbber;
				newLogo.onload = changeGuildImage;
				newLogo.src = imageUrl;
				newLogo.imageToSwap = elemento.parentNode.parentNode.childNodes[3];					
			}
		} catch (e) {
			//Capita un eccezione quando viene caricata la pagina e allo stesso tempo arrivano
			//nuove merci nei negozi
		}
	}
	
    /*****************************
	Prepara l'immagine della corporazione da sostituire
	*****************************/
	function setGuild(imageUrl)
	{
		try
		{
			//Creo un'immagine con all'interno i dati che mi servono per effettuare lo swap
			var newLogo = new Image();
			newLogo.throbber = leftThrobber;
			newLogo.onload = changeGuildImage;
			newLogo.src = imageUrl;
			//Imposto il loading dell'immagine
			var allImgs = sb.document.getElementsByTagName("img");
			var imageUrlPattern = /img\/logo\/0\/tmp\/.*.png/i;
			for (var i = 0; i < allImgs.length; i++) {
				//Controllo se è il div che cerco
				if(imageUrlPattern.test(allImgs[i].src))
				{
					//Salvo il riferimento all'immagine
					newLogo.imageToSwap = allImgs[i];
					break;
				}
			}
		} catch (e) {
			//Capita un eccezione quando viene caricata la pagina e allo stesso tempo arrivano
			//nuove merci nei negozi
		}
	}

	return	{
		/*****************************
		Gestisce il codice non vincolato allo script Greasemonkey
		*****************************/
	
		//Inizializzazioni
		init : function(sandbox)
		{
			//Sanbox per accedere agli strumenti impostati dal compiler Greasemonkey
		    sb = sandbox;
			serverVersion = getServerVersion();
		},		
		
		//Procedure
		main : function()
		{
		    //Recupero alcune informazioni utili
			var href = sb.location.href;
			var common_result = document.location.href.match(common_regexp);
			if(common_result) {
				common_siteUrl = common_result[1];
				common_siteUrlAjax = common_siteUrl[1].substring(0, common_siteUrl[1].length-"index.php?".length) + 'ajax/';
				common_siteMod = common_result[2];
				secureHash = common_result[3];
			}
			//Imposto le variabili per il check della pagina corrente			
			var isPlayerOverviewPage = ( (/http:\/\/s\d+\.gladiatus\..*\/game\/index\.php\?mod=player.*/.test(href) || /http:\/\/s\d+\.\w\w\.gladiatus\..*\/game\/index\.php\?mod=player.*/.test(href)) &&
				(! 
					( /http:\/\/s\d+\.gladiatus\..*\/game\/index\.php\?mod=player.*&doll=3.*/.test(href) || /http:\/\/s\d+\.\w\w\.gladiatus\..*\/game\/index\.php\?mod=player.*&doll=3.*/.test(href) ||
						/http:\/\/s\d+\.gladiatus\..*\/game\/index\.php\?mod=player.*&doll=4.*/.test(href) || /http:\/\/s\d+\.\w\w\.gladiatus\..*\/game\/index\.php\?mod=player.*&doll=4.*/.test(href) ||
						/http:\/\/s\d+\.gladiatus\..*\/game\/index\.php\?mod=player.*&doll=5.*/.test(href) || /http:\/\/s\d+\.\w\w\.gladiatus\..*\/game\/index\.php\?mod=player.*&doll=5.*/.test(href) ||
						/http:\/\/s\d+\.gladiatus\..*\/game\/index\.php\?mod=player.*&doll=6.*/.test(href) || /http:\/\/s\d+\.\w\w\.gladiatus\..*\/game\/index\.php\?mod=player.*&doll=6.*/.test(href) ||
						/http:\/\/s\d+\.gladiatus\..*\/game\/index\.php\?mod=player.*&submod=stats.*/.test(href) || /http:\/\/s\d+\.\w\w\.gladiatus\..*\/game\/index\.php\?mod=player.*&submod=stats.*/.test(href)
					)
				)
			);
			
			var isMyselfOverviewPage = ( (/http:\/\/s\d+\.gladiatus\..*\/game\/index\.php\?mod=overview.*/.test(href) || /http:\/\/s\d+\.\w\w\.gladiatus\..*\/game\/index\.php\?mod=overview.*/.test(href)) &&
				(!
					( /http:\/\/s\d+\.gladiatus\..*\/game\/index\.php\?mod=overview.*&doll=3.*/.test(href) || /http:\/\/s\d+\.\w\w\.gladiatus\..*\/game\/index\.php\?mod=overview.*&doll=3.*/.test(href) ||
						/http:\/\/s\d+\.gladiatus\..*\/game\/index\.php\?mod=overview.*&doll=4.*/.test(href) || /http:\/\/s\d+\.\w\w\.gladiatus\..*\/game\/index\.php\?mod=overview.*&doll=4.*/.test(href) ||
						/http:\/\/s\d+\.gladiatus\..*\/game\/index\.php\?mod=overview.*&doll=5.*/.test(href) || /http:\/\/s\d+\.\w\w\.gladiatus\..*\/game\/index\.php\?mod=overview.*&doll=5.*/.test(href) ||
						/http:\/\/s\d+\.gladiatus\..*\/game\/index\.php\?mod=overview.*&doll=6.*/.test(href) || /http:\/\/s\d+\.\w\w\.gladiatus\..*\/game\/index\.php\?mod=overview.*&doll=6.*/.test(href) ||
						/http:\/\/s\d+\.gladiatus\..*\/game\/index\.php\?mod=overview.*&submod=stats.*/.test(href) || /http:\/\/s\d+\.\w\w\.gladiatus\..*\/game\/index\.php\?mod=overview.*&submod=stats.*/.test(href) ||
						/http:\/\/s\d+\.gladiatus\..*\/game\/index\.php\?mod=overview.*&submod=memo.*/.test(href) || /http:\/\/s\d+\.\w\w\.gladiatus\..*\/game\/index\.php\?mod=overview.*&submod=memo.*/.test(href) ||
						/http:\/\/s\d+\.gladiatus\..*\/game\/index\.php\?mod=overview.*&submod=buddylist.*/.test(href) || /http:\/\/s\d+\.\w\w\.gladiatus\..*\/game\/index\.php\?mod=overview.*&submod=buddylist.*/.test(href) ||
						/http:\/\/s\d+\.gladiatus\..*\/game\/index\.php\?mod=overview.*&submod=achievements.*/.test(href) || /http:\/\/s\d+\.\w\w\.gladiatus\..*\/game\/index\.php\?mod=overview.*&submod=achievements.*/.test(href)
					)
				)
			)
			
			var isAllyPage = ( /http:\/\/s\d+\.gladiatus\..*\/game\/index\.php\?mod=guild_main&sh=.*/.test(href) || /http:\/\/s\d+\.\w\w\.gladiatus\..*\/game\/index\.php\?mod=guild_main&sh=.*/.test(href) ||
								/http:\/\/s\d+\.gladiatus\..*\/game\/index\.php\?mod=guild_main&i=.*&sh=.*/.test(href) || /http:\/\/s\d+\.\w\w\.gladiatus\..*\/game\/index\.php\?mod=guild_main&i=.*&sh=.*/.test(href) ||
								/http:\/\/s\d+\.gladiatus\..*\/game\/index\.php\?mod=guild_main&i=\d+$/.test(href) || /http:\/\/s\d+\.\w\w\.gladiatus\..*\/game\/index\.php\?mod=guild_main&i=\d+$/.test(href) ||
								/http:\/\/gladiatus\..*\/game\/index\.php\?mod=guild_main&i=\d+$/.test(href) );

			//Mantengo la compatibilità con la vecchia versione del server
			if(serverVersion == "v0.4.0") {
				isAllyPage = ( /http:\/\/s\d+\.gladiatus\..*\/game\/index\.php\?mod=ally&sh=.*/.test(href) || /http:\/\/s\d+\.\w\w\.gladiatus\..*\/game\/index\.php\?mod=ally&sh=.*/.test(href) ||
								/http:\/\/s\d+\.gladiatus\..*\/game\/index\.php\?mod=ally&i=.*&sh=.*/.test(href) || /http:\/\/s\d+\.\w\w\.gladiatus\..*\/game\/index\.php\?mod=ally&i=.*&sh=.*/.test(href) ||
								/http:\/\/s\d+\.gladiatus\..*\/game\/index\.php\?mod=ally&i=\d+$/.test(href) || /http:\/\/s\d+\.\w\w\.gladiatus\..*\/game\/index\.php\?mod=ally&i=\d+$/.test(href) ||
								/http:\/\/gladiatus\..*\/game\/index\.php\?mod=ally&i=\d+$/.test(href) );
			}

			var isGuildCombatPage = /http:\/\/s\d+\.gladiatus\..*\/game\/index\.php\?mod=guild_warcamp&submod=guild_combat&gid=\d+&sh=.*/.test(href) || /http:\/\/s\d+\.\w\w\.gladiatus\..*\/game\/index\.php\?mod=guild_warcamp&submod=guild_combat&gid=\d+&sh=.*/.test(href);
			
			var isGuildCombatReportPage = ( /http:\/\/s\d+\.gladiatus\..*\/game\/index\.php\?mod=guild_warcamp&gcid=\d+&submod=guild_combatreports&sh=.*/.test(href) || /http:\/\/s\d+\.\w\w\.gladiatus\..*\/game\/index\.php\?mod=guild_warcamp&gcid=\d+&submod=guild_combatreports&sh=.*/.test(href) ||
										/http:\/\/s\d+\.gladiatus\..*\/game\/index\.php\?mod=guild_warcamp&submod=guild_combatreports&gcid=\d+&sh=.*/.test(href) || /http:\/\/s\d+\.\w\w\.gladiatus\..*\/game\/index\.php\?mod=guild_warcamp&submod=guild_combatreports&gcid=\d+&sn=.*/.test(href) );

			var isCombatReportPage = ( /http:\/\/s\d+\.gladiatus\..*\/game\/index\.php\?mod=report&beid=.*/.test(href) || /http:\/\/s\d+\.\w\w\.gladiatus\..*\/game\/index\.php\?mod=report&beid=.*/.test(href) ||
										/http:\/\/s\d+\.gladiatus\..*\/game\/index\.php\?mod=report&&beid=.*/.test(href) || /http:\/\/s\d+\.\w\w\.gladiatus\..*\/game\/index\.php\?mod=report&&beid=.*/.test(href) )
										&& !/http:\/\/s\d+\.gladiatus\..*\/game\/index\.php\?mod=report&beid=.*&submod=combatReport/.test(href);
										
			var isExpeditionInProgressPage = ( /http:\/\/s\d+\.gladiatus\..*\/game\/index\.php\?mod=location&loc=\d+&sh=.*/.test(href) ||
											  /http:\/\/s\d+\.\w\w\.gladiatus\..*\/game\/index\.php\?mod=location&loc=\d+&sh=.*/.test(href) ||
											  /http:\/\/s\d+\.gladiatus\..*\/game\/index\.php\?mod=location&loc=\d+&d=\d+&sh=.*/.test(href) ||
											  /http:\/\/s\d+\.\w\w\.gladiatus\..*\/game\/index\.php\?mod=location&loc=\d+&d=\d+&sh=.*/.test(href));
			
		    /************************************
			Visualizzazione dell'avatar personalizzato
			************************************/
		    if(sb.GM_getValue("showCustomAvatarImages", false) && isPlayerOverviewPage)
		    {
			    //Trovo la url
			    var imageUrl = getGTImageUrl(sb.document.body.innerHTML);
			    if(imageUrl != "")
			    {	
			        isOverview = false;
					//Creo un throbber per il caricamento dell'immagine
					leftThrobber = createThrobber(25, 170);
					insertAfter($("div[class='player_name_bg']"), leftThrobber);
					//Carico la nuova immagine
				    setAvatar(imageUrl);
			    }
		    }
		    
		    if(sb.GM_getValue("showCustomAvatarImages", false) && isMyselfOverviewPage)
		    {
		        var imageUrl = sb.GM_getValue("GTImageUrl_" + sb.location.host, "");
		        //Poiché il nome della variabile GTImageUrl è stato modificato dalla versione 1.8.2 per supportare
		        //più server per lo stesso utente, mantengo la retro compatibilità verificando che imageUrl
		        //sia valorizzata correttamente, in caso contrario, tento di riprendere il vecchio valore
		        if(imageUrl == "") imageUrl = sb.GM_getValue("GTImageUrl", "");
		        //Se è stata impostata un'immagine, la carico
		        if(imageUrl != "")
		        {
		            isOverview = true;
			        //Sostituisco l'immagine di default con l'avatar dell'utente
			        setAvatar(imageUrl);
		        }
		    }
			
			if(sb.GM_getValue("showCustomAvatarImages", false) && (isCombatReportPage || isExpeditionInProgressPage) )
		    {
				//Recupero i link alle pagine di overview dei due gladiatori
			    var reportBox = $("div[class='title2_inner']");
				//Se reportBox è null la procedura cmq continua per supportare le altre casistiche
				var gladiatorOverviewPages = $$("a[href*='&p=']", reportBox);
				//Tento di recuperare le immagini associate
				if(gladiatorOverviewPages.length == 2)
				{
					//Creo i due throbber per il loading delle immagine
					var gladiators = $$("span[class='playername_achievement']");
					leftThrobber = createThrobber(10, 230);
					rightThrobber = createThrobber(10, 230);
					//Aggancio i due throbber
					insertAfter(gladiators[0], leftThrobber);
					insertAfter(gladiators[1], rightThrobber);
					//Attaccante
					sb.GM_xmlhttpRequest
					({
						method: 'GET',
						url: gladiatorOverviewPages[0].href,
						onload: handleResponse_getCustomAvatarImage
					});
					//Difensore
					sb.GM_xmlhttpRequest
					({
						method: 'GET',
						url: gladiatorOverviewPages[1].href,
						onload: handleResponse_getCustomAvatarImage
					});
				}
				//Non ho trovato i link, quindi dovrebbe essere il report di una spedizione o una spedizione in corso
				else if ( $("div#p8_1_1") ) {
					var imageUrl = sb.GM_getValue("GTImageUrl_" + sb.location.host, "");
					//Poiché il nome della variabile GTImageUrl è stato modificato dalla versione 1.8.2 per supportare
					//più server per lo stesso utente, mantengo la retro compatibilità verificando che imageUrl
					//sia valorizzata correttamente, in caso contrario, tento di riprendere il vecchio valore
					if(imageUrl == "") imageUrl = sb.GM_getValue("GTImageUrl", "");
					//Se è stata impostata un'immagine, la carico
					if(imageUrl != "")
					{
						isOverview = true;
						//Sostituisco l'immagine di default con l'avatar dell'utente
						setAvatar(imageUrl);
					}
				}
		    }
		
            /************************************
			Visualizzazione del logo della corporazione personalizzato
			************************************/
		    if(sb.GM_getValue("showCustomGuildImages", false) && isAllyPage)
		    {
                //Trovo la url
			    var imageUrl = getGTGuildImageUrl(sb.document.body.innerHTML);
			    if(imageUrl != "")
			    {
					//Creo un throbber per il caricamento dell'immagine
					leftThrobber = createThrobber(7, -26);
					insertAfter($("td[rowspan='10']").childNodes[1], leftThrobber);
				    setGuild(imageUrl);
			    }
		    }
			
			/************************************
			Visualizzazione i loghi delle corporazioni nel report di combattimento
			************************************/
		    if(sb.GM_getValue("showCustomGuildImages", false) && isGuildCombatReportPage)
		    {
				var guildOverviewPages;
				//Recupero i link alle pagine di overview delle due gilde
			    var reportBox = $("div[class='report_statistic']");
				if (reportBox != null)
				{
					guildOverviewPages = $$("a[href*='mod=guild&i=']", reportBox);
					//Tento di recuperare le immagini associate
					if(guildOverviewPages.length == 2)
					{
						//Preparo le url
						guildOverviewPages[0].href = guildOverviewPages[0].href.replace("mod=guild&i", "mod=guild_main&i");
						guildOverviewPages[1].href = guildOverviewPages[1].href.replace("mod=guild&i", "mod=guild_main&i");
						//Creo i due throbber per il loading delle immagine
						var guilds = $$("span[class='guildname']");
						leftThrobber = createThrobber(-12, 240);
						rightThrobber = createThrobber(-12, 240);
						//Aggancio i due throbber
						insertAfter(guilds[0], leftThrobber);
						insertAfter(guilds[1], rightThrobber);						
						//Attaccante
						sb.GM_xmlhttpRequest
						({
							method: 'GET',
							url: guildOverviewPages[0].href,
							onload: handleResponse_getCustomGuildImage
						});
						//Difensore
						sb.GM_xmlhttpRequest
						({
							method: 'GET',
							url: guildOverviewPages[1].href,
							onload: handleResponse_getCustomGuildImage
						});
					}
				}
		    }

		}
	}
}();