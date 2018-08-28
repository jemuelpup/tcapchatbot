import { Component, OnInit } from '@angular/core';
import { CommonFunctionsService } from '../../services/common-functions.service';
import { Message } from '../../models/message';
import { LeadingQuestion } from '../../models/leading-question';
import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent implements OnInit {

	relatedQuestions: {}[];
	relatedSubjects: {}[];
	choices: {}[];
	answer: string;
	messages: Message[];
  userQuery: string;
  leadingQuestions: LeadingQuestion[];
  leadingQuestion: LeadingQuestion;
  lqIndex: number;
  kewordIds: number[];
  questionId: number;
  loadingResponce: boolean;

  /* <finite-state-machine> */
  startState:number = 0; // user ask the question
  showSimilarQuestionState:number = 1; // show similarquestion
  showLeadingQuestionState:number = 2; // show leading question
  showConclusion:number = 3; // get conclusion
  // s4:number = 999; // terminal state
  state:number = this.startState;
  /* </finite-state-machine> */

  constructor(
    public bs: BackendService,
  	public cf: CommonFunctionsService
  ) { }

  ngOnInit() {
  	this.relatedQuestions = [];
		this.relatedSubjects = [];
		this.messages = [];
    this.kewordIds = [];
		this.answer = "";
    this.userQuery = "";
    this.leadingQuestions = [];
    this.loadingResponce = false;
    this.lqIndex = 0;
    this.questionId = 0;
		this.testSimulation();
    /* testing */
    // this.talkToChatbot("portrait lens");

    // this.getLeadingQuestion(1);
    /***********/
  }
  getRelatedQuestions(question){
    return this.cf.getRelatedQuestions(
    	this.cf.getWords(question).map(w=>w.keyword)
    )
  }
  talkToChatbot(userQuery){
  	if(userQuery.length){
  		this.messages.push(
  			<Message>{
		  		message: userQuery,
					sender: "sender",
					choices: [],
					senderImg: '',
		  	}
  		);
      if(this.state==this.startState){
        this.loadingResponce = true;
    		this.getRelatedQuestions(userQuery).subscribe(r=>{
          console.log(r);
          this.sendSimilarQuestion(r);
          this.state=this.showSimilarQuestionState;
          this.loadingResponce = false;
        });
      }
  	}
  }
  sendSimilarQuestion(questions){
  	console.log(questions)
    let choices = questions.map(q=>{
      return {
        question_id: q.question_id,
        choice: q.question
      }
    });
  	this.messages.push(
  		<Message>{
	  		message: "Is you question similar to the following question? If yes, just click the question.",
				sender: "chatbot",
				choices: choices,
				senderImg: '',
	  	}
	  );
  }
  getLeadingQuestion(qId){
    return this.bs.processData("getLeadingQuestions",{
      question_id: qId
    }).subscribe(r=>{
      console.log(r)
      if(r.length){
        this.leadingQuestions = r;
        this.lqIndex = 0;
        this.state=this.showLeadingQuestionState;
        this.showLeadingQuestion();
      }
      else{
        //get the keywords here...
        this.getConclusion();
      }
    }); 
  }
  getQuestionKeyword(qID){
    return this.bs.processData("getKeywordIdsOfReservedQuestions",{
      question_id: qID
    })
  }
  selectInChoice(selectedChoice){
    console.log("nagkiclick");
    this.messages.push(
      <Message>{
        message: selectedChoice.choice,
        sender: "user",
        choices: [],
        senderImg: '',
      }
    );
    if(this.state==this.showSimilarQuestionState){
      console.log(selectedChoice);
      this.questionId = selectedChoice.question_id;
      this.getQuestionKeyword(this.questionId).subscribe(r=>{
        this.kewordIds = r.map(x=>x.keyword_fk);

    console.log("Dumaan sa get question keyword")
        console.log(r)
        this.getLeadingQuestion(this.questionId);
        this.state=this.showLeadingQuestionState;
      });
    }
    else if(this.state==this.showLeadingQuestionState){
      this.lqIndex++;
      this.kewordIds.push(selectedChoice.keyword_id);
      console.log(this.kewordIds);
      if(this.lqIndex==this.leadingQuestions.length){
        this.state==this.showConclusion;
        this.getConclusion();
      }
      else{
        this.showLeadingQuestion();
      }
      
    }
  }
  showLeadingQuestion(){
    console.log(this.leadingQuestions);
    this.leadingQuestion = this.leadingQuestions[this.lqIndex];
    this.messages.push(
      <Message>{
        message: this.leadingQuestion.leading_question,
        sender: "chatbot",
        choices: this.leadingQuestion.choices,
        senderImg: '',
      }
    );
    console.log(this.lqIndex,this.leadingQuestions.length);
    
    
  }
  testSimulation(){
		this.messages.push(
			<Message>{
	  		message: "Hi my friend. How can I help you",
				sender: "chatbot",
				senderImg: '',
	  	}
		);
 	}
  skip(){
    // console.log("Dumaan sa skip");
    // console.log(this.state,this.showSimilarQuestionState);
    if(this.state==this.showSimilarQuestionState){
      // UNDER CONSTRUCTION
      // assign keywordIds in the words

      this.getConclusion();
    }
  }

  getConclusion(){ // generate conclusion
    
    console.log("dumaan sa conclusion");
    console.log(this.questionId)
    console.log(this.kewordIds);
    this.kewordIds = (this.kewordIds).filter(x=>typeof x!=="undefined");
    this.loadingResponce = true;

    this.bs.processData("getQuestionAnswer",{
      kw_ids : this.kewordIds,
      question_id: this.questionId
    }).subscribe(r=>{
      console.log(r)
      console.log(r.conclusion);
      setTimeout(() => this.loadingResponce = false);
      this.messages.push(
        <Message>{
          message: r.conclusion,
          sender: "chatbot",
          choices: [],
          senderImg: '',
        }
      );
      this.reset();
    });/**/
  }
  reset(){
    this.questionId=0;
    this.kewordIds=[];
    this.leadingQuestions = [];
    this.lqIndex = -1;
    this.state=this.startState;
  }

}
