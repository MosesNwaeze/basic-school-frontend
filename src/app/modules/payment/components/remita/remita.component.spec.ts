import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemitaComponent } from './remita.component';

describe('RemitaComponent', () => {
  let component: RemitaComponent;
  let fixture: ComponentFixture<RemitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemitaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
