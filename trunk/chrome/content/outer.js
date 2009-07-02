// @name            Gladiatus Tools
// @namespace       http://www.neurone.it/index.php/gladiatus-tools/
// @autor           Giuseppe Bertone

it.neurone.gladiatustools.outer = function() {

	var sb, swapImage, imageToSwap, isOverview;
	var avatarImageWidth = "168";
	var avatarImageHeight = "194";
	var guildImageWidth = "209";
	var guildImageHeight = "232";

	/*****************************
	Recupera la versione del server
	*****************************/
	function getServerVersion(document) {
		var ex = ".//span[@class='footer_link']";
		tag = document.evaluate( 
				ex,
				document,
				null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
				null
		);
		if (tag.snapshotLength) return(tag.snapshotItem(0).firstChild.innerHTML);
		else return "v0.0.0";
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
	function changeImage()
	{
		try
		{
			var imgWidth = swapImage.width;
			var imgHeight = swapImage.height;
			var aspectRatio = imgWidth / imgHeight;
			
			//Reimposto l'immagine perché calzi con la dimensione 
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
			var newImg = "<img src=\""+ swapImage.src +"\" style=\"width: "+ imgWidth +"px; height: "+ imgHeight +"px; z-index: 0;\">";
			//Sostituisco l'immagine
			imageToSwap.style.backgroundImage = "";
			imageToSwap.style.backgroundRepeat = "";

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
				imageToSwap.innerHTML = newImg + imageToSwap.innerHTML;
			}
			//Ripristino l'opacità dell'immagine
			imageToSwap.style.opacity = 1;
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
			var imgWidth = swapImage.width;
			var imgHeight = swapImage.height;
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
			//Reimposto le dimensioni
			imageToSwap.style.width = parseInt(imgWidth) +"px";
			imageToSwap.style.height = parseInt(imgHeight) +"px";
            //Sostituisco l'immagine
            imageToSwap.src = swapImage.src;
			//Ripristino l'opacità dell'immagine
			imageToSwap.style.opacity = 1;			
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
			//Imposto il loading dell'immagine
			var allDivs = sb.document.getElementsByTagName("div");
			var imageUrlPattern = /img\/faces\/gladiator_.*jpg/i;
			for (var i = 0; i < allDivs.length; i++) {
				//Controllo se è il div che cerco
				if(imageUrlPattern.test(allDivs[i].style.backgroundImage))
				{
					//Salvo il riferimento all'immagine
					imageToSwap = allDivs[i];
					//Metto l'immagine in trasparenza
					imageToSwap.style.opacity = 0.2;
					break;
				}
			}
			//Recupero i dati dell'immagine
			swapImage = new Image();
			swapImage.onload = changeImage;
			swapImage.src = imageUrl;
		} catch (e) {
			//Capita un eccezione quando viene caricata la pagina e allo stesso tempo arrivano
			//nuove merci nei negozi
		}
	}
	
    /*****************************
	Prepara l'immagine della corporazione da sostituire
	*****************************/
	function setGuildImage(imageUrl)
	{
		//Imposto il loading dell'immagine
		var allImgs = sb.document.getElementsByTagName("img");
		var imageUrlPattern = /img\/logo\/0\/tmp\/.*.png/i;
		for (var i = 0; i < allImgs.length; i++) {
			//Controllo se è il div che cerco
			if(imageUrlPattern.test(allImgs[i].src))
			{
				//Salvo il riferimento all'immagine
				imageToSwap = allImgs[i];
				//Metto l'immagine in trasparenza
				imageToSwap.style.opacity = 0.2;
				break;
			}
		}
		//Recupero i dati dell'immagine
		swapImage = new Image();
		swapImage.onload = changeGuildImage;
		swapImage.src = imageUrl;
	}

	return	{	
		/*****************************
		Gestisce il codice non vincolato allo script Greasemonkey
		*****************************/
		main : function(sandbox)
		{   
		    //Sanbox per accedere agli strumenti impostati dal compiler Greasemonkey
		    sb = sandbox;
		    var href = sb.location.href;
		    
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
			if(getServerVersion(sb.document) == "v0.4.0") {
				isAllyPage = ( /http:\/\/s\d+\.gladiatus\..*\/game\/index\.php\?mod=ally&sh=.*/.test(href) || /http:\/\/s\d+\.\w\w\.gladiatus\..*\/game\/index\.php\?mod=ally&sh=.*/.test(href) ||
								/http:\/\/s\d+\.gladiatus\..*\/game\/index\.php\?mod=ally&i=.*&sh=.*/.test(href) || /http:\/\/s\d+\.\w\w\.gladiatus\..*\/game\/index\.php\?mod=ally&i=.*&sh=.*/.test(href) ||
								/http:\/\/s\d+\.gladiatus\..*\/game\/index\.php\?mod=ally&i=\d+$/.test(href) || /http:\/\/s\d+\.\w\w\.gladiatus\..*\/game\/index\.php\?mod=ally&i=\d+$/.test(href) ||
								/http:\/\/gladiatus\..*\/game\/index\.php\?mod=ally&i=\d+$/.test(href) );
			}
		    
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
		    
            /************************************
			Visualizzazione del logo della corporazione personalizzato
			************************************/
		    if(sb.GM_getValue("showCustomGuildImages", false) && isAllyPage)
		    {
                //Trovo la url
			    var imageUrl = getGTGuildImageUrl(sb.document.body.innerHTML);
			    if(imageUrl != "")
			    {	
				    setGuildImage(imageUrl);
			    }
		    }

		}
	}
}();