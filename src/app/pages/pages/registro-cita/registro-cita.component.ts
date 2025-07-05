import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar'; // <-- Importa MatSnackBar
import { RegistroCitaService } from '../../../services/registroCita.service';

@Component({
  selector: 'app-registro-cita',
  templateUrl: './registro-cita.component.html',
  styleUrls: ['./registro-cita.component.scss']
})
export class RegistroCitaComponent {
  citaForm: FormGroup;
  servicios = [
    'Evaluación, orientación y diagnóstico',
    'Psicoterapia individual para adultos',
    'Psicoterapia individual infanto-juvenil',
    'Terapia de pareja',
    'Rehabilitación cognitiva',
    'Mediación familiar, de pareja e integración social',
    'Mental Training',
    'Talleres para adolescentes',
    'Talleres para adultos',
    'Escuela de padres y familias',
    'Psicoterapia grupal'
  ];
  horasDisponibles = [
    '09:00', '10:00', '11:00', '12:00', '13:00',
    '16:00', '17:00', '18:00', '19:00'
  ];

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, private registroCitaService: RegistroCitaService) {
    this.citaForm = this.fb.group({
      nombre: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      servicio: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required]
    });
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
    // Marca todos los campos como tocados para mostrar errores en la UI
    this.citaForm.markAllAsTouched();

    // Encuentra los campos inválidos y muestra un mensaje
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