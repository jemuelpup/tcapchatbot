<?php
// server configuration

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization");

// included files
require $_SERVER['DOCUMENT_ROOT'].'/angular2/backend/common/commonFunctions.php';
require $_SERVER['DOCUMENT_ROOT'].'/angular2/backend/chatbot/dbconnect.php';
require $_SERVER['DOCUMENT_ROOT'].'/angular2/backend/chatbot/functions.php';
require $_SERVER['DOCUMENT_ROOT'].'/angular2/backend/chatbot/views.php';

// server side vars
session_start(); // this is used for access

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$process = $request->process; // this is the proccess set in the js
$data = $request->data; // this is the data to be processed

switch($process){
	case "insertQuestion":{ insertQuestion($conn,$data); }
	case "insertQuestionAnswer":{ insertQuestionAnswer($conn,$data); }
}




function insertQuestion($c,$d){
	// print_r(json_encode($d));// for testing purposes only
	// insert or get the subject or the question
	$keyword = [];

	$subjectID = getSubjectId($c,$d);
	$subjectID = $subjectID > 0 ? $subjectID : insertSubject($c,$d);
	$reservedQuestionID = getReservedQuestionId($c,$d);
	$reservedQuestionID = $reservedQuestionID > 0 ? $reservedQuestionID : insertReservedQuestion($c,$d,$subjectID);
	foreach ($d->questionKeywords as $keyword) {
		$keywordID = getKeywordId($c,$keyword);
		$keywordID = $keywordID > 0 ? $keywordID : insertKeyWords($c,$keyword);
		insertQuestionKeyword($c,$reservedQuestionID,$keywordID);
		array_push($keyword, $keywordID);
	}
	// this function must return a data that looks like this:
	print_r(json_encode(["questionID" => $reservedQuestionID, "subjectID" => $subjectID, "keywordArray" => $keyword]));
}

function insertQuestionAnswer($c,$d){

}



















/* Logic part *******************************************/

// insert in question_keyword_tbl
function insertQuestionKeyword($c,$rq,$q){
	$sql = $c->prepare("INSERT INTO question_keyword_tbl(keyword_fk,question_fk) VALUES(?,?)");
	$sql->bind_param('ii',$rq,$q);
	$sql->execute();
	$sql->close();
}




// returns exsisting keyword id
function getKeywordId($c,$keyword){
	if($sql = $c->prepare("SELECT id FROM keyword_tbl WHERE keyword = ?")){
		$sql->bind_param("s", $keyword);
		$sql->execute();
		$sql->bind_result($id);
		$sql->fetch();
		return (int)$id;
	}
	return 0;
}

// this function returns the id of the inserted keyword
function insertKeyWords($c,$keyword){ // process
	$sql = $c->prepare("INSERT INTO keyword_tbl(keyword) VALUES(?)");
	$sql->bind_param('s',$keyword);
	if($sql->execute() === TRUE){
		return $c->insert_id;
	}
	return 0;
}

// returns exsisting subject id
function getSubjectId($c,$d){
	if($sql = $c->prepare("SELECT id FROM subject_tbl WHERE subject = ?")){
		$sql->bind_param("s", $d->subject);
		$sql->execute();
		$sql->bind_result($id);
		$sql->fetch();
		return (int)$id;
	}
	return 0;
}

// this function returns the id of the inserted subject
function insertSubject($c,$d){ // process
	$sql = $c->prepare("INSERT INTO subject_tbl(subject) VALUES(?)");
	$sql->bind_param('s',$d->subject);
	if($sql->execute() === TRUE){
		return $c->insert_id;
	}
}

// returns exsisting subject id
function getReservedQuestionId($c,$d){
	if($sql = $c->prepare("SELECT id FROM reserved_question_tbl WHERE question = ?")){
		$sql->bind_param("s", $d->question);
		$sql->execute();
		$sql->bind_result($id);
		$sql->fetch();
		return (int)$id;
	}
	return 0;
}

// this function returns the id of the inserted subject
function insertReservedQuestion($c,$d,$subjectID){ // process
	$sql = $c->prepare("INSERT INTO reserved_question_tbl(question,subject_fk) VALUES(?,?)");
	$sql->bind_param('si',$d->question,$subjectID);
	if($sql->execute() === TRUE){
		return $c->insert_id;
	}
}


?>