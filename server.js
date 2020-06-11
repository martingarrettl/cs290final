/*
 * Server.js for OSU CS290 S20 final project
 *
 * name: Garrett Martin
 * Email: martgarr@oregonstate.edu
 */

var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');

//mongodb Atlas stuff
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://appaccess:mWf8vhtgPzbAtPxN@cluster0-wu6cw.mongodb.net/cs290final?retryWrites=true&w=majority"

var app = express();
var port = process.env.PORT || 3000;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

MongoClient.connect(uri, { useUnifiedTopology: true }).then(client => {
  //connect to database, get database object, get collection object
  const db = client.db('cs290final');
  const collection = db.collection('decks');
  console.log("== Connected to Database");

  app.use(express.static('public'));
  app.use(bodyParser.json());

  //app.get() functions start here
  app.get("/", function (req, res, next) {
    res.status(200).render('index');
  });

  app.get("/decks", function (req, res, next) {
    db.collection('decks').find().toArray().then(results => {
      res.status(200).render('decks', {decks: results});
    }).catch(error => {
      console.error(error);
      res.status(500).render('500');
    })
  });

  app.get("/decks/:deckId", function (req, res, next) {
    db.collection('decks').find().toArray().then(results => {
      let deckid = req.params.deckId;

      if (results[deckid]) {
        res.status(200).render('displaydeck', results[deckid]);
      } else {
        next();
      }
    }).catch(error => {
      console.error(error);
      res.status(500).render('500');
    })
  });

  app.get("/decks/:deckId/edit", function (req, res, next) {
    db.collection('decks').find().toArray().then(results => {
      let deckid = req.params.deckId;
      if (results[deckid]) {
        res.status(200).render('edit', results[deckid]);
      } else {
        next();
      }
    }).catch(error => {
      console.error(error);
      res.status(500).render('500');
    })
  });

  app.get("*", function (req, res) {
    res.status(404).render('404');
  });

  //app.post() functions start here

  app.post('/decks/:deckId/edit', function (req, res, next) {
    if (req.body && req.body.deckdesc && req.body.decktitle) {
      let deck = db.collection('decks');

      deck.findOneAndUpdate(
        { decktitle: req.body.decktitle },
        { $set: { deckdesc: req.body.deckdesc }}
      ).then(result => {
        console.log("== deck updated successfully")
        res.status(200).send("Deck updated successfully");
      }).catch(error => console.error(error));
    }
  });

  app.post('/decks/addFlashCard', function (req, res, next) {
    if (req.body && req.body.title && req.body.decktitle && req.body.backtext && req.body.fronttext) {
      let deck = db.collection('decks');

      let cardObj = {
        title: req.body.title,
        backtext: req.body.backtext,
        fronttext: req.body.fronttext
      }

      deck.findOneAndUpdate(
        { decktitle: req.body.decktitle },
        { $push: { cards: cardObj }}
      ).then(result => {
        console.log("== Flash Card added successfully")
        res.status(200).send("Flash Card added successfully");
      }).catch(error => console.error(error));
    }
  });

  app.post('/decks/newdeck', function (req, res, next) {
    if (req.body && req.body.deckdesc && req.body.decktitle && req.body.deckauthor) {
      let deck = db.collection('decks');

      let deckObj = {
        decktitle: req.body.decktitle,
        deckauthor: req.body.deckauthor,
        deckdesc: req.body.deckdesc,
        cards: []
      };

      deck.insertOne(deckObj).then(result => {
        console.log("== Deck added successfully.");
        res.status(200).send("Deck added successfully.");
      }).catch(error => console.error(error));
    }
  });

  app.post('/decks/delete', function(req, res, next) {
    if (req.body && req.body.decktitle) {
      let deck = db.collection('decks');
      let query = { decktitle: req.body.decktitle };

      deck.deleteOne(query).then(result => {
        console.log("== Deck deleted successfully.");
        res.status(200).send("Deck deleted successfully.");
      }).catch(error => console.error(error));
    }
  });

  app.listen(port, function() {
    console.log("== Server is listening on port ", port);
  });

  //client.close();
}).catch(error => console.error(error));
