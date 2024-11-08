<?php

    // Initiating variables with default values
    $startHourRange = 0;
    $endHourRange = 2;
    $setOfDatas = [];

    // get requested date and option from ajax
    $datasDate = $_REQUEST["requestedDate"];
    $dataOption = $_REQUEST["requestedOption"];



    // Initiate database credentials

    $hostname = "localhost";
    $dbuser = "root";
    $dbpass = "";
    $db = "plantino";

    // Connect to database
    $conn = mysqli_connect($hostname, $dbuser, $dbpass, $db);

    // Check connection
    if (!$conn) {
        die("Connection failed: " . $conn->connect_error);
    }



        /*
            query the database for datas between 12 time frames:
            00:00 to 02:00; 02:00 to 04:00; 04:00 to 06:00;
            06:00 to 08:00; 08:00 to 10:00; 10:00 to 12:00;
            12:00 to 14:00; 14:00 to 16:00; 16:00 to 18:00;
            18:00 to 20:00; 20:00 to 22:00; 22:00 to 23:59,

            we're taking the averages of the datas in that time range
        */
        
    for($i = 0; $i < 12; $i++) {
        // build the query
        $sql = "SELECT AVG(" . $dataOption . ") FROM averages WHERE DATE(startRecordTime) = DATE('" . $datasDate . "') 
        AND CAST(startRecordTime as time) BETWEEN '" . $startHourRange . ":00' AND '" . $endHourRange . ":00'";

        // execute the query
        $dataset = mysqli_query($conn, $sql);

        // store the value for the timeframe
        $data;
        foreach ($dataset as $row) {
            $data = $row;
        }
        
        // push the value for the timeframe as an element of the array
        array_push($setOfDatas,$data);
        
        // repeat the process for the next time frames
        $startHourRange += 2;
        $endHourRange += 2;
    }

    // send the datas back as JSON to use them in the graph
    echo json_encode($setOfDatas);

    mysqli_close($conn);

?>