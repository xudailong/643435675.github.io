/*
 * author: pdsuwwz
 * 
 */
window.addEventListener("load", function() {
	var wrapper = document.getElementById("wrapper");
	// document.body.style.overflow="hidden";
	setTimeout(function() {
		document.body.removeChild(wrapper);
	}, 1800);

	// setTimeout(function(){
	// document.body.style.overflowY="scroll";
	// },1300);
});
/* document.onkeydown = function() {
	var e = window.event || arguments[0];
	if (e.keyCode == 123) {
		return false;
	} else if ((e.ctrlKey) && (e.shiftKey) && (e.keyCode == 73)) {
		return false;
	} else if ((e.ctrlKey) && (e.keyCode == 85)) {
		return false;
	} else if ((e.ctrlKey) && (e.keyCode == 83)) {
		return false;
	}
};
document.oncontextmenu = function() {
	return false;
}; */