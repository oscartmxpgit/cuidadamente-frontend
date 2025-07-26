import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeHeroComponent } from './home-hero/home-hero.component';
import { HomeValoresComponent } from './home-valores/home-valores.component';
import { HomeContactoComponent } from './home-contacto/home-contacto.component';
import { HomeComponent } from './home/home.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    HomeComponent,
    HomeHeroComponent,
    HomeValoresComponent,
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
