var worker = require('../extra/worker');
var dbcalcs = require('../models/calcs');



exports.TextRecieved = function(req, res){

   // http://hmlbip.northeurope.cloudapp.azure.com/gettext?id=AB_123&to=12345&from=441234567890&keyword=hello&content=Hello%20world
   // http://www.example.com/receive-sms?to=84433&from=441234567890&content=Hello+World&keyword=hello&msg_id=AB_12345
   // work out text message
   // get varibles out of message

   var fromNumber =  req.params.from;
   var txtMessage = req.params.content;
   var msg_id = req.params.msg_id;
    var keyword = req.params.hello;

    worker.Calculate(txtMessage,function(err,result){

    //phils reply in here.



    // save to db
        dbcalcs.insertRequest(txtMessage,result,function(err,dbresult){




            //right lets send the response back to the user.

            var clockwork = require('clockwork')({key:'be3f36d428fd67ddbf1766c8c0473a394555be59'});

            clockwork.sendSms({ To: fromNumber, Content: result},
                function(error, resp) {
                    if (error) {
                        console.log('Something went wrong', error);
                    } else {

                        //console.log('Message sent',resp.responses[0].id)
                        console.log("message sent");
                    }
                });

        })

    });








    //send the answer back.




    res.sendStatus(200);



}


exports.TextRecievedTest = function(req, res){

    // http://hmlbip.northeurope.cloudapp.azure.com/gettext?id=AB_123&to=12345&from=441234567890&keyword=hello&content=Hello%20world
    // http://www.example.com/receive-sms?to=84433&from=441234567890&content=Hello+World&keyword=hello&msg_id=AB_12345
    // work out text message
    // get varibles out of message

    var fromNumber =  req.query.from;
    var txtMessage = req.query.content;
    var msg_id = req.query.msg_id;
    var keyword = req.query.hello;


    console.log("fromNumber" + fromNumber);
    console.log("txtMessage" + txtMessage);



    worker.Calculate(txtMessage,function(err,result){


        // save to db
        dbcalcs.insertRequest(txtMessage,result,function(err,dbresult){


            res.send(result);


        })

    });








    //send the answer back.








}







