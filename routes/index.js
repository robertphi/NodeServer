var express = require('express');
var router = express.Router();
var glob = require('glob');

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


/* GET images. */
router.get('/character-image-list', function(req, res) {
  glob(appRoot + "/public/images/characters/*", {}, function (er, files) {
    files = files.map( (fileName) => {
      return fileName.replace('D:/NodeServer/public', '');
    })
    return res.json(files);
  })
});

/* GET images. */
router.get('/unit-image-list', function(req, res) {
  glob(appRoot + "/public/images/units/*", {}, function (er, files) {
    files = files.map( (fileName) => {
      return fileName.replace('D:/NodeServer/public', '');
    })
    return res.json(files);
  })
});

router.post('/upload', function(req, res) {
  console.log(req.files.image); // the uploaded file object

  let file = req.files.image;

  // Use the mv() method to place the file somewhere on your server
  file.mv(appRoot + "/public/images/units/" + file.name, function(err) {
    if (err)
      return res.status(500).send(err);

    res.json({imageUrl : "images/units/" + file.name});
  });
});




module.exports = router;
