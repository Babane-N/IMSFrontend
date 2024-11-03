import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from '../order.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Order } from '../models';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss']
})
export class EditOrderComponent implements OnInit {
  editOrderForm: FormGroup;
  id: number;

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private dialogRef: MatDialogRef<EditOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.id = data.id;
    this.editOrderForm = this.fb.group({
      status: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadOrder();
  }

  loadOrder(): void {
    this.orderService.getOrder(this.id).subscribe(
      (order: Order) => {
        this.editOrderForm.patchValue({
          status: order.status,
        });
      },
      error => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  onSave(): void {
    if (this.editOrderForm.valid) {
      const { status} = this.editOrderForm.value;
      // Use the existing password from data or null to not update it
      const payload = { id: this.id, status };

      this.orderService.updateOrder(this.id, status).subscribe(
        response => {
          console.log('Order updated successfully:', response);
          this.dialogRef.close(response);
        },
        error => {
          console.error('Error updating order:', error);
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
