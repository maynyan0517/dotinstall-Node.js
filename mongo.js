// var MongoClient = require('mongodb').MongoClient,
//     settings = require('./settings');
// MongoClient.connect("mongodb://"+settings.host+"/"+settings.db, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
//  }
// function(err, db) {
//   if (err) { return console.dir(err); }
//   console.log("connected to db");
// });

const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const assert = require('assert')

MongoClient.connect('mongodb://127.0.0.1:27017/myDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
 }, (err, client) => {
    assert.equal(null, err)
    console.log("Connected successfully to server")
    var db = client.db('myDB');
    db.collection("users", function(err, collection) {
      var docs = [
        {name: "masato", score: 99},
        {name: "sasapple", score: 1},
        {name: "lord_vader", score: 9999999}
      ];
      // collection.insertMany(docs, function(err, result) {
      //   console.dir(result);
      // });
      // collection.find({name: "masato"}).toArray(function(err, items) {
      //   console.log(items);
      // });
      var stream = collection.find().stream();
      stream.on("data", function(item) {
        console.log(item);
      });
      stream.on("end", function() {
        console.log("finished");
      });
    });
    // client.close()

})