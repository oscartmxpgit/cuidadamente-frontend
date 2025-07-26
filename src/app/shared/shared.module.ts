import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InsertHtmlDirective } from '../directives/insert-html.directive';
import { ContactToolbarComponent } from './shared/contact-toolbar/contact-toolbar.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule} from '@angular/material/icon';
import { QuillModule } from 'ngx-quill';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    InsertHtmlDirective,
    ContactToolbarComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatNativeDateModule,
    MatSelectModule,
    MatTableModule,
    QuillModule.forRoot()
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
    MatIconModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    InsertHtmlDirective,
    MatTableModule,
    QuillModule
  ]
})
export class SharedModule { }
