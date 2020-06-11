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
  let decktitle = document.getElementById('decktitle').innerText;
  let cardtitle = document.getElementById('fctitle').value;
  let backtext = document.getElementById('backtext').value;
  let fronttext = document.getElementById('fronttext').value;

  if (!cardtitle || !backtext || !fronttext) {
    alert("Card title, front text and back text are all required.");
  } else {
    var request = new XMLHttpRequest();
    var requestURL = "/decks/addFlashCard";
    request.open('POST', requestURL);

    var cardObj = {
      decktitle: decktitle,
      title: cardtitle,
      backtext: backtext,
      fronttext: fronttext
    };

    var requestBody = JSON.stringify(cardObj);
    request.setRequestHeader('Content-Type', 'application/json');

    request.addEventListener('load', function (event) {
      if (event.target.status === 200) {
        window.location.replace("/decks/" + getDeckId() + "/edit");
      } else {
        alert("error adding flashcard");
      }
    });

    request.send(requestBody);
  }
}

function handleDeleteDeckButton() {
  let decktitle = document.getElementById('decktitle').innerText;

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

  let saveNewFlashCard = document.getElementById('createFlashCard');
  if (saveNewFlashCard) {
    saveNewFlashCard.addEventListener('click', handleNewFlashcardModal);
  }

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
    updateDeckButton.addEventListener('click', storeEditInDB);
  }

});
