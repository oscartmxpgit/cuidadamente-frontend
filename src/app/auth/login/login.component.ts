import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Login failed', error);
      }
    });
  }
}
