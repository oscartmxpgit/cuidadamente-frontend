import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  menuActive: boolean = false;
  showDropdown: boolean = false;

  constructor(public authService: AuthService, public router: Router) {}

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
}