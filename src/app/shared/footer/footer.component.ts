import { Component, OnInit } from '@angular/core';
import { HtmlChunkService } from '../../services/html-chunk.service';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LanguageService } from '../../services/language.service';

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

  // Dynamic section labels
  quickLinksLabel: string = 'Enlaces Rápidos';
  contactLabel: string = 'Contacto';
  companyName: string = 'Cuidadamente';
  homeLabel: string = 'Inicio';

  // Dynamic link labels
  aboutLabel: string = 'Quiénes Somos';
  servicesLabel: string = 'Servicios';

  currentLanguage: string = 'es';

  constructor(
    private htmlChunkService: HtmlChunkService,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.currentLanguage = this.languageService.getCurrentLanguage();
    this.loadChunks(this.currentLanguage);

    // React to language changes
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
      footerBottom: this.htmlChunkService.getHtmlChunkByName(`footer-bottom-${lang}`).pipe(catchError(() => of(null))),
      quickLinksLabel: this.htmlChunkService.getHtmlChunkByName(`footer-quicklinks-label-${lang}`).pipe(catchError(() => of(null))),
      homeLabel: this.htmlChunkService.getHtmlChunkByName(`footer-home-link-label-${lang}`).pipe(catchError(() => of(null))),
      contactLabel: this.htmlChunkService.getHtmlChunkByName(`footer-contact-label-${lang}`).pipe(catchError(() => of(null))),
      companyName: this.htmlChunkService.getHtmlChunkByName(`footer-company-name-${lang}`).pipe(catchError(() => of(null))),
      aboutLabel: this.htmlChunkService.getHtmlChunkByName(`footer-about-link-label-${lang}`).pipe(catchError(() => of(null))),
      servicesLabel: this.htmlChunkService.getHtmlChunkByName(`footer-services-link-label-${lang}`).pipe(catchError(() => of(null))),
    }).subscribe(({ 
      phone, email, address, footerAbout, footerBottom, quickLinksLabel, 
      contactLabel, companyName, aboutLabel, servicesLabel, homeLabel 
    }) => {
      this.phone = phone?.htmlContent || '';
      this.email = email?.htmlContent || '';
      this.address = address?.htmlContent || '';
      this.footerAbout = footerAbout?.htmlContent || '';
      this.footerBottom = footerBottom?.htmlContent || '';
      this.quickLinksLabel = quickLinksLabel?.htmlContent || 'Enlaces Rápidos';
      this.contactLabel = contactLabel?.htmlContent || 'Contacto';
      this.companyName = companyName?.htmlContent || 'Cuidadamente';
      this.aboutLabel = aboutLabel?.htmlContent || 'Quiénes Somos';
      this.servicesLabel = servicesLabel?.htmlContent || 'Servicios';
        this.homeLabel = homeLabel?.htmlContent || 'Inicio';

    });
  }
}
