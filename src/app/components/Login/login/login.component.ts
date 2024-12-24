import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private authService: AuthService, 
    private router: Router,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }
  ngOnInit() {
    this.authService.setAuthStatus(false); // Update status after logi-+
  }

  login(): void {

    if (this.loginForm.invalid) {
      return;
    }

    const { username, password } = this.loginForm.value; // Extracting username and password from form

    this.authService.login(username, password).subscribe(
      (response: any) => {
        // Check if response contains a valid token
        if (response && response.token) {
          // Store token and navigate to dashboard
          this.authService.storeToken(response.token);
          this.authService.setAuthStatus(true); // Update status after login

          this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage = 'Invalid response received. Please try again later.';
        }
      },
      (error) => {//Failed to load resource: the server responded with a status of 401 ()
        console.error('Login error:', error);  // Log the error for debugging
        if (error.status === 401) {
          this.errorMessage = 'Invalid credentials. Please try again.';
        } else {
          this.errorMessage = 'An error occurred. Please try again later.';
        }
        this.router.navigate(['/unauthorized']);  // Redirect to unauthorized page
      }
    );
  }
}
