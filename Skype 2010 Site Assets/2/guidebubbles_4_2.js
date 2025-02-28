function posBubble(bubble, bubbleBottomPosition) {
	var bubbleHeight = document.getElementById(bubble).offsetHeight;
	var bubbleTopCoordinate = bubbleBottomPosition - bubbleHeight;
	document.getElementById(bubble).style.marginTop = bubbleTopCoordinate + 'px';
}