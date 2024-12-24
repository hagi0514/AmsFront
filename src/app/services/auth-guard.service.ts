import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    console.log('AuthGuard: Checking login status');

    const token = this.authService.getToken();
    if (token) {
      // Check if token is expired
      if (this.authService.isTokenExpired(token)) {
        console.warn('AuthGuard: Token expired, attempting refresh');

        // Attempt to refresh the token
        return this.authService.refreshToken().pipe(
          map(() => {
            console.log('AuthGuard: Token refreshed successfully');
            return true;
          }),
          catchError((error) => {
            console.error('AuthGuard: Token refresh failed', error);
            this.handleUnauthenticated(state.url);
            return of(false);
          })
        );
      }

      console.log('AuthGuard: Token is valid');
      return true; // Token is valid, allow access
    } else {
      console.warn('AuthGuard: No token found, redirecting');
      this.handleUnauthenticated(state.url);
      return false;
    }
  }

  private handleUnauthenticated(returnUrl: string): void {
    this.authService.logout(); // Clear tokens and stop monitoring
    this.router.navigate(['/login'], {
      queryParams: { returnUrl }, // Redirect to the login page with the intended URL
    });
  }
}
