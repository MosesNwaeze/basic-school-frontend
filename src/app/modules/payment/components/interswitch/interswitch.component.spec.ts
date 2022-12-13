import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterswitchComponent } from './interswitch.component';

describe('InterswitchComponent', () => {
  let component: InterswitchComponent;
  let fixture: ComponentFixture<InterswitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterswitchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterswitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
