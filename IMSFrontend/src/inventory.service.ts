import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inventory } from './inventory-list/inventory'; // Assuming InventoryItem is defined in models.ts

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private baseUrl = 'https://localhost:40443/api/InventoryItems';

  constructor(private http: HttpClient) { }

  // Fetch all inventory items
  getInventory(): Observable<Inventory[]> {
    return this.http.get<Inventory[]>(this.baseUrl);
  }

  // Fetch a single inventory item by ID
  getInventoryByID(id: number): Observable<Inventory> {
    return this.http.get<Inventory>(`${this.baseUrl}/${id}`);
  }

  // Add a new inventory item
  addInventory(item: Inventory): Observable<Inventory> {
    return this.http.post<Inventory>(this.baseUrl, item);
  }

  // Update an existing inventory item by ID
  updateInventory(id: number, item: Inventory): Observable<Inventory> {
    return this.http.put<Inventory>(`${this.baseUrl}/${id}`, item);
  }

  // Delete an inventory item by ID
  deleteInventory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // Delete an inventory item by Part Number (assuming the backend supports this)
  deleteInventoryByPartID(partId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${partId}`);
  }

  getInventoryCount(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/inventory/count`);
  }
  
}


