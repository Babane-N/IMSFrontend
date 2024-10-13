import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  users: any[] = [];
  displayedColumns: string[] = ['username', 'role', 'created_at'];
  dataSource = new MatTableDataSource<any>();

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe((data: any[]) => {
      this.users = data;
      // If using Angular Material table, set dataSource here
      this.dataSource = new MatTableDataSource(this.users);
    }, error => {
      console.error('Error loading users:', error);
    });
  }

  editUser(userId: number): void {
    this.router.navigate([`/user-edit/${userId}`]);
  }

  deleteUser(userId: number): void {
    this.userService.deleteUser(userId).subscribe(() => {
      this.loadUsers();
    }, error => {
      console.error('Error deleting user:', error);
    });
  }
}
