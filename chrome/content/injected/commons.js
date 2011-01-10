// @name            Gladiatus Tools
// @namespace       http://www.neurone.it/index.php/gladiatus-tools/
// @autor           Giuseppe Bertone

var common_siteUrl, common_siteUrlAjax, common_siteMod, secureHash;

var common_regexp = /^(.*\?)mod=(\w+).*sh=([0-9a-fA-F]+)/;
var common_result = document.location.href.match(common_regexp);
if(common_result) {
    common_siteUrl = common_result[1];
    common_siteUrlAjax = common_siteUrl[1].substring(0, common_siteUrl[1].length-"index.php?".length) + 'ajax/';
    common_siteMod = common_result[2];
    secureHash = common_result[3];
}

var serverVersion = getServerVersion();

//Variabili globali
var versionID = 290;
var idSimula = "idSimula";
var nomePulsanteAcquistaAsta = "buyout";
var nomePulsanteAcquistaMercato = "buy";
var idMessaggio = "idMessaggio";
var simulaButton, vaiButton, messaggio;
var paramAttaccante, paramDifensore, paramSimulatore;

var currentGTAvatarImageUrl;
var currentAvatarDescriptionField;

var currentGTGuildImageUrl;
var currentGuildDescriptionField;

var shadowingColor = "#E5D9BD"; //v0.5
if(serverVersion == "v0.4.0") shadowingColor = "#C8AD7E";

var urlSimulatore, hostSimulatore, refererUrlSimulatore;

var highScoreUrl = common_siteUrl + "mod=highscore";

var goldAmout, rubyAmount;
var objectTransparency = 0.25;

var activateClickListener = false;
var activateKeyPressListener = false;

var maxCharsSmall = 4000;
var maxCharsMedium = 5000;
var maxCharsLarge = 10000;
var maxCharsExtraLarge = 16000;

//Gesione delle lingue RTL
var isArabo = (MSG.language == "arabo");

var isMyselfOverviewPage = ( urlMatch("mod=overview.*") &&
	(!
		(	urlMatch("mod=overview.*&doll=3.*") ||
			urlMatch("mod=overview.*&doll=4.*") ||
			urlMatch("mod=overview.*&doll=5.*") ||
			urlMatch("mod=overview.*&doll=6.*") ||
			urlMatch("mod=overview.*&submod=stats.*") ||
			urlMatch("mod=overview.*&submod=memo.*") ||
			urlMatch("mod=overview.*&submod=buddylist.*") ||
			urlMatch("mod=overview.*&submod=achievements.*")
		)
	)
)
var isMyBuddiesOverviewPage = ( 
			urlMatch("mod=overview.*&doll=2.*") ||
			urlMatch("mod=overview.*&doll=3.*") ||
			urlMatch("mod=overview.*&doll=4.*") ||
			urlMatch("mod=overview.*&doll=5.*") ||
			urlMatch("mod=overview.*&doll=6.*")
);
var isPlayerOverviewPage = urlMatch("mod=player&p=\\d+&sh=.*") || urlMatch("mod=player&p=\\d+&doll=1&sh=.*");
var isPlayerBuddiesOverviewPage = ( 
			urlMatch("mod=player.*&doll=2.*") ||
			urlMatch("mod=player.*&doll=3.*") ||
			urlMatch("mod=player.*&doll=4.*") ||
			urlMatch("mod=player.*&doll=5.*") ||
			urlMatch("mod=player.*&doll=6.*")
);
var isSendGuildMessagePage = urlMatch("mod=guild_main&submod=admin_mail&sh=.*");
var isMemoPage = urlMatch("mod=memo&sh=.*");
var isWriteMessagePage = urlMatch("mod=messages&submod=new&.*");
var isGenericMessagePage  = urlMatch("mod=messages&sh=.*");
var isSettingsPage = urlMatch("mod=settings&sh=.*") || urlMatch("mod=settings&submod=edit&sh=.*");
var isShopPage = urlMatch("mod=inventory.*sh=.*");
var isPlayerStatsPage = urlMatch("mod=overview&submod=stats&sh=.*");
var isOpponentStatsPage = urlMatch("mod=player&submod=stats&p=.*");
//Per supportare un bug di Gladiatus nella scrittura di una url, modifico la variabile isCombatReport per supportare lo stesso errore
var isCombatReportPage = (urlMatch("mod=report&beid=.*") || urlMatch("mod=report&&beid=.*")) && !urlMatch("mod=report&beid=.*&submod=combatReport");
var isModAllyPage = urlMatch("mod=guild_main&submod=admin_description&sh=.*");
var isAllySendMessagePage = urlMatch("mod=guild_main&submod=admin_mail&sh=.*");
var isAuctionPage = urlMatch("mod=auction&sh=.*") || urlMatch("mod=auction&ttype=2&sh=.*") || urlMatch("mod=auction&ttype=3&sh=.*");
var isPackagesListPage = urlMatch("mod=packages&.*");

