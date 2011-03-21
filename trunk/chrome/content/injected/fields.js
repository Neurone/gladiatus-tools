// @name            Gladiatus Tools
// @namespace       http://www.neurone.it/index.php/gladiatus-tools/
// @autor           Giuseppe Bertone

function showBigNotes() {
	//Modify the scroll image parts
	var divs = XQuery(".//div[@class='scroll_top_center']");
	if (divs.snapshotLength > 0) {
		divs.snapshotItem(0).style.width = "450px";
	}
	var divs = XQuery(".//div[@class='scroll_body_center']");
	if (divs.snapshotLength > 0) {
		divs.snapshotItem(0).style.width = "450px";
	}
	var divs = XQuery(".//div[@class='scroll_bottom_center']");
	if (divs.snapshotLength > 0) {
		divs.snapshotItem(0).style.width = "450px";
		//Modify the father div
		divs.snapshotItem(0).parentNode.parentNode.style.width = "520px";
	}
	//Remove ugly <br>
	var divs = XQuery(".//div[@id='content']/br");
	if (divs.snapshotLength > 0) {
		var content = document.getElementById("content");
		content.removeChild(divs.snapshotItem(0));
		content.removeChild(divs.snapshotItem(1));
	}
}

function showBigWriteMessage() {
	//Modify the scroll image parts
	var divs = XQuery(".//div[@class='scroll_top_center']");
	if (divs.snapshotLength > 0) {
		divs.snapshotItem(0).style.width = "450px";
	}
	var divs = XQuery(".//div[@class='scroll_body_center']");
	if (divs.snapshotLength > 0) {
		divs.snapshotItem(0).style.width = "450px";
	}
	var divs = XQuery(".//div[@class='scroll_bottom_center']");
	if (divs.snapshotLength > 0) {
		divs.snapshotItem(0).style.width = "450px";
		//Modify the father divs
		divs.snapshotItem(0).parentNode.parentNode.style.width = "520px";
		divs.snapshotItem(0).parentNode.parentNode.parentNode.style.margin = "0px";
	}
}

//Gestisce la pressione dei tasti
function grabKeyPress(event) {

	switch(event.target.id)
	{
		case "GTImageUrl":
			updatePlayerDescriptionTextArea(maxCharsSmall);
			break;
			
		case "GTGuildImageUrl":
			updateAllyDescriptionTextArea(maxCharsLarge);
			break;
	}

	switch(event.target.name)
	{
		case "rpg":
			updatePlayerDescriptionTextArea(maxCharsSmall);
			break;
			
		case "description":
			updateAllyDescriptionTextArea(maxCharsLarge);
			break;
	}
	
}

function updatePlayerDescriptionTextArea(maxChars) {
	//modifico i caratteri a disposizione per la custom image per l'avatar
	var subtract = document.getElementById("GTImageUrl").value.length;
	//Trovo il campo testo
	var textareas = XQuery(".//textarea[@name='rpg']");
	if (textareas.snapshotLength > 0)
	{
		var myTextArea = textareas.snapshotItem(0);
		//@Explicit_DOM_Reference
		var testo = myTextArea.parentNode.parentNode.parentNode.parentNode.childNodes[7].innerHTML;
		//Sovrascrivo l'intestazione per includere il calcolo dei caratteri
		//@Explicit_DOM_Reference
		myTextArea.parentNode.parentNode.parentNode.parentNode.childNodes[7].innerHTML =
			testo.substring(0, testo.indexOf("(")) + 
			" ("+ (charsLeft(myTextArea, maxChars) - subtract)+
			"/"+ maxChars +")";
	}
}

function updateAllyDescriptionTextArea(maxChars) {
	//modifico i caratteri a disposizione per la custom guild image
	var subtract = document.getElementById("GTGuildImageUrl").value.length;
	//Trovo il campo testo
	var textareas = XQuery(".//textarea[@name='description']");
	if (textareas.snapshotLength > 0)
	{
		var myTextArea = textareas.snapshotItem(0);
		//@Explicit_DOM_Reference
		var testo = myTextArea.parentNode.parentNode.parentNode.firstChild.innerHTML;
		//Sovrascrivo l'intestazione per includere il calcolo dei caratteri
		//@Explicit_DOM_Reference
		myTextArea.parentNode.parentNode.parentNode.firstChild.innerHTML =
				testo.substring(0, testo.indexOf("(")) +
				" ("+ ( charsLeft(myTextArea, maxChars) - subtract) +
				"/"+ maxChars +")";
	}
}

//Conta i caratteri rimanenti
function charsLeft(field, maxChars) {
	return (maxChars - field.value.length);
}