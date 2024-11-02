import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './environments/environment';
import { User } from './models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/Users`;

  constructor(private http: HttpClient) { }

  // Get all users
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  // Delete a user by ID
  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${userId}`);
  }

  // Edit user details
  editUser(id: number, username: string, role: string): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, { username, role });
  }

  // Get available roles (adjust the endpoint as needed)
  getRoles(): Observable<string[]> {
    return this.http.get<string[]>(`${environment.apiUrl}/Roles`); // Ensure this is the correct endpoint
  }
}

