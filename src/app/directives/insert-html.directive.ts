import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
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

  ngOnChanges(changes: SimpleChanges): void {
    if ('htmlContent' in changes) {
      // Sanitize the HTML content
      const safeHtml: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(this.htmlContent);

      // safeHtml is an object, get raw string value from it
      // This is an internal Angular property to extract the raw HTML string
      const rawHtml = (safeHtml as any).changingThisBreaksApplicationSecurity;

      // Set raw HTML as innerHTML
      this.renderer.setProperty(this.el.nativeElement, 'innerHTML', rawHtml);
    }
  }
}
