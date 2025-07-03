import { Component } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss'
})
export class FaqComponent {
  faqs = [
    {
      question: '¿Qué es Cuidadamente?',
      answer: 'Cuidadamente es un centro de salud mental donde tú eres el protagonista. Nuestro equipo de especialistas te acompaña en tu bienestar emocional y crecimiento personal, con atención profesional, cercana y personalizada.',
      open: false
    },
    {
      question: '¿Cómo puedo pedir una cita?',
      answer: 'Puedes solicitar tu cita online desde la opción "Registro cita online" en el menú principal o contactarnos directamente por teléfono, WhatsApp o correo electrónico. Los iconos de contacto están siempre visibles en la parte superior de la web.',
      open: false
    },
    {
      question: '¿Qué servicios ofrecéis?',
      answer: 'Ofrecemos evaluación, orientación y diagnóstico, psicoterapia individual para adultos e infanto-juvenil, terapia de pareja, rehabilitación cognitiva, mediación familiar y social, mental training, talleres para adolescentes y adultos, escuela de padres y psicoterapia grupal.',
      open: false
    },
    {
      question: '¿Quién forma parte del equipo?',
      answer: 'Nuestro equipo está formado por profesionales de la psicología, neuropsicología, integración social y mediación familiar. Puedes conocer más sobre cada profesional y sus especialidades en la sección "Quiénes somos".',
      open: false
    },
    {
      question: '¿Dónde estáis ubicados y cómo puedo contactar?',
      answer: 'Nuestra dirección es c/Capitán Dema 1-4º. Puerta 2. Puedes contactarnos por teléfono (+34 682 391 660), correo electrónico (info@cuidadamente.org) o WhatsApp. Todos los datos de contacto están accesibles en la barra superior de la web.',
      open: false
    },
    {
      question: '¿Las sesiones pueden ser virtuales?',
      answer: 'Sí, ofrecemos sesiones virtuales mediante videollamadas seguras y confidenciales, ideales si no puedes acudir presencialmente. Esta modalidad está disponible para psicoterapia individual, orientación familiar y seguimiento psicológico.',
      open: false
    },
    {
      question: '¿Trabajáis con seguros médicos?',
      answer: 'Sí, colaboramos con varias aseguradoras de salud. Te recomendamos consultarnos para confirmar si tu seguro es aceptado y conocer los pasos necesarios para utilizarlo.',
      open: false
    },
    {
      question: '¿La información que comparto es confidencial?',
      answer: 'Por supuesto. La confidencialidad es un principio fundamental en nuestro trabajo. Toda la información que compartas será tratada de forma confidencial, salvo en casos excepcionales que impliquen riesgo para ti o para otros, conforme a la ley.',
      open: false
    },
    {
      question: '¿Qué duración tienen las sesiones?',
      answer: 'Las sesiones de psicoterapia individual suelen durar unos 50 minutos. En el caso de terapia familiar, de pareja o atención en crisis, la duración puede variar según las necesidades.',
      open: false
    },
    {
      question: '¿Puedo cambiar de profesional si lo necesito?',
      answer: 'Sí, queremos que te sientas cómodo/a y en confianza. Si deseas cambiar de terapeuta, puedes solicitarlo sin compromiso y te ayudaremos a encontrar el profesional que mejor se adapte a tus necesidades.',
      open: false
    },
    {
      question: '¿Qué valores definen vuestro trabajo?',
      answer: 'Nuestro trabajo se basa en la experiencia, conocimiento, actitud, compromiso, cercanía, comprensión afectiva, accesibilidad y confidencialidad. Nos esforzamos por ofrecerte una atención de calidad y humana.'
    }
  ];
}
