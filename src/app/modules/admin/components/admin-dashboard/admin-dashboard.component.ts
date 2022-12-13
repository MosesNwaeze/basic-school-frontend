import { Component } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {

  passport = '';

  
  constructor(private localStorageService: LocalStorageService) {
    this.passport =
      this.localStorageService.signedUser.length > 0
        ? this.localStorageService.signedUser[0]['passport']
        : '';
    
  }

  ngOnInit(): void {}
}
