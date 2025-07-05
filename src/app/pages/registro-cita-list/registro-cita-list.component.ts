import { Component, OnInit } from '@angular/core';
import { RegistroCita, RegistroCitaService } from '../../services/registroCita.service';

@Component({
  selector: 'app-registro-cita-list',
  templateUrl: './registro-cita-list.component.html',
  styleUrls: ['./registro-cita-list.component.scss']
})
export class RegistroCitaListComponent implements OnInit {
  citas: RegistroCita[] = [];
  loading = true;

  constructor(private registroCitaService: RegistroCitaService) {}

  ngOnInit() {
    this.registroCitaService.getAll().subscribe(data => {
      this.citas = data;
      this.loading = false;
    });
  }
}