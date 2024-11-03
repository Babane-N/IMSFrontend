import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from './environments/environment'; // Ensure correct path
import { Order } from './models';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = `${environment.apiUrl}/Orders`;

  constructor(private http: HttpClient) { }

  // Get all orders
  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  getOrder(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${id}`);
  }

  // Create a new order
  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, order).pipe(
      catchError(this.handleError)
    );
  }

  // Fetch an order by ID
  getOrderById(orderId: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${orderId}`).pipe(
      catchError(this.handleError)
    );
  }

  // Update an order by ID
  updateOrder(id:number, status: string): Observable<Order> {
    const payload = { id, status};
    return this.http.put<Order>(`${this.apiUrl}/${id}`, payload);
  }

  // Delete an order by ID
  deleteOrder(orderId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${orderId}`);
  }

  // Error handling method
  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    // Customize the error message based on the environment
    const errorMessage = error.error instanceof ErrorEvent
      ? error.error.message
      : `Backend returned code ${error.status}, body was: ${error.error}`;

    return throwError(errorMessage || 'Something went wrong; please try again later.');
  }
}
