<!--
    Author: Michele Gentile 
    Collaborators: Andrea De Nardis & Samuele Triveri
    Created: 01-03-2023 (DD-MM-YYYY)
    Last Update: 11-09-2023 (DD-MM-YYYY)

    DISCLAIMER: All the instruction about the plant are made for a plant of basil, 
                using another type of plant you should use different numbers.
-->

<html>
    <head>
        <title>PlantinoCare.app</title>
        <style>
            table{

                width: 100%;
            }
            tr{

                width: 100%;
            }
            td{

                width:25%;
                height: 500px;
                text-align: center;
                font-family: Arial;
                vertical-align: center;
            }
            h1{

                font-family: Arial;
                color: #cad3f5; 
                font-size: 50px;
            }
            h2{

                font-family: Arial;
                position: absolute;
                top: 110%;
                left: 50%;
                transform: translate(-50%, -50%);
                margin: 0;
                font-size: 30px;
            }
            body{

                background-color: #1e2030;
            }
            #gauge-arc-container {

                position: relative;
            }
            #gauge-arc {

                display: block;
                margin: 0 auto;
            }
        </style>
    </head>
    <body>
        <h1>PlantinoCare.app</h1>
        </br></br></br>
        <?php 
            // Open the serial port for reading
            $serialPort = fopen("\\\\.\\COM3", "r+");

            // Read data from the serial port
            $data = fgets($serialPort);

            // Close the serial port
            fclose($serialPort);

            // Separate datas
            list($temp, $light, $carb, $mois) = explode(",", $data);
        ?>
        <table>
            <tr>
                <?php

                    // TEMPERATURE

                    echo "<td style=\"";
                    echo ($temp>=18&&$temp<=27)? "background-color:#a6da95":((($temp>=10&&$temp<18)||($temp>27&&$temp<=30))?"background-color:#f0c6c6":"background-color:#ed8796");
                    echo "\"></br></br>";
                    echo "Temperature:</br></br></br>";
                ?>
                
                <!-- Curve -->

                <div id="gauge-arc-container">
                <canvas id="gauge-arc" width="250" height="125"></canvas>
                <script>
                    var canvas = document.getElementById("gauge-arc");
                    var context = canvas.getContext("2d");

                    context.beginPath();
                    context.arc(125, 125, 113, Math.PI, <?php echo 1+$temp/40; ?> * Math.PI, false);
                    context.lineWidth = 12;
                    context.strokeStyle = "black";
                    context.stroke();
                </script>
                <?php    

                    // Instruction

                    echo "<h2><ff style=\"font-size:50px;\">".$temp."</ff></br>°C</h2></div></br></br></br></br></br></br>";
                    echo ($temp<20)? "The plant needs more heat.":(($temp>25)?"The plant needs more fresh.":"The temperature is optimal.");
                    echo "</br></br></td>";

                    // LIGHT
                    
                    echo "<td style=\"";
                    echo ($light>=800)? "background-color:#a6da95":((($light>=400&&$light<800)||($light>1250&&$light<=1500))?"background-color:#f0c6c6":"background-color:#ed8796");
                    echo "\"></br></br>";
                    echo "Light:</br></br></br>";
                ?>
                
                <!-- Curve -->

                <div id="gauge-arc-container">
                <canvas id="gauge-arc-2" width="250" height="125"></canvas>
                <script>
                    var canvas = document.getElementById("gauge-arc-2");
                    var context = canvas.getContext("2d"); 

                    context.beginPath();
                    context.arc(125, 125, 113, Math.PI, <?php echo 1+$light/1500; ?> * Math.PI, false);
                    context.lineWidth = 12;
                    context.strokeStyle = "black";
                    context.stroke();
                </script>
                <?php   
                
                    // Instruction
 
                    echo "<h2><ff style=\"font-size:50px;\">".$light."</ff></br>Lux</h2></div></br></br></br></br></br></br>";
                    echo ($light<800)? "The plant needs more light.":(($light>1500)?"The plant needs more dark.":"The light exposure is optimal.");
                    echo "</br></br></td>";

                    // CARBON DIOXIDE
                    
                    echo "<td style=\"";
                    echo ($carb>=800&&$carb<=1500)? "background-color:#a6da95":((($carb>=500&&$carb<800)||($carb>1500&&$carb<=1750))?"background-color:#f0c6c6":"background-color:#ed8796");
                    echo "\"></br></br>";
                    echo "Carbon Dioxide:</br></br></br>";
                ?>
                
                <!-- Curve -->

                <div id="gauge-arc-container">
                <canvas id="gauge-arc-3" width="250" height="125"></canvas>
                <script>
                    var canvas = document.getElementById("gauge-arc-3");
                    var context = canvas.getContext("2d"); 
    
                    context.beginPath();
                    context.arc(125, 125, 113, Math.PI, <?php echo 1+$carb/1500; ?> * Math.PI, false);
                    context.lineWidth = 12;
                    context.strokeStyle = "black";
                    context.stroke();
                </script>                    
                <?php    
                
                    // Instruction

                    echo "<h2><ff style=\"font-size:50px;\">".$carb."</ff></br>ppm</h2></div></br></br></br></br></br></br>";
                    echo ($carb<800)? "The plant needs more CO2.":(($carb>1500)?"The plant needs less CO2.":"CO2 level is optimal.");
                    echo "</br></br></td>";

                    // UMIDITY
                    
                    echo "<td style=\"";
                    echo ($mois>=300&&$mois<=700)? "background-color:#a6da95":((($mois>=200&&$mois<300)||($mois>700&&$mois<=800))?"background-color:#f0c6c6":"background-color:#ed8796");
                    echo "\"></br></br>";
                    echo "Soil moisture:</br></br></br>";
                ?>
                
                <!-- Curve -->

                <div id="gauge-arc-container">
                <canvas id="gauge-arc-4" width="250" height="125"></canvas>
                <script>
                    var canvas = document.getElementById("gauge-arc-4");
                    var context = canvas.getContext("2d"); 
    
                    context.beginPath();
                    context.arc(125, 125, 113, Math.PI, <?php echo 1+$mois/1000; ?> * Math.PI, false);
                    context.lineWidth = 12;
                    context.strokeStyle = "black";
                    context.stroke();
                </script>
                <?php    
                
                    // Instruction

                    echo "<h2><ff style=\"font-size:50px;\">".$mois."</ff></br>g/m3</h2></div></br></br></br></br></br></br>";
                    echo ($mois<300)? "The plant needs more water.":(($mois>700)?"The plant needs less water.":"The water level is optimal.");
                    echo "</br></br></td>";

                    // Page reloading to update datas (Two Options)

                    // Option One
                    //header("Refresh:5; url=http://127.0.0.1/PiantaArduino/pianta.php");

                    // Option Two
                    sleep(5);
                ?>
                <script>
                    window.location.reload();
                </script>
                <!-- End of Option Two -->
            </tr>
        </table>
    </body>
</html>
