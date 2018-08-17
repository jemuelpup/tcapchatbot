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

// include php files
require 'admin.php';

// initialize classes
$admin = new Admin;

/* testing */
// getSymmetricDifference(
// [1,2,3,4,5,6],
// [4,1,8,5,3,7,1]); // testing

// UNDER CONSTRUCTION
// generateConclusion($conn,[1,5,6]);
/**/

/* Production */
// server side vars
session_start(); // this is used for access

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$process = $request->process; // this is the proccess set in the js
$data = $request->data; // this is the data to be processed


switch($process){
	// admin calls
	case "insertQuestion":{ $admin->insertQuestion($conn,$data); } break;
	case "insertAnswerToQuestion":{ $admin->insertAnswerToQuestion($conn,$data); } break;
	case "insertLeadingQuestion":{ $admin->insertLeadingQuestion($conn,$data); } break;
	// common calls
	case "getRelatedQuestions": { getRelatedQuestions($conn,$data); } break;
	case "getQuestionDetails": { getQuestionDetails($conn,$data,$admin); } break;
	case "getRelatedSubject": { getRelatedSubject($conn,$data); } break;

	// visitor calls
	case "askChatbot": { askChatbot($conn,$data); } break;
	case "getChatbotAnswer": { getChatbotAnswer($conn,$data); } break;
	
	case "insertLeadingQuestionChoices": { $admin->insertLeadingQuestionChoices($conn,$data); } break;
	case "pasteLeadingQuestion":{ $admin->pasteLeadingQuestion($conn,$data); }break;
	case "getRelatedQuestionFromSubject":{ $admin->getRelatedQuestionFromSubject($conn,$data); }break;
	case "getQuestionAnswer":{
		$answer = "";
		$generated_ans = $admin->getQuestionAnswer($conn,$data->keyword_ids,$data->question_id);
		if($generated_ans["conclusion_percentage"]==100){
			print_r(json_encode(["percentage"=>$generated_ans["conclusion_percentage"],"answer"=>$generated_ans["conclusion"]]));
		}
		else{
			print_r(json_encode(["percentage"=>$generated_ans["conclusion_percentage"],"answer"=>""]));
		}
	}break;
}

/*
Conclusion basis: Symmetric difference
@params:
$c = connnection to database
$d->keywords = array of keywords
*/
function generateConclusion($c,$d){
	// $keywords = $d->keywords;
	// get the keywords in $d
	$keyword_id_collection = $d->keyword_id_array;
	$question_id = $d->question_id;
	// print_r(json_encode($keyword_id_collection));
	$keyword_ids = implode(',', $keyword_id_collection);
	/**/
	$sql="
	SELECT kc.conclusion_fk, kc.keyword_fk, c.conclusion
	FROM keyword_conclusion_tbl kc, conclusion_tbl c
	WHERE conclusion_fk
	IN(
		SELECT DISTINCT kci.conclusion_fk
		FROM keyword_conclusion_tbl kci
		WHERE kci.keyword_fk IN($keyword_ids)
	) AND c.id = kc.conclusion_fk
	AND c.related_question_fk = $question_id
	";
	$possibleConclusion = selectQuery($c,$sql);
	$conclusion_id=0;
	$conclusion='';
	$conclusion_and_keywords = [];
	$keywords = [];
	$pc = [];
	foreach ($possibleConclusion as $pcon) {
		$pc = $pcon;
		if($conclusion_id==0){
			$conclusion_id = $pc["conclusion_fk"];
			$conclusion =  $pc["conclusion"];
		}
		if($conclusion_id != $pc["conclusion_fk"]){
			array_push(
				$conclusion_and_keywords,
				[
					"conclusion_id"=>$pc["conclusion_fk"],
					"conclusion"=>$conclusion,
					"keywords"=>$keywords,
					"conclusion_accuracy_percentage"=>0
				]
			);
			$keywords = [];
			$conclusion_id = $pc["conclusion_fk"];
			$conclusion =  $pc["conclusion"];
		}
		array_push($keywords, $pc["keyword_fk"]);
	}
	array_push(
		$conclusion_and_keywords,
		[
			"conclusion_id"=>$pc["conclusion_fk"],
			"conclusion"=>$pc["conclusion"],
			"keywords"=>$keywords,
			"conclusion_accuracy_percentage"=>0
		]
	);
	$keywords = [];
	// print_r($conclusion_and_keywords);

	
	$conclusionPercentage = 0;
	$conclusion = [];
	foreach ($conclusion_and_keywords as $ck) {
		$a = $keyword_id_collection;
		$b = $ck["keywords"];
		// print_r($ck);
		$x = getSymmetricDifferenceAndIntersection($a,$b);
		$conclusionPercentageComputed = 
		(count($x->intersection)*2/(count($a)+count($b))*100)-
		(count($x->symmetric_diff)/(count($a)+count($b))*30);
		if($conclusionPercentage<=$conclusionPercentageComputed){
			$conclusionPercentage = $conclusionPercentageComputed;
			$ck["conclusion_accuracy_percentage"]=$conclusionPercentage;
			$conclusion = $ck;
		}
	}
	print_r(json_encode($conclusion));
	/**/
}

