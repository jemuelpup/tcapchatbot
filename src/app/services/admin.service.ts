import { Injectable } from '@angular/core';
import { LeadingQuestion } from '../models/leading-question';
import { Choice } from '../models/choice';
import { Observable, of } from 'rxjs';
// import { Observable } from 'rxjs/Observable'; 


@Injectable({
  providedIn: 'root'
})
export class AdminService {

	copiedLeadingQuestions: LeadingQuestion[] = [];// list of leading question
  copiedLeadingQuestionQuestionAndChoice: LeadingQuestion; // leading question and choice
  copiedLeadingQuestionChoices: Choice[]=[];//change the datatype
  leadingQuestionCollectedKeywords: Choice[] = [];

  constructor() {
  }


}


