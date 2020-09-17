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
  let tabbar = document.querySelector('#tabbar');
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

/*let myVar;

function myFunction() {
  myVar = setTimeout(showPage, 3000);
}

function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("myDiv").style.display = "block";
}*/


// ========== MOVIE FUNCTIONALITY ========== //

// initialize video references - all videos and user's favourite videos
function init() {
  // init user data and favourite videos
  _userRef.doc(_currentUser.uid).onSnapshot({
    includeMetadataChanges: true
  }, function (userData) {
    if (!userData.metadata.hasPendingWrites && userData.data()) {
      _currentUser = {
        ...firebase.auth().currentUser,
        ...userData.data()
      }; //concating two objects: authUser object and userData objec from the db
      appendUserData();
      appendFavVideos(_currentUser.favVideos);
      if (_movies) {
        appendVideos(_movies); // refresh movies when user data changes
      }
      showLoader(false);
    }
  });

  // init all movies
  _movieRef.onSnapshot(function (snapshotData) {
    _movies = [];
    snapshotData.forEach(function (doc) {
      let movie = doc.data();
      movie.id = doc.id;
      _movies.push(movie);
    });
    appendVideos(_movies);
  });
}


// generate the favorite button
function generateFavVideosButton(videoId) {
  let btnTemplate = `
    <button onclick="addToFavourites('${videoId}')">Add to favourites</button>`;
  if (_currentUser.favVideos && _currentUser.favVideos.includes(videoId)) {
    btnTemplate = `
      <button onclick="removeFromFavourites('${videoId}')" class="rm">Remove from favourites</button>`;
  }
  return btnTemplate;
}

// append favourite movies to the DOM
async function appendFavVideos(favVideoIds = []) {
  let htmlTemplate = "";
  if (favVideoIds.length === 0) {
    htmlTemplate = "<p>Add videos to favourites.</p>";
  } else {
    for (let videoId of favVideosIds) {
      await _movieRef.doc(videoId).get().then(function (doc) {
        let video = doc.data();
        video.id = doc.id;
        htmlTemplate += `
        <article>
          <img src="">
          <button onclick="removeFromFavourites('${.id}')" class="rm">Remove from favourites</button>
        </article>
      `;
      });
    }
  }
  document.querySelector('#saved-vid-container').innerHTML = htmlTemplate;
}

