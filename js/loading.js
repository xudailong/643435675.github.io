/*
 * author: pdsuwwz
 * 
 */

 function move(e){
     e.preventDefault();
     e.stopPropagation();
 }

document.addEventListener("touchstart",move,false);
window.addEventListener("load", function() {
	var wrapper = document.getElementById("wrapper");
	setTimeout(function() {
		document.removeEventListener("touchstart",move,false);
		document.body.removeChild(wrapper);
	}, 1200);
});

