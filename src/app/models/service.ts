export interface Service {
  id?: number;           // id es opcional porque al crear no tienes id todavía
  title: string;
  imageFileName?: string;
  imageUrl?: string;
  description?: string;
}