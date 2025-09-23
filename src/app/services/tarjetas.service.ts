import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Tarjeta } from '../models/tarjeta';

@Injectable({
  providedIn: 'root'
})
export class TarjetasService {
  private apiUrl = `${environment.apiUrl}tarjetas`;

  constructor(private http: HttpClient) { }

  obtenerTodos(language: string): Observable<Tarjeta[]> {
    return this.http.get<Tarjeta[]>(`${this.apiUrl}?language=${encodeURIComponent(language)}`);
  }

  obtenerPorId(id: number, language: string): Observable<Tarjeta> {
    return this.http.get<Tarjeta>(`${this.apiUrl}/${id}?language=${encodeURIComponent(language)}`);
  }

  obtenerPorTitulo(titulo: string, language: string): Observable<Tarjeta> {
    return this.http.get<Tarjeta>(
      `${this.apiUrl}/titulo/${encodeURIComponent(titulo)}?language=${encodeURIComponent(language)}`
    );
  }

  /**
   * 🔹 Get by type (ALL languages)
   */
  obtenerPorTipo(tipo: string): Observable<Tarjeta[]> {
    return this.http.get<Tarjeta[]>(`${this.apiUrl}/tipo/${encodeURIComponent(tipo)}`);
  }

  /**
   * 🔹 Get by type AND language
   */

  obtenerPorTipoYLanguage(tipo: string, language: string): Observable<Tarjeta[]> {
    return this.http.get<Tarjeta[]>(
      `${this.apiUrl}/tipo/${encodeURIComponent(tipo)}/${encodeURIComponent(language)}`
    );
  }


  agregar(service: Tarjeta): Observable<Tarjeta> {
    return this.http.post<Tarjeta>(this.apiUrl, service);
  }

  actualizar(service: Tarjeta): Observable<void> {
    if (!service.id) throw new Error('El service debe tener id para actualizar');
    return this.http.put<void>(`${this.apiUrl}/${service.id}`, service);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
