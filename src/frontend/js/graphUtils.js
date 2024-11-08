function showGraph(datasDate, choosedOption) {
    /*
    use jQuery's ajax to send the requested date
    and option to chartData.php, and store the 
    response
    */
    
    $.post("php/chartData.php", {requestedDate: datasDate, requestedOption: choosedOption},
    function (data)
    {
        // parse the full data recived
        var fullData = JSON.parse(data);
        
        // Initiating variables with default values
        var timeFrameVal; // stores the single value for the timeframe
        var dataset = []; // will store the actual dataset used by the graph
        
        // for every timeframe
        for (var i = 0; i < 12; i++) {
            // extract the value for the single timeframe
            timeFrameVal = JSON.parse(JSON.stringify(fullData[i]));
            
            // parse the value to float and push it into the dataset array
            for(var val in timeFrameVal) {
                dataset.push(parseFloat(timeFrameVal[val]).toFixed(2));
            }
            
        }
        
        // Set the html canva as the graph target
        var graphTarget = $(document.getElementById("plantinoChart"));
        
        /*
        initiating variables to set
        graph propreties
        */
        
        var dataLabel;
        var dataBgColor;
        var dataBorderColor;
        var dataHoverBgColor;
        var dataHoverBorderColor;
        var borderColorReccomended;
        
        /*
        NOTE: we used a fixed plant ID (which refers to a plant of basil),
        but ideally, after implementing multi-plant support, the ID
        should be retrived from a drop-down list, just like we do to
        decide the option to display
        */
        
        var reccomended = []
        var minReccomended;
        var maxReccomended;
        
        $.post("php/recValues.php", {plantID: 1, requestedOption: choosedOption}, 
        function(result) {
            
            // parse the result values
            var parsedValue = JSON.parse(result);
            
            // extract them in an array
            for(var val in parsedValue) {
                reccomended.push(parseFloat(parsedValue[val]).toFixed(2));
            }
            
            // set relative variables
            minReccomended = reccomended[0];
            maxReccomended = reccomended[1];
            
            /*
            Select graph properties, based 
            on the choosed option
            */
            
            switch(choosedOption) {
                case "temp":
                dataLabel = 'Temperature';
                dataBgColor = '#eed49f';
                dataBorderColor = '#eed49f';
                dataHoverBgColor = '#CCCCCC';
                dataHoverBorderColor = '#666666';
                borderColorReccomended = '#eed49f';
                break;
                
                case "light":
                dataLabel = 'Light';
                dataBgColor = '#7dc4e4';
                dataBorderColor = '#7dc4e4';
                dataHoverBgColor = '#CCCCCC';
                dataHoverBorderColor = '#666666';
                borderColorReccomended = '#7dc4e4';
                break;
                
                case "co2":
                dataLabel = 'CO2';
                dataBgColor = '#ed8796';
                dataBorderColor = '#ed8796';
                dataHoverBgColor = '#CCCCCC';
                dataHoverBorderColor = '#666666';
                borderColorReccomended = '#ed8796';
                break;
                
                case "mois":
                dataLabel = 'Moisture';
                dataBgColor = '#c6a0f6';
                dataBorderColor = '#c6a0f6';
                dataHoverBgColor = '#CCCCCC';
                dataHoverBorderColor = '#666666';
                borderColorReccomended = '#c6a0f6';
                break;
                
                default:
                dataLabel = 'Temperature';
                dataBgColor = '#eed49f';
                dataBorderColor = '#eed49f';
                dataHoverBgColor = '#CCCCCC';
                dataHoverBorderColor = '#666666';
                borderColorReccomended = '#eed49f';
            }
            
            // Setup the chart's data and properties
            
            var chartdata = {
                labels: ['00:00 - 02:00', '02:00 - 04:00', '04:00 - 06:00', '06:00 - 08:00', '08:00 - 10:00', '10:00 - 12:00',
                '12:00 - 14:00', '14:00 - 16:00', '16:00 - 18:00', '18:00 - 20:00', '20:00 - 22:00', '22:00 - 00:00'],
                datasets: [
                    {
                        label: dataLabel,
                        backgroundColor: dataBgColor,
                        borderColor: dataBorderColor,
                        hoverBackgroundColor: dataHoverBgColor,
                        hoverBorderColor: dataHoverBorderColor,
                        data: dataset
                    }
                ]
            };
            
            console.log(dataset)
            // Setup options and properties, then draw the graph
            var statsGraph = new Chart(graphTarget, {
                type: 'line',
                data: chartdata,
                options: {
                    scales: {
                        x: {
                            grid: {
                                borderColor:'#cad3f5'
                            }
                        },
                        y: {
                            beginAtZero: true,
                            grid: {
                                borderColor:'#cad3f5'
                            }
                        }
                    },
                    plugins:{
                        autocolors: false,
                        
                        //make a box annotation to show where the reccomended values are
                        
                        annotation: {
                            annotations: {
                                boxReccomended: {
                                    label: {
                                        content: "Reccomended range of values",
                                        display: true,
                                        color: "#cad3f5"
                                    },
                                    type: "box",
                                    drawTime: 'beforeDatasetsDraw',
                                    yMin: minReccomended,
                                    yMax: maxReccomended,
                                    borderColor: borderColorReccomended,
                                    borderWidth: 2,
                                    backgroundColor: 'rgba(166, 218, 149, 0.25)'
                                }
                            }
                        }
                    }
                }, 
                
            });
        })
    });
}
