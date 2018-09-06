import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRelatedQuestionFormComponent } from './edit-related-question-form.component';

describe('EditRelatedQuestionFormComponent', () => {
  let component: EditRelatedQuestionFormComponent;
  let fixture: ComponentFixture<EditRelatedQuestionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRelatedQuestionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRelatedQuestionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
