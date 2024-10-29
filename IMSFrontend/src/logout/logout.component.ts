import { Component } from '@angular/core';
import { AuthService } from '../auth.service'; // Adjust the path as necessary

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.onLogout();
  }

  onLogout(): void {
    this.authService.logout();
  }
}

