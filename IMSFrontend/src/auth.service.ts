import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './app/auth';
import { Observable } from 'rxjs';
import { environment } from './environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.apiUrl}/Users`;

  constructor(private http: HttpClient) { }

  registerUser(users: User) {
    return this.http.post(`${this.apiUrl}`, users);
  }

  getUserByUsername(username: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}?username=${username}`);
  }
}
