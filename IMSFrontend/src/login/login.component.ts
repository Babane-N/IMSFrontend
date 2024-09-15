import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;  // Non-null assertion, will be initialized in ngOnInit

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private msgService: MessageService
  ) { }

  ngOnInit(): void {
    // Initialize the login form here
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  // Getter for email field
  get email() {
    return this.loginForm.get('email');
  }

  // Getter for password field
  get password() {
    return this.loginForm.get('password');
  }

  loginUser() {
    const { email, password } = this.loginForm.value;

    // Assuming getUserByEmail exists and returns an observable list of users with that email
    this.authService.getUserByEmail(email as string).subscribe({
      next: (response) => {
        if (response.length > 0 && response[0].password === password) {
          sessionStorage.setItem('email', email as string);
          this.router.navigate(['/home']);
        } else {
          this.msgService.add({ severity: 'error', summary: 'Error', detail: 'Email or password is incorrect' });
        }
      },
      error: (err) => {
        this.msgService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
      },
      complete: () => {
        // Optional completion handling
      }
    });
  }
}
