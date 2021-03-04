import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimItemComponent } from './sim-item.component';

describe('SimItemComponent', () => {
  let component: SimItemComponent;
  let fixture: ComponentFixture<SimItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
