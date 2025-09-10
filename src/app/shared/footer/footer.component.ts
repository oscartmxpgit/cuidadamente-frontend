import { Component, OnInit } from '@angular/core';
import { HtmlChunkService } from '../../tarjetas/html-chunk.service';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HtmlChunk } from '../../models/HtmlChunk';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  phone?: string;
  email?: string;
  address?: string;
  footerAbout?: string;
  footerBottom?: string;

  constructor(private htmlChunkService: HtmlChunkService) {}

  ngOnInit(): void {
    forkJoin({
      phone: this.htmlChunkService.getHtmlChunkByName('contact-phone').pipe(catchError(() => of(null))),
      email: this.htmlChunkService.getHtmlChunkByName('contact-email').pipe(catchError(() => of(null))),
      address: this.htmlChunkService.getHtmlChunkByName('contact-address').pipe(catchError(() => of(null))),
      footerAbout: this.htmlChunkService.getHtmlChunkByName('footer-about').pipe(catchError(() => of(null))),
      footerBottom: this.htmlChunkService.getHtmlChunkByName('footer-bottom').pipe(catchError(() => of(null)))
    }).subscribe(({ phone, email, address, footerAbout, footerBottom }) => {
      this.phone = phone?.htmlContent;
      this.email = email?.htmlContent;
      this.address = address?.htmlContent;
      this.footerAbout = footerAbout?.htmlContent;
      this.footerBottom = footerBottom?.htmlContent;
    });
  }
}
