import { Component, OnInit } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HtmlChunkService } from '../../../services/html-chunk.service';
import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'app-contact-toolbar',
  templateUrl: './contact-toolbar.component.html',
  styleUrls: ['./contact-toolbar.component.scss']
})
export class ContactToolbarComponent implements OnInit {

  phone?: string;
  email?: string;
  address?: string;
  currentLanguage: string = 'es';

  constructor(
    private htmlChunkService: HtmlChunkService,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.currentLanguage = this.languageService.getCurrentLanguage();
    this.loadChunks(this.currentLanguage);

    // Suscribirse a cambios de idioma
    this.languageService.onLanguageChange().subscribe(lang => {
      this.currentLanguage = lang;
      this.loadChunks(lang);
    });
  }

  private loadChunks(lang: string) {
    forkJoin({
      phone: this.htmlChunkService.getHtmlChunkByName(`contact-phone-${lang}`).pipe(catchError(() => of(null))),
      email: this.htmlChunkService.getHtmlChunkByName(`contact-email-${lang}`).pipe(catchError(() => of(null))),
      address: this.htmlChunkService.getHtmlChunkByName(`contact-address-${lang}`).pipe(catchError(() => of(null)))
    }).subscribe(({ phone, email, address }) => {
      this.phone = phone?.htmlContent || '';
      this.email = email?.htmlContent || '';
      this.address = address?.htmlContent || '';
    });
  }

  getGoogleMapsLink(): string {
    return this.address ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(this.address)}` : '#';
  }

  encodeUri(value: string | undefined): string {
    return value ? encodeURIComponent(value) : '';
  }
}
