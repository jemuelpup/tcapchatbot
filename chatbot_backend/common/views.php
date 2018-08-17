<?php

require $_SERVER['DOCUMENT_ROOT'].'/angular2/backend/common/dbconnect.php';
require $_SERVER['DOCUMENT_ROOT'].'/angular2/backend/common/commonFunctions.php';
require $_SERVER['DOCUMENT_ROOT'].'/angular2/backend/common/operations.php';
session_start();
$_SESSION['userID'] = "jemuel";


$process = $_GET['process'];
// $params = $_GET['params'];

switch($process){
	case "getitems":{
		selectItems($conn);		
	}break;
	case "getSession":{
		selectItems($conn);		
	}break;
}

function selectEmployeeData($c){
	$sql = "SELECT id, name, address, contact_number, email, position_fk, branch_fk, salary, date_modified, modified_by_fk, active, birth_day, gender FROM employee_tbl";
	print_r(hasRows($c,$sql) ? json_encode(selectQuery($c,$sql)) : "");
}

function selectItems($c){
	$sql = "SELECT * FROM item_tbl";
	print_r(hasRows($c,$sql) ? json_encode(selectQuery($c,$sql)) : "");
}

function getSession(){
	print_r(array('userID' => $_SESSION['userID'] ));
}
?>