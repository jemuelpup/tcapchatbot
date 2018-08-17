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
    this.leadingQuestion.choices.push({key:0,choice_id:0,choice:"",keyword_id:0,keyword:""});
  }
  // save the choice in the database
  saveChoices(formData){
    console.log(this.leadingQuestion);
    /**/
    this.bs.processData("insertLeadingQuestionChoices",{
      leadingQuestion: this.leadingQuestion,
      question: this.question,
      choicesToDelete: this.deleteSelectedChoices ? this.choiceIdArray : []
    }).subscribe(r=>{
      this.changed = true;
      this.modalRef.hide();
      this.toastr.success("Leading question edit saved");
      console.log(r);
    });
    /**/
  }
  getChangesToPastedChoices(){

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
  removeChoice(choice_key){
    this.deleteSelectedChoices = false;
    let i = this.choiceIdArray.indexOf(choice_key);
    if(i!=-1){
      this.choiceIdArray.splice(i,1);
    }
    else{
      this.choiceIdArray.push(choice_key);
    }
  }
  deleteChoices(){
    console.log(this.choiceIdArray);
    this.deleteSelectedChoices = true;

    (this.choiceIdArray).forEach(c=>{
      let choiceIndex = (this.leadingQuestion.choices).map(qc=>qc.key).indexOf(c);
      if(choiceIndex!=-1){
        this.leadingQuestion.choices.splice(choiceIndex,1);
      }
    });
    this.toastr.info("Click save to update leading question");
  }
  pasteChoices(){
    (this.adminService.copiedLeadingQuestionChoices).forEach(c=>{
      if((this.leadingQuestion.choices).map(qc=>qc.key).indexOf(c.key)==-1){
        this.leadingQuestion.choices.push(c);
      }
    });
  }
}
