var dbcalcs = require('../models/calcs');

exports.HTTPRecieved = function(req, res){

	dbcalcs.getRequests(function(err,dbresult){

		res.render('stats5',{results:JSON.stringify(dbresult)});

	});
	//res.send('Hello World!');
}