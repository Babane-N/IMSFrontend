import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Order } from '../models';
import { OrderService } from '../order.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.scss']
})
export class OrderManagementComponent implements OnInit {
  orders: any[] = [];
  displayedColumns: string[] = ['id', 'customerId', 'status', 'action'];
  dataSource = new MatTableDataSource<any>();

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getOrders().subscribe((data: any[]) => {
      this.orders = data;

      this.dataSource = new MatTableDataSource(this.orders);
    }, error => {
      console.error('Error loading users:', error);
    });
  }

  viewOrder(orderId: number): void {
    // Logic to view the order details
  }
}


