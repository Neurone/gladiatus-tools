// @name            Gladiatus Tools
// @namespace       http://www.neurone.it/index.php/gladiatus-tools/
// @autor           Giuseppe Bertone

/**
 * Some source code parts are taken from Gladiatus Helper @copyright (C) 2008, DDTH.ORG 
 */

var GTtimeRemainingArena = 0;
var GTtimeRemainingWorld = 0;
var GTtimeRemainingWork  = 0;
var GTnow = new Date();

/*************************************
Funziona di aggiornamento dei timer
*************************************/
function GTupdateTimer(div, timeRemaining) {
	var n = new Date();
	var s = timeRemaining - Math.round((n.getTime() - GTnow.getTime())/1000.);
	var m = 0;
	var h = 0;
	if ( s < 0 ) {
		div.innerHTML = MSG.completed;
		return false;
	} else {
		if ( s > 59 ) {
			m = Math.floor(s/60);
			s = s-m*60;
		}
		if ( m > 59 ) {
			h = Math.floor(m/60);
			m = m-h*60;
		}
		if ( s < 10 ) {
			s = '0'+s;
		}
		if ( m < 10 ) {
			m = '0'+m;
		}
		div.innerHTML = ' '+h+':'+m+':'+s+'';
		if(isArabo) {
		    switch(div.id) {
		        case "timerMissione":
		            div.innerHTML = MSG.quest + " " + div.innerHTML;
		            break;
		            
                case "timerArena":
		            div.innerHTML = MSG.arena + " " + div.innerHTML;
		            break;
		            
                case "timerStalla":
		            div.innerHTML = MSG.work + " " + div.innerHTML;
		            break;
		    }
        }
		return true;
	}
}

function workTimerWorld() {
	if ( GTupdateTimer(document.getElementById('timerMissione'), GTtimeRemainingWorld) )
	{
		setTimeout(workTimerWorld, 999);
	}
}

function workTimerArena() {
	if ( GTupdateTimer(document.getElementById('timerArena'), GTtimeRemainingArena) )
	{
		setTimeout(workTimerArena, 999);
	}
}

function workTimerWork() {
	if ( GTupdateTimer(document.getElementById('timerStalla'), GTtimeRemainingWork) )
	{
		setTimeout(workTimerWork, 999);
	}
}

/**************************************
/ Creazione dei timer
/*************************************/
function TimersCreated()
{
	var resourcesDiv = XQuery(".//div[@class='headerRes']");
	if (resourcesDiv.snapshotLength > 0)
	{
	    var lastBox = resourcesDiv.snapshotItem(0);
        //Creo il nuovo box
	    var newBox = document.createElement("span");
        //controllo se la lingua è araba, e quindi va tutto da destra a sinistra
	    if(isArabo) {
	        newBox.style.left = "79px";
	        newBox.style.background = "url(data:image/jpeg;base64,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)";
	        newBox.style.textAlign = "right";
	    }
	    else {
	        newBox.style.background = "url(data:image/jpeg;base64,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)";
	        newBox.style.left = "601px"; //v0.5
	        if(serverVersion == "v0.4.0") newBox.style.left = "581px";
	    }
	    newBox.id = "GTTimer";
        newBox.style.position = "absolute";
        newBox.style.top = "-3px";
	    newBox.style.width = "140px";
        newBox.style.height = "59px";
	    //Creo il contenitore per i tempi
	    var timers = document.createElement("span");
	    timers.style.top = "10px";
	    timers.style.position = "absolute";
	    //Creo il contenitore per il tempo missione
	    var timerMissione = document.createElement("span");
	    //Creo il contenitore per il tempo arena
	    var timerArena = document.createElement("span");
        //Creo il contenitore per il tempo stalla
	    var timerStalla = document.createElement("span");
        if(isArabo) {
            timers.style.left = "50px";
	        timerMissione.innerHTML = "<span class=\"charvaluesSub\" id=\"timerMissione\">---</span>";
            timerArena.innerHTML = "<span class=\"charvaluesSub\" id=\"timerArena\">---</span>";
	        timerStalla.innerHTML = "<span class=\"charvaluesSub\" id=\"timerStalla\">---</span>";
        }
        else {
	        timerMissione.innerHTML = "<span class=\"charvaluesPre\" style=\"width:70px;\">"+MSG.quest+"</span>"+
                                        "<span class=\"charvaluesSub\" id=\"timerMissione\">---</span><br/>";
            timerArena.innerHTML = "<span class=\"charvaluesPre\" style=\"width:70px;\">"+MSG.arena+"</span>"+
                                        "<span class=\"charvaluesSub\" id=\"timerArena\">---</span><br/>";
	        timerStalla.innerHTML = "<span class=\"charvaluesPre\" style=\"width:70px;\">"+MSG.work+"</span>"+
                                        "<span class=\"charvaluesSub\" id=\"timerStalla\">---</span>";
        }
	    //Aggiungo il tempo della missione al contenitore dei tempi
	    timers.appendChild(timerMissione);
	    timers.appendChild(timerArena);
	    timers.appendChild(timerStalla);
	    //Aggiungo il contenitore dei tempi al nuovo box
	    newBox.appendChild(timers);
	    //Affianco il nuovo box ai valori di oro e rubini
	    insertAfter(lastBox, newBox);
	    return true;
	}
	return false;
}

