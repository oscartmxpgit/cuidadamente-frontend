import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  menuActive: boolean = false;
  showDropdown: boolean = false;

  constructor(public authService: AuthService) {}

  toggleMenu() {
    this.menuActive = !this.menuActive;
  }

  closeMenu() {
    this.menuActive = false;
    this.showDropdown = false;
  }

  logout() {
    this.authService.logout();
    this.menuActive = false;
    this.showDropdown = false;
  }
}