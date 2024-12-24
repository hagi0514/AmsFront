import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Roles } from 'app/models/roles';
import { Users } from 'app/models/users';
import { UsersService } from 'app/services/users.service';
import { jwtDecode } from 'jwt-decode';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {


    role: string = 'USER'; // Default role
    errorMessage: string = '';
    newPasswordStrengthMessage: string = ''; // To show password strength messages
    roles: Roles[] = [];
    users: Users = new Users();
    userExists:String[];
    user:Users=new Users();
    userId: number;
    token = localStorage.getItem('auth_token');
  
    constructor(private router: Router, 
      private userService: UsersService,
      private spinner:NgxSpinnerService
    ) { }
  
    ngOnInit(): void {
      try {
        const decodedToken: any = jwtDecode(this.token);
        this.userId = decodedToken.userId; 
        console.log("navbar userId"+this.userId)
    } catch (error) {
        alert('Invalid token or unable to decode token');
        return;
    }

    this.userService.getUserById(this.userId).subscribe({
      next: (data) => {
        this.user = data;
        console.log("User INfo"+this.user) // Populate the users object
      },
      error: (err) => {
        console.error('Error fetching user data:', err);
      }
    });
  
      this.spinner.show();
  
     setTimeout(() => {
       /** spinner ends after 5 seconds */
       this.spinner.hide();
     }, 2000);
   
      this.userService.getAllRoles().subscribe((data) => {
        this.roles = data;
      });
      this.userService.userExists().subscribe((data) => {
        this.userExists = data;
        console.log(this.userExists)
      });
    }
  
    validatePasswordStrength(): void {
      const password = this.users.newPassword;
      if (!password) {
        this.newPasswordStrengthMessage = 'Password is required.';
      } else if (password.length < 8) {
        this.newPasswordStrengthMessage = 'Password must be at least 8 characters.';
      } else if (!/[A-Z]/.test(password)) {
        this.newPasswordStrengthMessage = 'Password must include at least one uppercase letter.';
      } else if (!/[a-z]/.test(password)) {
        this.newPasswordStrengthMessage = 'Password must include at least one lowercase letter.';
      } else if (!/[0-9]/.test(password)) {
        this.newPasswordStrengthMessage = 'Password must include at least one number.';
      } else if (!/[@$!%*?&]/.test(password)) {
        this.newPasswordStrengthMessage = 'Password must include at least one special character.';
      } else {
        this.newPasswordStrengthMessage = '';
      }
    }
  
    changePassword(): void {
      if (window.confirm('Are you sure you want to save this change?')) {
          
  
        if (this.users.newPassword === this.users.retypePassword) {
          this.errorMessage = ''; // Clear any previous error message
          this.userService.changePassword(this.userId,this.users.oldPassword,this.users.newPassword).subscribe({
            next: (data) => {
              alert('Password changed successfully')
              console.log('Registration successful:', data);
            },
            error: (error) => {
              this.errorMessage = error.error?.message||'Registration failed. Please try again.';
              console.error(error.error?.message);
            }
          });
        } else {
          this.errorMessage = 'Passwords do not match.';
          console.log(this.errorMessage)
        }
      }
    }
  }
  
