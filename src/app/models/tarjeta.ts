export interface Tarjeta {
  id?: number;           // id es opcional porque al crear no tienes id todavía
  title: string;
  subtitle: string;
  imageFileName?: string;
  imageUrl?: string;
  description?: string;
  tipo?: string;
  language?: string;
}