function retriveDataset() {
            
    // returns a promise that can be used later. 
    
    return $.ajax({
        /*
        Using post instead of get to stop the browser from
        displaying cached results instead of newer ones
        */
        type: "POST",
        url: 'php/newerValues.php',
    });
}


function drawGaugeArc(canvaID, option, data) {
    var canvas = document.getElementById(canvaID);
    var context = canvas.getContext("2d");
    var fixedValue; // need to correctly draw the arc
    
    if(option == "temp") {
        fixedValue = 1 + data.temp / 40;
    }
    else if(option == "light") {
        fixedValue = 1 + data.light / 1500;
    }
    else if(option == "co2") {
        fixedValue = 1 + data.co2 / 1500;
    }
    else {
        fixedValue = 1 + data.mois / 1000;
    }
    
    context.beginPath();
    context.arc(125, 125, 113, Math.PI, fixedValue * Math.PI, false);
    context.lineWidth = 12;
    context.strokeStyle = "black";
    context.stroke();
}


/*
Once the datas have been retrived from ajax,
they get parsed and the page gets updated
with them
*/

function reloadDataset() {
    retriveDataset().then(
    function(response) {
        var dataset = JSON.parse(response);
        
        // TEMPERATURE
        
        // Change background color based on the temperature
        var td = document.getElementById("temperatureBox");

        if (dataset.temp >= 18 && dataset.temp <= 27) {
            bgColor = "#a6da95";
        }
        else if (dataset.temp >= 10 && dataset.temp <= 18 || dataset.temp >= 27 && dataset.temp <= 30) {
            bgColor = "#f0c6c6";
        }
        else {
            bgColor = "#ed8796";
        }

        td.setAttribute("style", "background-color:" + bgColor)
        
        // Draw the temperature gauge arc
        drawGaugeArc("gauge-arc-temp","temp", dataset);

        // Display the temperature value
        document.getElementById("tempDisplay").innerHTML = dataset.temp;

        // Display the temperature instructions
        if(dataset.temp < 20) {
            document.getElementById("tempInstructions").innerHTML = "The plant needs more heat.";
        }
        else if (dataset.temp > 25) {
            document.getElementById("tempInstructions").innerHTML = "The plant needs more fresh";
        }
        else {
            document.getElementById("tempInstructions").innerHTML = "The temperature is optimal.";
        }

        // LIGHT
        
        // Change background color based on the light
        td = document.getElementById("lightBox");

        if (dataset.light >= 800 && dataset.light <= 1250) {
            bgColor = "#a6da95";
        }
        else if (dataset.light >= 400 && dataset.light < 800 || dataset.light >= 1250 && dataset.light < 1500) {
            bgColor = "#f0c6c6";
        }
        else {
            bgColor = "#ed8796";
        }

        td.setAttribute("style", "background-color:" + bgColor)
        
        // Draw the light gauge arc
        drawGaugeArc("gauge-arc-light","light", dataset);

        // Display the light value
        document.getElementById("lightDisplay").innerHTML = dataset.light;

        // Display the light instructions
        if(dataset.light < 800) {
            document.getElementById("lightInstructions").innerHTML = "The plant needs more light.";
        }
        else if (dataset.light > 1500) {
            document.getElementById("lightInstructions").innerHTML = "The plant needs more dark.";
        }
        else {
            document.getElementById("lightInstructions").innerHTML = "The light exposure is optimal.";
        }

        // CO2
        
        // Change background color based on the co2
        td = document.getElementById("co2Box");

        if (dataset.co2 >= 800 && dataset.co2 <= 1500) {
            bgColor = "#a6da95";
        }
        else if (dataset.co2 >= 500 && dataset.co2 < 800 || dataset.co2 >= 1500 && dataset.co2 < 1750) {
            bgColor = "#f0c6c6";
        }
        else {
            bgColor = "#ed8796";
        }

        td.setAttribute("style", "background-color:" + bgColor)
        
        // Draw the co2 gauge arc
        drawGaugeArc("gauge-arc-co2","co2", dataset);

        // Display the co2 value
        document.getElementById("co2Display").innerHTML = dataset.co2;

        // Display the co2 instructions
        if(dataset.co2 < 800) {
            document.getElementById("co2Instructions").innerHTML = "The plant needs more CO2.";
        }
        else if (dataset.co2 > 1500) {
            document.getElementById("co2Instructions").innerHTML = "The plant needs less CO2.";
        }
        else {
            document.getElementById("co2Instructions").innerHTML = "The CO2 level is optimal.";
        }

        // UMIDITY
        
        // Change background color based on the co2
        td = document.getElementById("moisBox");

        if (dataset.mois >= 300 && dataset.mois <= 700) {
            bgColor = "#a6da95";
        }
        else if (dataset.mois >= 200 && dataset.mois < 300 || dataset.mois >= 700 && dataset.mois < 800) {
            bgColor = "#f0c6c6";
        }
        else {
            bgColor = "#ed8796";
        }

        td.setAttribute("style", "background-color:" + bgColor)
        
        // Draw the moisture gauge arc
        drawGaugeArc("gauge-arc-mois","mois", dataset);

        // Display the moisture value
        document.getElementById("moisDisplay").innerHTML = dataset.mois;

        // Display the moisture instructions
        if(dataset.mois < 300) {
            document.getElementById("moisInstructions").innerHTML = "The plant needs more water.";
        }
        else if (dataset.mois > 700) {
            document.getElementById("moisInstructions").innerHTML = "The plant needs less water.";
        }
        else {
            document.getElementById("moisInstructions").innerHTML = "The water level is optimal.";
        }
    });
}