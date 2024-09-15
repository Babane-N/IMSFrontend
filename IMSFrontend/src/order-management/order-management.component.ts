import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.scss']
})
export class OrderManagementComponent implements OnInit {
  orders: any[] = []; // Replace with actual data
  displayedColumns: string[] = ['id', 'customer_id', 'status', 'order_date'];

  constructor() { }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    // Load orders from the service
    this.orders = [
      { id: 1234, customerName: 'John Doe', status: 'Pending' },
      { id: 5678, customerName: 'Jane Smith', status: 'Shipped' }
    ];
  }

  viewOrder(orderId: number): void {
    // Logic to view the order details
  }
}


