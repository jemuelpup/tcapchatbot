<?php
/* **************************************************************************
reusable functions - optional
****************************************************************************/
function formatRow($columnInfo,$row){
	// todo: formatting date...
	$ctr = 0;
	foreach($row as $rowcol){
		$dt = $columnInfo[$ctr]->type;
		// print_r($columnInfo[$ctr]->type);
		if($dt=="1"||$dt=="2"||$dt=="3"||$dt=="8"||$dt=="9"||$dt=="16"){
			$row[$columnInfo[$ctr]->name] = (int)$row[$columnInfo[$ctr]->name];
		}
		elseif($dt=="4"||$dt=="246"){
			$row[$columnInfo[$ctr]->name] = (float)$row[$columnInfo[$ctr]->name];
		}
		elseif($dt=="5"){
			$row[$columnInfo[$ctr]->name] = (double)$row[$columnInfo[$ctr]->name];
		}
		$ctr++;
	}
	return $row;
}
function validateData($d){
	if(isset($d)){ return $d; }
	return "";
}
function validateDate($d){
	if(isset($d)){ return date("Y-m-d", strtotime(str_replace('/', '-',$d))); }
	return "0000-00-00";
}
function selectQuery($c,$sql){
	$resultSetArray = [];
	$res = $c->query($sql);
	if($res->num_rows>0){
		$dataTypes = $res->fetch_fields();
		// formatRow($dataTypes,array());
		if($res->num_rows>0){
			while($row = $res->fetch_assoc()){
				// formatRow($dataTypes,$row); break;
				array_push($resultSetArray,formatRow($dataTypes,$row));
			}

			return $resultSetArray;
		}
	}
	return "";
}
// check if query produces output
function hasRows($c,$sql){
	$res = $c->query($sql);
	if($res->num_rows>0){
		return true;
	}
	return false;
}
/**************************************************************************/

?>