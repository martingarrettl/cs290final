/*
 * Index.js for OSU CS290 S20 final project
 *
 * name: Garrett Martin
 * Email: martgarr@oregonstate.edu
 */
 function getDeckId() {
   let path = window.location.pathname;
   var pathParts = path.split('/');
   if (pathParts[1] === 'decks') {
     return pathParts[2];
   } else {
     return null;
   }
 }

function handleNewDeckModal() {
  let deckdesc = document.getElementById('deckdesc').value;
  let decktitle = document.getElementById('decktitle').value;
  let deckauth = document.getElementById('deckauthor').value;

  if (!deckdesc || !decktitle || !deckauth) {
    alert('Deck title, author and description are required.');
  } else {
    var request = new XMLHttpRequest();
    request.open('POST', "/decks/newdeck");

    var deckObj = {
      decktitle: decktitle,
      deckdesc: deckdesc,
      deckauthor: deckauth
    };

    var requestBody = JSON.stringify(deckObj);
    request.setRequestHeader('Content-Type', 'application/json');

    request.addEventListener('load', function (event) {
      if (event.target.status === 200) {
        window.location.replace("/decks");
      } else {
        alert("Failed to add new deck.");
      }
    });

    request.send(requestBody);
  }
}

function handleNewFlashcardModal() {
  //new flash card stuff here
}

function handleDeleteDeckButton() {
  let decktitle = document.getElementById('decktitle').innerText;
  console.log("in handle " + decktitle);

  var request = new XMLHttpRequest();
  var requestURL = "/decks/delete";
  request.open('POST', requestURL);

  var delObj = {
    decktitle: decktitle
  };

  var requestBody = JSON.stringify(delObj);
  request.setRequestHeader('Content-Type', 'application/json');

  request.addEventListener('load', function (event) {
    if (event.target.status === 200) {
      window.location.replace("/decks");
    } else {
      alert("error deleting deck");
    }
  });

  request.send(requestBody);
}

function storeEditInDB() {
  let deckdesc = document.getElementById('deckdesc').value;
  let decktitle = document.getElementById('decktitle').innerText;

  if (!deckdesc) {
    alert("A deck description is required.")
  } else {
    var request = new XMLHttpRequest();
    var requestURL = "/decks/" + getDeckId() + "/edit";
    request.open('POST', requestURL);

    var editObj = {
      decktitle: decktitle,
      deckdesc: deckdesc
    };

    var requestBody = JSON.stringify(editObj);
    request.setRequestHeader('Content-Type', 'application/json');

    request.addEventListener('load', function (event) {
      if (event.target.status === 200) {
        window.location.replace("/decks");
      } else {
        alert("error updating deck");
      }
    });

    request.send(requestBody);
  }

};

function clearRequiredForm() {
  //clear required data from form
};

/*
 * UI interactions
 */
window.addEventListener('DOMContentLoaded', function () {

  let deleteDeckButton = document.getElementById('deckdelete');
  if (deleteDeckButton) {
    deleteDeckButton.addEventListener('click', handleDeleteDeckButton);
  }

  let saveNewDeckButton = document.getElementById('saveNewDeck');
  if (saveNewDeckButton) {
    saveNewDeckButton.addEventListener('click', handleNewDeckModal);
  }

  let addFlashCardButton = document.getElementById('addflashcard');
  if (addFlashCardButton) {
    addFlashCardButton.addEventListener('click', addFlashCard)
  }

  let updateDeckButton = document.getElementById('updatebutt');
  if (updateDeckButton) {
    console.log("yes it's there");
    updateDeckButton.addEventListener('click', storeEditInDB);
  }

});
