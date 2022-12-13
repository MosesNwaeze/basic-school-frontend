import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-display-info',
  templateUrl: './display-info.component.html',
  styleUrls: ['./display-info.component.css'],
})
export class DisplayInfoComponent implements OnInit {
  staffDetails: Record<string, string>[] = [];

  columns = [];
  displayedColumns = [
    'Religion',
    'Date Of Birth',
    'Phone Number',
    'Gender',
    'State Of Origin',
    'Address',
    'Email',
  ];

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    const info = {
      first_name: this.localStorageService.staffInfo[0]['first_name'],
      middle_name: this.localStorageService.staffInfo[0]['middle_name'],
      last_name: this.localStorageService.staffInfo[0]['last_name'],
      religion: this.localStorageService.staffInfo[0]['religion'],
      date_of_birth:
        this.localStorageService.staffInfo[0]['date_of_birth'].split('T')[0],
      phone_number: this.localStorageService.staffInfo[0]['phone_number'],
      gender: this.localStorageService.staffInfo[0]['gender'],
      state_of_origin: this.localStorageService.staffInfo[0]['state_of_origin'],
      email: this.localStorageService.staffInfo[0]['email'],
      address: this.localStorageService.staffInfo[0]['address'],
    };
    this.staffDetails = [info];
  }
}
