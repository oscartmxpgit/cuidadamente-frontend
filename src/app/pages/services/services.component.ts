import { Component } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent {
  services = [
    {
      title: 'Evaluación, orientación y diagnóstico',
      description: 'Un buen diagnóstico puede ser el primer paso hacia la recuperación: entender cuál puede ser el origen del problema, ponerle palabras a aquello que no va bien y saber cuáles son los motivos que lo mantiene es dar un paso hacia adelante para el cambio.'
    },
    {
      title: 'Psicoterapia individual para adultos',
      description: 'En ocasiones, podemos sentir que algo no funciona en nuestra vida: problemas en el trabajo, estrés, pérdida de interés por lo que antes nos hacía disfrutar, dificultades para dormir, sensación de vacío, falta de control… o un cúmulo de situaciones internas y/o externas que nos hace perder las riendas de nuestra vida. Queremos ser parte del cambio. Queremos escucharte y ayudarte.'
    },
    {
      title: 'Psicoterapia individual infanto-juvenil',
      description: 'La infancia y adolescencia supone una etapa de especiales cambios en el desarrollo a todos los niveles de la persona y, como no, hay situaciones que dificultan la correcta madurez (como dificultades en el aprendizaje, déficit de la atención, problemas en la interrelación con los compañeros o en casa, problemas familiares, miedos, fobias, falta de autoestima, dificultad en la adaptación o simplemente estar pasando por una situación que genera gran sufrimiento y que interfiere en el día a día del menor y la familia. En esas necesidades cognitivas, afectivas y relaciones específicas que requieran de orientación y atención profesional queremos acompañar tanto a peques como a padres.'
    },
    {
      title: 'Terapia de pareja',
      description: 'La relación de pareja implica construir uno de los vínculos más fuertes y satisfactorios que podemos tener en nuestra vida, pero no significa que esté exento de adversidades. Muchas veces esa relación implica sortear dificultades más o menos grandes que pueden afectar directamente al núcleo del vínculo: la confianza y el amor mutuo. Cuando la relación sufre heridas que impactan en ese núcleo pueden aparecer dudas, conflictos, inseguridades y reacciones que perpetúen el daño. Cuando la pareja, a pesar de las dificultades, tiene el compromiso de apostar por la relación, nosotros queremos acompañar y ser parte del proceso de cambio.'
    },
    {
      title: 'Rehabilitación cognitiva',
      description: 'Las terapias de rehabilitación cognitiva ponen el foco en entender e intervenir en cómo funciona nuestro cerebro cuando existe una alteración en algún nivel del procesamiento (por ejemplo cómo es nuestra atención, la memoria, el aprendizaje, el lenguaje…) debido a una lesión, dificultad en el neurodesarrollo, una enfermedad degenerativa, etc. Nuestros profesionales están preparados para escucharte y acompañarte en tus necesidades específicas y a tu ritmo.'
    },
    {
      title: 'Mediación familiar, de pareja e integración social',
      description: ''
    },
    {
      title: 'Mental Training (crecimiento personal y bienestar integral)',
      description: ''
    },
    {
      title: 'Talleres para adolescentes',
      description: '(bullying, acoso escolar, gestión de estrés)'
    },
    {
      title: 'Talleres para adultos',
      description: '(burnout, gestión del estrés, estilos de apego)'
    },
    {
      title: 'Escuela de padres y familias',
      description: 'Cada vez hay más padres y maestros conscientes del impacto que pueden tener la educación en los niños y adolescentes. Pero no es tarea fácil ser buenos referentes de los hijos y alumnos, es por eso que, ante el reto de ofrecer una educación completa y de calidad, tenemos el compromiso de ofrecer herramientas y asesoramiento a familias y colegios a través de diversos talleres: inteligencia emocional, gestión de conflictos, el papel de la educación en los niños con problemas en el neurodesarrollo, etc. ¡Infórmate ya!'
    },
    {
      title: 'Psicoterapia grupal',
      description: ''
    }
  ];
}
