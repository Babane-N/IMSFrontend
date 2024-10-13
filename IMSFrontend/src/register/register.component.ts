import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { User } from '../app/auth';
import { AuthService } from '../auth.service';
import { passwordMatchValidator } from './shared/password-match.directive';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      role: ['', Validators.required]  // Add role control here
    }, {
      validators: passwordMatchValidator
    });
  }

  get fullName() {
    return this.registerForm.controls['fullName'];
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
    return this.registerForm.controls['role'];  // Role getter
  }

  submitDetails() {
    // Extract the form values and remove the confirmPassword field
    const postData = { ...this.registerForm.value };
    delete postData.confirmPassword;

    // Send the registration data to the backend
    this.authService.registerUser(postData as User).subscribe({
      next: (response) => {
        console.log(response);
        this.messageService.add({
          severity: 'success',
          summary: 'Registration Successful',
          detail: 'You have registered successfully.'
        });
        this.router.navigate(['login']);
      },
      error: (err) => {
        console.error('Registration error:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Registration Error',
          detail: 'An error occurred while registering. Please try again.'
        });
      }
    });
  }
}
