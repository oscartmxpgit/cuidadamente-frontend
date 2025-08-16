import { Component, OnInit } from '@angular/core';
import { Oferta } from '../../../models/Oferta';
import { OfertaApiService } from '../../../tarjetas/oferta-api.service';
import { Router } from '@angular/router';
import { OfertaFormComponent } from '../oferta-form/oferta-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-oferta-list',
  templateUrl: './oferta-list.component.html',
  styleUrls: ['./oferta-list.component.scss']
})
export class OfertaListComponent implements OnInit {
  ofertas: Oferta[] = [];
  loading = true;
  displayedColumns: string[] = ['nombre', 'descripcion', 'activa', 'horarios', 'acciones'];

  constructor(private ofertaService: OfertaApiService, private router: Router, private dialog: MatDialog) {}

  ngOnInit() {
    this.cargarOfertas();
  }

  cargarOfertas() {
    this.loading = true;
    this.ofertaService.listar().subscribe({
      next: data => { this.ofertas = data; this.loading = false; },
      error: () => this.loading = false
    });
  }

  crearNueva() {
    const dialogRef = this.dialog.open(OfertaFormComponent, {
      width: '600px',
      data: {} // objeto vacío para crear nueva oferta
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'creado') this.cargarOfertas();
    });
  }


  editar(oferta: Oferta) {
  const dialogRef = this.dialog.open(OfertaFormComponent, {
    width: '600px',
    data: oferta // pasamos la oferta a editar
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result === 'actualizado') this.cargarOfertas();
  });
}


  eliminar(id: number) {
    if (!confirm('¿Está seguro de eliminar esta oferta?')) return;
    this.ofertaService.eliminar(id).subscribe({
      next: () => this.ofertas = this.ofertas.filter(o => o.id !== id),
      error: err => console.error(err)
    });
  }

 mostrarHorarios(oferta: Oferta) {
  const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  return oferta.horarios?.map(h => `${dias[h.diaSemana]}: ${h.horaInicio} - ${h.horaFin}`).join(', ') || '-';
}

}
