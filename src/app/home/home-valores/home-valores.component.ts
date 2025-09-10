import { Component, OnInit } from '@angular/core';
import { TarjetasService } from '../../services/tarjetas.service';
import { Tarjeta } from '../../models/tarjeta';
import { FileService } from '../../services/fileService';
import { HtmlChunk } from '../../models/HtmlChunk';
import { HtmlChunkService } from '../../services/html-chunk.service';
import { LanguageService } from '../../services/language.service';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-home-valores',
  templateUrl: './home-valores.component.html',
  styleUrls: ['./home-valores.component.scss']
})
export class HomeValoresComponent implements OnInit {

  tarjetas: Tarjeta[] = [];
  loading = false;

  valoresTitle?: string;
  valoresSubtitle?: string;

  currentLanguage: string = 'es';

  constructor(
    private tarjetasService: TarjetasService,
    private fileService: FileService,
    private htmlChunkService: HtmlChunkService,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.currentLanguage = this.languageService.getCurrentLanguage();
    this.cargarValores(this.currentLanguage);

    // Suscribirse a cambios de idioma
    this.languageService.onLanguageChange().subscribe(lang => {
      this.currentLanguage = lang;
      this.cargarValores(lang);
    });
  }

  private cargarValores(lang: string) {
    this.loading = true;

    forkJoin({
      tarjetas: this.tarjetasService.obtenerPorTipoYLanguage('Valores', this.currentLanguage).pipe(catchError(() => of([]))),
      titleChunk: this.htmlChunkService.getHtmlChunkByName(`valores-title-${lang}`).pipe(catchError(() => of(null))),
      subtitleChunk: this.htmlChunkService.getHtmlChunkByName(`valores-subtitle-${lang}`).pipe(catchError(() => of(null)))
    }).subscribe({
      next: ({ tarjetas, titleChunk, subtitleChunk }) => {
        this.tarjetas = tarjetas as Tarjeta[];
        this.valoresTitle = titleChunk?.htmlContent || '';
        this.valoresSubtitle = subtitleChunk?.htmlContent || '';

        // Cargar imágenes de tarjetas
        for (const tarjeta of this.tarjetas) {
          if ((tarjeta as any).imageFileName) {
            this.fileService.loadImage((tarjeta as any).imageFileName).subscribe({
              next: blobUrl => {
                (tarjeta as any).imageUrl = blobUrl;
              },
              error: err => console.error(`Error cargando imagen ${(tarjeta as any).imageFileName}`, err)
            });
          }
        }

        this.loading = false;
      },
      error: () => {
        this.tarjetas = [];
        this.valoresTitle = '';
        this.valoresSubtitle = '';
        this.loading = false;
      }
    });
  }
}
