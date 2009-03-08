// @name            Gladiatus Tools
// @namespace       http://www.neurone.it/index.php/gladiatus-tools/
// @autor           Giuseppe Bertone
// @version         2.3.0
// @date            07 Mar 2009

var SCRLevel = GM_getValue("reportDetailLevel", 2);

//Imposta il report al livello di dettaglio desiderato
function setReportDetailsLevel(detailsLevel) {
    var allDivs = XQuery(".//div[@id='char']", document);
    for(i = 0; i < allDivs.snapshotLength; i++)
    {
	    allDivs.snapshotItem(i).style.display = (detailsLevel == 2 ? "" : "none");
    }

    allDivs = XQuery(".//div[@class='charstats_nomargin']", document);
    for(i = 0; i < allDivs.snapshotLength; i++)
    {
	    allDivs.snapshotItem(i).style.display = (detailsLevel >= 1 ? "" : "none");
    }
}

function showSmartCombatReport() {
    //Crea lo smart combat report al livello desiderato    
    setReportDetailsLevel(SCRLevel);

    //Crea il pulsante per estendere il report
    var moreDetails = document.createElement('a');
    moreDetails.innerHTML = "[ + ]";
    moreDetails.id = "moreDetails1";
    moreDetails.style.position = "relative";
    moreDetails.style.top = "10px";
    moreDetails.style.cursor = "pointer";

    vsQuery = ".//div[@id='battlerep']//table//tr//td//center";
    vss = XQueryFromElement(vsQuery, document);
    vss.snapshotItem(0).innerHTML = "VS<br/>";
    vss.snapshotItem(0).appendChild(moreDetails);
}