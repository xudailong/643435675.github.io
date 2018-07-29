/*
 * author: pdsuwwz
 * 
 */

function move(e){
    e.preventDefault();
    e.stopPropagation();
}

document.addEventListener("touchmove",move,false);
document.addEventListener("DOMContentLoaded", function(){
  var wrapper = document.getElementById("wrapper");
  document.body.style.overflow="hidden";
  setTimeout(function() {
    document.removeEventListener("touchmove",move,false);
    document.body.removeChild(wrapper);
  }, 1200);
  
  setTimeout(function(){
    document.body.style.overflowY="scroll";
    document.body.classList.add("define-scrollbar");
  },1000);

});

