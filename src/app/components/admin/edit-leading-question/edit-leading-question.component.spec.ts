import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLeadingQuestionComponent } from './edit-leading-question.component';

describe('EditLeadingQuestionComponent', () => {
  let component: EditLeadingQuestionComponent;
  let fixture: ComponentFixture<EditLeadingQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLeadingQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLeadingQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
