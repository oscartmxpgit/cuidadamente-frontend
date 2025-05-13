import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeHeroComponent } from './home-hero/home-hero.component';
import { HomeServiciosComponent } from './home-servicios/home-servicios.component';
import { HomeTestimoniosComponent } from './home-testimonios/home-testimonios.component';
import { HomeContactoComponent } from './home-contacto/home-contacto.component';
import { HomeComponent } from './home/home.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    HomeComponent,
    HomeHeroComponent,
    HomeServiciosComponent,
    HomeTestimoniosComponent,
    HomeContactoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RecaptchaModule
  ],
  exports: [HomeComponent]
})
export class HomeModule { }
