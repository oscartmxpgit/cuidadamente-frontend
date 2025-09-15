import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCalendar } from '@angular/material/datepicker';
import { RegistroCitaService } from '../../services/registroCita.service';
import { OfertaApiService } from '../../services/oferta-api.service';
import { Oferta } from '../../models/Oferta';

@Component({
  selector: 'app-registro-cita',
  templateUrl: './registro-cita.component.html',
  styleUrls: ['./registro-cita.component.scss']
})
export class RegistroCitaComponent implements OnInit {
  citaForm: FormGroup;
  servicios: Oferta[] = [];
  horasDisponibles: string[] = [];
  diasDisponibles: number[] = [];
  diasYHoras: Record<number, string[]> = {};
  minDate = new Date();

  // referencia al calendario
  @ViewChild(MatCalendar) calendar!: MatCalendar<Date>;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private registroCitaService: RegistroCitaService,
    private ofertaApi: OfertaApiService
  ) {
    this.citaForm = this.fb.group({
      nombre: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      servicio: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadServicios();

    this.citaForm.get('servicio')?.valueChanges.subscribe((servicioId: number) => {
      if (servicioId) {
        this.loadDiasYHorasDisponibles(servicioId);
      } else {
        this.resetDisponibilidad();
      }
      this.citaForm.get('fecha')?.setValue('');
      this.citaForm.get('hora')?.setValue('');
    });
  }

  onDateSelected(fecha: Date | null) {
    if (!fecha) {
      this.horasDisponibles = [];
      this.citaForm.get('fecha')?.setValue('');
      return;
    }

    if (!this.diasDisponibles.includes(fecha.getDay())) {
      this.citaForm.get('fecha')?.setValue('');
      this.horasDisponibles = [];
      return;
    }

    this.citaForm.get('fecha')?.setValue(fecha);
    const dia = fecha.getDay();
    const rangos = this.diasYHoras[dia] || [];
    this.horasDisponibles = rangos.flatMap(this.generarHorasPorBloque);
    this.citaForm.get('hora')?.setValue('');
  }

  selectHora(hora: string) {
    this.citaForm.get('hora')?.setValue(hora);
  }

  generarHorasPorBloque(rango: string): string[] {
    const [inicioStr, finStr] = rango.split('-');
    const [hInicio, mInicio] = inicioStr.split(':').map(Number);
    const [hFin, mFin] = finStr.split(':').map(Number);

    const inicio = new Date();
    inicio.setHours(hInicio, mInicio, 0, 0);

    const fin = new Date();
    fin.setHours(hFin, mFin, 0, 0);

    const bloques: string[] = [];
    const copia = new Date(inicio);

    while (copia.getTime() + 60 * 60 * 1000 <= fin.getTime()) {
      const horaInicio = copia.getHours().toString().padStart(2, '0');
      const minInicio = copia.getMinutes().toString().padStart(2, '0');
      copia.setHours(copia.getHours(), copia.getMinutes() + 60);
      const horaFin = copia.getHours().toString().padStart(2, '0');
      const minFin = copia.getMinutes().toString().padStart(2, '0');
      bloques.push(`${horaInicio}:${minInicio}-${horaFin}:${minFin}`);
    }

    return bloques;
  }

  private loadServicios() {
    this.ofertaApi.listar().subscribe({
      next: (ofertas) => (this.servicios = ofertas),
      error: (err) => console.error('Error cargando servicios:', err)
    });
  }

  private loadDiasYHorasDisponibles(servicioId: number) {
    this.ofertaApi.obtenerDiasYHoras(servicioId).subscribe({
      next: (result) => {
        this.diasDisponibles = [];
        this.diasYHoras = {};
        this.horasDisponibles = [];

        for (const [diaStr, horas] of Object.entries(result)) {
          const diaNum = this.mapDiaStringANumero(diaStr);
          if (diaNum != null) {
            this.diasDisponibles.push(diaNum);
            this.diasYHoras[diaNum] = horas;
          }
        }

        // regenerar el filtro (nueva referencia)
        this.dateFilter = (d: Date | null): boolean => {
          if (!d) return false;
          return this.diasDisponibles.includes(d.getDay());
        };

        // forzar refresco visual del calendario
        setTimeout(() => {
          if (this.calendar) {
            this.calendar.updateTodaysDate();
          }
        });

        // reset selección si la fecha no es válida
        const fechaSeleccionada: Date | null = this.citaForm.get('fecha')?.value;
        if (fechaSeleccionada && !this.diasDisponibles.includes(fechaSeleccionada.getDay())) {
          this.citaForm.get('fecha')?.setValue('');
          this.horasDisponibles = [];
        }
        this.citaForm.get('hora')?.setValue('');
      },
      error: (err) => console.error('Error cargando días y horas:', err)
    });
  }

  private resetDisponibilidad() {
    this.diasDisponibles = [];
    this.horasDisponibles = [];
    this.diasYHoras = {};

    this.dateFilter = () => false;
    if (this.calendar) {
      this.calendar.updateTodaysDate();
    }
  }

  private mapDiaStringANumero(dia: string): number | null {
    switch (dia.toLowerCase()) {
      case 'sunday': return 0;
      case 'monday': return 1;
      case 'tuesday': return 2;
      case 'wednesday': return 3;
      case 'thursday': return 4;
      case 'friday': return 5;
      case 'saturday': return 6;
      default: return null;
    }
  }

  // importante: asignamos función que se puede reescribir
  dateFilter: (d: Date | null) => boolean = () => false;

  onSubmit() {
    if (this.citaForm.invalid) {
      this.citaForm.markAllAsTouched();
      const invalidFields = Object.keys(this.citaForm.controls)
        .filter((key) => this.citaForm.get(key)?.invalid)
        .map((key) => {
          switch (key) {
            case 'nombre': return 'Nombre';
            case 'telefono': return 'Teléfono';
            case 'email': return 'Email';
            case 'servicio': return 'Servicio';
            case 'fecha': return 'Día';
            case 'hora': return 'Hora';
            default: return key;
          }
        });

      this.snackBar.open(
        `Por favor completa correctamente: ${invalidFields.join(', ')}`,
        'Cerrar',
        { duration: 4000, verticalPosition: 'bottom' }
      );
      return;
    }

    const cita = this.citaForm.value;
    this.registroCitaService.add(cita).subscribe({
      next: () => {
        this.snackBar.open('¡Cita registrada correctamente!', 'Cerrar', {
          duration: 3000,
          verticalPosition: 'bottom'
        });
        this.citaForm.reset();
        this.resetDisponibilidad();
      },
      error: () => {
        this.snackBar.open(
          'Error al registrar la cita. Inténtalo de nuevo.',
          'Cerrar',
          { duration: 3000, verticalPosition: 'bottom' }
        );
      }
    });
  }
}
