import { Component } from '@angular/core';
import { Question, questions } from '../../models/question';
import { CuestionarioResponseService } from '../../services/cuestionario-response.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(private responseService: CuestionarioResponseService, private snackBar: MatSnackBar) { }


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

  // questionnaire-wizard.component.ts (add these properties)
showThankYou = false;
thankYouData = { name: '', phone: '', email: '' };

finish() {
  this.answerCurrent(this.currentQuestion.id, this.currentAnswer);

  this.thankYouData = {
    name: this.getAnswerText(1),
    phone: this.getAnswerText(8),  // Assuming phone question is id=8 now
    email: this.getAnswerText(9),  // Assuming email question is id=9 now
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


  private getAnswerText(questionId: number): string {
    const resp = this.responses.find(r => r.questionId === questionId);
    if (!resp) return '';
    if (Array.isArray(resp.answer)) {
      return resp.answer.join(', ');
    }
    return resp.answer || '';
  }

  canGoNext(): boolean {
    // Validaciones para avanzar en el wizard

    const answer = this.currentAnswer;

    // Si es teléfono o email, deben tener valor no vacío
    if (
      this.currentQuestion.inputType === 'tel' ||
      this.currentQuestion.inputType === 'email'
    ) {
      return answer && answer.trim().length > 0;
    }

    // Para edad (pregunta 3), debe ser número entero >= 0
    if (this.currentQuestion.id === 3) {
      const n = Number(answer);
      if (!answer || isNaN(n) || n < 0 || !Number.isInteger(n)) {
        return false;
      }
    }

    // Para inputs de texto o preguntas sin opciones, solo requiere que no esté vacío
    if (!this.currentQuestion.options?.length) {
      return answer && answer.toString().trim().length > 0;
    }

    // Para preguntas con opciones, si es multiple validar que haya al menos una opción seleccionada
    if (this.currentQuestion.multiple) {
      return Array.isArray(answer) && answer.length > 0;
    }

    // Para pregunta con opciones pero single choice, debe tener respuesta no vacía
    return !!answer;
  }

  blockInvalidChars(event: KeyboardEvent) {
    // Bloquea e, E, +, -, . para que no puedan ingresarse en el input de edad
    if (['e', 'E', '+', '-', '.'].includes(event.key)) {
      event.preventDefault();
    }
  }

}
