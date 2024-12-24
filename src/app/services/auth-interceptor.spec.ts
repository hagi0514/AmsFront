import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { AuthInterceptor } from './auth-interceptor';

describe('AuthInterceptor', () => {
  let service: AuthInterceptor;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthInterceptor,
        { provide: AuthService, useValue: { /* mock AuthService methods here */ } },
      ],
    });

    service = TestBed.inject(AuthInterceptor);
    authService = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});