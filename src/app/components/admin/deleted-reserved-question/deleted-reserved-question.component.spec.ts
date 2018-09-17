import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedReservedQuestionComponent } from './deleted-reserved-question.component';

describe('DeletedReservedQuestionComponent', () => {
  let component: DeletedReservedQuestionComponent;
  let fixture: ComponentFixture<DeletedReservedQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletedReservedQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletedReservedQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
