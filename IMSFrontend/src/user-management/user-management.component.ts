import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  users: any[] = [];
  displayedColumns: string[] = ['username', 'email', 'role', 'action'];

  // Example data source; replace with actual data source
  dataSource = this.users;

  // Example data; replace with actual data
  ELEMENT_DATA: any[] = [
    { position: 1, name: 'John Doe' },
    { position: 2, name: 'Jane Doe' }
  ];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe((data: any[]) => {
      this.users = data;
    });
  }

  editUser(userId: number): void {
    // Implement user editing functionality
  }

  deleteUser(userId: number): void {
    this.userService.deleteUser(userId).subscribe(() => {
      this.loadUsers();
    });
  }
}

