import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RegistroCitaService } from '../../tarjetas/registroCita.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registro-cita',
  templateUrl: './registro-cita.component.html',
  styleUrls: ['./registro-cita.component.scss']
})
export class RegistroCitaComponent {
  citaForm: FormGroup;
  servicios: string[] = [];
  horasDisponibles: string[] = [];

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private registroCitaService: RegistroCitaService,
    private http: HttpClient
  ) {
    this.citaForm = this.fb.group({
      nombre: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      servicio: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required]
    });

    this.loadData();
  }

  private loadData() {
    this.http.get<string[]>('assets/data/servicios.json').subscribe(data => this.servicios = data);
    this.http.get<string[]>('assets/data/horas.json').subscribe(data => this.horasDisponibles = data);
  }

  onSubmit() {
    console.log('Formulario enviado:', this.citaForm.value);
    if (this.citaForm.valid) {
      const cita = this.citaForm.value;
      this.registroCitaService.add(cita).subscribe({
        next: () => {
          this.snackBar.open('¡Cita registrada correctamente!', 'Cerrar', {
            duration: 3000,
            verticalPosition: 'bottom',
          });
          this.citaForm.reset();
        },
        error: () => {
          this.snackBar.open('Error al registrar la cita. Inténtalo de nuevo.', 'Cerrar', {
            duration: 3000,
            verticalPosition: 'bottom',
          });
        }
      });
    } else {
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
    }
  }
}
