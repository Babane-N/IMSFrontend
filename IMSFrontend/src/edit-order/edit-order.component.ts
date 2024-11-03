import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../order.service';
import { Order } from '../models';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss']
})
export class EditOrderComponent implements OnInit {
  editOrderForm!: FormGroup;
  statusOptions = [
    { label: 'Pending', value: 'Pending' },
    { label: 'Completed', value: 'Completed' },
    { label: 'Cancelled', value: 'Cancelled' }
  ];
  orderId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.orderId = +this.route.snapshot.paramMap.get('id')!;
    this.editOrderForm = this.fb.group({
      customer_id: ['', Validators.required],
      order_date: ['', Validators.required],
      status: ['', Validators.required],
      total: ['', [Validators.required, Validators.min(0)]]
    });
    this.loadOrderDetails();
  }

  loadOrderDetails(): void {
    this.orderService.getOrderById(this.orderId).subscribe((order: Order) => {
      this.editOrderForm.patchValue(order);
    });
  }

  onSubmit(): void {
    if (this.editOrderForm.invalid) return;

    const updatedOrder: Order = { id: this.orderId, ...this.editOrderForm.value };
    this.orderService.updateOrder(updatedOrder).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Order updated successfully' });
        this.router.navigate(['/orders']); // Navigate back to order list or management page
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update order' });
      }
    });
  }
}

