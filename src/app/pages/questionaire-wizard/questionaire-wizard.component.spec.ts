import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionaireWizardComponent } from './questionaire-wizard.component';

describe('QuestionaireWizardComponent', () => {
  let component: QuestionaireWizardComponent;
  let fixture: ComponentFixture<QuestionaireWizardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuestionaireWizardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionaireWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
