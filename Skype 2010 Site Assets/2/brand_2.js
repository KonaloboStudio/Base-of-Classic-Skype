function imgPng() {
    for(var i=0; i<document.images.length; i++) {
        var img = document.images[i];
        var imgName = img.src.toUpperCase();
        if(imgName.substring(imgName.length-3, imgName.length) == "PNG" && !img.className && (imgName.indexOf("WIN") != -1 || imgName.indexOf("MAC") != -1)) {
            var imgID = (img.id) ? "id='" + img.id + "' " : ""
            var imgClass = (img.className) ? "class='" + img.className + "' " : ""
            var imgTitle = (img.title) ? "title='" + img.title + "' " : "title='" + img.alt + "' "
            var imgStyle = "display:inline-block;" + img.style.cssText;
            if(img.align == "left") imgStyle = "float:left;" + imgStyle;
            if(img.align == "right") imgStyle = "float:right;" + imgStyle;
            if(img.parentElement.href) imgStyle = "cursor:hand;" + imgStyle;
            var strNewHTML = "<span " + imgID + imgClass + imgTitle
            + " style=\"" + "width:" + img.width + "px; height:" + img.height + "px;" + imgStyle + ";"
            + "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader"
            + "(src=\'" + img.src + "\', sizingMethod='scale');\"></span>";
            img.outerHTML = strNewHTML;
            i = i-1;
        }
    }
}

if (navigator.platform == "Win32" && navigator.appName == "Microsoft Internet Explorer" && window.attachEvent) {
    window.attachEvent("onload", imgPng);
}