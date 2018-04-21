/*
 * author: pdsuwwz
 * 
 */

window.addEventListener("load", function() {
	var wrapper = document.getElementById("wrapper");
	wrapper.ontouchstart = function(e){
		e.preventDefault();
	}
	setTimeout(function() {
		document.body.removeChild(wrapper);
	}, 1200);
});
function move(e){
    e.preventDefault();
    e.stopPropagation();
}