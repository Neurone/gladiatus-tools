// @name            Gladiatus Tools
// @namespace       http://www.neurone.it/index.php/gladiatus-tools/
// @autor           Giuseppe Bertone

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

/*
function shareCombatReport()
{
	var contenuto = document.getElementById('content').innerHTML;
	contenuto = contenuto.replace(/<!-- content end -->/igm, "");
	contenuto = contenuto.replace(/</igm,"&lt;")
	contenuto = contenuto.replace(/>/igm,"&gt;")
	contenuto = contenuto.replace(/input/igm, "inp1");
	contenuto = contenuto.replace(/=/igm, "ravno");
	contenuto = contenuto.replace(/\"/igm, "kavi4ka");
	contenuto = contenuto.replace("class", "clas1s");
	contenuto = contenuto.replace("id", "i1d");
	contenuto = contenuto.replace("form", "fo1rm");
	contenuto = contenuto.replace("name", "na1me");
	contenuto = contenuto.replace("value", "v1alue");

	return  '<div class="reportHeader reportLose"><form action="http://gladiatuslog.blackget.com/saveReport.php" method="post" target="_blank">'+
			'<TEXTAREA name="reptext" style="display: none">'+contenuto+'</TEXTAREA><input type="submit" value="Save report"></form></div>';
}
*/