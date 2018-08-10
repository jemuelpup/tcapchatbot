import { Injectable } from '@angular/core';
import { LeadingQuestion } from '../models/leading-question';
import { Observable, of } from 'rxjs';
// import { Observable } from 'rxjs/Observable'; 


@Injectable({
  providedIn: 'root'
})
export class AdminService {

	copiedLeadingQuestions: LeadingQuestion[] = [];// list of leading question
  copiedLeadingQuestionQuestionAndChoice: LeadingQuestion; // leading question and choice
  copiedLeadingQuestionChoices: {}[]=[];//change the datatype

  constructor() {
  }


}


