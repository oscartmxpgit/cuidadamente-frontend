// src/app/services/oferta-api.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HorarioOferta } from '../models/HorarioOferta';
import { Oferta } from '../models/Oferta';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class OfertaApiService {
  private base = `${environment.apiUrl}ofertas`;

  constructor(private http: HttpClient) {}

  listar(): Observable<Oferta[]> {
    return this.http.get<Oferta[]>(this.base);
  }

  obtener(id: number): Observable<Oferta> {
    return this.http.get<Oferta>(`${this.base}/${id}`);
  }

  crear(oferta: Partial<Oferta>): Observable<number> {
    return this.http.post<number>(this.base, oferta);
  }

  obtenerHorasDisponibles(servicioId: number): Observable<string[]> {
    return this.http.get<string[]>(`${this.base}/${servicioId}/horas`);
  }

  obtenerDiasYHoras(servicioId: number): Observable<Record<string, string[]>> {
    return this.http.get<Record<string, string[]>>(`${this.base}/disponibilidad/${servicioId}`);
  }

  actualizar(id: number, oferta: Oferta) {
    return this.http.put(`${this.base}/${id}`, oferta);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.base}/${id}`);
  }

  agregarHorario(id: number, horario: HorarioOferta): Observable<number> {
    return this.http.post<number>(`${this.base}/${id}/horarios`, horario);
  }

  actualizarHorario(id: number, hid: number, horario: HorarioOferta) {
    console.log('Actualizando horario:', id, hid, horario);
    return this.http.put(`${this.base}/${id}/horarios/${hid}`, horario);
  }

  eliminarHorario(id: number, hid: number) {
    return this.http.delete(`${this.base}/${id}/horarios/${hid}`);
  }
}
