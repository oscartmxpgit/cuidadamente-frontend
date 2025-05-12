// src/app/pages/login/login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null; // Ensure this is defined

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      contrasena: ['', Validators.required] // Change 'password' to 'contrasena'
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, contrasena } = this.loginForm.value; // Change 'password' to 'contrasena'
      this.authService.login(email, contrasena).subscribe(
        () => {
          this.router.navigate(['/home']);
        },
        error => {
          this.errorMessage = 'Error de inicio de sesion. Por favor verifique su nombre de usuario y contraseña.'; // Set error message on failure
        }
      );
    }
  }
}
