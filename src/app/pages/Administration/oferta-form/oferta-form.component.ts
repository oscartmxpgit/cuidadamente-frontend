import { Component, Inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OfertaApiService } from '../../../services/oferta-api.service';
import { Observable, forkJoin } from 'rxjs';
import { Oferta } from '../../../models/Oferta';
import { HorarioOferta } from '../../../models/HorarioOferta';

@Component({
  selector: 'app-oferta-form',
  templateUrl: './oferta-form.component.html',
  styleUrls: ['./oferta-form.component.scss']
})
export class OfertaFormComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  esEdicion = false;

  dias = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  constructor(
    private fb: FormBuilder,
    private ofertaService: OfertaApiService,
    private dialogRef: MatDialogRef<OfertaFormComponent>,
    private cdr: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: Partial<Oferta>
  ) {}

  ngOnInit() {
    this.esEdicion = !!this.data?.id;

    // Inicializar formulario base
    this.form = this.fb.group({
      nombre: [this.data?.nombre || '', Validators.required],
      descripcion: [this.data?.descripcion || ''],
      activa: [!!this.data?.activa],
      horarios: this.fb.array([])
    });

    // Poblar horarios de forma segura
    const horariosArray = this.form.get('horarios') as FormArray;
    (this.data?.horarios || [])
      .slice() // clonar array
      .sort((a, b) => this.ordenarHorarios(a, b))
      .forEach(h => horariosArray.push(this.crearHorarioFormGroup(h)));

    // Detectar cambios para evitar ExpressionChangedAfterItHasBeenCheckedError
    this.cdr.detectChanges();
  }

  get horarios(): FormArray {
    return this.form.get('horarios') as FormArray;
  }

  private formatoHoraParaInput(hora?: string): string {
    return hora ? hora.slice(0, 5) : '';
  }

  private formatoHoraParaGuardar(hora?: string): string {
    return hora && hora.length === 5 ? hora + ':00' : (hora || '00:00:00');
  }

  crearHorarioFormGroup(h?: HorarioOferta) {
    return this.fb.group({
      id: [h?.id || null],
      diaSemana: [h?.diaSemana ?? '', Validators.required],
      horaInicio: [this.formatoHoraParaInput(h?.horaInicio), Validators.required],
      horaFin: [this.formatoHoraParaInput(h?.horaFin), Validators.required]
    });
  }

  ordenarHorarios(a: HorarioOferta, b: HorarioOferta): number {
    if (a.diaSemana !== b.diaSemana) return a.diaSemana - b.diaSemana;
    return a.horaInicio.localeCompare(b.horaInicio);
  }

  agregarHorario() {
    this.horarios.push(this.crearHorarioFormGroup());
  }

  eliminarHorario(index: number) {
    const horarioId = this.horarios.at(index).value.id;
    if (horarioId && this.data.id) {
      this.ofertaService.eliminarHorario(this.data.id, horarioId).subscribe({
        next: () => this.horarios.removeAt(index),
        error: err => console.error('Error al eliminar horario:', err)
      });
    } else {
      this.horarios.removeAt(index);
    }
  }

  private normalizarHorasParaGuardar(horarios: any[]) {
    return horarios.map(h => ({
      ...h,
      horaInicio: this.formatoHoraParaGuardar(h.horaInicio),
      horaFin: this.formatoHoraParaGuardar(h.horaFin)
    }));
  }

  guardar() {
    console.log('Guardando oferta:', this.form.value);
    if (this.form.invalid) return;
    this.loading = true;

    const ofertaData: Partial<Oferta> = {
      nombre: this.form.value.nombre,
      descripcion: this.form.value.descripcion,
      activa: this.form.value.activa
    };

    if (this.esEdicion && this.data.id) {
      this.ofertaService.actualizar(this.data.id, ofertaData as Oferta).subscribe({
        next: () => this.sincronizarHorarios(this.data!.id!, this.data!.horarios || []),
        error: err => {
          this.loading = false;
          console.error('Error al actualizar oferta:', err);
        }
      });
    } else {
      this.ofertaService.crear(ofertaData as Oferta).subscribe({
        next: (nuevoId: number) => this.sincronizarHorarios(nuevoId, []),
        error: err => {
          this.loading = false;
          console.error('Error al crear oferta:', err);
        }
      });
    }
  }

  private sincronizarHorarios(ofertaId: number, horariosOriginales: HorarioOferta[]) {
    
    const requests: Observable<any>[] = [];
    const horariosForm: HorarioOferta[] = this.normalizarHorasParaGuardar(this.form.value.horarios)
      .map(h => ({ ...h, ofertaId }))
      .sort((a, b) => this.ordenarHorarios(a, b));

    horariosForm.forEach(h => {
      if (h.id) requests.push(this.ofertaService.actualizarHorario(ofertaId, h.id, h));
      else requests.push(this.ofertaService.agregarHorario(ofertaId, h));
    });

    const idsForm = horariosForm.filter(h => h.id).map(h => h.id);
    const horariosEliminados = horariosOriginales.filter(h => h.id && !idsForm.includes(h.id));
    horariosEliminados.forEach(h => requests.push(this.ofertaService.eliminarHorario(ofertaId, h.id!)));

    if (requests.length) {
      forkJoin(requests).subscribe({
        next: () => {
          this.loading = false;
          this.dialogRef.close(this.esEdicion ? 'actualizado' : 'creado');
        },
        error: err => {
          this.loading = false;
          console.error('Error al sincronizar horarios:', err);
        }
      });
    } else {
      this.loading = false;
      this.dialogRef.close(this.esEdicion ? 'actualizado' : 'creado');
    }
  }

  cancelar() {
    this.dialogRef.close();
  }
}
