window.onload = function() {
 
    createChart1();
    createChart2();
    populateauditinfo();
 
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
    console.log($(item).attr('id'));
    
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
    $('#feedback').html('')
}

function sendcalc()
{
    $.getJSON('http://127.0.0.1:3000/gettexttest?id=AB_123&to=1234&from=' + $('#tel').val() + '&keyword=hello&content=5337%2B1', function(data) {
        //var maxQuestions = data.length;
        console.log(data);
        if(data)
        {
            $('#feedback').html('Calculation Sent!!')
        }

    });

}

function populateauditinfo()
{
    var calcsdatafeed = JSON.parse(calcs.replace(/&quot;/g, '"'));

    var html = "";
    var total = 0;
    var answers = [];

    for(i=0;i<calcsdatafeed.length;i++)
    {
        html += "<tr>"
        html += "<td>" + calcsdatafeed[i].request + "</td>"
        html += "<td>" + calcsdatafeed[i].answer + "</td>"
        html += "<td>" + calcsdatafeed[i].message + "</td>"
        html += "</tr>"

        total += (calcsdatafeed[i].answer-0);
        answers.push(calcsdatafeed[i].answer);
    }

    $('#latestTable > tbody').html(html);
    $('#total').html(total);

    $('#largest').html(Math.max.apply(Math, answers));
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
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
                label: "My First dataset",
                fillColor: "rgba(220,220,220,0.5)",
                strokeColor: "rgba(220,220,220,0.8)",
                highlightFill: "rgba(220,220,220,0.75)",
                highlightStroke: "rgba(220,220,220,1)",
                data: [65, 59, 80, 81, 56, 55, 40]
            },
            {
                label: "My Second dataset",
                fillColor: "rgba(151,187,205,0.5)",
                strokeColor: "rgba(151,187,205,0.8)",
                highlightFill: "rgba(151,187,205,0.75)",
                highlightStroke: "rgba(151,187,205,1)",
                data: [28, 48, 40, 19, 86, 27, 90]
            }
        ]
    };

    var myBarChart = new Chart(ctx).Bar(data, options);
}