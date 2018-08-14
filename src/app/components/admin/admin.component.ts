import { Component, OnInit, ElementRef, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from '../../models/message';
import { Question } from '../../models/question';
import { LeadingQuestion } from '../../models/leading-question';
import { Choice } from '../../models/choice';
import { RelatedQuestion } from '../../models/related-question';

import { Observable } from "rxjs";

import { LeadingQuestionFormComponent } from "../../components/admin/leading-question-form/leading-question-form.component";

import { BackendService } from '../../services/backend.service';
import { ObservableFunctionsService } from '../../services/observable-functions.service';
import { AdminService } from '../../services/admin.service';
import { CommonFunctionsService } from '../../services/common-functions.service';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { combineLatest, Subscription } from 'rxjs';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
	@ViewChild('questionInput') questionInput: ElementRef;
	@ViewChild('subjectInput') subjectInput: ElementRef;
	public input$: Observable<string>;
  subscriptions: Subscription[] = [];
  modalRef: BsModalRef;
  question: Question;// this is the question input
	messages: Message[];
	questionSubject: string;
  questionKeywords: {}[];
  relatedQuestions: RelatedQuestion[];
  relatedQuestion: RelatedQuestion;
  relatedSubjects: {}[];
  mainQuestion: string;
  allowAnswerGeneration: boolean;
  keyword: string;
  userQuestion: string;
  questionAnswer: string;
  generatedQuestionData: {};
  degreeOfImportance: number;
  leadingQuestions: LeadingQuestion[];
  closeResult: string;
  leadingQuestion: string = "question";
  leadingQuestionChoices: Choice[] = [];
  leadingQuestionForm;

  constructor(
    public bs: BackendService,
    public o: ObservableFunctionsService,
    public cf: CommonFunctionsService,
    public formB: FormBuilder,
    public adminService: AdminService,
    private modalService: BsModalService,
    private changeDetection: ChangeDetectorRef
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
    this.questionAnswer = ""
    this.allowAnswerGeneration = false;
    this.degreeOfImportance = 5;
    this.leadingQuestions = [];
    // question form
    this.initializeForms();
		// initialization
  	this.testSimulation();
    /* <testing> */
    this.getRelatedQuestionData({question_id:1,question:"lens for portrait"});
    /* </testing> */
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
/* function for modal */
  getLeadingQuestionData(lq){
    this.leadingQuestion = lq;
    this.leadingQuestionChoices = lq.choices;
    this.modalRef = this.modalService.show( LeadingQuestionFormComponent, {
      initialState: {
        leadingQuestion: lq,
        question: this.question,
        changed: false
      }
    });
    const _combine = combineLatest(
      this.modalService.onHide
    ).subscribe(() => this.changeDetection.markForCheck());

    this.subscriptions.push(_combine);
    this.subscriptions.push(
      this.modalService.onHide.subscribe((reason: string) => {
        this.unsubscribe();
        if(this.modalRef.content.changed){
          this.getRelatedQuestionData(this.relatedQuestion);
        }
      })
    ); 
  }
  unsubscribe() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
    this.subscriptions = [];
  }
/* </function for modal> */
  initializeForms(){
  	this.leadingQuestionForm = this.formB.group({
    	degreeOfImportance: [5,[
    		Validators.required,
    		Validators.minLength(2),
    		Validators.min(1),
    		Validators.max(10),
    	]],
    	leadingQuestion: ['',[
    		Validators.required
    	]]
    });
  }
  // this function sets the user question, subject and keywords
  getRelatedQuestionData(q){
    this.relatedQuestion = q;
  	this.bs.processData("getQuestionDetails",{
    	question_id: q.question_id
    }).subscribe(r=>{
    	// console.log(q)
      // console.log(r)

    	/**/
      this.question = new Question(
        // nandito yung mali.
    		q.question_id,q.question,r.subject_id,r.subject,r.keywords
    	);
    	this.userQuestion = q.question;
    	this.questionSubject = r.subject;
      this.questionAnswer = r.conclusion;
    	this.questionKeywords = r.keywords.map(keyword=>keyword.keyword);
    	this.allowAnswerGeneration = true;
    	this.leadingQuestions = r.leading_questions ? r.leading_questions : [];
      /**/
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
  // triggers when the question in the chatbox was clicked
  getUserQuestion(userQuestion){
    this.userQuestion = userQuestion;
    this.questionKeywords = this.cf.getWords(userQuestion);
    this.cf.getRelatedQuestions(this.questionKeywords)
    .subscribe(r=>{
      this.relatedQuestions = r;
    })
  }
  // remove an element in keyword array
  removeKeyword(kwIndex){
    this.questionKeywords.splice(kwIndex,1);
    // console.log(kwIndex);
  }
  // adds keyword in the array
  addKeyword(keyword){
    if(keyword.length){
      this.questionKeywords.push(keyword);
      this.keyword = "";
      // console.log()
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
	    	answer: ans
	    }).subscribe(r=>{
	    	// console.log(r);
	    });
  		// console.log("may laman");
  	}
  	else{
  		// console.log("walang laman");	
  	}
  	// console.log(this.question);
  	// console.log(this.question);
  }
  /* Creating leading questions */
  addLeadingQuestion(leadingQuestion){
    if(this.question){
    	// console.log(this.question);
    	// console.log(leadingQuestion.value);
      this.bs.processData("insertLeadingQuestion",{
        questionId: this.question.question_id,
        degreeOfImportance: leadingQuestion.value.degreeOfImportance,
        leadingQuestion: leadingQuestion.value.leadingQuestion
      }).subscribe(r=>{
        // console.log(r);
        // the response should be the leading questions list
      });
    }
    else{
      console.log("select question related question first");  
    }
  }
  pasteLeadingQuestionAndChoices(){
    // console.log(this.question);
    let copiedLQ = this.adminService.copiedLeadingQuestionQuestionAndChoice;
    // console.log(this.relatedQuestion);
    // console.log(copiedLQ);
    
    
    /**/
    
    if(!this.adminService.copiedLeadingQuestionQuestionAndChoice){
      alert("Copy leading question first");
    }
    else{
      if(confirm("Paste leading question?")){
        if(this.leadingQuestions.map(lq=>lq.leading_question_id).indexOf(copiedLQ.leading_question_id)==-1){
          this.leadingQuestions.push(copiedLQ);
          this.bs.processData("pasteLeadingQuestion",{
            question: this.relatedQuestion,
            leadingQuestion: copiedLQ,
            choicesToDelete: []
          }).subscribe(r=>{
            // console.log(r);
            this.getRelatedQuestionData(this.relatedQuestion);
          });
        }
      }
    }
    /**/
  }
  
}
