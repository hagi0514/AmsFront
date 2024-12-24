import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && !req.url.includes('/refresh')) {
          // Try refreshing the token
          return this.authService.refreshToken().pipe(
            switchMap((newToken) => {
              const clonedRequest = req.clone({
                setHeaders: { Authorization: `Bearer ${newToken}` },
              });
              return next.handle(clonedRequest);
            }),
            catchError(() => {
              this.authService.logout();
              return throwError(() => new Error('Session expired'));
            })
          );
        }
        return throwError(() => error);
      })
    );
  }
}
