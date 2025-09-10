import { Component, OnInit } from '@angular/core';
import { HtmlChunkService } from '../../services/html-chunk.service';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LanguageService } from '../../services/language.service';
import { HtmlChunk } from '../../models/HtmlChunk';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  phone?: string;
  email?: string;
  address?: string;
  footerAbout?: string;
  footerBottom?: string;

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
      address: this.htmlChunkService.getHtmlChunkByName(`contact-address-${lang}`).pipe(catchError(() => of(null))),
      footerAbout: this.htmlChunkService.getHtmlChunkByName(`footer-about-${lang}`).pipe(catchError(() => of(null))),
      footerBottom: this.htmlChunkService.getHtmlChunkByName(`footer-bottom-${lang}`).pipe(catchError(() => of(null)))
    }).subscribe(({ phone, email, address, footerAbout, footerBottom }) => {
      this.phone = phone?.htmlContent || '';
      this.email = email?.htmlContent || '';
      this.address = address?.htmlContent || '';
      this.footerAbout = footerAbout?.htmlContent || '';
      this.footerBottom = footerBottom?.htmlContent || '';
    });
  }
}
