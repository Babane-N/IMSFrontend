import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { AngularMaterialModule } from '../angular-material.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CalendarModule } from 'primeng/calendar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from '../login/login.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { InventoryListComponent } from '../inventory-list/inventory-list.component';
import { AddEditInventoryComponent } from '../add-edit-inventory/add-edit-inventory.component';
import { BarcodeComponent } from '../barcode/barcode.component';
import { RemoveInventoryComponent } from '../remove-inventory/remove-inventory.component';
import { OrderManagementComponent } from '../order-management/order-management.component';
import { ReportsComponent } from '../reports/reports.component';
import { UserManagementComponent } from '../user-management/user-management.component';
import { HomeComponent } from '../home/home.component';
import { ManageComponent } from '../manage/manage.component';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { RegisterComponent } from '../register/register.component';
import { PlaceOrderComponent } from '../place-order/place-order.component';
import { EditOrderComponent } from '../edit-order/edit-order.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    InventoryListComponent,
    AddEditInventoryComponent,
    BarcodeComponent,
    RemoveInventoryComponent,
    OrderManagementComponent,
    ReportsComponent,
    UserManagementComponent,
    EditUserComponent,
    RegisterComponent,
    PlaceOrderComponent,
    EditOrderComponent,
    
    HomeComponent,
    ManageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatListModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    AngularMaterialModule,
    MatDialogModule,
    MatSelectModule,
    DropdownModule,
    ButtonModule,
    CardModule,
    CalendarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


