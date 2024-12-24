import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, fromEvent, interval, Observable, of, Subscription, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authStatus = new BehaviorSubject<boolean>(this.getInitialAuthStatus());
  private apiUrl = `${environment.backendUrl}/auth`; // Adjust backend URL
  private tokenKey = 'auth_token';
  private refreshTokenKey = 'refreshToken';
  private jwtHelper = new JwtHelperService();
  private readonly INACTIVITY_LIMIT = 1800000; // 
  private inactivityTimer: any = null;

  constructor(private http: HttpClient, private router: Router) {
  
    this.startInactivityTracking();
    this.checkTokenOnInit();
  }

  /** Get authentication status as an observable */
  getAuthStatus(): Observable<boolean> {
    return this.authStatus.asObservable();
  }

  /** Check if the user is logged in */
  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }
  /** Login and store tokens */
  login(username: string, password: string): Observable<any> {
   
    return this.http.post<{ token: string; refreshToken: string }>(`${this.apiUrl}/login`, { username, password })
        .pipe(
            tap((response) => {
                console.log('Login response:', response);
                if (response.refreshToken) {
                    console.log('Storing tokens in localStorage');
                    localStorage.setItem('token', response.token);  // Adjusted to `token`
                    localStorage.setItem('refreshToken', response.refreshToken);
                } else {
                    console.error('No refresh token in login response:', response);
                }
            }),
            catchError((err) => {
                console.error('Login error:', err);
                return throwError(() => err);
            })
        );
}



  /** Refresh the token */
  refreshToken(): Observable<any> {
    const refreshToken = this.getRefreshToken(); // Debugging already added here
    if (!refreshToken) {
        console.error('Cannot refresh token: No refresh token found in localStorage.');
        this.logout();
        return throwError(() => new Error('Refresh token missing'));
    }

    console.log('Sending refresh token to backend:', refreshToken);

    return this.http.post<{ accessToken: string; refreshToken: string }>(`${this.apiUrl}/refresh`, { refreshToken })
        .pipe(
            tap((response) => {
                console.log('Refresh token response received:', response);
                if (response.accessToken && response.refreshToken) {
                    this.storeToken(response.accessToken);
                    this.saveRefreshToken(response.refreshToken);
                } else {
                    console.error('Invalid refresh token response from backend:', response);
                }
            }),
            catchError((err) => {
                console.error('Token refresh failed:', err);
                this.logout();
                return throwError(() => err);
            })
        );
}


  /** Logout the user */
  logout(): void {
    // this.stopTokenExpirationMonitor();
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    localStorage.removeItem('isLoggedIn');
    this.setAuthStatus(false);
    this.router.navigate(['/login']);
  }

  /** Get the role of the user */
  getRoleFromToken(): string {
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken = this.jwtHelper.decodeToken(token);
        return decodedToken?.roles || '';
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
    return '';
  }

  /** Store token in local storage */
  public storeToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  /** Get token from local storage */
  public getToken(): string | null {
    const token = localStorage.getItem(this.tokenKey);
    console.log('Retrieved token:', token);  // Log token value
    return token;
  }

  /** Get refresh token from local storage */
public getRefreshToken(): string {
    const token = localStorage.getItem(this.refreshTokenKey);
    if (!token) {
        console.warn('Refresh token is not found in localStorage.');
    } else {
        console.log('Retrieved refresh token from localStorage:', token);
    }
    return token || '';
}

  public saveRefreshToken(token: string): void {
    if (!token) {
        console.error('Attempted to save an empty or null refresh token.');
        return;
    }
    console.log('Saving refresh token:', token);
    localStorage.setItem(this.refreshTokenKey, token);
}



  /** Check if token is expired */
  public isTokenExpired(token: string): boolean {
    try {
      const isExpired = this.jwtHelper.isTokenExpired(token);
      console.log('Token expired:', isExpired);
      return isExpired;
    } catch (error) {
      console.error('Error checking token expiration:', error);
      return true;
    }
  }
 /** Start inactivity tracking */
 private startInactivityTracking(): void {
  this.resetInactivityTimer(); // Reset timer on app load

  const events = ['click', 'mousemove', 'keydown', 'scroll', 'touchstart'];
  events.forEach((event) =>
    fromEvent(window, event).subscribe(() => {
      this.resetInactivityTimer();
    })
  );
}

/** Reset inactivity timer */
private resetInactivityTimer(): void {
  if (this.inactivityTimer) {
    clearTimeout(this.inactivityTimer);
  }
  this.inactivityTimer = setTimeout(() => {
    console.log('User inactive for too long, logging out...');
    this.logout();
  }, this.INACTIVITY_LIMIT);
}

/** Check token on app initialization */
private checkTokenOnInit(): void {
  const token = this.getToken();
  if (token && !this.isTokenExpired(token)) {
    this.setAuthStatus(true);
  } else {
    this.logout();
  }
}
  

  /** Set authentication status */
  public setAuthStatus(isLoggedIn: boolean): void {
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
    this.authStatus.next(isLoggedIn);
  }

  /** Get initial authentication status */
  public getInitialAuthStatus(): boolean {
    return JSON.parse(localStorage.getItem('isLoggedIn') || 'false');
  }


  /**dashboard */
  checkExternalDashboard() { return this.http.get('https://production.egp.gov.et/',
    { responseType: 'text' }) .pipe( catchError((error: HttpErrorResponse) => 
     { 
       if (error.status === 0) { return of(false); }
     else
      { return of(true); } }) ); } 
 
}
