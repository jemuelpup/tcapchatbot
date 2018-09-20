import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BackendService } from '../../../services/backend.service';
import { ObservableFunctionsService } from '../../../services/observable-functions.service';


@Component({
  selector: 'app-edit-leading-question',
  templateUrl: './edit-leading-question.component.html',
  styleUrls: ['./edit-leading-question.component.scss']
})
export class EditLeadingQuestionComponent implements OnInit {
  @ViewChild('search') search: ElementRef;

	leadingQuestionForm: FormGroup;

  leadingQuestionId: number;
  leadingQuestion: string;

  constructor(
  	private fb: FormBuilder,
  	private bs: BackendService,
    private modalRef: BsModalRef,
    public o: ObservableFunctionsService
  ) { }

  ngOnInit() {
  	// initialize from
  	this.leadingQuestionForm = this.fb.group({
  		leadingQuestion: [this.leadingQuestion,[
        Validators.required
      ]]
  	});
    console.log(this.leadingQuestionId,this.leadingQuestion);
  }
  // saving edits
  saveEdits(){
    console.log(this.leadingQuestionId);
    console.log(this.leadingQuestionForm.value.leadingQuestion);
    // this.bs.processData("editLeadingQuestion",{
    //   updatedLeadingQuestion: this.leadingQuestionForm.value.leadingQuestion,
    //   id: this.selectedLeadingQuestion.id
    // }).subscribe(r=>{
    //   console.log(r);
    // });
  }
}

export class LeadingQuestion{
  id: number;
  leadingQuestion: string;
}
