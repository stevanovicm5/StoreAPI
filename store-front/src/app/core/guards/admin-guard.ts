import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = async () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const currentUser = authService.currentUser();
  if (currentUser?.role === 'ADMIN') {
    return true;
  }

  const refreshed = await authService.refreshToken();
  const refreshedUser = authService.currentUser();
  if (refreshed && refreshedUser?.role === 'ADMIN') {
    return true;
  }

  if (refreshed) {
    return router.createUrlTree(['/']);
  }

  return router.createUrlTree(['/login']);
};
