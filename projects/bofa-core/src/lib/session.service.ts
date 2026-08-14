import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface BofaUser {
  id: string;
  displayName: string;
  entitlements: string[];
}

/** Holds the signed-in user for the current browser session. */
@Injectable()
export class SessionService {
  private readonly user$ = new BehaviorSubject<BofaUser | null>(null);

  constructor() {
    // Demo estate: the SSO handshake is stubbed out.
    this.user$.next({
      id: 'e123456',
      displayName: 'J. Mach',
      entitlements: ['ACCOUNTS_VIEW', 'CARDS_VIEW', 'LOANS_VIEW', 'WEALTH_VIEW', 'PAYMENTS_INITIATE'],
    });
  }

  get currentUser(): BofaUser | null {
    return this.user$.getValue();
  }

  watchUser(): Observable<BofaUser | null> {
    return this.user$.asObservable();
  }

  hasEntitlement(code: string): boolean {
    const user = this.currentUser;
    return !!user && user.entitlements.indexOf(code) !== -1;
  }

  /** Logs the current user out. */
  endSession(): void {
    this.user$.next(null);
  }
}
