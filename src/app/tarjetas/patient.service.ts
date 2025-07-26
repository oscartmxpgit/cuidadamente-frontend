import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private apiUrl = `${environment.apiUrl}/pacientes`;

  constructor(private http: HttpClient) {}

  getPatients(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  getPatientById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createPatient(patient: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, patient);
  }

  updatePatient(id: number, patient: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, patient);
  }

  deletePatient(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // ✅ Get all appointments for a patient
  getAppointments(patientId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${patientId}/citas`);
  }

  getDoctors(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/doctores`);
  }

  bookAppointment(appointment: { pacienteId: number; doctorId: string; fecha: string; hora: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/${appointment.pacienteId}/citas`, appointment);
  }
}
