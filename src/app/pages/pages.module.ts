import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about/about.component';
import { ServicesComponent } from './services/services.component';
import { FaqComponent } from './faq/faq.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { ContactComponent } from './contact/contact.component';
import { AdminDashboardComponent } from './Administration/admin-dashboard/admin-dashboard.component';
import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../shared/shared.module';
import { RegistroCitaListComponent } from './Administration/registro-cita-list/registro-cita-list.component';
import { CancelarCitaComponent } from './cancelar-cita/cancelar-cita.component';
import { ContactListComponent } from './Administration/contact-list/contact-list.component';
import { ImageManagementComponent } from './Administration/image-management/image-management.component';
import { RegistroCitaComponent } from './registro-cita/registro-cita.component';
import { DoctorDashboardComponent } from './Administration/doctor-dashboard/doctor-dashboard.component';
import { EditHtmlChunkComponent } from './Administration/edit-html-chunk/edit-html-chunk.component';
import { HtmlChunksListComponent } from './Administration/html-chunks-list/html-chunks-list.component';
import { QuestionnaireWizardComponent } from './questionaire-wizard/questionaire-wizard.component';
import { ThankYouComponent } from './thank-you/thank-you.component';


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
    RegistroCitaListComponent,
    CancelarCitaComponent,
    ContactListComponent,
    ImageManagementComponent,
    EditHtmlChunkComponent,
    HtmlChunksListComponent,
    QuestionnaireWizardComponent,
    ThankYouComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    SharedModule
  ]
})
export class PagesModule { }
