import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentConfirmationComponent } from './components/payment-confirmation/payment-confirmation.component';
import { PaymentComponent } from './components/payment/payment.component';
import { PaypalCheckoutProcessComponent } from './components/paypal/component/paypal-checkout-process/paypal-checkout-process.component';
import { PaypalComponent } from './components/paypal/paypal.component';

const routes: Routes = [
  {
    path: '',
    component: PaymentComponent,
  },
  {
    path: 'payments/paypal-checkout-process',
    component: PaypalCheckoutProcessComponent,
  },{
    path: 'payments/success', component: PaymentConfirmationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentRoutingModule {}
