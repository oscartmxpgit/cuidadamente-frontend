import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaEditComponent } from './tarjeta-edit.component';

describe('TarjetaEditComponent', () => {
  let component: TarjetaEditComponent;
  let fixture: ComponentFixture<TarjetaEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TarjetaEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TarjetaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
