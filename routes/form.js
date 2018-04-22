var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var objectId = require('mongodb').ObjectID;
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'test';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    client.close();
});
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('form', { title: 'form' });
});

router.get('/show',function (req,res,next) {
    var resultArray = [];
    mongo.connect(url, function (err, database) {
        assert.equal(null, err);
        var db = database.db('test');
        var cursor = db.collection('student').find();
        cursor.forEach(function (doc,err) {
            assert.equal(null, err);
            resultArray.push(doc);
        },function () {
            db.close;
            res.render('form',{items: resultArray});
        });
    });
});

router.post('/',function (req, res) {
    var items =  {
        name: req.body.name,
        lname: req.body.lname
    };

    mongo.connect(url, function (err, database) {
        assert.equal(null, err);
        var db=database.db('test');

        db.collection('student').insertOne(items, function (err, result) {
            assert.equal(null, err);
            res.redirect('/');
            db.close;
        });
    });

});

router.get('/delete/:id',function (req,res) {
    mongo.connect(url, function (err, database) {
        var db = database.db('test');
        var id = req.params.id;
        console.log(id);
        db.collection('student').deleteOne({_id: objectId(id)}, function (err ,result) {
           assert.equal(null, err);

           res.redirect('/');
        });
    });
});



module.exports = router;
