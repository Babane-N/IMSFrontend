import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { InventoryListComponent } from '../inventory-list/inventory-list.component';
import { AddEditInventoryComponent } from '../add-edit-inventory/add-edit-inventory.component';
import { OrderManagementComponent } from '../order-management/order-management.component';
import { ReportsComponent } from '../reports/reports.component';
import { UserManagementComponent } from '../user-management/user-management.component';
import { RemoveInventoryComponent } from '../remove-inventory/remove-inventory.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'inventory-list', component: InventoryListComponent },
  { path: 'add-edit-inventory', component: AddEditInventoryComponent },
  { path: 'remove-inventory', component: RemoveInventoryComponent },
  { path: 'order-management', component: OrderManagementComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'user-management', component: UserManagementComponent },
  // Wildcard route for a 404 page
  { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
