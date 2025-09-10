import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Oferta } from '../../../models/Oferta';
import { OfertaApiService } from '../../../services/oferta-api.service';

@Component({
  selector: 'app-oferta-detalle',
  templateUrl: './oferta-detalle.component.html',
  styleUrls: ['./oferta-detalle.component.scss']
})
export class OfertaDetalleComponent implements OnInit {
  oferta?: Oferta;

  dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

  constructor(
    private route: ActivatedRoute,
    private ofertaService: OfertaApiService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.ofertaService.obtener(id).subscribe(o => this.oferta = o);
  }

  nombreDia(numero: number): string {
    return this.dias[numero] || '';
  }
}
