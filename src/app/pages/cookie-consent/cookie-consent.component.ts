import { Component, OnInit } from '@angular/core';
import { CookieConsentService } from '../../services/cookie-consent.service';

@Component({
  selector: 'app-cookie-consent',
  templateUrl: './cookie-consent.component.html',
  styleUrls: ['./cookie-consent.component.scss']
})
export class CookieConsentComponent implements OnInit {
  showPopup = true;
  consentCategories: Record<'necessary' | 'analytics' | 'marketing', boolean> = {
    necessary: true,
    analytics: false,
    marketing: false
  };

  constructor(private cookieConsentService: CookieConsentService) { }

  ngOnInit() {
    if (this.cookieConsentService.consentGiven()) {
      this.showPopup = false;
    }
  }

  acceptAll() {
    this.cookieConsentService.setConsent(true);
    for (const category in this.consentCategories) {
      this.cookieConsentService.setCategoryConsent(category, true);
    }
    this.showPopup = false;
  }

  rejectAll() {
    this.cookieConsentService.setConsent(false);
    for (const category in this.consentCategories) {
      this.cookieConsentService.setCategoryConsent(category, false);
    }
    this.showPopup = false;
  }

  acceptSelected() {
    this.cookieConsentService.setConsent(true);
    for (const category in this.consentCategories) {
      const key = category as keyof typeof this.consentCategories;
      this.cookieConsentService.setCategoryConsent(key, this.consentCategories[key]);
    }

    this.showPopup = false;
  }
}