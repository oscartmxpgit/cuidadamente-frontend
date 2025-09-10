import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  menuActive: boolean = false;
  showDropdown: boolean = false;
  currentLanguage = 'es';

  constructor(
    public authService: AuthService,
    public router: Router,
    private languageService: LanguageService
  ) {
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
    return !(this.router.url === '/registro-cita' || this.router.url === '/');
  }

  logout() {
    this.authService.logout();
    this.menuActive = false;
    this.showDropdown = false;
  }

  switchLanguage(lang: string) {
    this.languageService.setLanguage(lang);
  }
}
