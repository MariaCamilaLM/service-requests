import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const token = this.authService.getToken();
    if (token) {
      const isValid = this.validateToken(token);
      if (isValid) {
        return true;
      }
    }
    this.router.navigate(['login']);
    return false;
  }

  validateToken(token: string): boolean {
    const t = token.replace(/-/g, '+').replace(/_/g, '/');
    // Logic to validate JWT token (e.g., check expiration)
    const payload = JSON.parse(atob(t.split('.')[1]));
    const isExpired = payload.exp * 1000 < Date.now();
    return !isExpired;
  }
}
