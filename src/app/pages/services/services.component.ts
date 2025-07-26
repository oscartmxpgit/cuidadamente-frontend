import { Component, OnInit } from '@angular/core';
import { FileService } from '../../services/fileService';
import { ServicesService } from '../../services/services.service';
import { Service } from '../../models/service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  showFull: { [key: string]: boolean } = {};
  services: Service[] = [];

  constructor(
    private fileService: FileService,
    private servicesService: ServicesService  // inyectamos servicio backend
  ) {}

  ngOnInit() {
    this.servicesService.obtenerTodos().subscribe(servicesFromApi => {
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
