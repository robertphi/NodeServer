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

  // res.json({test: 'hello'});
  collection.find({},{},function(e,docs){
    res.json(docs)
  });
});

router.get('/unit/:id', function(req, res) {
  var db = req.db;
  var collection = db.get('Unit');
  var id = req.params.id;
  var query = { _id : id};

  // res.json({test: 'hello'});
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


module.exports = router;
