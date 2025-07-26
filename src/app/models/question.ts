export interface Question {
  id: number;
  text: string;
  description?: string;
  options?: string[];
  multiple?: boolean;
  inputType?: string;       // tipo de input: text, email, tel, number...
  autocomplete?: string;    // sugerencia de autocompletado
}

export const questions: Question[] = [
  {
    id: 1,
    text: '¿Cómo te gustaría que te llamemos?',
    description: 'Puedes usar tu nombre real o un apodo.',
    options: [],
    multiple: false,
    inputType: 'text',
    autocomplete: 'given-name',
  },
  {
    id: 2,
    text: '¿Qué tipo de terapia te gustaría realizar?',
    description: 'Esto nos ayudará a saber quién participará en las sesiones.',
    options: ['Individual', 'En pareja', 'Para un/a menor de edad'],
    multiple: false
  },
  {
    id: 3,
    text: '¿Cuántos años tienes?',
    description: 'Si eres menor de edad, necesitaremos consentimiento de ambos padres para poder continuar.',
    options: [],
    multiple: false,
    inputType: 'number',
    autocomplete: 'bday-year',
  },
  {
    id: 4,
    text: 'Para poder ayudarte mejor, cuéntanos qué te ha traído hasta aquí.',
    description: 'Puedes seleccionar todas las opciones que apliquen.',
    options: [
      'Siento ansiedad o estrés frecuente',
      'Me siento triste o desanimado/a con regularidad',
      'Tengo dificultades por vivir en otro país',
      'Estoy atravesando problemas en mi trabajo',
      'No me siento feliz con mis relaciones personales',
      'Busco un camino para crecer personalmente',
      'Ninguna de las anteriores'
    ],
    multiple: true
  },
  {
    id: 5,
    text: '¿Te identificas con alguna de estas situaciones?',
    description: 'Puedes elegir varias opciones.',
    options: [
      'Tengo problemas con la alimentación o imagen corporal',
      'Quiero resolver dificultades en mi vida sexual',
      'Creo que tengo alguna adicción',
      'He vivido una experiencia traumática que aún me afecta',
      'Necesito cambiar mi forma de ver las cosas o ganar confianza',
      'Estoy lidiando con problemas físicos o médicos propios o de alguien cercano',
      'Ninguna de estas opciones'
    ],
    multiple: true
  },
  {
    id: 6,
    text: '¿Cómo describirías lo que sientes en este momento?',
    description: 'Puedes seleccionar las opciones que sientas.',
    options: [
      'Estoy teniendo dificultades relacionadas con mi experiencia en el extranjero',
      'Tengo una enfermedad física que afecta mi vida o la de un ser querido',
      'Me gustaría entenderme mejor a mí mismo/a',
      'Creo que tengo baja autoestima y quiero mejorarla',
      'Siento que necesito un cambio importante en mi vida',
      'Ninguna de las anteriores'
    ],
    multiple: true
  },
  {
    id: 7,
    text: '¿En qué horario prefieres ser atendido/a?',
    description: 'Por ejemplo, mañanas, tardes, fines de semana...',
    options: [],
    multiple: false,
    inputType: 'text',
  },
  {
    id: 8,
    text: '¿Cuál es tu número de teléfono de contacto?',
    description: 'Incluye el código de país si puedes, para facilitar el contacto.',
    options: [],
    multiple: false,
    inputType: 'tel',
    autocomplete: 'tel',
  },
  {
    id: 9,
    text: '¿Cuál es tu correo electrónico?',
    description: 'Lo necesitamos para poder enviarte información importante o responderte.',
    options: [],
    multiple: false,
    inputType: 'email',
    autocomplete: 'email',
  },
];
