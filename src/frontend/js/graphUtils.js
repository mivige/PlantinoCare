function retriveData(datasDate, choosedOption) {
    return $.ajax({
        type: "POST",
        url: "php/chartData.php",
        data: {
            requestedDate: datasDate,
            requestedOption: choosedOption,
        },
    });
}

function retriveRecommendedValues(choosedOption) {
    return $.ajax({
        type: "POST",
        url: "php/recValues.php",
        data: {
            plantID: 1, // fixed ID, as of now we're managing one type of plant only
            requestedOption: choosedOption,
        },
    });
}

function getRecommendedValues(response) {
    let reccomended = [];

    var parsedValue = JSON.parse(response);

    for (var val in parsedValue) {
        reccomended.push(parseFloat(parsedValue[val]).toFixed(2));
    }

    return reccomended;
}

function getDataset(response) {
    let dataset = [];

    let fullData = JSON.parse(response);

    // stores the single value for the timeframe
    let timeFrameVal;

    // for every timeframe
    for (let i = 0; i < 12; i++) {
        // extract the value for the single timeframe
        timeFrameVal = JSON.parse(JSON.stringify(fullData[i]));

        for (let val in timeFrameVal) {
            dataset.push(parseFloat(timeFrameVal[val]).toFixed(2));
        }
    }

    return dataset;
}

/*
 * Setups the chart with different colors based on the
 * kind of data the user has selected.
 * After retriving necessary data, builds and displays
 * the chart
 * @param {string} datasDate Date in which the data to be displayed were captured
 * @param {string} choosedOption Which type of captured data to display (temp, light, co2, mois)
 */
async function showGraph(datasDate, choosedOption) {
    // Promise to get needed data, in the meantime keep 
    // setting up the chart
    let dataPromise = retriveData(datasDate, choosedOption)
    let recommendedValuesPromise = retriveRecommendedValues(choosedOption)

    // Chart color properties
    let dataLabel;
    let dataBgColor;
    let dataBorderColor;
    let dataHoverBgColor;
    let dataHoverBorderColor;
    let borderColorReccomended;

    switch (choosedOption) {
        case "temp":
            dataLabel = "Temperature";
            dataBgColor = "#eed49f";
            dataBorderColor = "#eed49f";
            dataHoverBgColor = "#CCCCCC";
            dataHoverBorderColor = "#666666";
            borderColorReccomended = "#eed49f";
            break;

        case "light":
            dataLabel = "Light";
            dataBgColor = "#7dc4e4";
            dataBorderColor = "#7dc4e4";
            dataHoverBgColor = "#CCCCCC";
            dataHoverBorderColor = "#666666";
            borderColorReccomended = "#7dc4e4";
            break;

        case "co2":
            dataLabel = "CO2";
            dataBgColor = "#ed8796";
            dataBorderColor = "#ed8796";
            dataHoverBgColor = "#CCCCCC";
            dataHoverBorderColor = "#666666";
            borderColorReccomended = "#ed8796";
            break;

        case "mois":
            dataLabel = "Moisture";
            dataBgColor = "#c6a0f6";
            dataBorderColor = "#c6a0f6";
            dataHoverBgColor = "#CCCCCC";
            dataHoverBorderColor = "#666666";
            borderColorReccomended = "#c6a0f6";
            break;

        default:
            dataLabel = "Temperature";
            dataBgColor = "#eed49f";
            dataBorderColor = "#eed49f";
            dataHoverBgColor = "#CCCCCC";
            dataHoverBorderColor = "#666666";
            borderColorReccomended = "#eed49f";
    }
    
    // Let's wait for the promises to get fullfilled:
    // If the data isn't ready when the chart is rendered,
    // it will be empty until an event which triggers
    // a window redraw occurs
    
    let dataset = getDataset(await dataPromise);

    // recVals[0] is min, recVals[1] is max
    let recVals = getRecommendedValues(await recommendedValuesPromise);

    // Setup the chart's data and properties
    let chartdata = {
        labels: [
            "00:00 - 02:00",
            "02:00 - 04:00",
            "04:00 - 06:00",
            "06:00 - 08:00",
            "08:00 - 10:00",
            "10:00 - 12:00",
            "12:00 - 14:00",
            "14:00 - 16:00",
            "16:00 - 18:00",
            "18:00 - 20:00",
            "20:00 - 22:00",
            "22:00 - 00:00",
        ],
        datasets: [
            {
                label: dataLabel,
                backgroundColor: dataBgColor,
                borderColor: dataBorderColor,
                hoverBackgroundColor: dataHoverBgColor,
                hoverBorderColor: dataHoverBorderColor,
                data: dataset,
            },
        ],
    };

    let chartPluginVals = {
        autocolors: false,

        //make a box annotation to show where the reccomended values are
        annotation: {
            annotations: {
                boxReccomended: {
                    label: {
                        content: "Recommended range of values",
                        display: true,
                        color: "#cad3f5",
                    },
                    type: "box",
                    drawTime: "beforeDatasetsDraw",
                    yMin: recVals[0],
                    yMax: recVals[1],
                    borderColor: borderColorReccomended,
                    borderWidth: 2,
                    backgroundColor: "rgba(166, 218, 149, 0.25)",
                },
            },
        },
    };

    // Set the html canva as the graph target
    const graphTarget = $(document.getElementById("plantinoChart"));

    // draw the graph in the graphTarget chart
    new Chart(graphTarget, {
        type: "line",
        data: chartdata,
        options: {
            scales: {
                x: {
                    grid: {
                        borderColor: "#cad3f5",
                    },
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        borderColor: "#cad3f5",
                    },
                },
            },
            plugins: chartPluginVals,
        },
    });
}
