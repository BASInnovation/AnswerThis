var convert = require('convert-units');


exports.Calculate = function Calculate(message,callback)
{
    var result = "";



    //console.log('Result: ' + evaluateAsFloat(message));

    // lets check if we have any conversions else this is a calculater

    ///if (message.upindexOf("KG"))

    //console.log("mes" + message);

    result = CheckForType(message);


    //console.log("here" + result);




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

function parse(code) {

    var tokens = tokenize(code);

    //console.log(tokens);

    var position = 0;

    function peek() {
        return tokens[position];
    }

    function consume(token) {
        //assert.strictEqual(token, tokens[position]);
        position++;
    }

    function parsePrimaryExpr() {
        var t = peek();

        if (isNumber(t)) {
            consume(t);
            return {type: "number", value: t};
        } else if (isName(t)) {
            consume(t);
            return {type: "name", id: t};
        } else if (t === "(") {
            consume(t);
            var expr = parseExpr();
            if (peek() !== ")")
                throw new SyntaxError("expected )");
            consume(")");
            return expr;
        } else {

            throw new SyntaxError("expected a number, a variable, or parentheses");
        }
    }

    function parseMulExpr() {
        var expr = parsePrimaryExpr();
        var t = peek();
        while (t === "*" || t === "/") {
            consume(t);
            var rhs = parsePrimaryExpr();
            expr = {type: t, left: expr, right: rhs};
            t = peek();
        }
        return expr;
    }

    function parseExpr() {
        var expr = parseMulExpr();
        var t = peek();
        while (t === "+" || t === "-") {
            consume(t);
            var rhs = parseMulExpr();
            expr = {type: t, left: expr, right: rhs};
            t = peek();
        }
        return expr;
    }

    var result = parseExpr();

    if (position !== tokens.length)
        throw new SyntaxError("unexpected '" + peek() + "'");

    return result;
}

function evaluateAsFloat(code) {
    var variables = Object.create(null);
    variables.e = Math.E;
    variables.pi = Math.PI;

    function evaluate(obj) {
        switch (obj.type) {
        case "number":  return parseInt(obj.value);
        case "name":  return variables[obj.id] || 0;
        case "+":  return evaluate(obj.left) + evaluate(obj.right);
        case "-":  return evaluate(obj.left) - evaluate(obj.right);
        case "*":  return evaluate(obj.left) * evaluate(obj.right);
        case "/":  return evaluate(obj.left) / evaluate(obj.right);
        }
    }

    return evaluate(parse(code));
}

function CheckForType(message)
{

    var calculatorwords = {338:'bee',
        69:'69 ;)',
        5338:'bees',
        638:'beg',
        5638:'begs',
        36138:'beige',
        31738:'belie',
        531738:'belies',
        7738:'bell',
        37738:'belle',
        537738:'belles',
        5317738:'bellies',
        57738:'bells',
        3631538:'besiege',
        53631538:'besieges',
        818:'bib',
        37818:'bible',
        537818:'bibles',
        5818:'bibs',
        618:'big',
        3718:'bile',
        36718:'bilge',
        536718:'bilges',
        7718:'bill',
        5317718:'billies',
        57718:'bills',
        55378:'bless',
        5355378:'blesses',
        55178:'bliss',
        5355178:'blisses',
        8078:'blob',
        58078:'blobs',
        808:'bob',
        5318808:'bobbies',
        378808:'bobble',
        5378808:'bobbles',
        5808:'bobs',
        608:'bog',
        376608:'boggle',
        5376608:'boggles',
        31608:'bogie',
        531608:'bogies',
        5608:'bogs',
        7108:'boil',
        57108:'boils',
        3708:'bole',
        53708:'boles',
        7708:'boll',
        57708:'bolls',
        8008:'boob',
        5318008:'boobies',
        55318008:'boobless',
        58008:'boobs',
        316008:'boogie',
        5316008:'boogies',
        5008:'boos',
        32008:'booze',
        532008:'boozes',
        4508:'bosh',
        5508:'boss',
        535508:'bosses',
        0208:'bozo',
        50208:'bozos',
        883:'ebb',
        5883:'ebbs',
        733:'eel',
        5733:'eels',
        663:'egg',
        5663:'eggs',
        77345663:'eggshell',
        577345663:'eggshells',
        063:'ego',
        5063:'egos',
        5316373:'elegies',
        37816173:'eligible',
        773:'ell',
        5773:'ells',
        3573:'else',
        336:'gee',
        5336:'gees',
        35336:'geese',
        736:'gel',
        5736:'gels',
        531607036:'geologies',
        3816:'gibe',
        53816:'gibes',
        616:'gig',
        376616:'giggle',
        5376616:'giggles',
        070616:'gigolo',
        5070616:'gigolos',
        5616:'gigs',
        7716:'gill',
        57716:'gills',
        3376:'glee',
        8176:'glib',
        8076:'glob',
        38076:'globe',
        538076:'globes',
        58076:'globs',
        55076:'gloss',
        5355076:'glosses',
        53155076:'glossies',
        806:'gob',
        378806:'gobble',
        5378806:'gobbles',
        5806:'gobs',
        5306:'goes',
        376606:'goggle',
        5376606:'goggles',
        5317706:'gollies',
        35006:'goose',
        535006:'gooses',
        506:'gos',
        4506:'gosh',
        534506:'goshes',
        7334:'heel',
        57334:'heels',
        7734:'hell',
        4517734:'hellish',
        07734:'hello',
        507734:'hellos',
        57734:'hells',
        534:'hes',
        314:'hie',
        5314:'hies',
        4614:'high',
        54614:'highs',
        7714:'hill',
        53177187714:'hillbillies',
        57714:'hills',
        514:'his',
        5514:'hiss',
        535514:'hisses',
        804:'hob',
        5318804:'hobbies',
        378804:'hobble',
        5378804:'hobbles',
        0804:'hobo',
        530804:'hoboes',
        50804:'hobos',
        5804:'hobs',
        304:'hoe',
        5304:'hoes',
        604:'hog',
        4516604:'hoggish',
        5604:'hogs',
        3704:'hole',
        53704:'holes',
        5317704:'hollies',
        3504:'hose',
        53504:'hoses',
        5181:'ibis',
        535181:'ibises',
        500761:'igloos',
        771:'ill',
        378163771:'illegible',
        5771:'ills',
        3751:'isle',
        53751:'isles',
        337:'lee',
        5337:'lees',
        637:'leg',
        3781637:'legible',
        5537637:'legless',
        5637:'legs',
        137:'lei',
        5137:'leis',
        537:'les',
        5537:'less',
        335537:'lessee',
        5335537:'lessees',
        817:'lib',
        73817:'libel',
        573817:'libels',
        5817:'libs',
        317:'lie',
        36317:'liege',
        536317:'lieges',
        5317:'lies',
        531717:'lilies',
        37517:'lisle',
        807:'lob',
        5318807:'lobbies',
        3807:'lobe',
        53807:'lobes',
        5807:'lobs',
        607:'log',
        3607:'loge',
        53607:'loges',
        0607:'logo',
        50607:'logos',
        5607:'logs',
        7707:'loll',
        57707:'lolls',
        35007:'loose',
        535007:'looses',
        3507:'lose',
        53507:'loses',
        5507:'loss',
        535507:'losses',
        35380:'obese',
        361780:'oblige',
        5361780:'obliges',
        3080:'oboe',
        53080:'oboes',
        553580:'obsess',
        53553580:'obsesses',
        3760:'ogle',
        53760:'ogles',
        040:'oho',
        5040:'ohos',
        540:'ohs',
        710:'oil',
        5710:'oils',
        0370:'oleo',
        3200:'ooze',
        53200:'oozes',
        335:'see',
        5335:'sees',
        32135:'seize',
        532135:'seizes',
        7735:'sell',
        57735:'sells',
        345:'she',
        77345:'shell',
        577345:'shells',
        5345:'shes',
        53145:'shies',
        77145:'shill',
        577145:'shills',
        3045:'shoe',
        53045:'shoes',
        50045:'shoos',
        36315:'siege',
        536315:'sieges',
        4615:'sigh',
        54615:'sighs',
        7715:'sill',
        5317715:'sillies',
        57715:'sills',
        0715:'silo',
        50715:'silos',
        515:'sis',
        53515:'sises',
        535515:'sisses',
        5315515:'sissies',
        3215:'size',
        53215:'sizes',
        372215:'sizzle',
        5372215:'sizzles',
        461375:'sleigh',
        5461375:'sleighs',
        8075:'slob',
        58075:'slobs',
        3075:'sloe',
        53075:'sloes',
        6075:'slog',
        56075:'slogs',
        45075:'slosh',
        5345075:'sloshes',
        805:'sob',
        5805:'sobs',
        7105:'soil',
        57105:'soils',
        705:'sol',
        3705:'sole',
        53705:'soles',
        1705:'soli',
        0705:'solo',
        50705:'solos',
        5705:'sols',
        5002:'zoos',
        38338:'Beebe',
        321738:'Belize',
        7738:'Bell',
        5538:'Bess',
        735538:'Bessel',
        315538:'Bessie',
        818:'Bib',
        37818:'Bible',
        537818:'Bibles',
        08718:'Bilbo',
        7718:'Bill',
        317718:'Billie',
        46178:'Bligh',
        808:'Bob',
        18808:'Bobbi',
        318808:'Bobbie',
        35108:'Boise',
        37008:'Boole',
        3508:'Bose',
        3873:'Elbe',
        173:'Eli',
        35173:'Elise',
        035173:'Eliseo',
        31773:'Ellie',
        51773:'Ellis',
        351073:'Eloise',
        31573:'Elsie',
        31553:'Essie',
        036:'Geo',
        58816:'Gibbs',
        716:'Gil',
        53716:'Giles',
        7716:'Gill',
        4516:'Gish',
        1806:'Gobi',
        57388306:'Goebbels',
        606:'Gog',
        70606:'Gogol',
        376006:'Google',
        084:'HBO',
        3834:'Hebe',
        73634:'Hegel',
        501734:'Helios',
        5534:'Hess',
        35534:'Hesse',
        7714:'Hill',
        737714:'Hillel',
        5514:'Hiss',
        538804:'Hobbes',
        58804:'Hobbs',
        317704:'Hollie',
        517704:'Hollis',
        081:'Ibo',
        771:'Ill',
        5151:'Isis',
        337:'Lee',
        0637:'Lego',
        46137:'Leigh',
        037:'Leo',
        5037:'Leos',
        537:'Les',
        317537:'Leslie',
        315537:'Lessie',
        317:'Lie',
        36317:'Liege',
        37717:'Lille',
        317717:'Lillie',
        217:'Liz',
        312217:'Lizzie',
        5107:'Lois',
        0140:'Ohio',
        3510:'Oise',
        31770:'Ollie',
        0750:'Oslo',
        31220:'Ozzie',
        70345:'Sheol',
        407145:'Shiloh',
        0405:'Soho',
        705:'Sol',
        51705:'Solis',
        61732:'Zelig',
        0812:'Zibo',
        302:'Zoe',};

    message = message.toUpperCase().trim();

    //console.log("Message uppercase" + message);
    if (message.indexOf('PI') >= 0)
    {
        //console.log("pie");
        var pi =  Math.PI;
        return {'actualResult': pi, 'message':pi + ''};

    }
    else if(message.indexOf('KG') > 0 && message.indexOf('LB') > 0)
    {
        var indexOfKG =  message.indexOf('KG');
        var indexOfLb =  message.indexOf('LB');

        var arrayMessage = message.split('to');
        var part1 = arrayMessage[0].trim();
        var numberPattern = /\d+/g;
        var resultNumber = part1.match( numberPattern );

        //console.log("our number to convert" + resultNumber);



       // var part2 = arrayMessage[1].trim();

        if (indexOfKG < indexOfLb)
        {

            result = convert(resultNumber).from('kg').to('lb');

        }else {

            result = convert(resultNumber).from('lb').to('kg');

        }

          return {'actualResult': result, 'message':''};



    }
    else if(message.indexOf('Stone') > 0)
    {

       Convert(message);

    }
    else {

        //this is maths/////
        //console.log("In Math");
        var actualResult = evaluateAsFloat(message);
        var messageResult = '';
        if (calculatorwords[actualResult]) {
             messageResult = calculatorwords[actualResult].toUpperCase() + '!!';
        }

        return {'actualResult': actualResult, 'message':messageResult}


    }

}


function Convert(message,type)
{

    var result = '';

    var message = "";



    if (type == 1) {


        //console.log(result);
    }


    return result;



}