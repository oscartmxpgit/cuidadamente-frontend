import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private fb: FormBuilder) {
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
    if (this.citaForm.valid) {
      // Aquí puedes enviar la cita al backend o mostrar un mensaje de éxito
      console.log(this.citaForm.value);
      alert('¡Cita registrada correctamente!');
      this.citaForm.reset();
    }
  }
}