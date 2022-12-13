import { Component, Input, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  passport = '';
  last_name = '';
  constructor(private localStorageService: LocalStorageService) {
    console.log(this.admin)
  }

  @Input() admin!:boolean 

  ngOnInit(): void {
    this.last_name =
      this.localStorageService.signedUser.length > 0
        ? this.localStorageService.signedUser[0]['last_name']
        : '';
  }
}
