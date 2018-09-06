import { Component, OnInit } from '@angular/core';
import { Question } from '../../../models/question';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BackendService } from '../../../services/backend.service';

@Component({
  selector: 'app-edit-related-question-form',
  templateUrl: './edit-related-question-form.component.html',
  styleUrls: ['./edit-related-question-form.component.scss']
})
export class EditRelatedQuestionFormComponent implements OnInit {

	questionData: Question;
	questionDataPrev: Question;
  removedKeywordIdSet: number[];
  addedKeywordSet: string[];
  keyword: string[];


  constructor(
  	public bs: BackendService,
    public modalRef: BsModalRef
  ) { }
  ngOnInit() {
  	this.removedKeywordIdSet = [];
    this.addedKeywordSet = [];
  	this.questionDataPrev = {...this.questionData};
  	console.log(this.questionData);
  	// this.questionData = this.modalRef.content;
  	// console.log(this.questionData);
  }
  saveEdits(){
  	let hasChangeInQuestion = this.questionData.question !== this.questionDataPrev.question;
  	let hasChangeInSubject = this.questionData.subject !== this.questionDataPrev.subject;
  	console.log(hasChangeInQuestion,hasChangeInSubject)
  	if(hasChangeInQuestion||hasChangeInSubject||this.removedKeywordIdSet.length||this.addedKeywordSet.length){
	  	let newData = <any>{...this.questionDataPrev};
	  	newData.updateQuestion = hasChangeInQuestion;
	  	newData.updateSubject = hasChangeInSubject;
      newData.question = this.questionData.question;
      newData.subject = this.questionData.subject;
      newData.removedKeywords = this.removedKeywordIdSet;
      newData.addedKeywords = this.addedKeywordSet;
      console.log(newData);
	  	this.bs.processData("updateReservedQuestion",newData).subscribe(r=>{
	    	// this.toast.success("Answer Saved");
	      console.log(r);
	    });
  	}
  }
  removeKeyword(kwIndex,keyword){
    if(keyword.keyword_id){
    	this.removedKeywordIdSet.push(keyword.keyword_id);
    }
    else{
      this.addedKeywordSet.splice(this.addedKeywordSet.indexOf(keyword),1);
    }
    this.questionData.keywords.splice(kwIndex,1);
  }
  addKeyword(keyword){
    let k = { keyword_id: 0, keyword: keyword };
    if(this.addedKeywordSet.indexOf(keyword)==-1){
      this.questionData.keywords.push(k);
      this.addedKeywordSet.push(keyword);
    }
  }
}
