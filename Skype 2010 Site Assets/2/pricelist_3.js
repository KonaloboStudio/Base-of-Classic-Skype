function hoverHelper(image) {
	if (image.className == 'helpToggler closed') {
		image.className = 'helpToggler hover';
	} else if (image.className == 'helpToggler hover') {
		image.className = 'helpToggler closed';
	} else {
		image.className = 'helpToggler open';
	}
}
function toggleHelper(image, layer) {
	var helperLayer = document.getElementById(layer);
	var layerTopPos = image.offsetTop + image.height - 1;
	var layerLeftPos = image.offsetLeft - 238 + image.width;
	if(image.className == 'helpToggler hover') {
		image.className = 'helpToggler open';
		helperLayer.style.display = 'block';
		helperLayer.style.top = layerTopPos + 'px';
		helperLayer.style.left = layerLeftPos + 'px';
	} else if(image.className == 'helpToggler closed') {
		image.className = 'helpToggler open';
		helperLayer.style.display = 'block';
	} else {
		image.className = 'helpToggler hover';
		helperLayer.style.display = 'none';
	}
}