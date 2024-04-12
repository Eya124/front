import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:9091/api/auth';

  constructor(private http: HttpClient) { }

  requestPasswordReset(email: string): Observable<any> {
    const url = `${this.baseUrl}/reset-password/request/${email}`;
    return this.http.post(url, null);
  }

  resetPassword(token: string, newPassword: string): Observable<any> {
    const url = `${this.baseUrl}/reset-password/1/${token}`;
    const body = { newPassword: newPassword };
    return this.http.post(url, body);
  }
  hasToken(): boolean {
    const token = localStorage.getItem('token');
    return !!token; // Renvoie true si le token existe, false sinon
  }

}
