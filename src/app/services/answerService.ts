import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { CuestionarioResponse } from '../models/cuestionario-response.model';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {
  private apiUrl = `${environment.apiUrl}UserQuestionnaireResponses`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<CuestionarioResponse[]> {
    return this.http.get<CuestionarioResponse[]>(this.apiUrl);
  }

  getById(id: number): Observable<CuestionarioResponse> {
    return this.http.get<CuestionarioResponse>(`${this.apiUrl}/${id}`);
  }
}
