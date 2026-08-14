import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface Holding {
  symbol: string;
  description: string;
  quantity: number;
  marketValue: number;
  dayChangePercent: number;
}

@Injectable({ providedIn: 'root' })
export class HoldingsService {
  private readonly holdings: Holding[] = [
    { symbol: 'AGG', description: 'Core US Aggregate Bond ETF', quantity: 1200, marketValue: 118440, dayChangePercent: 0.12 },
    { symbol: 'BAC', description: 'Bank of America Corp', quantity: 2500, marketValue: 98750, dayChangePercent: -0.84 },
    { symbol: 'IVV', description: 'S&P 500 Index ETF', quantity: 340, marketValue: 178160, dayChangePercent: 0.46 },
    { symbol: 'MSFT', description: 'Microsoft Corp', quantity: 210, marketValue: 88410, dayChangePercent: 1.12 },
    { symbol: 'MUB', description: 'National Muni Bond ETF', quantity: 900, marketValue: 96030, dayChangePercent: -0.05 },
    { symbol: 'VTI', description: 'Total Market ETF', quantity: 415, marketValue: 112050, dayChangePercent: 0.38 },
  ];

  load(): Observable<Holding[]> {
    return of(this.holdings).pipe(delay(0));
  }
}
