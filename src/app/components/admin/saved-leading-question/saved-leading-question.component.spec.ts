import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedLeadingQuestionComponent } from './saved-leading-question.component';

describe('SavedLeadingQuestionComponent', () => {
  let component: SavedLeadingQuestionComponent;
  let fixture: ComponentFixture<SavedLeadingQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavedLeadingQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedLeadingQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
