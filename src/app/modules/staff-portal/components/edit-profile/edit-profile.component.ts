import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  passport = '';
  last_name = '';
  staff_id = '';
  first_name = '';
  email = '';
  religion = '';
  date_of_birth = '';
  gender = '';
  address = '';
  middle_name = '';

  editForm = new FormGroup({
    lastName: new FormControl(this.last_name),
    middleName: new FormControl(this.middle_name),
    firstName: new FormControl(this.first_name),
    dateOfBirth: new FormControl(this.date_of_birth),
    gender: new FormControl(this.gender),
    religion: new FormControl(this.religion),
    address: new FormControl(this.address),
  });

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    if (this.localStorageService.signedUser.length > 0) {
      this.passport = this.localStorageService.signedUser[0]['passport'];
      this.last_name = this.localStorageService.signedUser[0]['last_name'];
      this.staff_id = this.localStorageService.signedUser[0]['staff_id'];
      this.first_name = this.localStorageService.signedUser[0]['staff_id'];
      this.email = this.localStorageService.signedUser[0]['email'];
      this.date_of_birth =
        this.localStorageService.signedUser[0]['date_of_birth'];
      this.address = this.localStorageService.signedUser[0]['address'];
      this.religion = this.localStorageService.signedUser[0]['religion'];
      this.middle_name = this.localStorageService.signedUser[0]['middle_name'];
    }
  }

  handleSubmit() {
    console.log(this.editForm.value);
  }
}
