import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Roles } from 'app/models/roles';
import { Users } from 'app/models/users';
import { UsersService } from 'app/services/users.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  role: string = 'USER'; // Default role
  errorMessage: string = '';
  passwordStrengthMessage: string = ''; // To show password strength messages
  roles: Roles[] = [];
  users: Users = new Users();
  userExists:String[];

  constructor(private router: Router, 
    private userService: UsersService,
    private spinner:NgxSpinnerService
  ) { }

  ngOnInit(): void {
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
    const password = this.users.password;
    if (!password) {
      this.passwordStrengthMessage = 'Password is required.';
    } else if (password.length < 8) {
      this.passwordStrengthMessage = 'Password must be at least 8 characters.';
    } else if (!/[A-Z]/.test(password)) {
      this.passwordStrengthMessage = 'Password must include at least one uppercase letter.';
    } else if (!/[a-z]/.test(password)) {
      this.passwordStrengthMessage = 'Password must include at least one lowercase letter.';
    } else if (!/[0-9]/.test(password)) {
      this.passwordStrengthMessage = 'Password must include at least one number.';
    } else if (!/[@$!%*?&]/.test(password)) {
      this.passwordStrengthMessage = 'Password must include at least one special character.';
    } else {
      this.passwordStrengthMessage = '';
    }
  }

  register(): void {
    if (window.confirm('Are you sure you want to register this user?')) {
      for (let existingUser of this.userExists) { 
        if (this.userExists.includes(this.users.username)) {
                    this.errorMessage = 'This user already exist'; 
          return; // Exit the loop and function early if the user is found
        }
      }
      this.errorMessage = ''; // Clear any previous error message if the username does not exist
      

      if (this.users.password === this.users.retypePassword) {
        this.errorMessage = ''; // Clear any previous error message
        this.userService.register(this.users, this.users.roleId).subscribe({
          next: (data) => {
            console.log('Registration successful:', data);
          },
          error: (error) => {
            this.errorMessage = 'Registration failed. Please try again.';
            console.error(error);
          }
        });
      } else {
        this.errorMessage = 'Passwords do not match.';
        console.log(this.errorMessage)
      }
    }
  }
}
