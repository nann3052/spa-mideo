// frontpages icons slider
var swiper = new Swiper('.swiper-container', {
  slidesPerView: 2.5,
  spaceBetween: 15,
  centeredSlides: true,
  grabCursor: true,
  loop: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});

//video play, pause, skip, further buttons

var myVideo = document.getElementById("video"); 

function playPause() { 
  if (myVideo.paused) 
    myVideo.play(); 
  else 
    myVideo.pause(); 
} 


$(".play-button").click(function(){
  $(this).toggleClass("pause")  ; 
 })