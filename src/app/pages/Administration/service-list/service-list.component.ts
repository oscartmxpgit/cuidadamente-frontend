import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Service } from '../../../models/service';
import { ServicesService } from '../../../services/services.service';
import { ServiceEditComponent } from '../service-edit/service-edit.component';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.scss']
})
export class ServiceListComponent implements OnInit {
  services: Service[] = [];
  loading = true;

  displayedColumns: string[] = ['title', 'imageFileName', 'description', 'acciones'];

  constructor(
    private servicesService: ServicesService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.cargarServicios();
  }

  cargarServicios() {
    this.loading = true;
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

  eliminarServicio(id?: number) {
    if (!id) return;
    if (!confirm('¿Seguro que quieres eliminar este servicio?')) return;

    this.servicesService.eliminar(id).subscribe({
      next: () => this.cargarServicios(),
      error: (err) => alert('Error al eliminar: ' + err.message)
    });
  }

  abrirDialogoEdicion(servicio: Service) {
    const dialogRef = this.dialog.open(ServiceEditComponent, {
      width: '600px',
      data: servicio
    });

    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado === 'actualizado' || resultado === 'creado') {
        this.cargarServicios();
      }
    });
  }

  abrirDialogoCrear() {
    const dialogRef = this.dialog.open(ServiceEditComponent, {
      width: '600px',
      data: {}  // Pasamos objeto vacío para crear
    });

    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado === 'actualizado' || resultado === 'creado') {
        this.cargarServicios();
      }
    });
  }
}