/*
return the symmetric difference of the two array
@params
array 1
array 2
@output
	Symmetric difference of and intersection of the two array
*/
function getSymmetricDifferenceAndIntersection($a,$b){
	$symDiff = [];
	$intersection = [];
	for($j=0;$j<count($a);$j++){
		for($i=0;$i<count($b);$i++){
			if($a[$j]==$b[$i]){
				array_push($intersection, $a[$j]);
				array_splice($b, $i, 1);
				continue 2;
			}
		}
		array_push($symDiff, $a[$j]);
	}
	return (object)[
		"intersection"=>$intersection,
		"symmetric_diff"=>array_merge($symDiff,$b)
	];
}

/**/

/**/

/* functions for testing */
/* Testing /
// $d->questionId = 1;
// getQuestionDetails($conn,$d);
getLeadingQuestions($conn,1);
/**/
function askChatbot($c,$d){
	$response = [];
	

	print_r(json_encode($response));
}

/* <question-analisis> */
function getChatbotAnswer($c,$d){
	// 1) check if the user question is in the reserved questions.
	//		Ask the user: "Is your question relted to this questions?"return all the related questions
	//		if yes, send the answer. (In the phase 2, it might go to the leading questions)
	//		if no, proceed the number 2
	// 2) ask the user if he/she is talking about some subject
	//		if yes, analize and send the answer (In the phase 2, it might go to the leading questions)

	// 3) analisis - 
	//  80%-100% if it meet the accuracy percentage, send the answer.
	//	80%> tell the user "I am not sure about this but I think, the answer is: " (answer here) then ask the user if he/she is satisfied with the answer. if yes, do nothing. If no, save to unanswered_question_tbl
	//		if not: ask the user if he/she is talking about subject: let him choose.

	// return first all the related question and the subjec
	return "";// this is the answer to the question
}

function questionAnalisis($question){
	// todo:

	// check if the question is in the related questions

	// 
}
/* </question-analisis> */


