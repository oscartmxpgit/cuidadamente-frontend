import { Component } from '@angular/core';
import { Question, questions } from '../../models/question';
import { CuestionarioResponseService } from '../../tarjetas/cuestionario-response.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-questionnaire-wizard',
  templateUrl: './questionaire-wizard.component.html',
  styleUrls: ['./questionaire-wizard.component.scss']
})
export class QuestionnaireWizardComponent {
  questions: Question[] = questions;
  currentStep = 0;
  // Store questionText instead of questionId
  responses: { questionText: string; answer: string | string[] }[] = [];

  get currentQuestion(): Question {
    return this.questions[this.currentStep];
  }

  constructor(private responseService: CuestionarioResponseService, private snackBar: MatSnackBar) { }

  currentAnswer: any = '';

  ngOnInit() {
    this.loadCurrentAnswer();
  }

  loadCurrentAnswer() {
    const existing = this.responses.find(r => r.questionText === this.currentQuestion.text);
    this.currentAnswer = existing ? existing.answer : (this.currentQuestion.multiple ? [] : '');
  }

  answerCurrent(questionText: string, answer: string | string[]) {
    const existing = this.responses.find(r => r.questionText === questionText);
    if (existing) {
      existing.answer = answer;
    } else {
      this.responses.push({ questionText, answer });
    }
  }

  onCheckboxChange(questionText: string, option: string, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    let existing = this.responses.find(r => r.questionText === questionText);
    if (!existing) {
      existing = { questionText, answer: [] };
      this.responses.push(existing);
    }
    let ans = Array.isArray(existing.answer) ? existing.answer : [];
    if (checked) {
      ans.push(option);
    } else {
      ans = ans.filter(a => a !== option);
    }
    existing.answer = ans;
    this.currentAnswer = ans;
  }

  nextStep() {
    this.answerCurrent(this.currentQuestion.text, this.currentAnswer);
    if (this.currentStep < this.questions.length - 1) {
      this.currentStep++;
      this.loadCurrentAnswer();
    }
  }

  prevStep() {
    this.answerCurrent(this.currentQuestion.text, this.currentAnswer);
    if (this.currentStep > 0) {
      this.currentStep--;
      this.loadCurrentAnswer();
    }
  }

  // questionnaire-wizard.component.ts (add these properties)
  showThankYou = false;
  thankYouData = { name: '', phone: '', email: '' };

  finish() {
    this.answerCurrent(this.currentQuestion.text, this.currentAnswer);

    const totalQuestions = this.questions.length;

    const getTextAnswer = (index: number): string => {
      const answer = this.responses[index]?.answer;
      if (Array.isArray(answer)) {
        return answer.join(', ');
      }
      return answer || '';
    };

    this.thankYouData = {
      name: getTextAnswer(0),
      phone: getTextAnswer(totalQuestions - 2),
      email: getTextAnswer(totalQuestions - 1)
    };

    const payload = {
      userName: this.thankYouData.name,
      phone: this.thankYouData.phone,
      email: this.thankYouData.email,
      answersJson: JSON.stringify(this.responses)
    };

    this.responseService.enviarRespuestas(payload).subscribe({
      next: () => {
        this.showThankYou = true;
      },
      error: err => {
        console.error('Error al enviar el cuestionario', err);
        this.snackBar.open('Error al enviar el cuestionario', 'Cerrar', {
          duration: 4000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      }
    });
  }



  private getAnswerTextByQuestionText(questionText: string): string {
    const resp = this.responses.find(r => r.questionText === questionText);
    if (!resp) return '';
    if (Array.isArray(resp.answer)) {
      return resp.answer.join(', ');
    }
    return resp.answer || '';
  }

  canGoNext(): boolean {
    const answer = this.currentAnswer;

    if (
      this.currentQuestion.inputType === 'tel' ||
      this.currentQuestion.inputType === 'email'
    ) {
      return answer && answer.trim().length > 0;
    }

    if (this.currentQuestion.text === 'Edad') { // example check by question text
      const n = Number(answer);
      if (!answer || isNaN(n) || n < 0 || !Number.isInteger(n)) {
        return false;
      }
    }

    if (!this.currentQuestion.options?.length) {
      return answer && answer.toString().trim().length > 0;
    }

    if (this.currentQuestion.multiple) {
      return Array.isArray(answer) && answer.length > 0;
    }

    return !!answer;
  }

  blockInvalidChars(event: KeyboardEvent) {
    if (['e', 'E', '+', '-', '.'].includes(event.key)) {
      event.preventDefault();
    }
  }
}
