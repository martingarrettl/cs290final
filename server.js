/*
 * Server.js for OSU CS290 S20 final project
 *
 * name: Garrett Martin
 * Email: martgarr@oregonstate.edu
 */

var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');

//mongodb Atlas stuff
const MongoClient = require('mongodb').MongoClient;
const uri = process.env.MONGO_URI;

var app = express();
var port = process.env.PORT || 3000;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

MongoClient.connect(uri, { useUnifiedTopology: true }).then(client => {
  //connect to database, get database object, get collection object
  console.log("== Connected to Database");
  const db = client.db('cs290final');
  const collection = db.collection('decks');

  app.use(express.static('public'));

  app.get("/", function (req, res, next) {
    res.status(200).render('index');
  });

  app.get("/decks", function (req, res, next) {
    db.collection('decks').find().toArray().then(results => {
      res.status(200).render('decks', results[0]);
    }).catch(error => {
      console.error(error);
      res.status(500).render('500');
    })
  });

  app.get("/decks/:deckId", function (req, res, next) {
    db.collection('decks').find().toArray().then(results => {
      let deckid = req.params.deckId;
      if (results[deckid]) {
        res.status(200).render('decks', results[deckid]);
      } else {
        next();
      }
    }).catch(error => {
      console.error(error);
      res.status(500).render('500');
    })
  });

  app.get("/decks/:deckId/edit", function (req, res, next) {

  });

  app.get("*", function (req, res) {
    res.status(404).render('404');
  });


  app.listen(port, function() {
    console.log("== Server is listening on port ", port);
  });

  //client.close();
}).catch(error => console.error(error));
