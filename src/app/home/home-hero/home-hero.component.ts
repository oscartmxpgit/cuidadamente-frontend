import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { TRANSITION_TEXT, TRANSITION_TEXT_ENTER, ENTER_SCALE } from './transitions.constants';
import { HtmlChunkService } from '../../services/html-chunk.service';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FileService } from '../../services/fileService';
import { LanguageService } from '../../services/language.service';
import { ContactInfoService } from '../../services/contactInfoService';

@Component({
  selector: 'app-home-hero',
  templateUrl: './home-hero.component.html',
  styleUrls: ['./home-hero.component.scss'],
  animations: [
    trigger('cardHover', [
      state('hover', style({ transform: 'scale(1.05)' })),
      state('rest', style({ transform: 'scale(1)' })),
      transition('rest => hover', animate('300ms ease-in')),
      transition('hover => rest', animate('300ms ease-out')),
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    TRANSITION_TEXT,
    TRANSITION_TEXT_ENTER,
    ENTER_SCALE
  ]
})
export class HomeHeroComponent implements OnInit {

  heroTitle: string = '';
  heroSubtitle: string = '';
  phone: string = '';
  email: string = '';
  address: string = '';
  citaLabel: string = 'Pedir cita';

  imageUrl: string = '';
  currentLanguage: string = 'es';

  constructor(
    private fileService: FileService,
    private htmlChunkService: HtmlChunkService,
    private languageService: LanguageService,
    private contactService: ContactInfoService
  ) { }

  ngOnInit(): void {
    // Load background image
    this.fileService.loadImage('FotoPrincipal.jpg').subscribe(url => {
      this.imageUrl = url;
    });

    // Load initial HTML chunks
    this.currentLanguage = this.languageService.getCurrentLanguage();
    this.loadHtmlChunks(this.currentLanguage);

    // Subscribe to language changes
    this.languageService.onLanguageChange().subscribe(lang => {
      this.currentLanguage = lang;
      this.loadHtmlChunks(lang);
    });
  }

  loadHtmlChunks(lang: string) {
    forkJoin({
      heroTitle: this.htmlChunkService.getHtmlChunkByName(`hero-title-${lang}`).pipe(catchError(() => of(null))),
      heroSubtitle: this.htmlChunkService.getHtmlChunkByName(`hero-subtitle-${lang}`).pipe(catchError(() => of(null))),
      phone: this.htmlChunkService.getHtmlChunkByName(`contact-phone-${lang}`).pipe(catchError(() => of(null))),
      email: this.htmlChunkService.getHtmlChunkByName(`contact-email-${lang}`).pipe(catchError(() => of(null))),
      address: this.htmlChunkService.getHtmlChunkByName(`contact-address-${lang}`).pipe(catchError(() => of(null))),
      citaLabel: this.htmlChunkService.getHtmlChunkByName(`navbar-cita-label-${lang}`).pipe(catchError(() => of(null))),
    }).subscribe(({ heroTitle, heroSubtitle, phone, email, address, citaLabel }) => {
      this.heroTitle = heroTitle?.htmlContent || '';
      this.heroSubtitle = heroSubtitle?.htmlContent || '';
      this.phone = phone?.htmlContent || '';
      this.email = email?.htmlContent || '';
      this.address = address?.htmlContent || '';
      this.citaLabel = citaLabel?.htmlContent || 'Pedir cita';

      this.contactService.phone = this.phone;
      this.contactService.email = this.email;
      this.contactService.address = this.address;
    });
  }

  scrollToContact() {
    const element = document.getElementById('contact');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  }
}
