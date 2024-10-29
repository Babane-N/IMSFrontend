import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './app/auth';
import { Observable } from 'rxjs';
import { environment } from './environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.apiUrl}/Users`;

  constructor(private http: HttpClient, private router: Router) { }

  registerUser(users: User) {
    return this.http.post(`${this.apiUrl}`, users);
  }

  getUserByUsername(username: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}?username=${username}`);
  }
  logout(): void {
    // Perform logout logic, e.g., remove token from local storage
    localStorage.removeItem('token'); // Example: remove token
    this.router.navigate(['/login']); // Redirect to login page
  }
}
