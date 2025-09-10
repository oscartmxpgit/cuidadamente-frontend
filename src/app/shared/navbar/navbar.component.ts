import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { LanguageService } from '../../services/language.service';

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

  constructor(
    public authService: AuthService,
    public router: Router,
    private languageService: LanguageService
  ) {}

  ngOnInit() {
    this.currentLanguage = this.languageService.getCurrentLanguage();
    this.languageService.onLanguageChange().subscribe(lang => {
      this.currentLanguage = lang;
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

  logout() {
    this.authService.logout();
    this.closeMenu();
  }

  switchLanguage(lang: string) {
    if (lang !== this.currentLanguage) {
      this.languageService.setLanguage(lang);
    }
  }
}
