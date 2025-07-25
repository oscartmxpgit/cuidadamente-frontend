import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HtmlChunksListComponent } from './html-chunks-list.component';

describe('HtmlChunksListComponent', () => {
  let component: HtmlChunksListComponent;
  let fixture: ComponentFixture<HtmlChunksListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HtmlChunksListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HtmlChunksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
