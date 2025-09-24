import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { PagesModule } from './pages/pages.module';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';
import { AuthModule } from './auth/auth.module';
import { CookieConsentComponent } from './pages/cookie-consent/cookie-consent.component';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs);

@NgModule({
  declarations: [
    AppComponent,
    CookieConsentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    HomeModule,
    SharedModule,
    AuthModule,

  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-ES' }, // Set global locale to Spanish

    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()), // ✅ Enables Fetch API for SSR
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
