import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private apiUrl = `${environment.apiUrl}/doctores`;

  constructor(private http: HttpClient) {}

  getDoctors(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  getDoctorById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createDoctor(doctor: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, doctor);
  }

  updateDoctor(id: number, doctor: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, doctor);
  }

  deleteDoctor(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  setAvailability(doctorId: number, availability: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${doctorId}/disponibilidad`, availability);
  }

  // ✅ Get all appointments for a doctor
  getAppointments(doctorId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${doctorId}/citas`);
  }
}
