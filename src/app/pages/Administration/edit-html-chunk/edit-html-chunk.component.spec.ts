import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHtmlChunkComponent } from './edit-html-chunk.component';

describe('EditHtmlChunkComponent', () => {
  let component: EditHtmlChunkComponent;
  let fixture: ComponentFixture<EditHtmlChunkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditHtmlChunkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditHtmlChunkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
