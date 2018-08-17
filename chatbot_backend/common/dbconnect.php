<?php
header("Access-Control-Allow-Origin:*");
	$servername = "localhost";
	$username = "root";
	$password = "";
	$db = "photoprints";
	// Create connection
	$conn = new mysqli($servername, $username, $password,$db);
	// Check connection
	if ($conn->connect_error) {
	    echo "DatabaseConnectionError";
	    die("Connection failed: " . $conn->connect_error);
	}
?>