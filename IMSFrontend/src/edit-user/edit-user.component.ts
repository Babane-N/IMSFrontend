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

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.id = data.id;
    this.editUserForm = this.fb.group({
      username: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser(): void {
    this.userService.getUser(this.id).subscribe(
      (user: User) => {
        this.editUserForm.patchValue({
          username: user.username,
          role: user.role
        });
      },
      error => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  onSave(): void {
    if (this.editUserForm.valid) {
      const { username, role } = this.editUserForm.value;
      // Use the existing password from data or null to not update it
      const payload = { id: this.id, username, role, password: null };

      this.userService.editUser(this.id, username, payload.password, role).subscribe(
        response => {
          console.log('User updated successfully:', response);
          this.dialogRef.close(response);
        },
        error => {
          console.error('Error updating user:', error);
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
