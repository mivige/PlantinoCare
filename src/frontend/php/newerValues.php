<?php 

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

    // Select the datas we need from last id
    $sql = "SELECT temp, light, co2, mois FROM datas WHERE idDataset=(SELECT MAX(idDataset) FROM datas)";

    // Read datas from database
    $dataset = mysqli_query($conn, $sql);
    $data = mysqli_fetch_assoc($dataset);

    /*
    Alternative implementation in case we were to need more datas from the query?

    Push the data we need into an array to send back as JSON

    $fullData = array();
    array_push($fullData, $data['temp'], $data['light'], $data['co2'], $data['mois']);
    */

    // Send the data back as JSON
    echo json_encode($data);

    // Close connection to database
    mysqli_close($conn);
?>