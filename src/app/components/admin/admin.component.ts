import { Component, OnInit, ElementRef, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from '../../models/message';
import { Question } from '../../models/question';
import { LeadingQuestion } from '../../models/leading-question';
import { Choice } from '../../models/choice';
import { Keyword } from '../../models/keyword';
import { Subject } from '../../models/subject';
import { RelatedQuestion } from '../../models/related-question';

import { Observable } from "rxjs";

import { LeadingQuestionFormComponent } from "../../components/admin/leading-question-form/leading-question-form.component";
import { LeadingQuestionQuestionaireComponent } from "../../components/admin/leading-question-questionaire/leading-question-questionaire.component";

import { BackendService } from '../../services/backend.service';
import { ObservableFunctionsService } from '../../services/observable-functions.service';
import { AdminService } from '../../services/admin.service';
import { CommonFunctionsService } from '../../services/common-functions.service';
import { ToastrService } from 'ngx-toastr';
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
  questionKeywords: Keyword[];
  relatedQuestions: RelatedQuestion[];
  relatedQuestion: RelatedQuestion;
  relatedSubjects: Subject[];
  mainQuestion: string;
  allowAnswerGeneration: boolean;
  keyword: string;
  userQuestion: string;
  questionAnswer: string;
  degreeOfImportance: number;
  leadingQuestions: LeadingQuestion[];
  closeResult: string;
  leadingQuestion: string = "question";
  leadingQuestionChoices: Choice[] = [];
  leadingQuestionForm;
  conclusionKeywordReference: Keyword[] = []; // this variable collects all the added keywords in the leading question

  constructor(
    public bs: BackendService,
    public o: ObservableFunctionsService,
    public cf: CommonFunctionsService,
    public formB: FormBuilder,
    public adminService: AdminService,
    private modalService: BsModalService,
    private changeDetection: ChangeDetectorRef,
    private toast: ToastrService
  ) {
  }
  ngOnInit() {
  	// initialization
    this.userQuestion = "";
  	this.questionSubject = "";
  	this.messages = [];
  	this.question = null;
    this.questionKeywords = [];
    this.relatedQuestions = [];
    this.relatedQuestion={
    	question_id: 0,
			question: ""
    };
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
    // this.getRelatedQuestionData({question_id:1,question:"lens for portrait"});
    // this.getUserQuestion("lens for portrait");
    /* </testing> */
    // this.getUserQuestion({message:"What is the best lens for portrait for nikon dlsr to be used indoor without external flash can be used in groupshots with a budget of $200-$300?"});
  }
  ngAfterViewInit() {
    this.o.setInputTextDebounce(this.questionInput.nativeElement)
    .subscribe((val: string) => {
      if(this.userQuestion!==""&&this.userQuestion.replace(/\s/g, "")!=="")
        this.getUserQuestion(this.userQuestion);
      this.leadingQuestions = [];
    });
    this.o.setInputTextDebounce(this.subjectInput.nativeElement)
    .subscribe((val: string) => {
      if(this.questionSubject!==""&&this.questionSubject.replace(/\s/g, "")!=="")
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
    	this.userQuestion = q.question;
    	console.log(r)
      if(r){
      	console.log("pumasok")
        this.question = new Question(
      		q.question_id,q.question,r.subject_id,r.subject,r.keywords
      	);
      	this.questionSubject = r.subject;
        this.conclusionKeywordReference = [...r.keywords];
      	this.questionKeywords = r.keywords;
      	this.allowAnswerGeneration = true;
      	console.log(r.leading_questions)
      	this.leadingQuestions = r.leading_questions ? r.leading_questions : [];
      	this.getRelatedSubjects(r.subject)
        this.getSavedConclusion();
      }
    });
  }
  getRelatedQuestionFromSubject(s){
    this.questionSubject=s.subject;
    this.leadingQuestions = [];
    this.bs.processData("getRelatedQuestionFromSubject",{
      subject_id: s.id
    }).subscribe(r=>{
      this.relatedQuestions = r;
    });
  }
  getRelatedSubjects(s){
  	this.bs.processData("getRelatedSubject",{
    	subject: s
    }).subscribe(r=>{
    	this.relatedSubjects = r;
    });
  }
  // question, subject, questionKeywords
  saveQuestion(q,s,kw){
    this.toast.info("Saving question");
    this.bs.processData("insertQuestion",{
    	question: q,
    	subject: s,
    	questionKeywords: kw
    }).subscribe(r=>{
    	if(r){
    		console.log(r)
	    	this.allowAnswerGeneration = true;
	      this.getUserQuestion(q);
	      this.relatedQuestions.push(q);
        for (var i = 0; i < r.keywordArray.length; i++) {
          this.questionKeywords[i].id = r.keywordArray[i];
        }
	      
	      this.toast.success("Set the answer to the question","Question Saved");
      }
    });
  }
  // triggers when the question in the chatbox was clicked
  getUserQuestion(userQuestion){
    this.userQuestion = userQuestion;
    this.questionKeywords = this.cf.getWords(userQuestion);
    console.log(this.questionKeywords);
    let kw = this.questionKeywords.map(k=>k.keyword);
    this.relatedQuestions = [];
    this.cf.getRelatedQuestions(kw).subscribe(r=>{
    	if(r){
    		this.questionSubject = "";
	      this.relatedQuestions = r;
	      this.leadingQuestions = [];
	      this.question = null;
      }
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
      this.questionKeywords.push(<Keyword>{id:0,keyword:keyword});
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
  /* Creating leading questions */
  addLeadingQuestion(leadingQuestion){
    if(this.question){
    	// console.log(this.question);
    	// console.log(leadingQuestion.value);
    	this.toast.info("Saving Leading question");
    	console.log(this.leadingQuestionForm.value);
    	/**/
      this.bs.processData("insertLeadingQuestion",{
        questionId: this.question.question_id,
        degreeOfImportance: leadingQuestion.value.degreeOfImportance,
        leadingQuestion: leadingQuestion.value.leadingQuestion
      }).subscribe(r=>{
      	this.leadingQuestions.push(<LeadingQuestion>{
      		leading_question_id: r.leading_question_id,
					leading_question: this.leadingQuestionForm.value.leadingQuestion,
					degree_of_importance: this.leadingQuestionForm.value.degreeOfImportance,
					choices: []
      	});
	    	this.leadingQuestionForm.setValue({
	    		degreeOfImportance: 5,
	    		leadingQuestion: ""
	    	});
				this.toast.success("Leading question Saved");
        // console.log(r);
        // the response should be the leading questions list
      });
      /**/
    }
    else{
    	this.toast.error("Select related question first","Error");
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
  showLeadingQuestion(){
    if(this.leadingQuestions.map(lq=>lq.choices.length).indexOf(0)==-1){
      this.openLeadingQuestionsModal();
    }
    else if(confirm("One leading question has no choice? Do you still want to continue?")){
      this.openLeadingQuestionsModal();
      console.log("")
    }
  }
  openLeadingQuestionsModal(){
    this.conclusionKeywordReference = [...this.questionKeywords];
    this.modalRef = this.modalService.show(LeadingQuestionQuestionaireComponent, {
      initialState: {
        leadingQuestions: this.leadingQuestions,
        question: this.question
      }
    });
    const _combine = combineLatest(
      this.modalService.onHide
    ).subscribe(() => this.changeDetection.markForCheck());
    this.subscriptions.push(_combine);
    // this is the callback when the modal is closed;
    this.subscriptions.push(
      this.modalService.onHide.subscribe((reason: string) => {
        this.unsubscribe();
        if(this.adminService.leadingQuestionCollectedKeywords.length){
          this.adminService.leadingQuestionCollectedKeywords.forEach(c=>{
            this.conclusionKeywordReference.push(<Keyword>{ id:c.keyword_id, keyword: c.keyword });
          });
          this.getSavedConclusion();
        }
        else{
          this.questionAnswer = "";
        }
      })
    );
  }
  // Under construction
  saveAnswer(ans){
    if(this.question){ // means question has text.
      if(this.conclusionKeywordReference.length){
      	this.toast.info("Saving answer");
        let questionDetailsAndAnswer = this.question;
        this.bs.processData("insertAnswerToQuestion",{
          questionDetails:this.question,
          answer: ans,
          keywords: this.conclusionKeywordReference.map(kw=>kw.id)
        }).subscribe(r=>{
        	this.toast.success("Answer Saved");
          console.log(r);
        });
      }
    }
  }
  getSavedConclusion(){
    console.log(this.conclusionKeywordReference.map(kw=>kw.id));
    console.log(this.question.question_id);
    this.bs.processData("getSavedAnswerInQuestion",{
      keyword_ids: this.conclusionKeywordReference.map(kw=>kw.id),
      question_id: this.question.question_id
    }).subscribe(r=>{
      console.log(r);
      this.questionAnswer = r.answer;
    });
  }
}
