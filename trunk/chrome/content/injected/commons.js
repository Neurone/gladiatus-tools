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
var versionID = 170;
var idSimula = "idSimula";
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

//Gesione delle lingue RTL
var isArabo = (MSG.language == "arabo");

var isMyselfOverviewPage = ( (/http:\/\/s\d+\.gladiatus\..*\/game\/index\.php\?mod=overview.*/.test(location.href) || /http:\/\/s\d+\.\w\w\.gladiatus\..*\/game\/index\.php\?mod=overview.*/.test(location.href)) &&
	(!
		( /http:\/\/s\d+\.gladiatus\..*\/game\/index\.php\?mod=overview.*&doll=3.*/.test(location.href) || /http:\/\/s\d+\.\w\w\.gladiatus\..*\/game\/index\.php\?mod=overview.*&doll=3.*/.test(location.href) ||
			/http:\/\/s\d+\.gladiatus\..*\/game\/index\.php\?mod=overview.*&doll=4.*/.test(location.href) || /http:\/\/s\d+\.\w\w\.gladiatus\..*\/game\/index\.php\?mod=overview.*&doll=4.*/.test(location.href) ||
			/http:\/\/s\d+\.gladiatus\..*\/game\/index\.php\?mod=overview.*&doll=5.*/.test(location.href) || /http:\/\/s\d+\.\w\w\.gladiatus\..*\/game\/index\.php\?mod=overview.*&doll=5.*/.test(location.href) ||
			/http:\/\/s\d+\.gladiatus\..*\/game\/index\.php\?mod=overview.*&doll=6.*/.test(location.href) || /http:\/\/s\d+\.\w\w\.gladiatus\..*\/game\/index\.php\?mod=overview.*&doll=6.*/.test(location.href) ||
			/http:\/\/s\d+\.gladiatus\..*\/game\/index\.php\?mod=overview.*&submod=stats.*/.test(location.href) || /http:\/\/s\d+\.\w\w\.gladiatus\..*\/game\/index\.php\?mod=overview.*&submod=stats.*/.test(location.href) ||
			/http:\/\/s\d+\.gladiatus\..*\/game\/index\.php\?mod=overview.*&submod=memo.*/.test(location.href) || /http:\/\/s\d+\.\w\w\.gladiatus\..*\/game\/index\.php\?mod=overview.*&submod=memo.*/.test(location.href) ||
			/http:\/\/s\d+\.gladiatus\..*\/game\/index\.php\?mod=overview.*&submod=buddylist.*/.test(location.href) || /http:\/\/s\d+\.\w\w\.gladiatus\..*\/game\/index\.php\?mod=overview.*&submod=buddylist.*/.test(location.href) ||
			/http:\/\/s\d+\.gladiatus\..*\/game\/index\.php\?mod=overview.*&submod=achievements.*/.test(location.href) || /http:\/\/s\d+\.\w\w\.gladiatus\..*\/game\/index\.php\?mod=overview.*&submod=achievements.*/.test(location.href)
		)
	)
)
var isMyBuddiesOverviewPage = ( /http:\/\/s\d+\.gladiatus\..*\/game\/index\.php\?mod=overview.*&doll=2.*/.test(location.href) || /http:\/\/s\d+\.\w\w\.gladiatus\..*\/game\/index\.php\?mod=overview.*&doll=2.*/.test(location.href) ||
			/http:\/\/s\d+\.gladiatus\..*\/game\/index\.php\?mod=overview.*&doll=3.*/.test(location.href) || /http:\/\/s\d+\.\w\w\.gladiatus\..*\/game\/index\.php\?mod=overview.*&doll=3.*/.test(location.href) ||
			/http:\/\/s\d+\.gladiatus\..*\/game\/index\.php\?mod=overview.*&doll=4.*/.test(location.href) || /http:\/\/s\d+\.\w\w\.gladiatus\..*\/game\/index\.php\?mod=overview.*&doll=4.*/.test(location.href) ||
			/http:\/\/s\d+\.gladiatus\..*\/game\/index\.php\?mod=overview.*&doll=5.*/.test(location.href) || /http:\/\/s\d+\.\w\w\.gladiatus\..*\/game\/index\.php\?mod=overview.*&doll=5.*/.test(location.href) ||
			/http:\/\/s\d+\.gladiatus\..*\/game\/index\.php\?mod=overview.*&doll=6.*/.test(location.href) || /http:\/\/s\d+\.\w\w\.gladiatus\..*\/game\/index\.php\?mod=overview.*&doll=6.*/.test(location.href)
);
var isPlayerOverviewPage = /http:\/\/s\d+\.gladiatus\..*\/game\/index\.php\?mod=player&p=\d+&sh=.*/.test(location.href) || /http:\/\/s\d+\.\w\w\.gladiatus\..*\/game\/index\.php\?mod=player&p=\d+&sh=.*/.test(location.href);
var isSendGuildMessagePage = /http:\/\/s\d+\.gladiatus\..*\/game\/index\.php\?mod=guild_main&submod=admin_mail&sh=.*/.test(location.href) || /http:\/\/s\d+\.\w\w\.gladiatus\..*\/game\/index\.php\?mod=guild_main&submod=admin_mail&sh=.*/.test(location.href);
var isMemoPage = /http:\/\/s\d+\.gladiatus\..*\/game\/index\.php\?mod=memo&sh=.*/.test(location.href) || /http:\/\/s\d+\.\w\w\.gladiatus\..*\/game\/index\.php\?mod=memo&sh=.*/.test(location.href);
var isWriteMessagePage = /http:\/\/s\d+\.gladiatus\..*\/game\/index\.php\?mod=messages&submod=new&.*/.test(location.href) || /http:\/\/s\d+\.\w\w\.gladiatus\..*\/game\/index\.php\?mod=messages&submod=new&.*/.test(location.href);
var isGenericMessagePage  = /http:\/\/s\d+\.gladiatus\..*\/game\/index\.php\?mod=messages&sh=.*/.test(location.href) || /http:\/\/s\d+\.\w\w\.gladiatus\..*\/game\/index\.php\?mod=messages&sh=.*/.test(location.href);
var isSettingsPage = /http:\/\/s\d+\.gladiatus\..*\/game\/index\.php\?mod=settings&sh=.*/.test(location.href) || /http:\/\/s\d+\.\w\w\.gladiatus\..*\/game\/index\.php\?mod=settings&sh=.*/.test(location.href);
var isShopPage = /http:\/\/s\d+\.gladiatus\..*\/game\/index\.php\?mod=inventory.*sh=.*/.test(location.href) || /http:\/\/s\d+\.\w\w\.gladiatus\..*\/game\/index\.php\?mod=inventory.*sh=.*/.test(location.href);
var isPlayerStatsPage = /http:\/\/s\d+\.gladiatus\..*\/game\/index\.php\?mod=overview&submod=stats&sh=.*/.test(location.href) || /http:\/\/s\d+\.\w\w\.gladiatus\..*\/game\/index\.php\?mod=overview&submod=stats&sh=.*/.test(location.href);
var isOpponentStatsPage = /http:\/\/s\d+\.gladiatus\..*\/game\/index\.php\?mod=player&submod=stats&p=.*/.test(location.href) || /http:\/\/s\d+\.\w\w\.gladiatus\..*\/game\/index\.php\?mod=player&submod=stats&p=.*/.test(location.href);
//Per supportare un bug di Gladiatus nella scrittura di una url, modifico la variabile isCombatReport per supportare lo stesso errore
var isCombatReportPage = ( /http:\/\/s\d+\.gladiatus\..*\/game\/index\.php\?mod=report&beid=.*/.test(location.href) || /http:\/\/s\d+\.\w\w\.gladiatus\..*\/game\/index\.php\?mod=report&beid=.*/.test(location.href) ||
						   /http:\/\/s\d+\.gladiatus\..*\/game\/index\.php\?mod=report&&beid=.*/.test(location.href) || /http:\/\/s\d+\.\w\w\.gladiatus\..*\/game\/index\.php\?mod=report&&beid=.*/.test(location.href) )
							&& !/http:\/\/s\d+\.gladiatus\..*\/game\/index\.php\?mod=report&beid=.*&submod=combatReport/.test(location.href);
var isModAllyPage = /http:\/\/s\d+\.gladiatus\..*\/game\/index\.php\?mod=guild_main&submod=admin_description&sh=.*/.test(location.href) || /http:\/\/s\d+\.\w\w\.gladiatus\..*\/game\/index\.php\?mod=guild_main&submod=admin_description&sh=.*/.test(location.href);

//Sovrascrivo alcune url se la versione del server è vecchia
if(serverVersion == "v0.4.0") {
	isMemoPage = /http:\/\/s\d+\.gladiatus\..*\/game\/index\.php\?mod=overview&submod=memo&sh=.*/.test(location.href) || /http:\/\/s\d+\.\w\w\.gladiatus\..*\/game\/index\.php\?mod=overview&submod=memo&sh=.*/.test(location.href);
	isModAllyPage = /http:\/\/s\d+\.gladiatus\..*\/game\/index\.php\?mod=ally&submod=allydesc&sh=.*/.test(location.href) || /http:\/\/s\d+\.\w\w\.gladiatus\..*\/game\/index\.php\?mod=ally&submod=allydesc&sh=.*/.test(location.href);
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