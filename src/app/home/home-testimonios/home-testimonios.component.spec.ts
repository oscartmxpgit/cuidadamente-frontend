import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTestimoniosComponent } from './home-testimonios.component';

describe('HomeTestimoniosComponent', () => {
  let component: HomeTestimoniosComponent;
  let fixture: ComponentFixture<HomeTestimoniosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeTestimoniosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeTestimoniosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
