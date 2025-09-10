import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLanguage$ = new BehaviorSubject<string>('es');

  setLanguage(lang: string) {
    this.currentLanguage$.next(lang);
  }

  onLanguageChange() {
    return this.currentLanguage$.asObservable();
  }

  getCurrentLanguage() {
    return this.currentLanguage$.value;
  }
}
