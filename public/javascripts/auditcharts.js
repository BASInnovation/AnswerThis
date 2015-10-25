var numbercounts = [];

window.onload = function() {

    populateauditinfo();
    createChart1();
    createChart2();
 
}

function hover(item)
{
    $(item).css('cursor','pointer');
    $(item).attr('src','/images/' + $(item).attr('id') + 'hover.png');
}

function removehover(item)
{   
    $(item).css('cursor','none');
    $(item).attr('src','/images/' + $(item).attr('id') + '.png');
}

function calcclick(item)
{
    
    if($(item).attr('id') == 'minus')
    {
        $('#calcinput').val($('#calcinput').val()+'-');
    }
    else if($(item).attr('id') == 'plus')
    {
        $('#calcinput').val($('#calcinput').val()+'+');
    }
    else if($(item).attr('id') == 'multiply')
    {
        $('#calcinput').val($('#calcinput').val()+'*');
    }
    else if($(item).attr('id') == 'divide')
    {
        $('#calcinput').val($('#calcinput').val()+'/');
    }
    else
    {
        $('#calcinput').val($('#calcinput').val() + $(item).attr('id'));
    }
}

function calcclear()
{
    $('#calcinput').val('');
    $('#feedback').html('');
}

function sendcalc()
{
    $.getJSON('http://answerthis.cloudapp.net/gettext?id=AB_123&to=1234&from=' + $('#tel').val() + '&keyword=hello&content=' + encodeURIComponent($('#calcinput').val()), function(data) {
        //http://answerthis.cloudapp.net
        //var maxQuestions = data.length;
        
        //console.log('DATA: ' + data);

        if(data)
        {
            $('#feedback').html('Calculation Sent!!')
        }

    });

}

function isNumber(token) {
    return token !== undefined && token.match(/^[0-9]+$/) !== null;
}

function populateauditinfo()
{
    var calcsdatafeed = JSON.parse(calcs.replace(/&quot;/g, '"'));

    var html = "";
    var total = 0;
    var answers = [];
    var totaleightcount = 0;
    var requests = [];
    var onecount = 0;
    var twocount = 0;
    var threecount = 0;
    var fourcount = 0;
    var fivecount = 0;
    var sixcount = 0;
    var sevencount = 0;
    var eightcount = 0;
    var ninecount = 0;
    var zerocount = 0;

    for(i=0;i<calcsdatafeed.length;i++)
    {
        html += "<tr>"
        html += "<td>" + calcsdatafeed[i].request + "</td>"
        html += "<td>" + calcsdatafeed[i].answer.toFixed(2) + "</td>"

        if(isNumber(Math.round(calcsdatafeed[i].message).toString()))
        {

            if(isNaN(parseFloat(calcsdatafeed[i].message)))
            {
                html += "<td class='digital'></td>"
            }
            else
            {
                html += "<td class='digital'>" + parseFloat(calcsdatafeed[i].message).toFixed(2) + "</td>"
            }
        }
        else
        {
            html += "<td class='digital'>" + calcsdatafeed[i].message + "</td>" 
        }
        
        
        html += "</tr>"

        var answersplit = calcsdatafeed[i].answer.toString().split('');

        for(j=0;j<answersplit.length;j++)
        {
            if(answersplit[j]==8)
            {
                totaleightcount+=1;
            }
            
        }

        var requestsplit = calcsdatafeed[i].request.split('');

        for(k=0;k<requestsplit.length;k++)
        {

            switch(requestsplit[k])
            {
                case '1':
                    onecount+=1;
                    break;
                case '2':
                    twocount+=1;
                    break;
                case '3':
                    threecount+=1;
                    break;
                case '4':
                    fourcount+=1;
                    break;
                case '5':
                    fivecount+=1;
                    break;
                case '6':
                    sixcount+=1;
                    break;
                case '7':
                    sevencount+=1;
                    break;
                case '8':
                    eightcount+=1;
                    break;
                case '9':
                    ninecount+=1;
                    break;
                case '0':
                    zerocount+=1;
                    break;
            }
            
        }

        total += (calcsdatafeed[i].answer-0);
        answers.push(calcsdatafeed[i].answer);
        requests.push(calcsdatafeed[i].request)
    }

    numbercounts.push(onecount);
    numbercounts.push(twocount);
    numbercounts.push(threecount);
    numbercounts.push(fourcount);
    numbercounts.push(fivecount);
    numbercounts.push(sixcount);
    numbercounts.push(sevencount);
    numbercounts.push(eightcount);
    numbercounts.push(ninecount);
    numbercounts.push(zerocount);

    $('#latestTable > tbody').html(html);
    $('#total').html(total.toFixed(2));

    $('#eight').html(totaleightcount);
    $('#largest').html(Math.max.apply(Math, answers).toFixed(2));
    $('#common').html(common(requests));
}