/* function for production */
// returns the question subject and keywords
function getQuestionDetails($c,$d,$admin){
	/* Select keywords and subject save in the question */
	// print_r(json_encode($d));
	/**/
	$sql = "
	SELECT k.id as keyword_id, k.keyword, 
		(
			SELECT rq.subject_fk 
			FROM reserved_question_tbl rq 
			WHERE
			rq.active = 1 AND rq.id = $d->question_id
		) AS subject_id,
		(
		SELECT s.subject 
		FROM subject_tbl s 
		WHERE s.id = subject_id
		) as subject
	FROM keyword_tbl k 
	WHERE k.active = 1 AND k.id IN (
		SELECT qk.keyword_fk
		FROM question_keyword_tbl qk 
		WHERE 
		qk.active=1 AND qk.question_fk = $d->question_id
	)
	";
	// print_r(json_encode($sql));
	/**/
	$questionData = selectQuery($c,$sql);
	$keywords = [];
	$data = [];
	$keywordsForAnswer = [];
	foreach ($questionData as $qd) {
		array_push($keywords, ["id"=>$qd['keyword_id'],"keyword"=>$qd['keyword']]);
		array_push($keywordsForAnswer,$qd['keyword_id']);
	}
	$questionDataFromQuery = (object)["questionDetails"=>(object)[
		"subject_id"=>$questionData[0]['subject_id'],
		"subject"=>$questionData[0]['subject'],
		"keywords"=>$keywordsForAnswer
	]];
	// print_r(json_encode($d->question_id));
	/**/
	/**/
	$leadingQuestions = getLeadingQuestions($c,$d->question_id);
	$answerData = $admin->getQuestionAnswer($c,$keywordsForAnswer,$d->question_id);
	$data = [
		"subject_id"=>$questionData[0]['subject_id'],
		"subject"=>$questionData[0]['subject'],
		"keywords"=>$keywords,
		"conclusion_id"=>$answerData["conclusion_id"],
		"conclusion"=>$answerData["conclusion"],
		"leading_questions"=>getLeadingQuestions($c, $d->question_id)
	];
	print_r(json_encode($data)); // uncomment this
	/**/
}


// this function returns all the leading questions with choices
function getLeadingQuestions($c,$questionId){
	$data = [];
	$sql = "
		SELECT
		lqc.id as key_id, lqc.choice_fk as choice_id, lqc.user_reserved_question_fk,
		lqc.leading_question_fk, lqc.choice_fk, lqc.active,
		lq.id,lq.question as leading_question,
		c.choice, c.keyword_fk, k.keyword, 
		(
			SELECT rlq.degree_of_importance
			FROM reserved_leading_question rlq
			WHERE rlq.leading_question_fk = lq.id AND
			rlq.reserved_question_fk = $questionId
		) as degree_of_importance
		FROM 
		leading_question_choice_tbl lqc,
		choice_tbl c,
		leading_question_tbl lq,
		keyword_tbl k
		WHERE
		lqc.active = 1 AND c.active = 1 AND
		lqc.choice_fk = c.id AND
		lq.id = lqc.leading_question_fk AND
		k.id = c.keyword_fk AND
		lqc.user_reserved_question_fk = $questionId
	";
	$leadingQuestionDatas = selectQuery($c,$sql);
	$leading_question_id = 0;
	$leading_question_and_choices = [];
	$choices_array = [];
	$leadingQuestions = "";
	
	$leading_questionDetails = [];
	if(is_array($leadingQuestionDatas)){
		foreach ($leadingQuestionDatas as $data) {
			if($leading_question_id==0){
				$leading_question_id = $data["leading_question_fk"]; 
				$leading_questionDetails = $data;
			}
			// pag hindi equal yung leading question id, collect all the choices
			if($leading_question_id != $data["leading_question_fk"]){
				array_push($leading_question_and_choices, [
					"leading_question_id"=>$leading_questionDetails["leading_question_fk"],
					"leading_question"=>$leading_questionDetails["leading_question"],
					"degree_of_importance"=>$leading_questionDetails["degree_of_importance"],
					"choices"=>$choices_array
				]);
				// collect the array of leading question
				$leadingQuestions .= "$leading_question_id,";
				// empty the choices array
				$choices_array = [];
				// redeclare the leading leading_question_id
				$leading_question_id = $data["leading_question_fk"];
				$leading_questionDetails = $data;
			}
			array_push($choices_array, [
				"key"=>$data["key_id"],
				"choice_id"=>$data["choice_id"],
				"choice"=>$data["choice"],
				"keyword_id"=>$data["keyword_fk"],
				"keyword"=>$data["keyword"]
			]);
		}
		array_push($leading_question_and_choices, [
			"leading_question_id"=>$leading_questionDetails["leading_question_fk"],
			"leading_question"=>$leading_questionDetails["leading_question"],
			"degree_of_importance"=>$leading_questionDetails["degree_of_importance"],
			"choices"=>$choices_array
		]);
		// collect the array of leading question
		$leadingQuestions .= "$leading_question_id,";
	}
	/**/
	$leadingQuestions = strlen($leadingQuestions) ? substr($leadingQuestions, 0, -1) : $leadingQuestions;
	// merge leading question with choices ang leading question without choices.
	return getLeadingQuestionWithoutChoices($c,$questionId,$leadingQuestions,$leading_question_and_choices);
	/**/
}
function getLeadingQuestionWithoutChoices($c,$questionId,$leadingQuestionsIdToSkip,$leading_question_and_choices){
	$skipCond = strlen($leadingQuestionsIdToSkip) ? "rlq.leading_question_fk NOT IN($leadingQuestionsIdToSkip) AND ":"";
	$sql = "
	SELECT lq.id,lq.question,rlq.degree_of_importance
	FROM reserved_leading_question rlq, leading_question_tbl lq
	WHERE 
	rlq.active = 1 AND
	lq.id = rlq.leading_question_fk AND
	$skipCond
	rlq.reserved_question_fk = $questionId
	";
	$leadingQuestionDatas = selectQuery($c,$sql);
	if(is_array($leadingQuestionDatas)){
		foreach ($leadingQuestionDatas as $data) {
			array_push($leading_question_and_choices, [
				"leading_question_id"=>$data["id"],
				"leading_question"=>$data["question"],
				"degree_of_importance"=>$data["degree_of_importance"],
				"choices"=>[]
			]);
		}
	}
	return $leading_question_and_choices;
}


