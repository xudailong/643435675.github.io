var myList = ['apples','oranges','bananas'];
myList.forEach(function(value,index){
    console.log(value);
})
/*  案例一：事件监听和绑定  */
// var numOne = document.getElementById("num-one");
// var numTwo = document.getElementById("num-two");
// var addSum = document.getElementById("add-sum");

// numOne.addEventListener('input',function(){
//     var one = numOne.value;
//     var two = numTwo.value;
//     addSum.innerHTML = one + two;
// })
/*  案例一：事件监听和绑定 方法二 */
// var numOne = document.getElementById("num-one");
// var numTwo = document.getElementById("num-two");
// var addSum = document.getElementById("add-sum");

// numOne.addEventListener('input', add);
// numTwo.addEventListener('input', add);

// function add(){
//     var one = parseFloat( numOne.value) || 0 ;
//     var two = parseFloat( numTwo.value) || 0 ;
//     addSum.innerHTML = one + two;
// }


var simon = document.getElementById("simon");
// var simonPic = document.getElementById("simon-pic");
var bruce = document.getElementById("bruce");
// var brucePic = document.getElementById("bruce-pic");
var ben = document.getElementById("ben");
// var benPic = document.getElementById("ben-pic");

// 不能重复造轮子，使用下面定义新函数的思路对三个事件进行监听
// simon.addEventListener("click",function(){
//     if(simonPic.className == "hide"){
//         simonPic.className ="";
//     }else{
//         simonPic.className = "hide"
//     }
// });

// bruce.addEventListener("click",function(){
//     if(brucePic.className == "hide"){
//         brucePic.className ="";
//     }else{
//         brucePic.className = "hide"
//     }
// });

// ben.addEventListener("click",function(){
//     if(benPic.className == "hide"){
//         benPic.className ="";
//     }else{
//         benPic.className = "hide"
//     }
// });

simon.addEventListener("click",picLink);
bruce.addEventListener("click",picLink);
ben.addEventListener("click",picLink);

function picLink() {
    console.log(this);

    var allImages = document.querySelectorAll("img");
    for (var i = 0; i < allImages.length; i++) {
        allImages[i].className = "hide";
    }

    var picId = this.attributes["data-img"].value;
    var pic = document.getElementById(picId);
    if (pic.className  == "hide") {
        pic.className = "";
    } else {
        pic.className = "hide";
    }
}