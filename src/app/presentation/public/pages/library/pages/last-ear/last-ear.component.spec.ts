import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastEarComponent } from './last-ear.component';

describe('LastEarComponent', () => {
  let component: LastEarComponent;
  let fixture: ComponentFixture<LastEarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LastEarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LastEarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
