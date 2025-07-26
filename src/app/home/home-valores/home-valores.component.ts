import { Component, OnInit } from '@angular/core';
import { TarjetasService } from '../../tarjetas/tarjetas.service';
import { Tarjeta } from '../../models/tarjeta';
import { FileService } from '../../tarjetas/fileService';

@Component({
  selector: 'app-home-valores',
  templateUrl: './home-valores.component.html',
  styleUrls: ['./home-valores.component.scss']
})
export class HomeValoresComponent implements OnInit {
  tarjetas: Tarjeta[] = [];
  loading = false;

  constructor(
    private tarjetasService: TarjetasService,
    private fileService: FileService
  ) {}

  ngOnInit(): void {
    this.cargarValores();
  }

  cargarValores() {
    this.loading = true;
    this.tarjetasService.obtenerPorTipo('Valores').subscribe({
      next: data => {
        this.tarjetas = data;

        for (const tarjeta of this.tarjetas) {
          if (tarjeta.imageFileName) {
            this.fileService.loadImage(tarjeta.imageFileName).subscribe({
              next: blobUrl => {
                tarjeta.imageUrl = blobUrl; // string
              },
              error: err => {
                console.error(`Error cargando imagen ${tarjeta.imageFileName}`, err);
              }
            });
          }
        }

        this.loading = false;
      },
      error: () => {
        this.tarjetas = [];
        this.loading = false;
      }
    });
  }
}
