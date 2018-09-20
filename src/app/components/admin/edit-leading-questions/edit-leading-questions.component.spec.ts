import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLeadingQuestionsComponent } from './edit-leading-questions.component';

describe('EditLeadingQuestionsComponent', () => {
  let component: EditLeadingQuestionsComponent;
  let fixture: ComponentFixture<EditLeadingQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLeadingQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLeadingQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
