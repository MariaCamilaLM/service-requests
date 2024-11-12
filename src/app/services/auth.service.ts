import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable, switchMap } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private uri = environment.uri;
  private apiUrl = environment.apiUrl;
  private clientId = environment.clientId;
  private clientSecret = environment.clientSecret;

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  getCurrentRole(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}auth/role`);
  }

  login(user: User): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const body = {
      grant_type: 'password',
      client_id: this.clientId,
      client_secret: this.clientSecret,
      username: user.email,
      password: user.password,
      scope: '*',
    };

    return this.http.post<any>(`${this.uri}oauth/token`, body, { headers });
  }

  storeToken(token: string): void {
    this.cookieService.set('access_token', token);
  }

  storeRole(role: string): void {
    this.cookieService.set('user_role', role);
  }

  setName(name: string) {
    this.cookieService.set('user_name', name);
  }

  getName(): string {
    return this.cookieService.get('user_name');
  }

  getRole(): string | null {
    return this.cookieService.get('user_role'); 
  }

  getToken() {
    return this.cookieService.get('access_token'); 
  }

  loginAndGetRole(user: User): Observable<any> {
    return this.login(user).pipe(
      switchMap(response => {
        const token = response.access_token;
        this.storeToken(token);
        return this.getCurrentRole(); 
      })
    );
  }

  logout(): void {
    this.cookieService.deleteAll();
  }
}
