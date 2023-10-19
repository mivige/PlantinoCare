<?php

    // get requested ID and option from ajax
    $plantID = $_REQUEST["plantID"];
    $requestedOption = $_REQUEST["requestedOption"];

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

    // build the query
    $sql = "SELECT min" . $requestedOption . ", max" . $requestedOption . " FROM info WHERE idInfo = " . $plantID;

    // execute the query
    $dataset = mysqli_query($conn, $sql);

    // store the query's result
    $result;
    foreach ($dataset as $row) {
        $result = $row;
    }

    echo json_encode($result);

    // send the datas back as JSON to use them in the graph
    //echo json_encode($result);

    mysqli_close($conn);

?>