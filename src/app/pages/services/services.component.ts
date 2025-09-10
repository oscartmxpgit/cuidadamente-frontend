import { Component, OnInit } from '@angular/core';
import { FileService } from '../../services/fileService';
import { TarjetasService } from '../../services/tarjetas.service';
import { Tarjeta } from '../../models/tarjeta';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  showFull: { [key: string]: boolean } = {};
  services: Tarjeta[] = [];

  constructor(
    private fileService: FileService,
    private tarjetasService: TarjetasService  // inyectamos servicio backend
  ) {}

  ngOnInit() {
    this.tarjetasService.obtenerPorTipo('Servicio').subscribe(servicesFromApi => {
      this.services = servicesFromApi;

      // Cargar las imágenes
      this.services.forEach(service => {
        if (service.imageFileName) {
          this.fileService.loadImage(service.imageFileName).subscribe(url => {
            // Usamos otra propiedad para no perder el nombre original
            (service as any).imageUrl = url;
          });
        }
      });
    });
  }

  toggleDescription(title: string) {
    this.showFull[title] = !this.showFull[title];
  }
}
