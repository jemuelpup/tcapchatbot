import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadingQuestionFormComponent } from './leading-question-form.component';

describe('LeadingQuestionFormComponent', () => {
  let component: LeadingQuestionFormComponent;
  let fixture: ComponentFixture<LeadingQuestionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadingQuestionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadingQuestionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
