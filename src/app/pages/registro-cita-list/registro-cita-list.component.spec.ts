import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroCitaListComponent } from './registro-cita-list.component';

describe('RegistroCitaListComponent', () => {
  let component: RegistroCitaListComponent;
  let fixture: ComponentFixture<RegistroCitaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistroCitaListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroCitaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
