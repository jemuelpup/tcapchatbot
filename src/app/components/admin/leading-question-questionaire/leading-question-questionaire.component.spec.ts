import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadingQuestionQuestionaireComponent } from './leading-question-questionaire.component';

describe('LeadingQuestionQuestionaireComponent', () => {
  let component: LeadingQuestionQuestionaireComponent;
  let fixture: ComponentFixture<LeadingQuestionQuestionaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadingQuestionQuestionaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadingQuestionQuestionaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
