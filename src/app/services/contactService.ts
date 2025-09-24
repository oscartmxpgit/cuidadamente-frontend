import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { MensajeContact } from '../models/MensajeContact';

@Injectable({ providedIn: 'root' })

export class ContactService {
  private apiUrl = `${environment.apiUrl}MensajesContacts`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<MensajeContact[]> {
    return this.http.get<MensajeContact[]>(this.apiUrl);
  }
}