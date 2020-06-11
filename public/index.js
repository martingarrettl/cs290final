/*
 * Index.js for OSU CS290 S20 final project
 *
 * name: Garrett Martin
 * Email: martgarr@oregonstate.edu
 */

/*
 * UI interactions
 */
window.addEventListener('DOMContentLoaded', function () {



  let addFlashCardButton = document.getElementById('addflashcard');
  if (addFlashCardButton) {
    addFlashCardButton.addEventListener('click', addFlashCard)
  }

  // Remember all of the existing twits in an array that we can use for search.
  /*
  var twitElemsCollection = document.getElementsByClassName('twit');
  for (var i = 0; i < twitElemsCollection.length; i++) {
    allTwits.push(parseTwitElem(twitElemsCollection[i]));
  }

  var createDeckButton = document.getElementById('create-deck-button');
  if (createDeckButton) {
    createDeckButton.addEventListener('click', showCreateDeckModal);
  }

  */

});