/*************************************
Gestione dei timer
*************************************/
function showTimers() {
	//Creo i timer
	if(TimersCreated())
	{
	    //Recupero i dati
	    GM_xmlhttpRequest({
		    method: "GET",
		    url: 'http://'+ window.location.host +'/game/index.php?mod=work&sh='+ secureHash,
		    onload: function(responseDetails) {
			    var pulled = document.createElement('div');
			    pulled.innerHTML = responseDetails.responseText;
			    var remainingTime = getSpanContent(pulled, 'bx0', 'id');
			    if ( responseDetails.responseText.indexOf("?mod=work&cancel=1") > 0 ) {
				    //100% sure that stable work is undergoing!
				    if ( remainingTime != null && remainingTime != '' ) {
				        document.getElementById('timerStalla').innerHTML = remainingTime;
					    var regexp = /s=(\d+)\-Math/;
					    var result = pulled.innerHTML.match(regexp);
					    if ( result != null && result.length > 1 ) {
						    GTtimeRemainingWork = result[1];
						    workTimerWork();
					    } else {
						    document.getElementById('timerStalla').innerHTML = "[Errore]";
					    }
				    }
			    } else {
				    if ( remainingTime != null && remainingTime != '' ) {
					    //ok, world travelling is undergoing
					    document.getElementById('timerMissione').innerHTML = remainingTime;
					    var regexp = /s=(\d+)\-Math/;
					    var result = pulled.innerHTML.match(regexp);
					    if ( result != null && result.length > 1 ) {
						    GTtimeRemainingWorld = result[1];
						    workTimerWorld();
					    } else {
						    document.getElementById('timerMissione').innerHTML = "[Errore]";
					    }
				    }
			    }			
		    }
	    });
    	
	    GM_xmlhttpRequest({
		    method: "GET",
		    url: 'http://'+ window.location.host +'/game/index.php?mod=arena&sh='+ secureHash,
		    onload: function(responseDetails) {
			    var pulled = document.createElement('div'); 	
			    pulled.innerHTML = responseDetails.responseText;
			    var remainingTime = getSpanContent(pulled, 'bx0', 'id');
			    if ( remainingTime != null && remainingTime != '' ) {
				    document.getElementById('timerArena').innerHTML = remainingTime;
				    var regexp = /s=(\d+)\-Math/;
				    var result = pulled.innerHTML.match(regexp);
				    if ( result != null && result.length > 1 ) {
					    GTtimeRemainingArena = result[1];
					    workTimerArena();
				    } else {
					    document.getElementById('timerArena').innerHTML = "[Errore]";
				    }
			    }
		    }
	    });
    }
}