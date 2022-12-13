import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUniformComponent } from './new-uniform.component';

describe('NewUniformComponent', () => {
  let component: NewUniformComponent;
  let fixture: ComponentFixture<NewUniformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewUniformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewUniformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