var sendGuildMessageIconLink = "/game/index.php?mod=guild_main&submod=admin_mail&sh=" + secureHash;

//Sovrascrivo alcune url se la versione del server è vecchia
if(serverVersion == "v0.4.0") {
	isMemoPage = urlMatch("mod=overview&submod=memo&sh=.*");
	isModAllyPage = urlMatch("mod=ally&submod=allydesc&sh=.*");
}

/*****************************
Trova il TLD del sito corrente
*****************************/
function TLD(hostname) {
    return (m = hostname.match(new RegExp("\.([a-z,A-Z]{2,6})$") )) ? m[1] : false;
}

function XQueryFromElement(query, DOMElement) {
    return document.evaluate(query, DOMElement, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function XQuery(query) {
    return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function insertBefore(baseElement, elementToAdd) {
    baseElement.parentNode.insertBefore(elementToAdd, baseElement);
}

function insertAfter(baseElement, elementToAdd) {
    baseElement.parentNode.insertBefore(elementToAdd, baseElement.nextSibling);
}

function createCookie(name, value, timeInMinute) {
    if (timeInMinute) {
		var date = new Date();
		date.setTime(date.getTime() + (timeInMinute * 60 * 1000));
		var expires = "; expires=" + date.toGMTString();
	} else {
		var expires = "";
	}
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ')
            c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) {
			return c.substring(nameEQ.length, c.length);
		}
    }
    return null;
}

function removeCookie(name) {
    createCookie(name, "", -1);
}

function getSpanContent(htmlObj, name, method) {
	var query = method=='class' ? ".//span[@class='"+name+"']" : ".//span[@id='"+name+"']";
	var tag = XQueryFromElement(query, htmlObj);
	if ( tag.snapshotLength ) {
		return tag.snapshotItem(0).innerHTML;
	} else {
		return '';
	}
}

function formatNumber(number, separator) {
	number += '';
	x = number.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? ',' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + separator + '$2');
	}
	return x1 + x2;
}

/*****************************
Recupera la versione del server
*****************************/
function getServerVersion() {
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
/ Testa se la url corrente corrisponde alla espressione regolare passata
/****************************/
function urlMatch(string) {
	var firstRE = new RegExp("http:\\/\\/s\\d+\\.gladiatus\\..*\\/game\\/index\\.php\\?"+ string,"");
	var secondRE = new RegExp("http:\\/\\/s\\d+\\.\\w\\w\\.gladiatus\\..*\\/game\\/index\\.php\\?"+ string,"");
	return firstRE.test(location.href) || secondRE.test(location.href);
}

/*****************************
/ Testa se la url passata corrisponde alla espressione regolare passata
/****************************/
function targetUrlMatch(string, url) {
	var firstRE = new RegExp("http:\\/\\/s\\d+\\.gladiatus\\..*\\/game\\/index\\.php\\?"+ string,"");
	var secondRE = new RegExp("http:\\/\\/s\\d+\\.\\w\\w\\.gladiatus\\..*\\/game\\/index\\.php\\?"+ string,"");
	return firstRE.test(url) || secondRE.test(url);
}

/*****************************
/ Recupera il valore di un parametro dalla url
/****************************/
function getURLParam(name)
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return results[1];
}

/*****************************
/ Permette di effettuare il parsing di una stringa senza troppe preoccupazioni
/****************************/
function safeParseInt(string) {
	if(string == null) return 0;
	if(string == "") return 0;
	if(string == NaN) return 0;
	return parseInt(string);
}