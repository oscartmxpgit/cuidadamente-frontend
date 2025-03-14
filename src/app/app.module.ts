import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { PagesModule } from './pages/pages.module';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    HomeModule,
    SharedModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()), // ✅ Enables Fetch API for SSR
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
