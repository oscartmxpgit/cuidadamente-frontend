import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OfertaApiService } from '../../../tarjetas/oferta-api.service';
import { Observable } from 'rxjs';
import { Oferta } from '../../../models/Oferta';

@Component({
  selector: 'app-oferta-form',
  templateUrl: './oferta-form.component.html',
  styleUrls: ['./oferta-form.component.scss']
})
export class OfertaFormComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  esEdicion = false;

  dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

  constructor(
    private fb: FormBuilder,
    private ofertaService: OfertaApiService,
    private dialogRef: MatDialogRef<OfertaFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Partial<Oferta>
  ) {}

  ngOnInit() {
    this.esEdicion = !!this.data?.id;

    this.form = this.fb.group({
      nombre: [this.data?.nombre || '', Validators.required],
      descripcion: [this.data?.descripcion || ''],
      activa: [this.data?.activa || false],
      horarios: this.fb.array(
        (this.data?.horarios || []).map(h => this.fb.group({
          diaSemana: [h.diaSemana, Validators.required],
          horaInicio: [h.horaInicio, Validators.required],
          horaFin: [h.horaFin, Validators.required]
        }))
      )
    });
  }

  get horarios(): FormArray {
    return this.form.get('horarios') as FormArray;
  }

  agregarHorario() {
    this.horarios.push(this.fb.group({
      diaSemana: ['', Validators.required],
      horaInicio: ['', Validators.required],
      horaFin: ['', Validators.required]
    }));
  }

  eliminarHorario(index: number) {
    this.horarios.removeAt(index);
  }

  guardar() {
    if (this.form.invalid) return;

    const oferta: Oferta = {
      ...this.data,
      ...this.form.value
    };

    this.loading = true;

    let operacion$: Observable<any> = this.esEdicion
      ? this.ofertaService.actualizar(this.data.id!, oferta)
      : this.ofertaService.crear(oferta);

    operacion$.subscribe({
      next: () => {
        this.loading = false;
        this.dialogRef.close(this.esEdicion ? 'actualizado' : 'creado');
      },
      error: err => {
        this.loading = false;
        console.error('Error al guardar oferta:', err);
      }
    });
  }

  cancelar() {
    this.dialogRef.close();
  }
}
