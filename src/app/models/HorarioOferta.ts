// src/app/models/HorarioOferta.ts
export interface HorarioOferta {
  id: number;
  ofertaId: number;
  diaSemana: number;     // 0=Domingo ... 6=Sábado
  horaInicio: string;    // formato "HH:mm:ss"
  horaFin: string;
}
