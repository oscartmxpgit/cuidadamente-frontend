import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeContactoComponent } from './home-contacto.component';

describe('HomeContactoComponent', () => {
  let component: HomeContactoComponent;
  let fixture: ComponentFixture<HomeContactoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeContactoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeContactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
