import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private readonly STORAGE_KEY = 'cuidadamente-language';
  private currentLanguage$: BehaviorSubject<string>;

  constructor() {
    const savedLang = localStorage.getItem(this.STORAGE_KEY) || 'es';
    this.currentLanguage$ = new BehaviorSubject<string>(savedLang);
  }

  setLanguage(lang: string) {
    localStorage.setItem(this.STORAGE_KEY, lang);
    this.currentLanguage$.next(lang);
  }

  onLanguageChange() {
    return this.currentLanguage$.asObservable();
  }

  getCurrentLanguage(): string {
    return this.currentLanguage$.value;
  }
}
