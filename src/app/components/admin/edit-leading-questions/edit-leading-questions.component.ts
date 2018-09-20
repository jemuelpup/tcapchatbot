import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
// import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BackendService } from '../../../services/backend.service';
import { ObservableFunctionsService } from '../../../services/observable-functions.service';


@Component({
  selector: 'app-edit-leading-questions',
  templateUrl: './edit-leading-questions.component.html',
  styleUrls: ['./edit-leading-questions.component.scss']
})
export class EditLeadingQuestionsComponent implements OnInit {

   @ViewChild('search') search: ElementRef;

  leadingQuestionForm: FormGroup;

  leadingQuestions: {
    id: number;
    question: string;
  }[];
  selectedLeadingQuestion: {
    id: number;
    question: string;
  };

  constructor(
    private fb: FormBuilder,
    private bs: BackendService,
    public o: ObservableFunctionsService
  ) { }

  ngOnInit() {
    // initialize from
    this.leadingQuestionForm = this.fb.group({
      leadingQuestion: ['',[
        Validators.required
      ]]
    });
    // load leading questions
    this.loadLeadingQuestions("");
  }
  ngAfterViewInit(){
    this.o.setInputTextDebounce(this.search.nativeElement)
    .subscribe((val: string) => {
      // console.log(val)
      if(val!==""&&val.replace(/\s/g, "")!==""){
        this.loadLeadingQuestions(val);
      }
      else{
        this.loadLeadingQuestions('');
      }
      // this.leadingQuestions = [];
    });
  }

  loadLeadingQuestions(searchInput){
    this.bs.processData("getSavedLeadingQuestions",{
      searchInput: searchInput
    }).subscribe(r=>{
      console.log(r);
      this.leadingQuestions = r;
    });
  }

  // saving edits
  saveEdits(){
    if(this.selectedLeadingQuestion){
      this.bs.processData("editLeadingQuestion",{
        updatedLeadingQuestion: this.leadingQuestionForm.value.leadingQuestion,
        id: this.selectedLeadingQuestion.id
      }).subscribe(r=>{
        console.log(r);
      });
      console.log(this.selectedLeadingQuestion.id);
      console.log(this.leadingQuestionForm.value.leadingQuestion);
    }
    else{
      alert("Select leading question first");
    }
  }

  getLeadingQuestionData(lq){
    this.leadingQuestionForm.setValue({
      leadingQuestion: lq.question
    });
    this.selectedLeadingQuestion = lq;
  }

}

export class LeadingQuestion{
  id: number;
  leadingQuestion: string;
}

