import { Component } from '@angular/core';

@Component({
  selector: 'app-home-testimonios',
  templateUrl: './home-testimonios.component.html',
  styleUrl: './home-testimonios.component.scss'
})
export class HomeTestimoniosComponent {
testimonials = [
    {
      name: 'María López',
      role: 'Paciente',
      message: 'Gracias a Cuidadamente he aprendido a gestionar mi ansiedad. El equipo es muy profesional y empático.',
      image: 'assets/testimonials/maria.jpg'
    },
    {
      name: 'Carlos Pérez',
      role: 'Paciente',
      message: 'El apoyo que recibí aquí me ayudó a reconectar conmigo mismo. Recomiendo totalmente este centro.',
      image: 'assets/testimonials/carlos.jpg'
    },
    {
      name: 'Ana Torres',
      role: 'Paciente',
      message: 'Una experiencia transformadora. Me sentí escuchada y acompañada desde el primer día.',
      image: 'assets/testimonials/ana.jpg'
    }
  ];
}
