import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about/about.component';
import { ServicesComponent } from './services/services.component';
import { FaqComponent } from './faq/faq.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { ContactComponent } from './contact/contact.component';
import { DoctorDashboardComponent } from './doctor-dashboard/doctor-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [
    AboutComponent,
    ServicesComponent,
    FaqComponent,
    AppointmentsComponent,
    ContactComponent,
    DoctorDashboardComponent,
    AdminDashboardComponent,
    PatientDashboardComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
  ]
})
export class PagesModule { }
