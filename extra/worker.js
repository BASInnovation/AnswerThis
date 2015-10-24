

exports.Calculate = function Calculate(message,callback)
{
    var result = "";

    console.log(isName('H'));

    callback(null,result);

}

function tokenize(code) {
    var results = [];
    var tokenRegExp = /\s*([A-Za-z]+|[0-9]+|\S)\s*/g;

    var m;
    while ((m = tokenRegExp.exec(code)) !== null)
        results.push(m[1]);

    return results;
}

function isNumber(token) {
    return token !== undefined && token.match(/^[0-9]+$/) !== null;
}

function isName(token) {
    return token !== undefined && token.match(/^[A-Za-z]+$/) !== null;
}

