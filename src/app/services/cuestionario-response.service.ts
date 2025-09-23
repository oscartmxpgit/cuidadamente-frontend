// src/app/services/cuestionario-response.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CuestionarioResponse } from '../models/cuestionario-response.model';

@Injectable({ providedIn: 'root' })
export class CuestionarioResponseService {
  private apiUrl = `${environment.apiUrl}UserQuestionnaireResponses`;

  constructor(private http: HttpClient) {}

  enviarRespuestas(data: CuestionarioResponse): Observable<any> {
    console.log('Enviando respuestas del cuestionario:', data, this.apiUrl);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrl, data, { headers });
  }
}
