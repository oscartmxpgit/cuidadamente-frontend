import { Component } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent {
 services = [
    {
      title: 'Psicoterapia Individual',
      description: 'Acompañamiento emocional adaptado a tus necesidades personales.',
      icon: 'fas fa-user-md'
    },
    {
      title: 'Evaluación y Diagnóstico',
      description: 'Detección de trastornos emocionales y conductuales con instrumentos clínicos.',
      icon: 'fas fa-stethoscope'
    },
    {
      title: 'Atención en Crisis',
      description: 'Intervención inmediata ante situaciones de emergencia emocional.',
      icon: 'fas fa-ambulance'
    },
    {
      title: 'Orientación Familiar',
      description: 'Apoyo y guía para mejorar la dinámica y comunicación familiar.',
      icon: 'fas fa-users'
    }
  ];
}
