import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Directive({
  selector: '[appInsertHtml]'
})
export class InsertHtmlDirective implements OnChanges {
  @Input('appInsertHtml') htmlContent = '';

  constructor(
    private el: ElementRef,
    private sanitizer: DomSanitizer,
    private renderer: Renderer2
  ) {}

  ngOnChanges() {
    const safeHtml: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(this.htmlContent);
    this.renderer.setProperty(this.el.nativeElement, 'innerHTML', safeHtml);
  }
}
