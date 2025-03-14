import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  register(user: { nombre: string; apellido: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  }

  isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false; // ✅ Prevents error on SSR

    const token = localStorage.getItem('token');
    return token ? !this.jwtHelper.isTokenExpired(token) : false;
  }

  getToken(): string | null {
    if (typeof window === 'undefined') return null; // ✅ Prevents error on SSR

    return localStorage.getItem('token');
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
}
