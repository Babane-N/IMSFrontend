import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './app/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:40080';


  constructor(private http: HttpClient) { }

  registerUser(userDetails: User) {
    return this.http.post(`${this.baseUrl}/Users`, userDetails);
  }

  getUserByUsername(username: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/Users?username=${username}`);
  }
}
