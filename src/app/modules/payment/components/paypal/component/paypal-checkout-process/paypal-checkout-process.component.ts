import { Component, OnInit } from '@angular/core';
import { IPayPalConfig } from 'ngx-paypal';
import { ApplicationApiService } from 'src/app/services/application-api.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-paypal-checkout-process',
  templateUrl: './paypal-checkout-process.component.html',
  styleUrls: ['./paypal-checkout-process.component.css'],
})
export class PaypalCheckoutProcessComponent implements OnInit {
  payPalConfig?: IPayPalConfig;
  showSuccess!: boolean;
  showCancel!: boolean;
  showError!: boolean;
  orders: any;
  transactionDetails: any;

  constructor(private apiService: ApplicationApiService,private localStorageService:LocalStorageService) {}

  resetStatus() {
    window.close();
  }

  ngOnInit(): void {
    this.initConfig();
  }

  private initConfig(): void {
    this.payPalConfig = {
      currency: 'USD',
      clientId: 'sb',

      createOrderOnServer: (data) =>
        fetch(
          `http://localhost:3000/schools/api/v1/payments/create-paypal-transaction/${this.localStorageService.paymentPurpose}`
        )
          .then((res) => res.json())
          .then((order) => order.id),

      advanced: {
        commit: 'true',
      },
      style: {
        label: 'paypal',
        layout: 'vertical',
      },
      onApprove: (data, actions) => {
        console.log(
          'onApprove - transaction was approved, but not authorized',
          data,
          actions
        );
        actions.order.get().then((details: any) => {
          console.log(
            'onApprove - you can get full order details inside onApprove: ',
            details
          );
        });
      },

      authorizeOnServer: async (approveData, actions) => {
        try {
          const formData = new FormData();
          formData.append('orderID', approveData.orderID);
          formData.append('payerID', approveData.payerID);
          formData.append('payment_purpose', 'entrance fee');
          const response = await fetch(
            'http://localhost:3000/schools/api/v1/payments/authorize-paypal-transaction',
            {
              method: 'post',
              body: formData,
            }
          );
          const orderData = await response.json();
          console.log('actions ', actions.payment);

          actions.redirect('http://localhost:4200/payments/success');

          // return actions.payment.execute().then(function () {
          //   alert(
          //     'Authorization created for ' +
          //       orderData.payer.name.given_name +
          //       ' ' +
          //       orderData.payer.name.surname
          //   );
          // });
        } catch (error: any) {
          console.log('error called ', error);
        }
      },

      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
        this.showCancel = true;
      },
      onError: (err) => {
        console.log('OnError', err);
        this.showError = true;
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
        this.resetStatus();
      },
    };
  }
}
