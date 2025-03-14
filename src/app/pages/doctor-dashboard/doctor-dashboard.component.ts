import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../services/doctor.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.scss']
})
export class DoctorDashboardComponent implements OnInit {
  availability = { fecha: '', horaInicio: '', horaFin: '' };
  citas: any[] = [];
  doctorId: number | null = null;

  constructor(private doctorService: DoctorService, private authService: AuthService) {}

  ngOnInit() {
    this.doctorId = this.authService.getUserId();
    if (this.doctorId) {
      this.loadAppointments();
    }
  }

  saveAvailability() {
    if (!this.doctorId) return;

    this.doctorService.setAvailability(this.doctorId, this.availability).subscribe(() => {
      alert('Disponibilidad guardada.');
    });
  }

  loadAppointments() {
    if (!this.doctorId) return;

    this.doctorService.getAppointments(this.doctorId).subscribe(data => {
      this.citas = data;
    });
  }
}
