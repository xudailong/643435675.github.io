/*
 * author: pdsuwwz
 * 
 */
var $ = function(selector){
    return document.querySelector(selector);
};
window.addEventListener("load", function() {
	var wrapper = document.getElementById("wrapper");
	setTimeout(function() {
		document.body.removeChild(wrapper);

		$('html').setAttribute("style","overflow:auto;");
		$('body').setAttribute("style","overflow:auto;");
	}, 1200);
});