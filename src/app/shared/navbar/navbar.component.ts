import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { HtmlChunkService } from '../../services/html-chunk.service';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  menuActive: boolean = false;
  showDropdown: boolean = false;
  currentLanguage: string = 'es';

  languages = ['es', 'en'];

  // Dynamic labels
  aboutLabel: string = 'Quiénes Somos';
  servicesLabel: string = 'Servicios';
  citaLabel: string = 'Pedir cita';
  brandLabel: string = 'Cuidadamente';

  constructor(
    public authService: AuthService,
    public router: Router,
    private languageService: LanguageService,
    private htmlChunkService: HtmlChunkService
  ) {}

  ngOnInit() {
    this.currentLanguage = this.languageService.getCurrentLanguage();
    this.loadLabels(this.currentLanguage);

    this.languageService.onLanguageChange().subscribe(lang => {
      this.currentLanguage = lang;
      this.loadLabels(lang);
    });
  }

  toggleMenu() {
    this.menuActive = !this.menuActive;
  }

  closeMenu() {
    this.menuActive = false;
    this.showDropdown = false;
  }

  shouldShowCitaBtn(): boolean {
    return !(this.router.url === '/' || this.router.url === '/registro-cita');
  }

  switchLanguage(lang: string) {
    if (lang !== this.currentLanguage) {
      this.languageService.setLanguage(lang);
    }
  }

  private loadLabels(lang: string) {
    forkJoin({
      aboutLabel: this.htmlChunkService.getHtmlChunkByName(`navbar-about-label-${lang}`).pipe(catchError(() => of(null))),
      servicesLabel: this.htmlChunkService.getHtmlChunkByName(`navbar-services-label-${lang}`).pipe(catchError(() => of(null))),
      citaLabel: this.htmlChunkService.getHtmlChunkByName(`navbar-cita-label-${lang}`).pipe(catchError(() => of(null))),
      brandLabel: this.htmlChunkService.getHtmlChunkByName(`navbar-brand-label-${lang}`).pipe(catchError(() => of(null)))
    }).subscribe(({ aboutLabel, servicesLabel, citaLabel, brandLabel }) => {
      this.aboutLabel = aboutLabel?.htmlContent || 'Quiénes Somos';
      this.servicesLabel = servicesLabel?.htmlContent || 'Servicios';
      this.citaLabel = citaLabel?.htmlContent || 'Pedir cita';
      this.brandLabel = brandLabel?.htmlContent || 'Cuidadamente';
    });
  }
}
