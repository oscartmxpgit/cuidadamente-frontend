export interface Question {
  id: number;
  text: string;
  description?: string;
  options?: string[];
  multiple?: boolean;
  inputType?: string;       // tipo de input: text, email, tel, number...
  autocomplete?: string;    // sugerencia de autocompletado
}