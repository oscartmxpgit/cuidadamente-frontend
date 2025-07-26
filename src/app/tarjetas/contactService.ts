import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })

export class ContactService {
  private apiUrl = `${environment.apiUrl}contactos`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Contacto[]> {
    return this.http.get<Contacto[]>(this.apiUrl);
  }
}

export interface Contacto {
  id: number;
  nombre: string;
  email: string;
  mensaje: string;
  fechaEnvio: string;
}
