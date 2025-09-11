import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieConsentService {
  constructor() {}

  private setCookieInternal(name: string, value: string, days: number) {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  }

  private getCookieInternal(name: string): string {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (let c of ca) {
      c = c.trim();
      if (c.indexOf(nameEQ) === 0) {
        return c.substring(nameEQ.length, c.length);
      }
    }
    return '';
  }

  private deleteCookieInternal(name: string) {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
  }

  setCookie(name: string, value: string, days: number) {
    this.setCookieInternal(name, value, days);
  }

  getCookie(name: string): string {
    return this.getCookieInternal(name);
  }

  deleteCookie(name: string) {
    this.deleteCookieInternal(name);
  }

  consentGiven(): boolean {
    return this.getCookie('cuidadamente-consent') === 'true';
  }

  setConsent(value: boolean) {
    this.setCookie('cuidadamente-consent', value.toString(), 365);
  }

  setCategoryConsent(category: string, value: boolean) {
    this.setCookie(`cuidadamente-consent_${category}`, value.toString(), 365);
  }

  getCategoryConsent(category: string): boolean {
    return this.getCookie(`cuidadamente-consent_${category}`) === 'true';
  }
}
