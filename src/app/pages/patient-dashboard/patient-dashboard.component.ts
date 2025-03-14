import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.scss']
})
export class PatientDashboardComponent implements OnInit {
  citas: any[] = [];
  doctores: any[] = [];
  nuevaCita = { doctorId: '', fecha: '', hora: '' };
  patientId: number | null = null;

  constructor(private patientService: PatientService, private authService: AuthService) {}

  ngOnInit() {
    this.patientId = this.authService.getUserId();
    if (this.patientId) {
      this.loadAppointments();
    }
    this.loadDoctors();
  }

  loadAppointments() {
    if (!this.patientId) return;

    this.patientService.getAppointments(this.patientId).subscribe(data => {
      this.citas = data;
    });
  }

  loadDoctors() {
    this.patientService.getDoctors().subscribe(data => {
      this.doctores = data;
    });
  }

  agendarCita() {
    if (!this.patientId) return;

    const appointment = {
      pacienteId: this.patientId,
      doctorId: this.nuevaCita.doctorId,
      fecha: this.nuevaCita.fecha,
      hora: this.nuevaCita.hora
    };

    this.patientService.bookAppointment(appointment).subscribe(() => {
      alert('Cita agendada con éxito.');
      this.loadAppointments();
    });
  }
}
