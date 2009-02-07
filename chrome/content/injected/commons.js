// @name            Gladiatus Tools
// @namespace       http://www.neurone.it/index.php/gladiatus-tools/
// @autor           Giuseppe Bertone
// @version         2.0.0
// @date            07 Feb 2009

var common_siteUrl, common_siteUrlAjax, common_siteMod, secureHash;

var common_regexp = /^(.*\?)mod=(\w+).*sh=([0-9a-fA-F]+)/;
var common_result = document.location.href.match(common_regexp);
if(common_result) {
    common_siteUrl = common_result[1];
    common_siteUrlAjax = common_siteUrl[1].substring(0, common_siteUrl[1].length-"index.php?".length) + 'ajax/';
    common_siteMod = common_result[2];
    secureHash = common_result[3];
}

//Variabili globali
var versionID = 170;
var idSimula = "idSimula";
var idMessaggio = "idMessaggio";
var simulaButton, vaiButton, messaggio;
var paramAttaccante, paramDifensore, paramSimulatore;

var currentGTImageUrl;
var currentDescriptionField;

var urlSimulatore, hostSimulatore, refererUrlSimulatore;

//Url di attivazione delle procedure
var playerOverviewUrl = "index.php?mod=player";
var myselfOverviewUrl = "index.php?mod=overview";
var sendCorpMessageUrl = "index.php?mod=ally&submod=allyrecht";
var workUrl = "index.php?mod=work";

var highScoreUrl = common_siteUrl + "mod=highscore";
var shopUrl = common_siteUrl + "mod=inventory";

var goldAmout, rubyAmount;
var objectTransparency = 0.25;

var activateClickListener = false;

//Gesione delle lingue RTL
var isArabo = (MSG.language == "arabo");

var isMemoPage = /http:\/\/s.*\.gladiatus\..*\/game\/index\.php\?mod=overview&submod=memo&sh=.*/.test(location.href);
var isWriteMessagePage = /http:\/\/s.*\.gladiatus\..*\/game\/index\.php\?mod=messages&submod=new&.*/.test(location.href);
var isGenericMessagePage  = /http:\/\/s.*\.gladiatus\..*\/game\/index\.php\?mod=messages&sh=.*/.test(location.href);
var isSettingsPage = /http:\/\/s.*\.gladiatus\..*\/game\/index\.php\?mod=settings&sh=.*/.test(location.href);
var isShopPage = /http:\/\/s.*\.gladiatus\..*\/game\/index\.php\?mod=inventory.*sh=.*/.test(location.href);
var isPlayerStatsPage = /http:\/\/s.*\.gladiatus\..*\/game\/index\.php\?mod=overview&submod=stats&sh=.*/.test(location.href);
var isOpponentStatsPage = /http:\/\/s.*\.gladiatus\..*\/game\/index\.php\?mod=player&submod=stats&p=.*/.test(location.href);

/*****************************
Trova il TLD del sito corrente
*****************************/
function TLD(hostname)
{
    return (m = hostname.match(new RegExp("\.([a-z,A-Z]{2,6})$") )) ? m[1] : false;
}

function XQueryFromElement(query, DOMElement)
{
    return document.evaluate(query, DOMElement, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function XQuery(query)
{
    return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function insertBefore(baseElement, elementToAdd)
{
    baseElement.parentNode.insertBefore(elementToAdd, baseElement);
}

function insertAfter(baseElement, elementToAdd)
{
    baseElement.parentNode.insertBefore(elementToAdd, baseElement.nextSibling);
}

function createCookie(name, value, timeInMinute){
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

function formatNumber(number, separator)
{
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