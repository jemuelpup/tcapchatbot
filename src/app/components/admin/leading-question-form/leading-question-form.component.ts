import { Component, OnInit, TemplateRef  } from '@angular/core';


import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BackendService } from '../../../services/backend.service';
import { AdminService } from '../../../services/admin.service';
import { LeadingQuestion } from '../../../models/leading-question';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-leading-question-form',
  templateUrl: './leading-question-form.component.html',
  styleUrls: ['./leading-question-form.component.scss']
})
export class LeadingQuestionFormComponent implements OnInit {
  leadingQuestion: LeadingQuestion; // this are the data from the modal
  question; // this are the data from the modal
  questionArray: LeadingQuestion[];
  choiceIdArray: number[];
  changed: boolean;
  // form variables
  leadingQuestionChoicesForm;
  deleteSelectedChoices: boolean = false;

  constructor(
    public bs: BackendService,
    public modalRef: BsModalRef,
    private toastr: ToastrService,
    public adminService: AdminService
  ) { }
  ngOnInit() {
    this.questionArray = this.adminService.copiedLeadingQuestions;
    this.choiceIdArray = [];
    console.log(this.leadingQuestion);
  }
  addChoice(){
    this.leadingQuestion.choices.push({choice_id:0,choice:"",keyword:""});
  }
  // save the choice in the database
  saveChoices(formData){
    // console.log(this.leadingQuestion);
    /**/
    this.bs.processData("insertLeadingQuestionChoices",{
      leadingQuestion: this.leadingQuestion,
      question: this.question,
      choicesToDelete: this.deleteSelectedChoices ? this.choiceIdArray : []
    }).subscribe(r=>{
      this.changed = true;
      this.modalRef.hide();
      console.log(r);
    });
    /**/
  }
  // push the leading question if it is not in array
  copyLeadingQuestion(){
    if(!this.questionArray.find(lq=>lq.leading_question_id==this.leadingQuestion.leading_question_id)){
      this.adminService.copiedLeadingQuestions.push(<LeadingQuestion>this.leadingQuestion);
      this.toastr.success('Added to clipboard', 'Check the clipboard in the left side of the browser');
    }
    else{
      this.toastr.success('The leading question is already in the clipboard');
    }
  }
  removeChoice(choice_id){
    let i = this.choiceIdArray.indexOf(choice_id);
    if(i!=-1){
      this.choiceIdArray.splice(i,1);
    }
    else{
      this.choiceIdArray.push(choice_id);
    }
  }
  deleteChoices(){
    console.log(this.choiceIdArray);
    this.deleteSelectedChoices = true;
    this.toastr.success("Click save to update leading question");
  }
  pasteChoices(){
    console.log(this.adminService.copiedLeadingQuestionChoices);
  }
}
