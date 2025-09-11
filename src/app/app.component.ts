import { Component } from '@angular/core';
import { CookieConsentService } from './services/cookie-consent.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'cuidadamente-frontend';
  cookieConsentGiven = false;

  constructor(private cookieConsentService: CookieConsentService) { }

  ngOnInit() {
    this.cookieConsentGiven = this.cookieConsentService.consentGiven();
  }
}
