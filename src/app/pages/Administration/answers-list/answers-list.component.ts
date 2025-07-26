import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AnswerService } from '../../../tarjetas/answerService';
import { CuestionarioResponse } from '../../../models/cuestionario-response.model';
import { AnswerDetailsComponent } from '../answer-details/answer-details.component';

@Component({
  selector: 'app-answers-list',
  templateUrl: './answers-list.component.html',
  styleUrls: ['./answers-list.component.scss']
})
export class AnswersListComponent implements OnInit {
  answers: CuestionarioResponse[] = [];
  loading = true;
  // Adjust columns to your interface
  displayedColumns = ['userName', 'phone', 'email', 'createdAt', 'actions'];

  constructor(private answerService: AnswerService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadAnswers();
  }

  loadAnswers(): void {
    this.loading = true;
    this.answerService.getAll().subscribe({
      next: answers => {
        this.answers = answers;
        this.loading = false;
      },
      error: () => {
        this.answers = [];
        this.loading = false;
      }
    });
  }

  viewAnswerDetails(answer: CuestionarioResponse): void {
    this.dialog.open(AnswerDetailsComponent, {
      width: '600px',
      data: { answer }
    });
  }
}
