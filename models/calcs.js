var mongo = require('mongoskin');
var db = mongo.db("mongodb://localhost:27017/calc");
db.bind('request');

exports.insertRequest = function insertRequest(calcrequest,result,callback) {

    db.collection('request').insert({request:calcrequest,answer:result}, function(err, result) {
        if (err) {
            console.log(err);

        }
        if (result) {

            console.log('Added!');
            callback(null,true);

        }
    });



}






