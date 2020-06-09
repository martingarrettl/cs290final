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
const uri = "mongodb+srv://appaccess:F5exhv26ma8gL13s@cluster0-wu6cw.mongodb.net/decks?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useUnifiedTopology: true });

var app = express();
var port = process.env.PORT || 3000;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get("/", function (req, res, next) {
  res.status(200).render('index');
});

app.get("/decks", function (req, res, next) {
  res.status(200).render('decks');
});


app.get("/decks/:deckId", function (req, res, next) {
  let deck = db.collection('decks');
  let deckCursor = collection.find({});

  deckCursor.toArray(function (err, deckData) {
    if (err) {
      res.status(500).send("Error fetching decks from database.");
    } else {
      res.status(200).render('decks', deckData[deckId]);
    }
  });
});


app.get("*", function (req, res) {
  res.status(404).render('404');
});

client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();

  app.listen(port, function() {
    console.log("== Server is listening on port ", port);
  });
});
