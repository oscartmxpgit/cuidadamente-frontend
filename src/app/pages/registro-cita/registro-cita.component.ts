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

    this.citaForm.get('fecha')?.valueChanges.subscribe((fecha: Date) => {
      if (!fecha) {
        this.horasDisponibles = [];
        return;
      }
      const dia = fecha.getDay(); // 0=Domingo, 1=Lunes...
      const rangos = this.diasYHoras[dia] || [];
      this.horasDisponibles = rangos.flatMap(this.generarHorasPorBloque);
      this.citaForm.get('hora')?.setValue('');
    });
  }

  // Función para generar bloques de 1 hora a partir de un rango "HH:mm-HH:mm"
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
      copia.setHours(copia.getHours(), copia.getMinutes() + 60); // sumamos 1 hora
      const horaFin = copia.getHours().toString().padStart(2, '0');
      const minFin = copia.getMinutes().toString().padStart(2, '0');
      bloques.push(`${horaInicio}:${minInicio}-${horaFin}:${minFin}`);
    }

    return bloques;
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
