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
import { RegistroCitaComponent } from './pages/registro-cita/registro-cita.component';
import { share } from 'rxjs';
import { SharedModule } from '../shared/shared.module';
import { RegistroCitaListComponent } from './registro-cita-list/registro-cita-list.component';


@NgModule({
  declarations: [
    AboutComponent,
    ServicesComponent,
    FaqComponent,
    AppointmentsComponent,
    ContactComponent,
    DoctorDashboardComponent,
    AdminDashboardComponent,
    PatientDashboardComponent,
    RegistroCitaComponent,
    RegistroCitaListComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    SharedModule
  ]
})
export class PagesModule { }
