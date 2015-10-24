var mongo = require('mongoskin');
var db = mongo.db("mongodb://localhost:27017/calc");
db.bind('request');

exports.insertRequest = function insertRequest(calcrequest,result,callback) {

    date = new Date();

    db.collection('request').insert({dateadded:date,request:calcrequest,answer:result}, function(err, result) {
        if (err) {
            console.log(err);

        }
        if (result) {

            console.log('Added!');
            callback(null,true);

        }
    });



}

exports.getRequests = function getRequests(callback) {

    db.collection('request').find().toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        callback("",result);
    });


}






