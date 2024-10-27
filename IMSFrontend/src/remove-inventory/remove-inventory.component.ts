import { Component } from '@angular/core';
import { InventoryService } from '../inventory.service';

@Component({
  selector: 'app-remove-inventory',
  templateUrl: './remove-inventory.component.html',
  styleUrls: ['./remove-inventory.component.scss']
})
export class RemoveInventoryComponent {
  partId: number | null = null; // 
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private inventoryService: InventoryService) { }

  deleteInventoryByPartID(): void {
    this.successMessage = null;
    this.errorMessage = null;

    if (this.partId !== null && this.partId > 0) {
      this.inventoryService.deleteInventoryByPartID(this.partId).subscribe(
        () => {
          this.successMessage = `Part ${this.partId} removed successfully.`;
          this.partId = null; // Reset the input field
        },
        error => {
          console.error('Error removing item', error);
          this.errorMessage = `Failed to remove part ${this.partId}. Please try again.`;
        }
      );
    } else {
      this.errorMessage = 'Please enter a valid part number.';
    }
  }
}


