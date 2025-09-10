import { Component, OnInit } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HtmlChunkService } from '../../../services/html-chunk.service';

@Component({
  selector: 'app-contact-toolbar',
  templateUrl: './contact-toolbar.component.html',
  styleUrls: ['./contact-toolbar.component.scss']
})
export class ContactToolbarComponent implements OnInit {

  phone?: string;
  email?: string;
  address?: string;

  constructor(private htmlChunkService: HtmlChunkService) {}

  ngOnInit(): void {
    forkJoin({
      phone: this.htmlChunkService.getHtmlChunkByName('contact-phone').pipe(catchError(() => of(null))),
      email: this.htmlChunkService.getHtmlChunkByName('contact-email').pipe(catchError(() => of(null))),
      address: this.htmlChunkService.getHtmlChunkByName('contact-address').pipe(catchError(() => of(null)))
    }).subscribe(({ phone, email, address }) => {
      this.phone = phone?.htmlContent;
      this.email = email?.htmlContent;
      this.address = address?.htmlContent;
    });
  }

  encodeUri(value: string | undefined): string {
    return value ? encodeURIComponent(value) : '';
  }
}
