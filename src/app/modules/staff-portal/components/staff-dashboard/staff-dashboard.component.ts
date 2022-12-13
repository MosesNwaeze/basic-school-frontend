import { Component, EventEmitter, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-staff-dashboard',
  templateUrl: './staff-dashboard.component.html',
  styleUrls: ['./staff-dashboard.component.css'],
})
export class StaffDashboardComponent implements OnInit {
  passport = '';

  admin = true;
  verifiedAdmin =false;
 // verifiedAdmin = this.localStorageService.unVerifiedAdmin;

  constructor(private localStorageService: LocalStorageService) {
    this.passport =
      this.localStorageService.signedUser.length > 0
        ? this.localStorageService.signedUser[0]['passport']
        : '';
    // this.admin =
    //   this.localStorageService.signedUser.length > 0
    //     ? Boolean(this.localStorageService.signedUser[0]['isAdmin'])
    //     : false;
  }

  ngOnInit(): void {}
}
