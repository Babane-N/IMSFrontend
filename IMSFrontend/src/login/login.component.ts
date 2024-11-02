import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../auth.service';
import { User } from '../models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private msgService: MessageService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  loginUser() {
    this.isLoading = true; // Set loading state
    const username = this.username?.value;
    const password = this.password?.value;

    if (this.loginForm.invalid) {
      this.msgService.add({ severity: 'error', summary: 'Error', detail: 'Both username and password are required' });
      this.isLoading = false; // Reset loading state
      return;
    }

    // Call the loginUser method from AuthService
    this.authService.loginUser(username, password).subscribe({
      next: (user: User) => {
        sessionStorage.setItem('username', username);
        sessionStorage.setItem('role', user.role); // Store user role for navigation
        console.log('Login successful');
        this.router.navigate([this.redirectBasedOnRole(user.role)]);
      },
      error: () => {
        this.msgService.add({ severity: 'error', summary: 'Error', detail: 'Invalid username or password' });
        this.isLoading = false; // Reset loading state
      },
      complete: () => {
        this.isLoading = false; // Reset loading state
      }
    });
  }

  private redirectBasedOnRole(role: string): string {
    switch (role) {
      case 'admin':
        return '/dashboard';
      case 'manager':
        return '/manage';
      case 'customer':
        return '/home';
      default:
        return '/home';
    }
  }

}


