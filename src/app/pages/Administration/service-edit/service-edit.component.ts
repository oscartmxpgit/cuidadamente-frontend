import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Service } from '../../../models/service';
import { ServicesService } from '../../../services/services.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-service-edit',
  templateUrl: './service-edit.component.html',
  styleUrls: ['./service-edit.component.scss']
})
export class ServiceEditComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  esEdicion = false;

  constructor(
    private fb: FormBuilder,
    private servicesService: ServicesService,
    private dialogRef: MatDialogRef<ServiceEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Partial<Service> // puede ser vacío al crear
  ) {}

  ngOnInit() {
    this.esEdicion = !!this.data?.id;

    this.form = this.fb.group({
      title: [this.data?.title || '', Validators.required],
      imageFileName: [this.data?.imageFileName || ''],
      description: [this.data?.description || '']
    });
  }

  guardar() {
    if (this.form.invalid) return;

    const servicio: Service = {
      ...this.data,
      ...this.form.value
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
