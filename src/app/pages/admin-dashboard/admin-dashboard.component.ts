import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  doctors: any[] = [];
  patients: any[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit() {}

  loadDoctors() {
    this.adminService.getDoctors().subscribe(data => {
      this.doctors = data;
    });
  }

  loadPatients() {
    this.adminService.getPatients().subscribe(data => {
      this.patients = data;
    });
  }

  deleteDoctor(id: number) {
    this.adminService.deleteDoctor(id).subscribe(() => {
      this.loadDoctors();
    });
  }

  deletePatient(id: number) {
    this.adminService.deletePatient(id).subscribe(() => {
      this.loadPatients();
    });
  }
}
