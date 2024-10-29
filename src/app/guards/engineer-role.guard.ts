import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service'; // Adjust the path as necessary
import { Router } from '@angular/router';

export const engineerRoleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const userRole = authService.getRole();

  if (userRole === 'engineer') {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
