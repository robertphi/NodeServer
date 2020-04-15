var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET units. */
router.get('/units', function(req, res) {
  var db = req.db;
  var collection = db.get('Unit');

  collection.find({},{},function(e,docs){
    res.json(docs)
  });
});

router.get('/unit/:id', function(req, res) {
  var db = req.db;
  var collection = db.get('Unit');
  var id = req.params.id;
  var query = { _id : id};

  collection.findOne(query,{},function(e,docs){
    res.json(docs)
  });
});

router.post('/unit', function (req, res) {
  var unit = req.body;
  var db = req.db;
  var collection = db.get('Unit');

  collection.insert(unit, {}, function(err, data){
    res.json(data);
  })
});

router.put('/unit/:id', function (req, res) {
  var unit = req.body;
  var db = req.db;
  var collection = db.get('Unit');
  var query = { _id : unit._id};
  var newValues = { $set: unit};

  collection.update(query, newValues, {}, function(err, data){
    res.json(data);
  })
});

router.delete('/unit/:id', function (req, res) {
  var db = req.db;
  var collection = db.get('Unit');
  var id = req.params.id;
  var query = { _id : id};

  collection.remove(query, {}, function(err, data){
    res.json(data);
  })
});




/* GET characters. */
router.get('/characters', function(req, res) {
  var db = req.db;
  var collection = db.get('Character');

  collection.find({},{},function(e,docs){
    res.json(docs)
  });
});

router.get('/character/:id', function(req, res) {
  var db = req.db;
  var collection = db.get('Character');
  var id = req.params.id;
  var query = { _id : id};

  collection.findOne(query,{},function(e,docs){
    res.json(docs)
  });
});


router.post('/character', function (req, res) {
  var unit = req.body;
  var db = req.db;
  var collection = db.get('Character');

  collection.insert(unit, {}, function(err, data){
    res.json(data);
  })
});

router.put('/character/:id', function (req, res) {
  var character = req.body;
  var db = req.db;
  var collection = db.get('Character');
  var query = { _id : character._id};
  var newValues = { $set: character};

  collection.update(query, newValues, {}, function(err, data){
    res.json(data);
  })
});

router.delete('/character/:id', function (req, res) {
  var db = req.db;
  var collection = db.get('Character');
  var id = req.params.id;
  var query = { _id : id};

  collection.remove(query, {}, function(err, data){
    res.json(data);
  })
});




module.exports = router;
