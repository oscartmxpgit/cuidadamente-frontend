import { Component, OnInit } from '@angular/core';
import { FileService } from '../../services/fileService';
import { TarjetasService } from '../../services/tarjetas.service';
import { HtmlChunkService } from '../../services/html-chunk.service';
import { LanguageService } from '../../services/language.service'; // Your global language service
import { Tarjeta } from '../../models/tarjeta';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  showFull: { [key: string]: boolean } = {};
  services: Tarjeta[] = [];

  sectionTitle: string = '';
  sectionSubtitle: string = '';
  currentLanguage: string = 'es';

  constructor(
    private fileService: FileService,
    private tarjetasService: TarjetasService,
    private htmlChunkService: HtmlChunkService,
    private languageService: LanguageService
  ) {}

  ngOnInit() {
    // Obtener lenguaje actual
    this.currentLanguage = this.languageService.getCurrentLanguage();

    // Suscribirse a cambios de idioma
    this.languageService.onLanguageChange().subscribe(lang => {
      this.currentLanguage = lang;
      this.loadHtmlChunks(lang);
      this.loadServices(lang);
    });

    // Cargar inicialmente
    this.loadHtmlChunks(this.currentLanguage);
    this.loadServices(this.currentLanguage);
  }

  loadHtmlChunks(lang: string) {
    forkJoin({
      title: this.htmlChunkService.getHtmlChunkByName(`services-title-${lang}`).pipe(catchError(() => of(null))),
      subtitle: this.htmlChunkService.getHtmlChunkByName(`services-subtitle-${lang}`).pipe(catchError(() => of(null)))
    }).subscribe(({ title, subtitle }) => {
      this.sectionTitle = title?.htmlContent || 'Nuestros Servicios';
      this.sectionSubtitle = subtitle?.htmlContent || 'Apoyamos tu bienestar emocional con atención profesional y personalizada';
    });
  }

  loadServices(lang: string) {
    this.tarjetasService.obtenerPorTipoYLanguage('Servicio', this.currentLanguage).subscribe(servicesFromApi => {
      this.services = servicesFromApi;

      // Cargar imágenes de los servicios
      this.services.forEach(service => {
        if (service.imageFileName) {
          this.fileService.loadImage(service.imageFileName).subscribe(url => {
            (service as any).imageUrl = url;
          });
        }

        // Si hay traducciones en DB, también puedes reemplazar title/description
        // por los chunks correspondientes según `currentLanguage`
        // Esto requiere que tus tarjetas tengan soporte multilenguaje
      });
    });
  }

  toggleDescription(title: string) {
    this.showFull[title] = !this.showFull[title];
  }
}
