import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule
  ],
  exports: [ // ✅ Export components to make them available outside SharedModule
    NavbarComponent,
    RouterModule,
    FooterComponent,
    MatCardModule
  ]
})
export class SharedModule { }
