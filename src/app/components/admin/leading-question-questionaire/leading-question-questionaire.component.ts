import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { LeadingQuestion } from '../../../models/leading-question';
import { Question } from '../../../models/question';
import { Choice } from '../../../models/choice';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-leading-question-questionaire',
  templateUrl: './leading-question-questionaire.component.html',
  styleUrls: ['./leading-question-questionaire.component.scss']
})
export class LeadingQuestionQuestionaireComponent implements OnInit {

	// parameters passed by the modal
	leadingQuestions: LeadingQuestion[];
	question: Question;

	// variables in the class
	mainQuestion: string;
	leadingQuestion: string;
	choices: Choice[];
	leadingQuestionIndex: number;
	collectedKeywords: Choice[];



  constructor(
  	public modalRef: BsModalRef,
  	public adminService: AdminService
  ) { }

  ngOnInit() {
  		this.collectedKeywords = [];
	  	this.leadingQuestionIndex = 0;
	  	this.mainQuestion = this.question.question;
			this.leadingQuestion = this.leadingQuestions[this.leadingQuestionIndex].leading_question;
	  	this.choices = this.leadingQuestions[this.leadingQuestionIndex].choices;
	  	console.log(this.leadingQuestions);
  }



  next(c){
  	if(c!=-1) this.collectedKeywords.push(c);
	  this.leadingQuestionIndex++;
  	if(this.leadingQuestionIndex<this.leadingQuestions.length){
	  	let lq = this.leadingQuestions[this.leadingQuestionIndex];
	  	if(lq.choices.length){
		  	this.leadingQuestion = lq.leading_question;
		  	this.choices = lq.choices;
	  	}
	  	else{
	  		this.next(-1);
	  	}
  	}
  	else{
  		this.adminService.leadingQuestionCollectedKeywords = this.collectedKeywords;
  		this.modalRef.hide();
  		// console.log("Exit");
  	}
  }

}
