import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TarjetaEditComponent } from '../tarjeta-edit/tarjeta-edit.component';
import { Tarjeta } from '../../../models/tarjeta';
import { TarjetasService } from '../../../tarjetas/tarjetas.service';

@Component({
  selector: 'app-tarjetas-list',
  templateUrl: './tarjetas-list.component.html',
  styleUrls: ['./tarjetas-list.component.scss']
})
export class TarjetasListComponent implements OnInit {
  services: Tarjeta[] = [];
  loading = true;
  tipoSeleccionado: string = ''; // filtro de tipo, '' = todos

  displayedColumns: string[] = ['title', 'subtitle', 'imageFileName', 'description', 'language', 'acciones'];

  constructor(
    private servicesService: TarjetasService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.cargarTarjetas();
  }

  cargarTarjetas() {
    this.loading = true;
    if (this.tipoSeleccionado) {
      this.servicesService.obtenerPorTipo(this.tipoSeleccionado).subscribe({
        next: (data) => {
          this.services = data;
          this.loading = false;
        },
        error: () => {
          this.services = [];
          this.loading = false;
        }
      });
    } else {
      this.servicesService.obtenerTodos().subscribe({
        next: (data) => {
          this.services = data;
          this.loading = false;
        },
        error: () => {
          this.services = [];
          this.loading = false;
        }
      });
    }
  }

  eliminarTarjeta(id?: number) {
    if (!id) return;
    if (!confirm('¿Seguro que quieres eliminar esta tarjeta?')) return;

    this.servicesService.eliminar(id).subscribe({
      next: () => this.cargarTarjetas(),
      error: (err) => alert('Error al eliminar: ' + err.message)
    });
  }

  abrirDialogoEdicion(tarjeta: Tarjeta) {
    const dialogRef = this.dialog.open(TarjetaEditComponent, {
      width: '600px',
      data: tarjeta
    });

    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado === 'actualizado' || resultado === 'creado') {
        this.cargarTarjetas();
      }
    });
  }

  abrirDialogoCrear() {
    const dialogRef = this.dialog.open(TarjetaEditComponent, {
      width: '600px',
      data: {}  // objeto vacío para crear nueva tarjeta
    });

    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado === 'actualizado' || resultado === 'creado') {
        this.cargarTarjetas();
      }
    });
  }
}
