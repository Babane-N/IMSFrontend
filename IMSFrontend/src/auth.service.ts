import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './app/auth';
import { Observable, catchError } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:40080';

  constructor(private http: HttpClient) { }

  loginUser(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/login`, { email, password });
  }


  registerUser(userDetails: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/users`, userDetails, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).pipe(
      tap(response => console.log('Registration response:', response)),
      catchError(error => {
        console.error('Registration error:', error);
        throw error;
      })
    );
  }

  getUserByEmail(email: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users?email=${email}`).pipe(
      tap(response => console.log('Get user response:', response)),
      catchError(error => {
        console.error('Get user error:', error);
        throw error;
      })
    );
  }
}
