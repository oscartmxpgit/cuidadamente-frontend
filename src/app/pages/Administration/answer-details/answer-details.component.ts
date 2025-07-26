import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CuestionarioResponse } from '../../../models/cuestionario-response.model';

@Component({
  selector: 'app-answer-details',
  templateUrl: './answer-details.component.html',
  styleUrls: ['./answer-details.component.scss']
})
export class AnswerDetailsComponent {
  answer: CuestionarioResponse;
  parsedAnswers: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { answer: CuestionarioResponse },
    private dialogRef: MatDialogRef<AnswerDetailsComponent>
  ) {
    this.answer = data.answer;

    try {
      this.parsedAnswers = JSON.parse(this.answer.answersJson);
    } catch (e) {
      console.error('Error parsing answersJson:', e);
      this.parsedAnswers = null;
    }
  }

  close() {
    this.dialogRef.close();
  }

  isArray(value: any): boolean {
    return Array.isArray(value);
  }

  isObject(value: any): boolean {
    return value && typeof value === 'object' && !Array.isArray(value);
  }

  formatValue(value: any): string {
    if (typeof value === 'object') {
      return JSON.stringify(value, null, 2);
    }
    return value;
  }
}
