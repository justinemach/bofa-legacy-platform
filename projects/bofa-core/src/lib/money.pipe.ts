import { Pipe, PipeTransform } from '@angular/core';

/** Formats a USD amount the way the retail style guide requires. */
@Pipe({ name: 'bofaMoney' })
export class MoneyPipe implements PipeTransform {
  transform(value: number | null | undefined): string {
    if (value === null || value === undefined) {
      return '--';
    }
    const negative = value < 0;
    const formatted = Math.abs(value).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return (negative ? '-$' : '$') + formatted;
  }
}
