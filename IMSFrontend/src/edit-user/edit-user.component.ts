import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../models';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  editUserForm: FormGroup;
  id: number;
  roles: string[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.id = data.id;
    this.editUserForm = this.fb.group({
      username: [data.username],
      role: [data.role]
    });
  }

  ngOnInit(): void {
    this.loadRoles();
  }

  loadRoles(): void {
    this.userService.getRoles().subscribe(
      roles => {
        this.roles = roles; // Set roles to the fetched values
      },
      error => {
        console.error('Error fetching roles:', error);
      }
    );
  }

  onSave(): void {
    if (this.editUserForm.valid) {
      const { username, role } = this.editUserForm.value;
      this.userService.editUser(this.data.id, username, role) // Using id from data
        .subscribe(
          response => {
            console.log('User updated successfully', response);
            this.dialogRef.close(response); // Close the dialog and return updated user data
          },
          error => {
            console.error('Error updating user', error);
          }
        );
    } else {
      console.error('Form is invalid');
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
