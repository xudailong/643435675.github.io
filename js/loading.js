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
	document.body.style.overflow="hidden";
	setTimeout(function() {
		document.removeEventListener("touchstart",move,false);
		document.body.removeChild(wrapper);
	}, 1200);
	
	setTimeout(function(){
        document.body.style.overflowY="scroll";
    },1100);
});

