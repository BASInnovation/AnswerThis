

exports.Calculate = function Calculate(message,callback)
{
    var result = "";

    tokenize('2 + 2')

    callback(null,result);

}

function tokenize(code) {
    var results = [];
    var tokenRegExp = /\s*([A-Za-z]+|[0-9]+|\S)\s*/g;

    var m;
    while ((m = tokenRegExp.exec(code)) !== null)
        results.push(m[1]);
    
    console.log(results);

    //return results;
}