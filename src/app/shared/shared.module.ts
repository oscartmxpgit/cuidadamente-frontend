import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [ // ✅ Export components to make them available outside SharedModule
    NavbarComponent,
    FooterComponent
  ]
})
export class SharedModule { }
