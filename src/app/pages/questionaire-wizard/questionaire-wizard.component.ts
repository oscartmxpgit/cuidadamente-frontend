import { Component } from '@angular/core';
import { Question, questions } from '../../models/question';
import { CuestionarioResponseService } from '../../services/cuestionario-response.service';

@Component({
  selector: 'app-questionnaire-wizard',
  templateUrl: './questionaire-wizard.component.html',
  styleUrls: ['./questionaire-wizard.component.scss']
})
export class QuestionnaireWizardComponent {
  questions: Question[] = questions;
  currentStep = 0;
  responses: { questionId: number; answer: string | string[] }[] = [];

  get currentQuestion(): Question {
    return this.questions[this.currentStep];
  }

  constructor(private responseService: CuestionarioResponseService) { }


  currentAnswer: any = '';

  ngOnInit() {
    this.loadCurrentAnswer();
  }

  loadCurrentAnswer() {
    const existing = this.responses.find(r => r.questionId === this.currentQuestion.id);
    this.currentAnswer = existing ? existing.answer : (this.currentQuestion.multiple ? [] : '');
  }

  answerCurrent(questionId: number, answer: string | string[]) {
    const existing = this.responses.find(r => r.questionId === questionId);
    if (existing) {
      existing.answer = answer;
    } else {
      this.responses.push({ questionId, answer });
    }
  }

  onCheckboxChange(questionId: number, option: string, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    let existing = this.responses.find(r => r.questionId === questionId);
    if (!existing) {
      existing = { questionId, answer: [] };
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
    this.answerCurrent(this.currentQuestion.id, this.currentAnswer);
    if (this.currentStep < this.questions.length - 1) {
      this.currentStep++;
      this.loadCurrentAnswer();
    }
  }

  prevStep() {
    this.answerCurrent(this.currentQuestion.id, this.currentAnswer);
    if (this.currentStep > 0) {
      this.currentStep--;
      this.loadCurrentAnswer();
    }
  }

  finish() {
    console.log("finished")
    this.answerCurrent(this.currentQuestion.id, this.currentAnswer);

    const payload = {
      userName: this.getAnswerText(1),
      phone: this.getAnswerText(9),
      email: this.getAnswerText(10),
      answersJson: JSON.stringify(this.responses)
    };

    this.responseService.enviarRespuestas(payload).subscribe({
      next: () => alert('Cuestionario enviado correctamente. ¡Gracias!'),
      error: err => {
        console.error('Error al enviar el cuestionario', err);
        alert('Error al enviar el cuestionario');
      }
    });
  }

  private getAnswerText(questionId: number): string {
    const resp = this.responses.find(r => r.questionId === questionId);
    if (!resp) return '';
    if (Array.isArray(resp.answer)) {
      return resp.answer.join(', ');
    }
    return resp.answer || '';
  }
}
