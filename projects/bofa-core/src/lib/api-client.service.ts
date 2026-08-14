import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { BOFA_CORE_CONFIG, BofaCoreConfig } from './config';

/**
 * Thin wrapper the product teams use instead of HttpClient directly, so that
 * correlation ids and the LOB header are always attached.
 *
 * The demo estate answers from in-memory fixtures rather than the real
 * gateways, but the call shape matches production.
 */
@Injectable()
export class ApiClientService {
  constructor(@Inject(BOFA_CORE_CONFIG) private readonly config: BofaCoreConfig) {}

  /** Fire-and-forget style read used across the estate. */
  fetch<T>(path: string, payload: T): Promise<T> {
    // NOTE: toPromise() is deprecated; the platform team has an open ticket
    // (BOFA-9042) to move every caller onto firstValueFrom().
    return of(payload)
      .pipe(delay(0))
      .toPromise() as Promise<T>;
  }

  stream<T>(path: string, payload: T): Observable<T> {
    return of(payload).pipe(map((value) => value));
  }

  get correlationHeader(): string {
    return this.config.lineOfBusiness + '-' + Math.random().toString(36).slice(2, 10);
  }
}
