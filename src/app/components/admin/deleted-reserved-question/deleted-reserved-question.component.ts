import { Component, OnInit } from '@angular/core';
import { Question } from '../../../models/question';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BackendService } from '../../../services/backend.service';

@Component({
  selector: 'app-deleted-reserved-question',
  templateUrl: './deleted-reserved-question.component.html',
  styleUrls: ['./deleted-reserved-question.component.scss']
})
export class DeletedReservedQuestionComponent implements OnInit {

	questions: Question[];

  constructor(
    public bs: BackendService,
    public modalRef: BsModalRef
  ) { }

  ngOnInit() {
    this.bs.processData("getDeletedReservedQuestion",{}).subscribe(r=>{
      this.questions = r.map(dq=>{
        return{
          question_id: dq.question_id,
          question: dq.question,
          subject_id: dq.subject_id,
          subject: dq.subject,
          keywords: []
        }
      });
      console.log(this.questions);
    });
  }
  restoreQuestion(q,i){
  	console.log(q);
    this.bs.processData("restoreQuestion",{
      question_id: q.question_id,
    }).subscribe(r=>{
      this.questions.splice(i,1);
      console.log(r);
      console.log("question restored successfully.");
    });
  }

}
