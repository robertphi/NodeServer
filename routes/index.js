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




module.exports = router;
