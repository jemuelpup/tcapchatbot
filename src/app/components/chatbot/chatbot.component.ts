import { Component, OnInit } from '@angular/core';
import { CommonFunctionsService } from '../../services/common-functions.service';
import { Message } from '../../models/message';
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

  /* <finite-state-machine> */
  // start:number = 0;
  // s1:number = 1; // get similarquestion
  // s2:number = 2; // get leading question
  // s3:number = 3; // get conclusion
  // s4:number = 999; // terminal state
  // state:number = 0;
  /* </finite-state-machine> */

  constructor(
    public bs: BackendService,
  	public cf: CommonFunctionsService
  ) { }

  ngOnInit() {
  	this.relatedQuestions = [];
		this.relatedSubjects = [];
		this.messages = [];
		this.answer = "";
    this.userQuery = "";
		// this.getRelatedQuestions("portrait lens");
		this.testSimulation();
		/* <testing here> */
		// this.talkToChatbot("lens");
		/* </testing here> */

    /* <finite-state-machine> */
    // this.state = this.start;
    /* </finite-state-machine> */
  }
  // navigateState(){
  //   switch (this.state) {
  //     case this.start:{
  //       this.state = 1;
  //     }break;
  //     case this.s1:{
  //       if(0){

  //       }
  //     }break;
  //     case this.s2:{
  //       if(0){

  //       }
  //     }break;
  //     case this.s3:{
  //       if(0){

  //       }
  //     }break;
  //   }
  // }
  getRelatedQuestions(question){
    return this.cf.getRelatedQuestions(
    	this.cf.getWords(question)
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
      // this.navigateState();
      // get the question, proceed to conclusion
  		this.getRelatedQuestions(userQuery).subscribe(r=>{
        this.sendSimilarQuestion(r);
        console.log(r)
      })
  	}
  }
  sendSimilarQuestion(questions){
  	console.log(questions)
  	this.messages.push(
  		<Message>{
	  		message: "Is you question similar to the following question? If yes, just click the question.",
				sender: "chatbot",
				choices: questions,
				senderImg: '',
	  	}
	  );
  }
  getConclusion(){}
  selectInChoice(selectedSimilarQuestion){
    this.messages.push(
      <Message>{
        message: selectedSimilarQuestion.question,
        sender: "user",
        choices: [],
        senderImg: '',
      }
    );
    this.bs.processData("getQuestionDetails",{
      questionId: selectedSimilarQuestion.id
    }).subscribe(r=>{
      console.log(r.conclusion);
      this.messages.push(
        <Message>{
          message: r.conclusion,
          sender: "chatbot",
          choices: [],
          senderImg: '',
        }
      );
    });/**/
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

}
