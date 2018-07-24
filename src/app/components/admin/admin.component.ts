import { Component, OnInit } from '@angular/core';
import { Message } from '../../models/message';
import { Question } from '../../models/question';
import { BackendService } from '../../services/backend.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  question: Question;
	messages: Message[];
	questionSubject: string;
  questionKeywords: {}[];
  mainQuestion: string;

  //input
  keyword: string;
  userQuestion: string;

  generatedQuestionData: {};

  constructor(
    public bs: BackendService
  ) {
  }

  ngOnInit() {
  	// initialization
    this.userQuestion = "";
  	this.questionSubject = "";
  	this.messages = [];
    this.questionKeywords = [];
    this.keyword = "";
    this.mainQuestion = "";
		// initialization
  	this.testSimulation();
    // testing
    // this.getUserQuestion({message:"What is the best lens for portrait for nikon dlsr to be used indoor without external flash can be used in groupshots with a budget of $200-$300?"});
    
  }


  // question, subject, questionKeywords
  saveQuestion(q,s,kw){
    console.log(q,s,kw);
    this.bs.processData("insertQuestion",{
    	question: q,
    	subject: s,
    	questionKeywords: kw
    }).subscribe(r=>{
    	console.log(r);
    });
  }
  // gets the question and returns the array of string
  getWords(q: string): string[]{
    return q.match(/(\$|\b)\w+/mgi);// match all words and numbers or $num
  }
  getUserQuestion(userQuestion){
    this.questionKeywords = this.getWords(userQuestion.message);
    this.userQuestion = userQuestion.message;
  }
  removeKeyword(kwIndex){
    this.questionKeywords.splice(kwIndex,1);
    console.log(kwIndex);
  }
  addKeyword(keyword){
    if(keyword.length){
      this.questionKeywords.push(keyword);
      this.keyword = "";
      console.log()
    }
  }
  submitData(){
  	console.log("Data submitted");
  }
  testSimulation(){

    let conversation = [
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

}
