var express = require('express');
var app = express();

var path = require('path');
var bodyParser = require('body-parser');

var router = express.Router();

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/weekend_challenge_04_mongo');
mongoose.model('Message', new Schema({"name": String, "message": String}, {collection: 'communications'}));

var Message = mongoose.model('Message');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({expanded: true}));

router.post('/messages', function(req,res){
    // pull the data off of the request
    var addMessage = new Message({"name": req.body.name, "message": req.body.messageContent});

    addMessage.save(function(err, data){
       if(err) console.log("Error saving message: ", err);
        res.send(data);
    });

});

router.get('/board', function(req, res){

    Message.find({}, function(err, data){
        if(err){
            console.log("GET error server: ", err);
        }
        res.send(data);
    })


});

router.delete('/delete', function(req, res){
    Message.findByIdAndRemove({"_id": req.body.id}, function(err, data){
        if (err) console.log("Delete error: ", err);
        res.send(data);
    });
});

router.get("/admin", function(req,res){
    var file = req.params[0] || "/views/admin.html";
    res.sendFile(path.join(__dirname, "../public", file));
});

router.get("/*", function(req,res){
    var file = req.params[0] || "/views/index.html";
    res.sendFile(path.join(__dirname, "../public", file));
});


module.exports = router;