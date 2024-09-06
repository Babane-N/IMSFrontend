import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-edit-inventory',
  templateUrl: './add-edit-inventory.component.html',
  styleUrls: ['./add-edit-inventory.component.scss']
})
export class AddEditInventoryComponent implements OnInit {
  inventoryForm: FormGroup;
  isEditMode = false;
  inventoryId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.inventoryForm = this.fb.group({
      part_name: ['', Validators.required],
      part_number: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(0.01)]],
      supplier: ['', Validators.required],
      supplier_id: [null, Validators.required],
      category_id: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    // Check if in edit mode by route parameters
    const urlSegments = this.router.url.split('/');
    const id = urlSegments[urlSegments.length - 1];

    if (this.router.url.includes('edit') && id) {
      const numericId = +id; // Convert to number
      if (!isNaN(numericId)) {
        this.inventoryId = numericId;
        this.loadInventoryItem();
        this.isEditMode = true;
      }
    }
  }

  loadInventoryItem(): void {
    if (this.inventoryId !== null) {
      this.http.get(`http://localhost:40080/api/InventoryItems/${this.inventoryId}`).subscribe(
        (data: any) => {
          this.inventoryForm.patchValue(data);
        },
        error => {
          console.error('Error loading inventory item:', error);
        }
      );
    }
  }

  onSubmit(): void {
    if (this.inventoryForm.invalid) {
      return;
    }

    const inventoryData = this.inventoryForm.value;

    if (this.isEditMode && this.inventoryId !== null) {
      this.http.put(`http://localhost:40080/api/InventoryItems/${this.inventoryId}`, inventoryData).subscribe(
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
      this.http.post('http://localhost:40080/api/InventoryItems', inventoryData).subscribe(
        response => {
          this.snackBar.open('Inventory item added successfully!', 'Close', { duration: 3000 });
          this.inventoryForm.reset();
          this.router.navigate(['/InventoryItems']); // Redirect after successful addition
        },
        error => {
          console.error('Error adding inventory item:', error);
          this.snackBar.open('Failed to add inventory item.', 'Close', { duration: 3000 });
        }
      );
    }
  }
}


