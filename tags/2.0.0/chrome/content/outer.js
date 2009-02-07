// @name            Gladiatus Tools
// @namespace       http://www.neurone.it/index.php/gladiatus-tools/
// @autor           Giuseppe Bertone
// @version         2.0.0
// @date            07 Feb 2009

it.neurone.gladiatustools.outer = function() {

	var sb;

	var swapImage, imageToSwap, isOverview;
	var avatarWidth = "168";
	var avatarHeight = "194";

	/*****************************
	Trova la url dell'immagine impostata dall'utente
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
			if(imgWidth > avatarWidth)
			{
				imgWidth = avatarWidth;
				imgHeight =  imgWidth / aspectRatio;
			}
			
			if(imgHeight > avatarHeight)
			{
				imgHeight = avatarHeight;
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
	Prepara l'immagine da sostituire
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

	return	{	
		/*****************************
		Gestisce il codice non vincolato allo script Greasemonkey
		*****************************/
		main : function(sandbox)
		{   
		    //Sanbox per accedere agli strumenti impostati dal compiler Greasemonkey
		    sb = sandbox;
		    href = sb.location.href;
		    
		    isPlayerOverviewPage = ( /http:\/\/s.*\.gladiatus\..*\/game\/index\.php\?mod=player.*/.test(href) &&
		        (! 
		            ( /http:\/\/s.*\.gladiatus\..*\/game\/index\.php\?mod=player.*&doll=3.*/.test(href) ||
		                /http:\/\/s.*\.gladiatus\..*\/game\/index\.php\?mod=player.*&doll=4.*/.test(href) ||
		                /http:\/\/s.*\.gladiatus\..*\/game\/index\.php\?mod=player.*&doll=5.*/.test(href) ||
		                /http:\/\/s.*\.gladiatus\..*\/game\/index\.php\?mod=player.*&doll=6.*/.test(href) || 
		                /http:\/\/s.*\.gladiatus\..*\/game\/index\.php\?mod=player.*&submod=stats.*/.test(href) 
		            )
		        )
		    );
		    
		    isMyselfOverviewPage = ( /http:\/\/s.*\.gladiatus\..*\/game\/index\.php\?mod=overview.*/.test(href) &&
		        (!
		            ( /http:\/\/s.*\.gladiatus\..*\/game\/index\.php\?mod=overview.*&doll=3.*/.test(href) ||
		                /http:\/\/s.*\.gladiatus\..*\/game\/index\.php\?mod=overview.*&doll=4.*/.test(href) ||
		                /http:\/\/s.*\.gladiatus\..*\/game\/index\.php\?mod=overview.*&doll=5.*/.test(href) ||
		                /http:\/\/s.*\.gladiatus\..*\/game\/index\.php\?mod=overview.*&doll=6.*/.test(href) || 
		                /http:\/\/s.*\.gladiatus\..*\/game\/index\.php\?mod=overview.*&submod=stats.*/.test(href) || 
		                /http:\/\/s.*\.gladiatus\..*\/game\/index\.php\?mod=overview.*&submod=memo.*/.test(href) ||
		                /http:\/\/s.*\.gladiatus\..*\/game\/index\.php\?mod=overview.*&submod=buddylist.*/.test(href)
		            )
		        )
		    )
		    
		    /************************************
			  Visualizzazione delle immagini personalizzate
			************************************/
		    if(sb.GM_getValue("showCustomAvatars", false) && isPlayerOverviewPage)
		    {
			    //Trovo la url
			    var html = sb.document.body.innerHTML;
			    var imageUrl = getGTImageUrl(html);
			    if(imageUrl != "")
			    {	
			        isOverview = false;
				    setAvatar(imageUrl);
			    }
		    }
			
		    /************************************
			Gestione dell'overview dell'utente
			************************************/
		    if(sb.GM_getValue("showCustomAvatars", false) && isMyselfOverviewPage)
		    {
		        //Escludo i mercenari
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
	}
}();