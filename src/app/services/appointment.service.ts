import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private apiUrl = `${environment.apiUrl}/citas`;

  constructor(private http: HttpClient) {}

  getAppointments(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  getAppointmentById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  getAppointmentsByDoctor(doctorId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/doctor/${doctorId}`);
  }

  getAppointmentsByPatient(patientId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/paciente/${patientId}`);
  }

  createAppointment(appointment: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, appointment);
  }

  updateAppointment(id: number, appointment: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, appointment);
  }

  deleteAppointment(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
