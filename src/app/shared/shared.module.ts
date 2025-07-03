import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InsertHtmlDirective } from '../directives/insert-html.directive';
import { ContactToolbarComponent } from './shared/contact-toolbar/contact-toolbar.component';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    InsertHtmlDirective,
    ContactToolbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [ // ✅ Export components to make them available outside SharedModule
    CommonModule,
    NavbarComponent,
    ContactToolbarComponent,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    FooterComponent,
    MatCardModule,
    InsertHtmlDirective
  ]
})
export class SharedModule { }
