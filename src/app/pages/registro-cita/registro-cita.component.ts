import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RegistroCitaService } from '../../tarjetas/registroCita.service';
import { OfertaApiService } from '../../tarjetas/oferta-api.service';
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

    // Cuando cambia el servicio, cargar días y horas disponibles
    this.citaForm.get('servicio')?.valueChanges.subscribe((servicioId: number) => {
      if (servicioId) {
        this.loadDiasYHorasDisponibles(servicioId);
      } else {
        this.diasDisponibles = [];
        this.horasDisponibles = [];
        this.diasYHoras = {};
      }
      this.citaForm.get('fecha')?.setValue('');
      this.citaForm.get('hora')?.setValue('');
    });

    // Cuando cambia la fecha, actualizar horas disponibles
    this.citaForm.get('fecha')?.valueChanges.subscribe((fecha: Date) => {
      if (!fecha) {
        this.horasDisponibles = [];
        return;
      }
      const dia = fecha.getDay(); // 0=Domingo, 1=Lunes...
      this.horasDisponibles = this.diasYHoras[dia] || [];
      this.citaForm.get('hora')?.setValue('');
    });
  }

  private loadServicios() {
    this.ofertaApi.listar().subscribe({
      next: (ofertas) => this.servicios = ofertas,
      error: (err) => console.error('Error cargando servicios:', err)
    });
  }


  private loadDiasYHorasDisponibles(servicioId: number) {
    this.ofertaApi.obtenerDiasYHoras(servicioId).subscribe({
      next: (result) => { // TypeScript ya sabe que es Record<string,string[]>
        console.log('Días y horas disponibles:', result);

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

        this.citaForm.get('hora')?.setValue('');
      },
      error: (err) => console.error('Error cargando días y horas:', err)
    });
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

  // Filtro para datepicker: solo permitir días disponibles
  dateFilter = (d: Date | null): boolean => {
    if (!d) return false;
    return this.diasDisponibles?.includes(d.getDay());
  };

  onSubmit() {
    if (this.citaForm.invalid) {
      this.citaForm.markAllAsTouched();
      const invalidFields = Object.keys(this.citaForm.controls)
        .filter(key => this.citaForm.get(key)?.invalid)
        .map(key => {
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
          verticalPosition: 'bottom',
        });
        this.citaForm.reset();
        this.horasDisponibles = [];
        this.diasDisponibles = [];
        this.diasYHoras = {};
      },
      error: () => {
        this.snackBar.open('Error al registrar la cita. Inténtalo de nuevo.', 'Cerrar', {
          duration: 3000,
          verticalPosition: 'bottom',
        });
      }
    });
  }
}
