import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApplicationApiService } from 'src/app/services/application-api.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent {
  changePassword = new FormGroup({
    old_password: new FormControl('', Validators.required),
    new_password: new FormControl('', Validators.required),
    confirm_new_password: new FormControl('', Validators.required),
  });

  successMessage = '';
  errormessage = '';

  constructor(private apiService: ApplicationApiService, router: Router) {}

  handleSubmit() {
    if (
      this.changePassword.controls.new_password.value ===
      this.changePassword.controls.confirm_new_password.value
    ) {
      const token = JSON.parse(localStorage.getItem('token') as string);

      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
      this.apiService
        .post(
          'change-staff-password',
          JSON.stringify(this.changePassword.value),
          options
        )
        .subscribe((response: any) => {
          if (response.status === 'success') {
            this.successMessage = response.message;
          } else {
            this.errormessage = response.message;
          }
        });
    } else {
      this.errormessage = 'Password mismatch';
      return;
    }
  }
}
