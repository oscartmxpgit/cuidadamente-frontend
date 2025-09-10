import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateBeforeWord'
})
export class TruncateBeforeWordPipe implements PipeTransform {
  transform(value: string, word: string = 'Servicios', maxLength: number = 850): string {
    if (!value) return '';

    const index = value.indexOf(word);

    // Case 1: Word is found and appears before maxLength
    if (index !== -1 && index <= maxLength) {
      return value.substring(0, index).trim() + 'Hacer clic para más información...';
    }

    // Case 2: Word not found or appears too late -> fallback to char limit
    if (value.length > maxLength) {
      return value.substring(0, maxLength).trim() + 'Hacer clic para más información...';
    }

    // Case 3: Text is already short
    return value;
  }
}