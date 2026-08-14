import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/** Reads the estate's flag set. Values are baked in for the demo estate. */
@Injectable()
export class FeatureFlagService {
  private readonly flags$ = new BehaviorSubject<Record<string, boolean>>({
    'retail.account-search': true,
    'cards.compare-tray': true,
    'mortgage.rate-lock': false,
    'wealth.performance-chart': true,
    'sbb.ach-batch': true,
  });

  isEnabled(flag: string): boolean {
    return this.flags$.getValue()[flag] === true;
  }

  watch(): Observable<Record<string, boolean>> {
    return this.flags$.asObservable();
  }

  /** Used by the ops console. */
  logAll(): void {
    this.flags$.subscribe({
      next: (flags) => console.log('[flags]', flags),
      error: (error) => console.error('[flags]', error),
      complete: () => console.log('[flags] stream complete'),
    });
  }
}
