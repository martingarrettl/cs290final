/*
 * Shows modal to create deck of flashcards when called
 */
function showCreateDeckModal() {

  var modalBackdrop = document.getElementById('modal-backdrop');
  var createDeckModal = document.getElementById('create-deck-modal');

  // Show the modal and its backdrop.
  modalBackdrop.classList.remove('hidden');
  createDeckModal.classList.remove('hidden');

}

/*
 * UI interactions
 */
window.addEventListener('DOMContentLoaded', function () {

  // Remember all of the existing twits in an array that we can use for search.
  var twitElemsCollection = document.getElementsByClassName('twit');
  for (var i = 0; i < twitElemsCollection.length; i++) {
    allTwits.push(parseTwitElem(twitElemsCollection[i]));
  }

  var createTwitButton = document.getElementById('create-deck-button');
  if (createTwitButton) {
    createTwitButton.addEventListener('click', showCreateDeckModal);
  }

  var modalCloseButton = document.querySelector('#create-deck-modal .modal-close-button');
  if (modalCloseButton) {
    modalCloseButton.addEventListener('click', hideCreateTwitModal);
  }

  var modalCancelButton = document.querySelector('#create-deck-modal .modal-cancel-button');
  if (modalCancelButton) {
    modalCancalButton.addEventListener('click', hideCreateTwitModal);
  }

  var modalAcceptButton = document.querySelector('#create-deck-modal .modal-accept-button');
  if (modalAcceptButton) {
    modalAcceptButton.addEventListener('click', handleModalAcceptClick);
  }

  var searchButton = document.getElementById('navbar-search-button');
  if (searchButton) {
    searchButton.addEventListener('click', doSearchUpdate);
  }

  var searchInput = document.getElementById('navbar-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', doSearchUpdate);
  }

});
