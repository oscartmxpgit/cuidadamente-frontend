import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, switchMap, map } from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  private languageChanged = new Subject<string>(); // Add this subject

  constructor(private translate: TranslateService, private http: HttpClient, public authService: AuthService) {
    this.initTranslate();
  }

  private initTranslate() {
    const defaultLanguage = 'es';
    this.translate.setDefaultLang(defaultLanguage);
    const savedLanguage = localStorage.getItem('appLanguage') || defaultLanguage;
    this.translate.use(savedLanguage);
  }

  switchLanguage(language: string) {
    this.translate.use(language);
    localStorage.setItem('appLanguage', language);
  }
  
  onLanguageChange(): Observable<string> {
    return this.languageChanged.asObservable(); // Provide observable for language change
  }
  

  getTranslation(key: string): Observable<string> {
    return this.translate.get(key).pipe(
      catchError(() => {
        console.error(`Error fetching translation for key: ${key}`);
        return of(key);
      })
    );
  }
}
