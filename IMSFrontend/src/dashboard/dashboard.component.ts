import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  totalInventory: number = 0;
  lowStockAlerts: number = 0;
  totalOrders: number = 0;
  pendingOrders: number = 0;
  recentActivities: any[] = [];
  alerts: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    // Load stats, activities, and alerts here
    this.totalInventory = 100; 
    this.lowStockAlerts = 5; 
    this.totalOrders = 50; 
    this.pendingOrders = 10; 

    this.recentActivities = [
      { title: 'Order #1234 processed', date: new Date() },
      { title: 'Inventory updated for Tires', date: new Date() }
    ];

    this.alerts = [
      { message: 'Low stock on Brake Pads', date: new Date() }
    ];
  }
}
