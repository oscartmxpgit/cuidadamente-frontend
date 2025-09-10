import { Component, OnInit } from '@angular/core';
import { HtmlChunkService } from '../../services/html-chunk.service';
import { LanguageService } from '../../services/language.service';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  contactoLabel: string = 'Contacto';
  currentLanguage: string = 'es';

  constructor(
    private htmlChunkService: HtmlChunkService,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.currentLanguage = this.languageService.getCurrentLanguage();
    this.loadHtmlChunks(this.currentLanguage);

    this.languageService.onLanguageChange().subscribe(lang => {
      this.currentLanguage = lang;
      this.loadHtmlChunks(lang);
    });
  }

  private loadHtmlChunks(lang: string) {
    this.htmlChunkService.getHtmlChunkByName(`home-contact-label-${lang}`)
      .pipe(catchError(() => of(null)))
      .subscribe(chunk => {
        this.contactoLabel = chunk?.htmlContent || 'Contacto';
      });
  }
}
