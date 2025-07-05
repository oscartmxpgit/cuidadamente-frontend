import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

export interface RegistroCita {
  id: number;
  nombre: string;
  telefono: string;
  email: string;
  servicio: string;
  fecha: string;
  hora: string;
  fechaSolicitud: string;
  cancelada: boolean;
  fechaCancelacion?: string;
}

@Injectable({ providedIn: 'root' })
export class RegistroCitaService {
  private apiUrl = `${environment.apiUrl}citas`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<RegistroCita[]> {
    console.log('Fetching all citas from:', this.apiUrl);
    return this.http.get<RegistroCita[]>(this.apiUrl);
  }

  add(cita: Omit<RegistroCita, 'id' | 'fechaSolicitud'>): Observable<RegistroCita> {
    return this.http.post<RegistroCita>(this.apiUrl, cita);
  }

  cancelarCita(codigo: string) {
    const url = `${this.apiUrl}/cancelar?codigoCancelacion=${codigo}`;
    return this.http.post(url, {});
  }
}