import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from '../order.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.scss']
})
export class PlaceOrderComponent {
  orderForm: FormGroup;

  constructor(private fb: FormBuilder, private orderService: OrderService, private messageService: MessageService) {
    this.orderForm = this.fb.group({
      customer_id: ['', Validators.required],
      status: ['', Validators.required],
      total: [0, [Validators.required, Validators.min(0)]],
      order_date: [new Date(), Validators.required], // Initialize with current date
      // Add any additional fields needed for your order
    });
  }

  placeOrder() {
    if (this.orderForm.valid) {
      const newOrder = this.orderForm.value;
      this.orderService.createOrder(newOrder).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Order placed successfully' });
          this.orderForm.reset(); // Reset the form after successful submission
        },
        error: (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to place order' });
          console.error('Error placing order:', error);
        }
      });
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Please fill out the form correctly' });
    }
  }
}
