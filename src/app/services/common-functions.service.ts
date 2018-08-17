import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { Keyword } from '../models/keyword';

@Injectable({
  providedIn: 'root'
})
export class CommonFunctionsService {

  constructor(
  	public bs: BackendService
  ) { }

  /* gets the question and returns the array of string
  	 match all words and numbers or $num */
  getWords(q: string): Keyword[]{
    return (q.match(/(\$|\b)\w+/mgi)).map(k=>{
      return <Keyword>{
        id: 0,
        keyword: k
      }
    });
  }
  getRelatedQuestions(kw){//keywords
  	return this.bs.processData("getRelatedQuestions",{
    	questionKeywords: kw
    });
  }
}
//Good morning mam. Is there any update in my application?
// 