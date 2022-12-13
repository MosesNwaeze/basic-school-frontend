import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaypalCheckoutProcessComponent } from './paypal-checkout-process.component';

describe('PaypalCheckoutProcessComponent', () => {
  let component: PaypalCheckoutProcessComponent;
  let fixture: ComponentFixture<PaypalCheckoutProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaypalCheckoutProcessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaypalCheckoutProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
