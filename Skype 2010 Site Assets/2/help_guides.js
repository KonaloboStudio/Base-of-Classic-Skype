function hideAllOpen() {
	var blocks = document.getElementsByTagName('div');
	for (var i = 0; i < blocks.length; i++) {
		if (blocks.item(i).className == "openBlockBottom") {
			blocks.item(i).style.display = "none";
		} else if (blocks.item(i).className == "closedBlock") {
			blocks.item(i).style.display = "block";
		}
	}
}
function show(open,close) {
	hideAllOpen();
	document.getElementById(open).style.display = "block";
	document.getElementById(close).style.display = "none";
}
function hide(close,open) {
	document.getElementById(close).style.display = "none";
	document.getElementById(open).style.display = "block";
}
function searchClear(field) {
	if (field.value == "Search for help in English") {
		field.value = "";
	}
}
function searchReset(field) {
	if (field.value != "Search for help in English" && field.value != "") {
	} else {
		field.value = "Search for help in English";
	}
}