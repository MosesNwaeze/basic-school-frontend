import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckResultFormComponent } from './check-result-form.component';

describe('CheckResultFormComponent', () => {
  let component: CheckResultFormComponent;
  let fixture: ComponentFixture<CheckResultFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckResultFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckResultFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
