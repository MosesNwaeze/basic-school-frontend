import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApplicationApiService } from 'src/app/services/application-api.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent {
  changePassword = new FormGroup({
    oldPassword: new FormControl('', Validators.required),
    newPassword: new FormControl('', Validators.required),
    confirmNewPassword: new FormControl('', Validators.required),
  });

  successMessage = '';
  errormessage = '';

  constructor(private apiService: ApplicationApiService, router: Router) {}

  handleSubmit() {
    if (
      this.changePassword.controls.newPassword.value ===
      this.changePassword.controls.confirmNewPassword.value
    ) {
      const formData = new FormData();
      formData.append(
        'new_password',
        this.changePassword.controls.newPassword.value as string
      );
      formData.append(
        'old_password',
        this.changePassword.controls.oldPassword.value as string
      );
      const token = JSON.parse(
        localStorage.getItem('serverResponse') as string
      )[1];

      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
      this.apiService
        .post('change-staff-password', formData, options)
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
