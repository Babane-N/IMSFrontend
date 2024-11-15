import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from '../register/register.component';
import { LoginComponent } from '../login/login.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { InventoryListComponent } from '../inventory-list/inventory-list.component';
import { AddEditInventoryComponent } from '../add-edit-inventory/add-edit-inventory.component';
import { BarcodeComponent } from '../barcode/barcode.component';
import { OrderManagementComponent } from '../order-management/order-management.component';
import { ReportsComponent } from '../reports/reports.component';
import { UserManagementComponent } from '../user-management/user-management.component';
import { RemoveInventoryComponent } from '../remove-inventory/remove-inventory.component';
import { HomeComponent } from '../home/home.component';
import { ManageComponent } from '../manage/manage.component';
import { LogoutComponent } from '../logout/logout.component'; // Import the LogoutComponent
import { authGuard } from '../auth.guard';
import { PlaceOrderComponent } from '../place-order/place-order.component';
import { EditOrderComponent } from '../edit-order/edit-order.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'manage', component: ManageComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'inventory-list', component: InventoryListComponent },
  { path: 'add-edit-inventory', component: AddEditInventoryComponent },
  { path: 'barcode', component: BarcodeComponent }, 
  { path: 'remove-inventory', component: RemoveInventoryComponent },
  { path: 'place-order', component: PlaceOrderComponent },
  { path: 'order-management/edit/:id', component: EditOrderComponent },
  { path: 'order-management', component: OrderManagementComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'user-management', component: UserManagementComponent },
  { path: 'logout', component: LogoutComponent }, // Add the logout route
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
