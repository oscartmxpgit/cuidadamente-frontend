import { Component } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss'
})
export class FaqComponent {
faqs = [
  {
    question: '¿Necesito una cita para ser atendido?',
    answer: 'Sí, es necesario agendar una cita previa para asegurar tu atención. Puedes hacerlo fácilmente a través de nuestro sitio web o contactándonos por teléfono o WhatsApp. Así garantizamos una atención personalizada y sin tiempos de espera prolongados.',
    open: false
  },
  {
    question: '¿Aceptan seguros médicos?',
    answer: 'Sí, actualmente trabajamos con varias aseguradoras de salud. Te recomendamos comunicarte con nosotros para confirmar si tu seguro es aceptado y conocer los pasos necesarios para utilizarlo en tu atención.',
    open: false
  },
  {
    question: '¿Las sesiones pueden ser virtuales?',
    answer: 'Por supuesto. Ofrecemos sesiones virtuales mediante videollamadas seguras y confidenciales, ideales si no puedes acudir presencialmente. Esta modalidad está disponible para psicoterapia individual, orientación familiar y seguimiento psicológico.',
    open: false
  },
  {
    question: '¿Tienen atención de urgencia?',
    answer: 'Sí. Contamos con un servicio de atención en crisis para situaciones de urgencia emocional, como ataques de pánico, ideación suicida o eventos traumáticos. En estos casos, contáctanos inmediatamente y te atenderemos lo antes posible.',
    open: false
  },
  {
    question: '¿Qué tipo de profesionales trabajan en Cuidadamente?',
    answer: 'Nuestro equipo está conformado por psicólogos clínicos, psiquiatras, psicopedagogos y terapeutas familiares, todos con experiencia y formación en salud mental. Trabajamos en equipo para ofrecerte una atención integral y ética.',
    open: false
  },
  {
    question: '¿Cuánto dura una sesión de terapia?',
    answer: 'Las sesiones de psicoterapia individual tienen una duración aproximada de 50 minutos. Sin embargo, dependiendo del tipo de intervención (por ejemplo, terapia familiar o atención en crisis), este tiempo puede variar.',
    open: false
  },
  {
    question: '¿Es confidencial todo lo que comparta durante la terapia?',
    answer: 'Sí. La confidencialidad es un principio fundamental en nuestro trabajo. Toda la información que compartas con tu terapeuta será tratada de forma confidencial, salvo en casos excepcionales que impliquen riesgo para ti o para otros, conforme a la ley.',
    open: false
  },
  {
    question: '¿Puedo cambiar de terapeuta si no me siento cómodo/a?',
    answer: 'Claro. Queremos que te sientas en confianza y comodidad. Si consideras que necesitas cambiar de profesional, puedes solicitarlo sin compromiso. Te ayudaremos a encontrar un terapeuta que se ajuste mejor a tus necesidades.',
    open: false
  }
];

}
