import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollToSchoolComponent } from './enroll-to-school.component';

describe('EnrollToSchoolComponent', () => {
  let component: EnrollToSchoolComponent;
  let fixture: ComponentFixture<EnrollToSchoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnrollToSchoolComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnrollToSchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
