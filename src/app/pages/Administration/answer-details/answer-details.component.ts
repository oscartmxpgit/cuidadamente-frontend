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
    if (value === null || value === undefined || value === '') return '—';

    // Si es booleano
    if (typeof value === 'boolean') return value ? 'Sí' : 'No';

    // Si es array: eliminar corchetes y comillas
    if (Array.isArray(value)) {
      return value
        .filter(v => v !== null && v !== undefined && v !== '')
        .map(v => this.formatValue(v)) // Formatea cada valor recursivamente
        .join(', ');
    }

    // Si es objeto: mostrar clave: valor sin corchetes
    if (typeof value === 'object') {
      return Object.entries(value)
        .map(([k, v]) => `${k}: ${this.formatValue(v)}`)
        .join(', ');
    }

    // Si es string con comillas (como '"texto"'), quitarlas
    if (typeof value === 'string') {
      return value.replace(/^"(.*)"$/, '$1');
    }

    return String(value);
  }

  hasAnswers(): boolean {
    if (!this.parsedAnswers) return false;
    if (Array.isArray(this.parsedAnswers)) return this.parsedAnswers.length > 0;
    return Object.keys(this.parsedAnswers).length > 0;
  }


}