function common(array)
{
    if(array.length == 0)
        return null;
    var modeMap = {};
    var maxEl = array[0], maxCount = 1;
    for(var i = 0; i < array.length; i++)
    {
        var el = array[i];
        if(modeMap[el] == null)
            modeMap[el] = 1;
        else
            modeMap[el]++;  
        if(modeMap[el] > maxCount)
        {
            maxEl = el;
            maxCount = modeMap[el];
        }
    }
    return maxEl;
}

function createChart1()
{
    var ctx = document.getElementById("chart1").getContext("2d");

    var options = {

        ///Boolean - Whether grid lines are shown across the chart
        scaleShowGridLines : true,

        //String - Colour of the grid lines
        scaleGridLineColor : "rgba(0,0,0,.05)",

        //Number - Width of the grid lines
        scaleGridLineWidth : 1,

        //Boolean - Whether to show horizontal lines (except X axis)
        scaleShowHorizontalLines: true,

        //Boolean - Whether to show vertical lines (except Y axis)
        scaleShowVerticalLines: true,

        //Boolean - Whether the line is curved between points
        bezierCurve : true,

        //Number - Tension of the bezier curve between points
        bezierCurveTension : 0.4,

        //Boolean - Whether to show a dot for each point
        pointDot : true,

        //Number - Radius of each point dot in pixels
        pointDotRadius : 4,

        //Number - Pixel width of point dot stroke
        pointDotStrokeWidth : 1,

        //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
        pointHitDetectionRadius : 20,

        //Boolean - Whether to show a stroke for datasets
        datasetStroke : true,

        //Number - Pixel width of dataset stroke
        datasetStrokeWidth : 2,

        //Boolean - Whether to fill the dataset with a colour
        datasetFill : true,

        //String - A legend template
        legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

    };

    
    var calcsdatafeed = JSON.parse(calcs.replace(/&quot;/g, '"'));
    
    var calcdata =[];
    var calclabels = [];

    for(i=0;i<calcsdatafeed.length;i++)
    {
        calcdata.push(calcsdatafeed[i].answer)
    }

    for(j=0;j<calcsdatafeed.length;j++)
    {
        d = new Date(calcsdatafeed[j].dateadded);
        calclabels.push(d.toLocaleTimeString())
    }

    var data = {
        labels: calclabels,
        datasets: [
            {
                label: "My dataset",
                fillColor: "rgba(151,187,205,0.2)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: calcdata
            }
        ]
    };

    var myLineChart = new Chart(ctx).Line(data, options);
}

function createChart2()
{
    var ctx = document.getElementById("chart2").getContext("2d");

    var options = {
        //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
        scaleBeginAtZero : true,

        //Boolean - Whether grid lines are shown across the chart
        scaleShowGridLines : true,

        //String - Colour of the grid lines
        scaleGridLineColor : "rgba(0,0,0,.05)",

        //Number - Width of the grid lines
        scaleGridLineWidth : 1,

        //Boolean - Whether to show horizontal lines (except X axis)
        scaleShowHorizontalLines: true,

        //Boolean - Whether to show vertical lines (except Y axis)
        scaleShowVerticalLines: true,

        //Boolean - If there is a stroke on each bar
        barShowStroke : true,

        //Number - Pixel width of the bar stroke
        barStrokeWidth : 2,

        //Number - Spacing between each of the X value sets
        barValueSpacing : 5,

        //Number - Spacing between data sets within X values
        barDatasetSpacing : 1,

        //String - A legend template
        legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

    }

    var data = {
        labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
        datasets: [
            {
                label: "My First dataset",
                fillColor: "rgba(151,187,205,0.5)",
                strokeColor: "rgba(151,187,205,0.8)",
                highlightFill: "rgba(151,187,205,0.75)",
                highlightStroke: "rgba(151,187,205,1)",
                data: numbercounts
            }
        ]
    };

    var myBarChart = new Chart(ctx).Bar(data, options);
}