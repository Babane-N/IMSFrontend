import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../inventory.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

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

  constructor(private inventoryService: InventoryService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loadDashboardData();
  }

  
  loadDashboardData(): void {
    this.inventoryService.getInventoryCount().subscribe(
      count => {
        console.log('Fetched inventory count:', count); // Log the fetched count
        this.totalInventory = count;
      },
      error => {
        console.error('Error loading inventory count:', error);
      }
    );

 
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
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
