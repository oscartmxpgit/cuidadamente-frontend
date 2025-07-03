import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactToolbarComponent } from './contact-toolbar.component';

describe('ContactToolbarComponent', () => {
  let component: ContactToolbarComponent;
  let fixture: ComponentFixture<ContactToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactToolbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
