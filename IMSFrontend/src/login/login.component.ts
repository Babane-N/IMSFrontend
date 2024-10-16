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
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  // Getter for email field
  get username() {
    return this.loginForm.get('username');
  }

  // Getter for password field
  get password() {
    return this.loginForm.get('password');
  }

  loginUser() {
    const username = this.username?.value;
    const password = this.password?.value;

    if (username && password) {
      this.authService.getUserByUsername(username).subscribe({
        next: (response) => {
          if (response.length > 0 && response[0].password === password) {
            sessionStorage.setItem('username', username);
            console.log('Login successful, navigating to /home');  // Debugging
            this.router.navigate(['/home']);
          } else {
            this.msgService.add({ severity: 'error', summary: 'Error', detail: 'Username or password is incorrect' });
          }
        },
        error: (err) => {
          this.msgService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
        }
      });
    } else {
      this.msgService.add({ severity: 'error', summary: 'Error', detail: 'Both username and password are required' });
    }
  }

}
