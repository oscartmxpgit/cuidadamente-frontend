// src/app/models/Oferta.ts
import { HorarioOferta } from "./HorarioOferta";

export interface Oferta {
  id: number;
  nombre: string;
  descripcion?: string | null;
  activa: boolean;
  horarios: HorarioOferta[];
}
