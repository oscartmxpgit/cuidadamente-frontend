import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeValoresComponent } from './home-valores.component';

describe('HomeValoresComponent', () => {
  let component: HomeValoresComponent;
  let fixture: ComponentFixture<HomeValoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeValoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeValoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
