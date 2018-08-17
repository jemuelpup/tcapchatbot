<?php

// server configuration

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization");


class Admin{

function getRelatedQuestionFromSubject($c,$d){
	$subject_id = $d->subject_id;
	$sql = "SELECT id as question_id, question FROM reserved_question_tbl WHERE subject_fk = $subject_id AND active = 1";
	print_r(hasRows($c,$sql) ? json_encode(selectQuery($c,$sql)) : "");
}


function pasteLeadingQuestion($c,$d){
	// print_r(json_encode($d));
	$lq_id = $d->leadingQuestion->leading_question_id;
	$q_id = $d->question->question_id;
	$lq_di = $d->leadingQuestion->degree_of_importance;
	$this->insert_reserved_leading_question($c,$lq_id,$q_id,$lq_di);
	$this->insertLeadingQuestionChoices($c,$d);
}

// insert the question in the database
function insertQuestion($c,$d){
	// insert or get the subject or the question
	$keywordArray = [];

	$subjectID = $this->getSubjectId($c,$d);
	$subjectID = $subjectID > 0 ? $subjectID : $this->insertSubject($c,$d);
	$reservedQuestionID = $this->getReservedQuestionId($c,$d);
	$reservedQuestionID = $reservedQuestionID > 0 ? $reservedQuestionID : $this->insertReservedQuestion($c,$d,$subjectID);
	foreach ($d->questionKeywords as $keyword) {
		$keywordID = $this->getKeywordId($c,$keyword);
		// $keywordID = $keywordID > 0 ? $keywordID : $this->insertKeyWords($c,$keyword);
		$this->insertQuestionKeyword($c,$reservedQuestionID,$keywordID);
		array_push($keywordArray, $keywordID);
	}
	// this function must return a data that looks like this:
	print_r(json_encode(["questionID" => $reservedQuestionID, "subjectID" => $subjectID, "keywordArray" => $keywordArray]));
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


// under construction
// todo: the choices if choiceid and keyword exist, use it.

function insertLeadingQuestionChoices($c,$d){
	$leadingQuestionId = $d->leadingQuestion->leading_question_id; //get the leading question id
	$questionID = $d->question->question_id;
	$choiceArrayId = $d->choicesToDelete;
	$leadingQuestionDegreeOfImportance = $d->leadingQuestion->degree_of_importance;
	// print_r(json_encode($d->leadingQuestion->choices));
	/**/
	$queryData=[];// choice
	$sql = "INSERT INTO leading_question_choice_tbl(user_reserved_question_fk,leading_question_fk, choice_fk) VALUES ";
	$values = "";
	// print_r(json_encode($d->leadingQuestion->choices));
	/**/
	foreach ($d->leadingQuestion->choices as $choice) {
		$choiceText = $choice->choice;
		$choiceId = $choice->choice_id;
		$keyword = $choice->keyword;
		// print_r(json_encode([strlen($keyword),strlen($choiceText)]));
		// if choice or keyword is missing, do not proceed
		if(!(strlen($keyword) && strlen($choiceText))) continue;
		$keywordId = $this->getKeywordId($c,$keyword);
		// print_r(json_encode($keywordId));
		// get the choice id
		$choiceId = ($choiceId==0) ? $this->getLeadingQuestionChoice($c,$choiceText,$keywordId) : $choiceId;
		if($choiceId && $keywordId){ // if $choiceId is not 0, create a multi insert query
			// print_r(json_encode("SELECT * FROM leading_question_choice_tbl WHERE (user_reserved_question_fk = $questionID AND leading_question_fk = $leadingQuestionId AND choice_fk = $choiceId AND active = 1)"));
			$query2 = "SELECT * FROM leading_question_choice_tbl WHERE user_reserved_question_fk = $questionID AND leading_question_fk = $leadingQuestionId AND choice_fk = $choiceId AND active = 1";
			if(!hasRows($c,$query2))
				$values .= "($questionID,$leadingQuestionId,$choiceId),";
		}
	}
	/**/
	/**/
	if(strlen($values)){
		$values = strlen($values) ? substr($values, 0,-1) : "";
		$sql .= $values." ON DUPLICATE KEY UPDATE active = 1";
		$c->query($sql);
		print_r(json_encode("success"));
	}
	else{
		print_r(json_encode("no query inserted"));	
	}
	// print_r(json_encode($sql));
	
	$this->deleteChoices($c,$choiceArrayId);// remove choices
	/**/
	// update the degree of importance
	/**/
	$this->changeDegreeOfImportance($c,$leadingQuestionDegreeOfImportance,$leadingQuestionId,$questionID);
	/**/

}

function changeDegreeOfImportance($c,$leadingQuestionDegreeOfImportance,$leadingQuestionId,$questionID){
	$sql = $c->prepare("UPDATE reserved_leading_question SET degree_of_importance= ? WHERE leading_question_fk=? AND reserved_question_fk=?");
	$sql->bind_param('iii',$leadingQuestionDegreeOfImportance,$leadingQuestionId,$questionID);
	$sql->execute();
}

function deleteChoices($c,$choiceArrayId){
	$inCondition = "";
	if(count($choiceArrayId)){
		foreach ($choiceArrayId as $choiceId) {
			$inCondition .= $choiceId.",";
		}
		$inCondition = substr($inCondition, 0,-1);
		$sql = "UPDATE leading_question_choice_tbl SET active=0 WHERE id IN ($inCondition)";
		$c->query($sql);
	}
	// print_r(json_encode($inCondition));
}	

// check if the choice exist. if it exist, use the existing
function getLeadingQuestionChoice($c,$choiceText,$keywordId){
	$choiceText = mysqli_real_escape_string($c,$choiceText);
	$sql = "SELECT id FROM choice_tbl WHERE choice = '$choiceText' AND keyword_fk = $keywordId LIMIT 1";
	$res = selectQuery($c,$sql);
	return is_array($res) ? $res[0]['id'] : $this->insertLeadingQuestionChoice($c,$choiceText,$keywordId);
}


// Possible BUG: ALTER TABLE `choice_tbl` ADD UNIQUE `unique_index`(`keyword_fk`, `choice`)
// Solution: remove the unique constraint in choice_tbl
// this function insert leading question choice
function insertLeadingQuestionChoice($c,$choiceText,$keywordId){
	// print_r(json_encode(["choice"=>$choiceText,"kw"=>$keywordId]));
	/**/
	$sql = $c->prepare("INSERT INTO choice_tbl(choice, keyword_fk) VALUES (?,?)");
	$sql->bind_param('si',$choiceText,$keywordId);
	if($sql->execute() === TRUE){
		return $c->insert_id;
	}
	return 0;
	/**/
}

// returns exsisting keyword id
function getKeywordId($c,$keyword){
	$keyword = mysqli_real_escape_string($c,$keyword);
	$sql = "SELECT id FROM keyword_tbl WHERE keyword = '$keyword'";
	$res = selectQuery($c,$sql);
	return is_array($res) ? $res[0]['id'] : $this->insertKeyWords($c,$keyword);
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
// insert in question_keyword_tbl
function insertQuestionKeyword($c,$rq,$kw){
	$sql = $c->prepare("INSERT INTO question_keyword_tbl(question_fk,keyword_fk) VALUES(?,?)");
	$sql->bind_param('ii',$rq,$kw);
	$sql->execute();
	$sql->close();
}
// insert the answer in the question in the database
function insertAnswerToQuestion($c,$d){
	$conclusionId = 0;

	// bago mag insert, check mo muna kung meron nang nageexist
	$keywords = $d->keywords;
	$question_id = $d->questionDetails->question_id;
	$subject_id = $d->questionDetails->subject_id;
	// print_r(json_encode($keywords));
	$conclusion_data = $this->getQuestionAnswer($c,$keywords,$question_id);
	$conclusionId = $conclusion_data["conclusion_percentage"]==100 ? $conclusion_data["conclusion_id"] : 0;

/**/
	if($conclusionId){// if conclusion based on keyword exist, update
		$sql = $c->prepare("UPDATE conclusion_tbl SET conclusion = ? WHERE id = ?");
		$sql->bind_param('si',$d->answer,$conclusionId);
		$sql->execute();
	}
	else{// else, insert conclusion
		// inserting answer to the question 
		$sql = $c->prepare("INSERT INTO conclusion_tbl(conclusion,subject_fk,related_question_fk) VALUES(?,?,?)");
		$sql->bind_param('sii',$d->answer,$d->questionDetails->subject_id,$d->questionDetails->question_id);
		if($sql->execute() === TRUE){
			$conclusionId = $c->insert_id;
		}
		if($conclusionId){
			$this->insertKeywordConclusion($c,$keywords,$conclusionId);
		}
		$sql->close();
	}/**/
}
function getQuestionAnswer($c,$keyword_ids,$question_id){
	$conclusion_data_to_return = [
		"conclusion_id"=>0,
		"conclusion"=>"",
		"conclusion_percentage"=>0
	];
	$keywords = [];
	// print_r($conclusion_and_keywords);
	$conclusionPercentage = 0;
	$conclusion = [];

	// print_r(json_encode($keyword_id_collection));
	$keyword_ids_str = implode(',', $keyword_ids);
	/**/
	$sql="
		SELECT kc.conclusion_fk, kc.keyword_fk, c.conclusion
		FROM keyword_conclusion_tbl kc, conclusion_tbl c
		WHERE conclusion_fk
		IN(
			SELECT DISTINCT kci.conclusion_fk
			FROM keyword_conclusion_tbl kci
			WHERE kci.keyword_fk IN($keyword_ids_str)
		) AND c.id = kc.conclusion_fk
		AND c.related_question_fk = $question_id
	";
	$conclusion_id=0;
	$conclusion='';
	$conclusion_and_keywords = [];
	$keywords = [];
	$pc = [];
	if(hasRows($c,$sql)){
		$possibleConclusion = selectQuery($c,$sql);
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
	}
	foreach ($conclusion_and_keywords as $ck) {
		$a = $keyword_ids;
		$b = $ck["keywords"];
		$data_conclusion = $ck["conclusion"];
		$data_conclusion_id = $ck["conclusion_id"];
		// print_r($ck);
		$x = getSymmetricDifferenceAndIntersection($a,$b);
		$conclusionPercentageComputed = 
		(count($x->intersection)*2/(count($a)+count($b))*100)-
		(count($x->symmetric_diff)/(count($a)+count($b))*30);
		if($conclusionPercentage<=$conclusionPercentageComputed){
			$conclusionPercentage = $conclusionPercentageComputed;
			$conclusion_data_to_return = [
				"conclusion_id"=>$data_conclusion_id,
				"conclusion"=>$data_conclusion,
				"conclusion_percentage"=>$conclusionPercentage
			];
		}
	}
	return $conclusion_data_to_return;
	
	
}
/*/
function getQuestionAnswer($c,$keyword_ids){
	$keywordSearch = "";
	$test = [];
	// print_r(json_encode($d->questionDetails->keywords));
	// if(0)
	// print_r(json_encode($keyword_ids));
	if($keyword_ids){
		// print_r(json_encode($d->questionDetails->keywords));
		$keywordSearch = implode(",",$keyword_ids);
		$keywordSearch = substr($keywordSearch, 0,-1);
		// print_r(json_encode($keywordSearch));
		if($sql = $c->prepare("
			SELECT GROUP_CONCAT(kc1.keyword_fk) as combined_keys, kc1.conclusion_fk,
				(
					SELECT c.conclusion
					FROM conclusion_tbl c
					WHERE c.id = kc1.conclusion_fk
				) as conclusion
			FROM keyword_conclusion_tbl kc1
			WHERE
			kc1.conclusion_fk IN(
				SELECT DISTINCT kc.conclusion_fk
				FROM keyword_conclusion_tbl kc
				WHERE kc.keyword_fk IN(?)
			)
			GROUP BY kc1.conclusion_fk
			")){
			$sql->bind_param("s", $keywordSearch);
			$sql->execute();
			$sql->bind_result($combined_keys,$conclusionId, $conclusion);
			while($sql->fetch()){
				if($combined_keys==$keywordSearch){
					return [
						"conclusion_id"=>$conclusionId,
						"conclusion"=>$conclusion
					];
				}
			}
		}
	}
	return [
		"conclusion_id"=>0,
		"conclusion"=>""
	];
}
/**/
// insert keyword conclusion
function insertKeywordConclusion($c,$keywordDatas,$conclusionID){
	// print_r(json_encode(["keywordDatas"=>$keywordDatas,"conclusionID"=>$conclusionID]));
	/**/
	// $d = "";
	$sql = $c->prepare("INSERT INTO keyword_conclusion_tbl(keyword_fk,conclusion_fk) VALUES(?,?)");
	foreach ($keywordDatas as $keywordData) {
		$sql->bind_param('ii',$keywordData,$conclusionID);
		$sql->execute();
	}
	$sql->close();/**/
	// print_r(json_encode(($d)));
}
/* creating leading question connected to reserved question */
function insertLeadingQuestion($c,$d){
	$leadingQuestionId = $this->getleadingQuestionId($c,$d->leadingQuestion);

	// print_r(json_encode(["leadingQuestionId"=>$leadingQuestionId]));
	/**/
	if($leadingQuestionId==0){ // kapag wala,
		$sql = $c->prepare("INSERT INTO leading_question_tbl(question) VALUES(?)");
		$sql->bind_param('s',$d->leadingQuestion);
		$sql->execute();
		$leadingQuestionId = $c->insert_id;
	}
	$this->insert_reserved_leading_question($c,$leadingQuestionId,$d->questionId,$d->degreeOfImportance,$d->degreeOfImportance);
	/**/
}
function insert_reserved_leading_question($c,$lq_id,$q_id,$lq_di){
	$sql = $c->prepare("INSERT INTO reserved_leading_question(leading_question_fk,reserved_question_fk,degree_of_importance) 
		VALUES(?,?,?)
		ON DUPLICATE KEY UPDATE degree_of_importance = ?");
	$sql->bind_param('iiii',$lq_id,$q_id,$lq_di,$lq_di);
	$sql->execute();
	$sql->close();
	// print_r(json_encode(["leadingQuestionId"=>$lq_id]));
}
function getleadingQuestionId($c,$leadingQuestion){
	$leadingQuestion = mysqli_real_escape_string($c,$leadingQuestion);
	$sql = "SELECT id FROM leading_question_tbl WHERE question='$leadingQuestion'";
	$res = selectQuery($c,$sql);
	return is_array($res) ? $res[0]['id'] : 0;
}
}// admin class end
?>
