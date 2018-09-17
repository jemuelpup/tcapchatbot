import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../../services/backend.service';
import { Question } from '../../../models/question';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { DeletedReservedQuestionComponent } from '../../../components/admin/deleted-reserved-question/deleted-reserved-question.component';


@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {

	question: Question;
  modalRef: BsModalRef;

  constructor(
    private modalService: BsModalService
  ) { }

  ngOnInit() {
  }

  showDeletedRelatedQuestions(){

      this.modalRef = this.modalService.show(DeletedReservedQuestionComponent, {
        initialState: {}
      });
  }
}
