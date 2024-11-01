import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

interface InventoryItem {
  id?: number; // Optional for new items
  part_name: string;
  part_number: string;
  quantity: number;
  price: number;
  created_at?: Date;
  supplier_id: number;
  category_id: number;

}

@Component({
  selector: 'app-add-edit-inventory',
  templateUrl: './add-edit-inventory.component.html',
  styleUrls: ['./add-edit-inventory.component.scss']
})
export class AddEditInventoryComponent implements OnInit {
  inventoryForm: FormGroup;
  isEditMode = false;
  inventoryId: number | null = null;
  loading = false; // Loading state

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.inventoryForm = this.fb.group({
      part_name: ['', Validators.required],
      part_number: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      price: [0.01, [Validators.required, Validators.min(0.01)]],
      created_at: [Date],
      supplier_id: [null, Validators.required],
      category_id: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    const urlSegments = this.router.url.split('/');
    const id = urlSegments[urlSegments.length - 1];

    if (this.router.url.includes('edit') && id) {
      const numericId = +id;
      if (!isNaN(numericId)) {
        this.inventoryId = numericId;
        this.loadInventoryItem();
        this.isEditMode = true;
      }
    }
  }

  loadInventoryItem(): void {
    if (this.inventoryId !== null) {
      this.loading = true; // Start loading
      this.http.get<InventoryItem>(`https://localhost:40443/api/InventoryItems/${this.inventoryId}`).subscribe(
        (data) => {
          this.inventoryForm.patchValue(data);
          this.loading = false; // Stop loading
        },
        (error) => {
          console.error('Error loading inventory item:', error);
          this.snackBar.open('Failed to load inventory item.', 'Close', { duration: 3000 });
          this.loading = false; // Stop loading
        }
      );
    }
  }

  onSubmit(): void {
    if (this.inventoryForm.invalid) {
      return;
    }

    const inventoryData = this.inventoryForm.value;

    // If editing, you may need to ensure that 'id' is included in the payload
    if (this.isEditMode && this.inventoryId !== null) {
      inventoryData.id = this.inventoryId; // Add ID for update

      this.http.put(`https://localhost:40443/api/InventoryItems/${this.inventoryId}`, inventoryData).subscribe(
        response => {
          this.snackBar.open('Inventory item updated successfully!', 'Close', { duration: 3000 });
          this.router.navigate(['/InventoryItems']); // Redirect after successful update
        },
        error => {
          console.error('Error updating inventory item:', error);
          this.snackBar.open('Failed to update inventory item.', 'Close', { duration: 3000 });
        }
      );
    } else {
      // Remove ID if it's a new item
      delete inventoryData.id;

      this.http.post('https://localhost:40443/api/InventoryItems', inventoryData).subscribe(
        response => {
          this.snackBar.open('Inventory item added successfully!', 'Close', { duration: 3000 });
          this.inventoryForm.reset();
          this.router.navigate(['/InventoryItems']); // Redirect after successful addition
        },
        error => {
          console.error('Error adding inventory item:', error);
          this.snackBar.open('Failed to add inventory item. Please try again.', 'Close', { duration: 3000 });
        }
      );
    }
  }
}

