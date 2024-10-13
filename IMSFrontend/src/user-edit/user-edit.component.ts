import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from '../models';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  editForm!: FormGroup;
  userId!: number;
  roles = ['Admin', 'Manager','User'];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userId = +this.route.snapshot.paramMap.get('id')!;
    this.editForm = this.fb.group({
      fullName: ['', Validators.required],
      role: ['', Validators.required]
    });

    this.loadUser();
  }

  loadUser(): void {
    this.userService.getUserById(this.userId).subscribe((user: User) => {
      this.editForm.patchValue({
        fullName: user.username,
        role: user.role
      });
    });
  }

  submit(): void {
    if (this.editForm.invalid) {
      return;
    }

    this.userService.updateUser(this.userId, this.editForm.value).subscribe(() => {
      this.router.navigate(['/user-management']);
    });
  }

  cancel(): void {
    this.router.navigate(['/user-management']);
  }
}

