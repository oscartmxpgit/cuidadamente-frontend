import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { TRANSITION_TEXT, TRANSITION_TEXT_ENTER, ENTER_SCALE } from './transitions.constants';
import { HtmlChunkService } from '../../services/html-chunk.service';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FileService } from '../../services/fileService';

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

  imageUrl: string = '';
  currentLanguage: string = 'es'; // Default, se puede cambiar con un selector de idioma

  constructor(private fileService: FileService, private htmlChunkService: HtmlChunkService) { }

  ngOnInit(): void {
    // Cargar imagen de fondo
    this.fileService.loadImage('FotoPrincipal.jpg').subscribe(url => {
      this.imageUrl = url;
    });

    this.loadHtmlChunks();
  }

  loadHtmlChunks() {
    forkJoin({
      heroTitle: this.htmlChunkService.getHtmlChunkByName(`hero-title-${this.currentLanguage}`).pipe(catchError(() => of(null))),
      heroSubtitle: this.htmlChunkService.getHtmlChunkByName(`hero-subtitle-${this.currentLanguage}`).pipe(catchError(() => of(null))),
      phone: this.htmlChunkService.getHtmlChunkByName(`contact-phone-${this.currentLanguage}`).pipe(catchError(() => of(null))),
      email: this.htmlChunkService.getHtmlChunkByName(`contact-email-${this.currentLanguage}`).pipe(catchError(() => of(null))),
      address: this.htmlChunkService.getHtmlChunkByName(`contact-address-${this.currentLanguage}`).pipe(catchError(() => of(null)))
    }).subscribe(({ heroTitle, heroSubtitle, phone, email, address }) => {
      this.heroTitle = heroTitle?.htmlContent || '';
      this.heroSubtitle = heroSubtitle?.htmlContent || '';
      this.phone = phone?.htmlContent || '';
      this.email = email?.htmlContent || '';
      this.address = address?.htmlContent || '';
    });
  }

  changeLanguage(lang: string) {
    this.currentLanguage = lang;
    this.loadHtmlChunks();
  }

  scrollToContact() {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
