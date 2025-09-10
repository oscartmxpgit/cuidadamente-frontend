import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TarjetasService } from '../../../services/tarjetas.service';
import { Observable } from 'rxjs';
import { Tarjeta } from '../../../models/tarjeta';

@Component({
  selector: 'app-tarjeta-edit',
  templateUrl: './tarjeta-edit.component.html',
  styleUrls: ['./tarjeta-edit.component.scss']
})
export class TarjetaEditComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  esEdicion = false;

  tipos: string[] = ['Servicio', 'Valores', 'Otro']; // Opciones para el combo

  constructor(
    private fb: FormBuilder,
    private servicesService: TarjetasService,
    private dialogRef: MatDialogRef<TarjetaEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Partial<Tarjeta> // puede ser vacío al crear
  ) { }

  ngOnInit() {
    this.esEdicion = !!this.data?.id;

    this.form = this.fb.group({
      title: [this.data?.title || '', Validators.required],
      subtitle: [this.data?.subtitle || ''],          // nuevo control
      language: [this.data?.language || 'es'],       // nuevo control con valor por defecto 'es'
      tipo: [this.data?.tipo || '', Validators.required],
      imageFileName: [this.data?.imageFileName || ''],
      description: [this.data?.description || '']
    });
  }

  quillModules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'header': [1, 2, 3, false] }],
      ['link'],
      ['clean']
    ]
  };


  guardar() {
  if (this.form.invalid) return;

  // Clean description: replace &nbsp; with normal spaces
  const cleanDescription = this.form.value.description
    ? this.form.value.description.replace(/&nbsp;/g, ' ')
    : '';

  const servicio: Tarjeta = {
    ...this.data,
    ...this.form.value,
    description: cleanDescription   // use cleaned text
  };

  this.loading = true;

  let operacion$: Observable<any> = this.esEdicion
    ? this.servicesService.actualizar(servicio)
    : this.servicesService.agregar(servicio);

  operacion$.subscribe({
    next: () => {
      this.loading = false;
      this.dialogRef.close(this.esEdicion ? 'actualizado' : 'creado');
    },
    error: err => {
      this.loading = false;
      console.error('Error al guardar servicio:', err);
    }
  });
}


  cancelar() {
    this.dialogRef.close();
  }
}
