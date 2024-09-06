import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-remove-inventory',
  templateUrl: './remove-inventory.component.html',
  styleUrls: ['./remove-inventory.component.scss']
})
export class RemoveInventoryComponent {
  partNumber: string = '';
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private http: HttpClient) { }

  onDelete(): void {
    this.successMessage = null;
    this.errorMessage = null;

    if (this.partNumber) {
      this.http.delete(`http://localhost:40080/api/InventoryItems/${this.partNumber}`).subscribe(
        () => {
          this.successMessage = `Part ${this.partNumber} removed successfully.`;
          this.errorMessage = '';
          this.partNumber = ''; // Reset the input field
        },
        error => {
          console.error('Error removing item', error);
          this.errorMessage = `Failed to remove part ${this.partNumber}.`;
          this.successMessage = '';
        }
      );
    }
  }
}


