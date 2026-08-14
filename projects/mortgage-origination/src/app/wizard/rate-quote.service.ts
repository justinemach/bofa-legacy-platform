import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

export interface RateQuote {
  term: number;
  ratePercent: number;
  monthlyPayment: number;
}

/** Prices a loan scenario. Fixtures stand in for the pricing engine. */
@Injectable({ providedIn: 'root' })
export class RateQuoteService {
  private readonly baseRates: Record<number, number> = { 15: 5.625, 20: 6.125, 30: 6.375 };

  quote(amount: number, term: number, creditBand: string): Promise<RateQuote> {
    const adjustment = creditBand === 'EXCELLENT' ? -0.25 : creditBand === 'FAIR' ? 0.5 : 0;
    const rate = (this.baseRates[term] || 6.375) + adjustment;
    const monthlyRate = rate / 100 / 12;
    const payments = term * 12;
    const monthlyPayment =
      (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -payments));

    // BOFA-9042: deprecated toPromise() bridge, same as the retail estate.
    return of({ term, ratePercent: rate, monthlyPayment })
      .pipe(map((quote) => quote))
      .toPromise() as Promise<RateQuote>;
  }
}
