import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { LeadingQuestion } from '../../../models/leading-question';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-saved-leading-question',
  templateUrl: './saved-leading-question.component.html',
  styleUrls: ['./saved-leading-question.component.scss']
})
export class SavedLeadingQuestionComponent implements OnInit {
	copiedLeadingQuestions: LeadingQuestion[];
  showSavedLeadingQuestions: boolean = false;


  constructor(
  	public adminService: AdminService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.copiedLeadingQuestions = this.adminService.copiedLeadingQuestions;
  }
  removeFromList(leadingQuestion:LeadingQuestion){
    let clq = this.adminService.copiedLeadingQuestions.map(lq=>lq.leading_question_id);
    this.adminService.copiedLeadingQuestions.splice(clq.indexOf(leadingQuestion.leading_question_id),1);  
  }
  openLeadingQuestions(){
    // this.lqs = this.copiedLeadingQuestions;
    console.log(this.copiedLeadingQuestions);
  }
  questionCopied(){ this.toastr.success("Paste it in leading question input.","Question copied.");}
  choicesCopied(c){
    this.adminService.copiedLeadingQuestionChoices = c;
    this.toastr.success("Paste it in leading question form","Choices copied.");
  }
  copyLeadingQuestionAndChoices(clqac){
    this.adminService.copiedLeadingQuestionQuestionAndChoice = clqac;
    this.toastr.success("Paste it in leading question list paste icon","Leading question and choices copied.");
  }

}
