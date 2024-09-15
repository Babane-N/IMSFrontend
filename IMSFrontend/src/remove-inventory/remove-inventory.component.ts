import { Component } from '@angular/core';
import { InventoryService } from '../inventory.service';

@Component({
  selector: 'app-remove-inventory',
  templateUrl: './remove-inventory.component.html',
  styleUrls: ['./remove-inventory.component.scss']
})
export class RemoveInventoryComponent {
  partNumber: string = '';
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private inventoryService: InventoryService) { }

  deleteInventoryByPartNumber(): void {
    this.successMessage = null;
    this.errorMessage = null;

    if (this.partNumber) {
      this.inventoryService.deleteInventoryByPartNumber(this.partNumber).subscribe(
        () => {
          this.successMessage = `Part ${this.partNumber} removed successfully.`;
          this.partNumber = ''; // Reset the input field
        },
        error => {
          console.error('Error removing item', error);
          this.errorMessage = `Failed to remove part ${this.partNumber}. Please try again.`;
        }
      );
    } else {
      this.errorMessage = 'Please enter a valid part number.';
    }
  }
}



