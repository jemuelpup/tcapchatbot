import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Message } from '../../models/message';
import { Question } from '../../models/question';
import { BackendService } from '../../services/backend.service';
import { ObservableFunctionsService } from '../../services/observable-functions.service';

import { Observable } from "rxjs";




@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
	@ViewChild('questionInput') questionInput: ElementRef;
	@ViewChild('subjectInput') subjectInput: ElementRef;
	public input$: Observable<string>;

  question: Question;
	messages: Message[];
	questionSubject: string;
  questionKeywords: {}[];
  relatedQuestions: {}[];
  relatedSubjects: {}[];
  mainQuestion: string;
  allowAnswerGeneration: boolean;
  keyword: string;
  userQuestion: string;
  generatedQuestionData: {};

  constructor(
    public bs: BackendService,
    public o: ObservableFunctionsService
  ) {
  }

  ngOnInit() {
  	// initialization
    this.userQuestion = "";
  	this.questionSubject = "";
  	this.messages = [];
    this.questionKeywords = [];
    this.relatedQuestions = [];
    this.relatedSubjects = [];
    this.keyword = "";
    this.mainQuestion = "";
    this.allowAnswerGeneration = false;

		// initialization
  	this.testSimulation();
    // testing
    // this.getUserQuestion({message:"What is the best lens for portrait for nikon dlsr to be used indoor without external flash can be used in groupshots with a budget of $200-$300?"});
  }
  ngAfterViewInit() {
    this.o.setInputTextDebounce(this.questionInput.nativeElement)
    .subscribe((val: string) => {
      if(this.userQuestion!=="")
    		this.getUserQuestion(this.userQuestion);
    });
    this.o.setInputTextDebounce(this.subjectInput.nativeElement)
    .subscribe((val: string) => {
      if(this.questionSubject!=="")
    		this.getRelatedSubjects(this.questionSubject);
    });
	}

  // this function sets the user question, subject and keywords
  getRelatedQuestionData(q){
  	
  	this.bs.processData("getQuestionSubjectAndKeywords",{
    	questionId: q.id
    }).subscribe(r=>{
    	console.log(q)
    	console.log(r)
    	this.question = new Question(
    		q.id,q.question,r.subject_id,r.subject,r.keywords
    	);
    	this.userQuestion = q.question
    	this.questionSubject = r.subject
    	this.questionKeywords = r.keywords.map(keyword=>keyword.keyword);
    	this.allowAnswerGeneration = true;
    });
  }
  getRelatedSubjects(s){
  	this.bs.processData("getRelatedSubject",{
    	subject: s
    }).subscribe(r=>{
    	this.relatedSubjects = r;
    	// console.log(r);
    });
  }
  getRelatedQuestions(kw){//keywords
  	this.bs.processData("getRelatedQuestions",{
    	questionKeywords: kw
    }).subscribe(r=>{
    	this.relatedQuestions = r;
    });
  }
  // question, subject, questionKeywords
  saveQuestion(q,s,kw){
    this.bs.processData("insertQuestion",{
    	question: q,
    	subject: s,
    	questionKeywords: kw
    }).subscribe(r=>{
    	this.allowAnswerGeneration = true;
    });
  }
  /* gets the question and returns the array of string
  	 match all words and numbers or $num */
  getWords(q: string): string[]{ return q.match(/(\$|\b)\w+/mgi); }
  // triggers when the question in the chatbox was clicked
  getUserQuestion(userQuestion){
    this.questionKeywords = this.getWords(userQuestion);
    this.userQuestion = userQuestion;
    this.getRelatedQuestions(this.questionKeywords);
  }
  // remove an element in keyword array
  removeKeyword(kwIndex){
    this.questionKeywords.splice(kwIndex,1);
    console.log(kwIndex);
  }
  // adds keyword in the array
  addKeyword(keyword){
    if(keyword.length){
      this.questionKeywords.push(keyword);
      this.keyword = "";
      console.log()
    }
  }
  // static chat data. For testing purposes only
  testSimulation(){

    let conversation = [
    	"Portrait lens",
    	"What do you mean?",
      "What is the best lens for portrait?",
      "There are many lenses depends on the brand of your camera. What is the brand of your DSLR?",
      "Nikon",
      "When do you usually user your camera? Indoor or outdoor?",
      "Indoor",
      "Do you have external flash?",
      "No",
      "Do you always do group shots?",
      "No",
      "What is your budget?",
      "$200",
      "I preffer Nikkor 50mm 1.8g"
    ];
 		for(let i = 0; i<conversation.length; i++){
  		let sender = i%2==0 ? "chatbot":"user";
  		this.messages.push(
  			<Message>{
		  		message: conversation[i],
					sender: sender,
					senderImg: '',
		  	}
  		);
  	}
 	}
  saveAnswer(ans){
  	console.log(ans);
  	if(this.question){ // means question has laman.
  		let questionDetailsAndAnswer = this.question;

	  	this.bs.processData("insertAnswerToQuestion",{
	    	questionDetails:this.question,
	    	answer: "jemuel"
	    }).subscribe(r=>{
	    	console.log(r);
	    });
  		console.log("may laman");
  	}
  	else{
  		console.log("walang laman");	
  	}
  	// console.log(this.question);
  	// console.log(this.question);
  }

}
