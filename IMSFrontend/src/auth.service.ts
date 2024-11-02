import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './models';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from './environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.apiUrl}/Users`;

  constructor(private http: HttpClient, private router: Router) { }

  registerUser(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}`, user).pipe(
      catchError(this.handleError)
    );
  }

  getUserByUsername(username: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}?username=${username}`).pipe(
      catchError(this.handleError)
    );
  }

  loginUser(username: string, password: string): Observable<User> {
    // Here, you might send the credentials to an authentication endpoint
    return this.http.post<User>(`${this.apiUrl}/login`, { username, password }).pipe(
      catchError(this.handleError)
    );
  }

  logout(): void {
    // Perform logout logic, e.g., remove token from local storage
    localStorage.removeItem('token'); // Example: remove token
    // Optionally clear user data from service or store
    this.router.navigate(['/login']); // Redirect to login page
  }

  private handleError(error: HttpErrorResponse) {
    // Log the error or send to a logging service
    console.error('An error occurred:', error);
    // Return a user-friendly error message
    return throwError('Something went wrong; please try again later.');
  }
}

