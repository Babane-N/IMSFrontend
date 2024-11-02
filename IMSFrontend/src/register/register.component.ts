import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { User } from '../models';
import { AuthService } from '../auth.service';
import { passwordMatchValidator } from './shared/password-match.directive';
import { UserService } from '../user.service'; // Ensure this is imported

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;  // Using non-null assertion
  roles: string[] = ['admin', 'manager', 'customer']; // Consider fetching these from UserService
  roleOptions: { label: string, value: string }[] = [];
  isLoading = false; // Loading state for the button

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService, // Inject UserService
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Initialize role options
    this.roleOptions = this.roles.map(role => ({ label: role, value: role }));

    // Initialize the form
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      role: ['', Validators.required]
    }, {
      validators: passwordMatchValidator
    });
  }

  get username() {
    return this.registerForm.controls['username'];
  }

  get email() {
    return this.registerForm.controls['email'];
  }

  get password() {
    return this.registerForm.controls['password'];
  }

  get confirmPassword() {
    return this.registerForm.controls['confirmPassword'];
  }

  get role() {
    return this.registerForm.get('role');
  }

  submitDetails() {
    console.log('Submit button clicked'); // Debugging line
    this.isLoading = true; // Set loading state

    // Extract the form values and remove the confirmPassword field
    const postData = { ...this.registerForm.value };
    delete postData.confirmPassword;

    // Send registration request
    this.authService.registerUser(postData as User).subscribe({
      next: (response) => {
        this.isLoading = false; // Reset loading state
        console.log(response); // Log the response for debugging

        // Show a success message to the user
        this.messageService.add({
          severity: 'success',
          summary: 'Registration Successful',
          detail: 'You have registered successfully.'
        });

        // Navigate to the login page
        this.router.navigate(['login']);
      },
      error: (err) => {
        this.isLoading = false; // Reset loading state
        console.error('Registration error:', err); // Log the error for debugging

        // Show an error message to the user
        this.messageService.add({
          severity: 'error',
          summary: 'Registration Error',
          detail: 'An error occurred while registering. Please try again.'
        });
      }
    });
  }
}

