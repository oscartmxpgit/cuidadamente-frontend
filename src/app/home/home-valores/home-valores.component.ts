import { Component } from '@angular/core';

@Component({
  selector: 'app-home-valores',
  templateUrl: './home-valores.component.html',
  styleUrl: './home-valores.component.scss'
})
export class HomeValoresComponent {
  valores = [
    {
      titulo: 'Empatía',
      descripcion: 'Nos esforzamos por comprender y acompañar a cada persona con respeto y sensibilidad.',
      icono: 'assets/valores/empatia.svg'
    },
    {
      titulo: 'Profesionalismo',
      descripcion: 'Nuestro equipo se compromete con la excelencia y actualización constante en su área.',
      icono: 'assets/valores/profesionalismo.svg'
    },
    {
      titulo: 'Compromiso',
      descripcion: 'Acompañamos el proceso de cada paciente con dedicación y responsabilidad.',
      icono: 'assets/valores/compromiso.svg'
    }
  ];
}
