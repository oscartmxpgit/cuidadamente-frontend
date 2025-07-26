import { Component, OnInit } from '@angular/core';
import { TarjetasService } from '../../tarjetas/tarjetas.service';
import { Tarjeta } from '../../models/tarjeta';

@Component({
  selector: 'app-home-valores',
  templateUrl: './home-valores.component.html',
  styleUrls: ['./home-valores.component.scss']
})
export class HomeValoresComponent implements OnInit {
  tarjetas: Tarjeta[] = [];
  loading = false;

  constructor(private tarjetasService: TarjetasService) {}

  ngOnInit(): void {
    this.cargarValores();
  }

  cargarValores() {
    this.loading = true;
    this.tarjetasService.obtenerPorTipo('Valores').subscribe({
      next: data => {
        this.tarjetas = data;
        this.loading = false;
      },
      error: () => {
        this.tarjetas = [];
        this.loading = false;
      }
    });
  }
}
