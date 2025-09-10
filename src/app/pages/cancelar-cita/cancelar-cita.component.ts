import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegistroCitaService } from '../../services/registroCita.service';

@Component({
  selector: 'app-cancelar-cita',
  templateUrl: './cancelar-cita.component.html',
})
export class CancelarCitaComponent implements OnInit {
  mensaje: string = '';
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private citaService: RegistroCitaService
  ) {}

  ngOnInit(): void {
    const codigo = this.route.snapshot.queryParamMap.get('codigo');

    if (!codigo) {
      this.mensaje = 'Código de cancelación no encontrado en la URL.';
      this.loading = false;
      return;
    }

    this.citaService.cancelarCita(codigo).subscribe({
      next: () => {
        this.mensaje = 'Tu cita ha sido cancelada correctamente.';
        this.loading = false;
      },
      error: (err) => {
        this.mensaje =
          err.error?.message || 'No se pudo cancelar la cita. Intenta más tarde.';
        this.loading = false;
      },
    });
  }
}
