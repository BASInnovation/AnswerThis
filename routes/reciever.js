var worker = require('../extra/worker');




exports.TextRecieved = function(req, res){


   // http://www.example.com/receive-sms?to=84433&from=441234567890&content=Hello+World&keyword=hello&msg_id=AB_12345
    //work out text message
   // get varibles out of message

   var fromNumber =  req.params.from;
   var txtMessage = req.params.content;
   var msg_id = req.params.msg_id;
    var keyword = req.params.hello;

    worker.Calculate(txtMessage,function(err,result){

    //phils reply in here.



    });





    require('querystring').parse(url)

    //save to db


    //send the answer back.

    var clockwork = require('clockwork')({key:'be3f36d428fd67ddbf1766c8c0473a394555be59'});

    clockwork.sendSms({ To: '447812057666', Content: 'Test!'},
        function(error, resp) {
            if (error) {
                console.log('Something went wrong', error);
            } else {

                //console.log('Message sent',resp.responses[0].id);

            }
        });


    res.send('Hello World!');



}
