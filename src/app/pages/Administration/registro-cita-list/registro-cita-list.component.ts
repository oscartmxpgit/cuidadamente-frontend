import { Component, OnInit } from '@angular/core';
import { RegistroCita, RegistroCitaService } from '../../../services/registroCita.service';

@Component({
  selector: 'app-registro-cita-list',
  templateUrl: './registro-cita-list.component.html',
  styleUrls: ['./registro-cita-list.component.scss']
})
export class RegistroCitaListComponent implements OnInit {
  citas: RegistroCita[] = [];
  loading = true;

 displayedColumns: string[] = [
  'nombre', 'telefono', 'email', 'servicio', 'fecha', 'hora', 'fechaSolicitud', 'cancelada', 'fechaCancelacion'
];

  constructor(private registroCitaService: RegistroCitaService) {}

  ngOnInit() {
    this.registroCitaService.getAll().subscribe({
      next: (data) => {
        this.citas = data;
        this.loading = false;
      },
      error: () => {
        this.citas = [];
        this.loading = false;
      }
    });
  }
}