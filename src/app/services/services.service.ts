import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Service } from '../models/service';


@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private apiUrl = `${environment.apiUrl}services`;

  constructor(private http: HttpClient) {}

  obtenerTodos(): Observable<Service[]> {
    return this.http.get<Service[]>(this.apiUrl);
  }

  obtenerPorId(id: number): Observable<Service> {
    return this.http.get<Service>(`${this.apiUrl}/${id}`);
  }

  obtenerPorTitulo(titulo: string): Observable<Service> {
    return this.http.get<Service>(`${this.apiUrl}/titulo/${encodeURIComponent(titulo)}`);
  }

  agregar(service: Service): Observable<Service> {
    return this.http.post<Service>(this.apiUrl, service);
  }

  actualizar(service: Service): Observable<void> {
    if (!service.id) throw new Error('El service debe tener id para actualizar');
    return this.http.put<void>(`${this.apiUrl}/${service.id}`, service);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
