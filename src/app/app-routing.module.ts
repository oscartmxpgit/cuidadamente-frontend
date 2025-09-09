import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AboutComponent } from './pages/about/about.component';
import { AppointmentsComponent } from './pages/appointments/appointments.component';
import { FaqComponent } from './pages/faq/faq.component';
import { ServicesComponent } from './pages/services/services.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AuthGuard } from './auth.guard';
import { AdminDashboardComponent } from './pages/Administration/admin-dashboard/admin-dashboard.component';
import { HomeComponent } from './home/home/home.component';
import { RegistroCitaListComponent } from './pages/Administration/registro-cita-list/registro-cita-list.component';
import { CancelarCitaComponent } from './pages/cancelar-cita/cancelar-cita.component';
import { ContactListComponent } from './pages/Administration/contact-list/contact-list.component';
import { ImageManagementComponent } from './pages/Administration/image-management/image-management.component';
import { RegistroCitaComponent } from './pages/registro-cita/registro-cita.component';
import { HtmlChunksListComponent } from './pages/Administration/html-chunks-list/html-chunks-list.component';
import { QuestionnaireWizardComponent } from './pages/questionaire-wizard/questionaire-wizard.component';
import { AnswersListComponent } from './pages/Administration/answers-list/answers-list.component';
import { TarjetasListComponent } from './pages/Administration/tarjetas-list/tarjetas-list.component';
import { OfertaListComponent } from './pages/Administration/oferta-list/oferta-list.component';
import { OfertaFormComponent } from './pages/Administration/oferta-form/oferta-form.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'appointments', component: AppointmentsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'registro-cita', component: RegistroCitaComponent },
  { path: 'registro-cita-list', component: RegistroCitaListComponent },
  { path: 'contact-list', component: ContactListComponent },
  { path: 'cancelar-cita', component: CancelarCitaComponent },
  
  /* management */
  { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard] },
  { path: 'image-managment', component: ImageManagementComponent, canActivate: [AuthGuard] },
  { path: 'html-chunks-managment', component: HtmlChunksListComponent, canActivate: [AuthGuard] },
  { path: 'questionarie-wizard', component: QuestionnaireWizardComponent },
  { path: 'questionarie-answers', component: AnswersListComponent },
  { path: 'tarjetas-list', component: TarjetasListComponent, canActivate: [AuthGuard] },
  { path: 'ofertas-list', component: OfertaListComponent, canActivate: [AuthGuard] },

  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }