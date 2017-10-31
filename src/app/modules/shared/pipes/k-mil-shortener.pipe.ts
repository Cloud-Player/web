import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'kMilShortener'})
export class KMilShortenerPipe implements PipeTransform {
  private units = ['', 'K', 'Mil', 'Bil'];

  private formatToKMil(input: number, amount = 0): string {
    if (input < 1000) {
      return `${input}${this.units[amount]}`;
    } else {
      return this.formatToKMil(Math.round((input / 1000) * 10) / 10, amount + 1);
    }
  }

  transform(value: string, args: string[]): any {
    if (!value) {
      return value;
    } else {
      return this.formatToKMil(parseInt(value, 10));
    }
  }
}
