import { trigger, transition, style, animate } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home-servicios',
  templateUrl: './home-servicios.component.html',
  styleUrl: './home-servicios.component.scss',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class HomeServiciosComponent {
  servicios = [
    { titulo: 'Terapia Individual', descripcion: 'Sesiones personalizadas con profesionales de la salud mental.' },
    { titulo: 'Asesoramiento Familiar', descripcion: 'Apoyo y orientación para fortalecer relaciones familiares.' },
    { titulo: 'Manejo del Estrés', descripcion: 'Técnicas y herramientas para reducir el estrés y la ansiedad.' }
  ];
}
