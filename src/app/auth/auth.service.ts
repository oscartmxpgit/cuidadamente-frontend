import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../environments/environment';

export interface AuthResponse {
  token: string;
  expiration: Date;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseApiUrl: string = environment.apiUrl;
  private loginUrl: string = `${this.baseApiUrl}auth/login`;
  private registerUrl: string = `${this.baseApiUrl}auth/register`;
  private userInfoUrl: string = `${this.baseApiUrl}user/GetUserProfile`;

  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, contrasena: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.loginUrl, { email, contrasena }).pipe(
      tap(response => {
        if (this.isLocalStorageAvailable()) {
          localStorage.setItem('jwt', response.token);
        }
      })
    );
  }

  register(username: string, email: string, password: string): Observable<string> {
    return this.http.post<string>(this.registerUrl, { username, email, password }, { responseType: 'text' as 'json' }).pipe(
      tap(response => {
        console.log('Response from server:', response);
      }),
      catchError((error: HttpErrorResponse) => {
        // Handle the error and rethrow or return a message if needed
        return throwError(() => new Error(error.error || 'Registration failed'));
      })
    );
  }

  logout() {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem('jwt');
    }
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    if (!this.isLocalStorageAvailable()) {
      return false;
    }
    const token = localStorage.getItem('jwt');
    return token != null && !this.jwtHelper.isTokenExpired(token);
  }

  getToken(): string | null {
    if (!this.isLocalStorageAvailable()) {
      return null;
    }
    return localStorage.getItem('jwt');
  }

  getUsername(): string | null {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken?.sub || null;
    }
    return null;
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (!token) return null;

    const decodedToken = this.jwtHelper.decodeToken(token);
    return decodedToken?.role || null;
  }

  isAdmin(): boolean {
    return this.getUserRole() === 'Admin';
  }

  isDoctor(): boolean {
    return this.getUserRole() === 'Doctor';
  }

  getUserId(): number | null {
    const token = this.getToken();
    if (!token) return null;

    const decodedToken = this.jwtHelper.decodeToken(token);
    return decodedToken?.userId || null;
  }

  private isLocalStorageAvailable(): boolean {
    try {
      const test = 'test';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }
}
