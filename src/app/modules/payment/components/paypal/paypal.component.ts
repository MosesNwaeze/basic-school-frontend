import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationApiService } from 'src/app/services/application-api.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css'],
})
export class PaypalComponent implements OnInit {
  payments = this.localStorageService.payment;
  constructor(
    private apService: ApplicationApiService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {}

  handlePayPal() {
    this.router.navigate(['payments/paypal-checkout-process']);
  }
}
