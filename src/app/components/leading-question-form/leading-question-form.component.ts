import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leading-question-form',
  templateUrl: './leading-question-form.component.html',
  styleUrls: ['./leading-question-form.component.scss']
})
export class LeadingQuestionFormComponent implements OnInit {

	choices: {}[];

  constructor() { }

  ngOnInit() {
  	this.choices = [{text:""}];
  }

  addChoice(){
    this.choices.push({text:""});
  }
  removeChoice(index){
  	this.choices.splice(index,1);
  }


}