// returns the set of related questions
function getRelatedQuestions($c,$d){
	$keywords = getKeywords($c,$d->questionKeywords);
	$sql = "SELECT 
			rq.id as question_id, rq.question
			FROM reserved_question_tbl rq
			WHERE
			rq.id IN(
				SELECT 
				qk.question_fk
				FROM
				question_keyword_tbl qk
				WHERE
				qk.keyword_fk IN(
					SELECT k.id 
					FROM keyword_tbl k 
					WHERE k.keyword IN($keywords)
				)
				GROUP BY qk.question_fk
				ORDER BY SUM(1) DESC
			)
			LIMIT 10";
	print_r(hasRows($c,$sql) ? json_encode(selectQuery($c,$sql)) : "");
}
// returns the keyword in string list with mysqli real scape string
function getKeywords($c,$keywordsArray){
	$keywords = "";
	foreach ($keywordsArray as $keyword) { $keywords .= "'".mysqli_real_escape_string($c,$keyword)."',"; }
	return substr_replace($keywords, "", -1);
}
// get the related subject
function getRelatedSubject($c,$d){
	$wordsToFind = "";
	$str = $d->subject;
	$str = trim(preg_replace('/[\s+\t]+/', ' ',$d->subject));
	$keywords = explode(" ", $str);
	foreach ($keywords as $keyword) {
		$wordsToFind.="'".mysqli_real_escape_string($c,$keyword)."',";
	}
	$wordsToFind = substr_replace($wordsToFind, "", -1);
	$sql = "
		SELECT DISTINCT s.subject, s.id FROM subject_tbl s WHERE s.id IN(
			SELECT rq.subject_fk FROM reserved_question_tbl rq WHERE rq.id IN (
				SELECT qk.question_fk FROM question_keyword_tbl qk WHERE qk.keyword_fk IN (
					SELECT k.id FROM keyword_tbl k WHERE k.keyword IN (".$wordsToFind.")
				)
			)
		)
	";// returns all the id's of the keywords
	print_r(hasRows($c,$sql) ? json_encode(selectQuery($c,$sql)) : "");
}



?>