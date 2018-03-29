import {Injectable, Pipe, PipeTransform} from '@angular/core';

@Injectable()
@Pipe({name: 'hReadableSeconds'})
export class HumanReadableSecondsPipe implements PipeTransform {

  private formatToHHMMSS(input: number): string {
    const time = new Date(null);
    time.setSeconds(input);
    // format time from hh:mm:ss to mm:ss when hh is 0
    if (time.getHours() === 1) {
      return time.toISOString().substr(14, 5);
    } else {
      return time.toISOString().substr(12, 7);
    }
  }

  transform(value: string, args?: string[]): any {
    if (!value) {
      return value;
    } else {
      return this.formatToHHMMSS(parseInt(value, 10));
    }
  }
}
