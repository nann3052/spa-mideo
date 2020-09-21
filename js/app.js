"use strict";

// ========== GLOBAL VARIABLES ========== //
const _movieRef = _db.collection("movies");
const _userRef = _db.collection("users")
let _currentUser;
let _movies;

// ========== FIREBASE AUTH ========== //
// Listen on authentication state change
firebase.auth().onAuthStateChanged(function (user) {
  if (user) { // if user exists and is authenticated
    userAuthenticated(user);
  } else { // if user is not logged in
    userNotAuthenticated();
  }
});

function userAuthenticated(user) {
  _currentUser = user;
  hideTabbar(false);
  init();
  showLoader(false);
}

function userNotAuthenticated() {
  _currentUser = null; // reset _currentUser
  hideTabbar(true);
  showPage("login");

  // Firebase UI configuration
  const uiConfig = {
    credentialHelper: firebaseui.auth.CredentialHelper.NONE,
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    signInSuccessUrl: '#home'
  };
  // Init Firebase UI Authentication
  const ui = new firebaseui.auth.AuthUI(firebase.auth());
  ui.start('#firebaseui-auth-container', uiConfig);
  showLoader(false);
}

// show and hide tabbar
function hideTabbar(hide) {
  let tabbar = document.querySelector('.tabbar');
  if (hide) {
    tabbar.classList.add("hide");
  } else {
    tabbar.classList.remove("hide");
  }
}

// sign out user
function logout() {
  firebase.auth().signOut();
  //
}




// ========== Welcome page ========== //



// ========== video randomizer button ========== //


function random_button() {
  const array = ['video/chicken.mp4', 'video/froggo.mp4', 'video/sangfugl.MOV']
  var x = Math.floor((Math.random() * array.length));

  document.getElementById('divVideo').src = array[x]

}



// toggle play button

$(".play-button").click(function random_button() {
  $(this).toggleClass("pause");
})

// heart button
$(function () {

  $(".heart").on("click", function () {
    $(this).toggleClass("heart-blast");
  });
}); 