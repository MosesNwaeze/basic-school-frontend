import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentComponent } from './components/payment/payment.component';
import { RemitaComponent } from './components/remita/remita.component';
import { InterswitchComponent } from './components/interswitch/interswitch.component';
import { PaypalComponent } from './components/paypal/paypal.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { NgxPayPalModule } from 'ngx-paypal';
import { PaypalCheckoutProcessComponent } from './components/paypal/component/paypal-checkout-process/paypal-checkout-process.component';
import { PaymentConfirmationComponent } from './components/payment-confirmation/payment-confirmation.component';


@NgModule({
  declarations: [
    PaymentComponent,
    RemitaComponent,
    InterswitchComponent,
    PaypalComponent,
    PaypalCheckoutProcessComponent,
    PaymentConfirmationComponent
  ],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    MatCardModule,
    MatIconModule,
    NgxPayPalModule
  
  ]
})
export class PaymentModule { }
