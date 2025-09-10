import { Component, OnInit } from '@angular/core';
import { TarjetasService } from '../../services/tarjetas.service';
import { Tarjeta } from '../../models/tarjeta';
import { FileService } from '../../services/fileService';
import { HtmlChunk } from '../../models/HtmlChunk';
import { HtmlChunkService } from '../../services/html-chunk.service';
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
  valoresTitleChunk?: HtmlChunk | null;
  valoresSubtitleChunk?: HtmlChunk | null;

  constructor(
    private tarjetasService: TarjetasService,
    private fileService: FileService,
    private htmlChunkService: HtmlChunkService
  ) {}

  ngOnInit(): void {
    this.cargarValores();
  }

  cargarValores() {
    this.loading = true;

    forkJoin({
      tarjetas: this.tarjetasService.obtenerPorTipo('Valores').pipe(catchError(() => of([]))),
      titleChunk: this.htmlChunkService.getHtmlChunkByName('valores-title').pipe(catchError(() => of(null))),
      subtitleChunk: this.htmlChunkService.getHtmlChunkByName('valores-subtitle').pipe(catchError(() => of(null)))
    }).subscribe({
      next: ({ tarjetas, titleChunk, subtitleChunk }) => {
        this.tarjetas = tarjetas as Tarjeta[];
        this.valoresTitleChunk = titleChunk as HtmlChunk | null;
        this.valoresSubtitleChunk = subtitleChunk as HtmlChunk | null;

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
        this.valoresTitleChunk = null;
        this.valoresSubtitleChunk = null;
        this.loading = false;
      }
    });
  }
}
