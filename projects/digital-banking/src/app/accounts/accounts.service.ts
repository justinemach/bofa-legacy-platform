import { Injectable } from '@angular/core';
import { of } from 'rxjs';

export interface Account {
  id: string;
  name: string;
  productType: 'CHECKING' | 'SAVINGS' | 'CREDIT_CARD';
  balance: number;
  availableBalance: number;
}

/**
 * Reads the customer's deposit and card positions.
 *
 * In production this proxies the accounts-api service; the demo estate serves
 * the same shapes from fixtures.
 */
@Injectable({ providedIn: 'root' })
export class AccountsService {
  private readonly fixtures: Account[] = [
    { id: 'chk-01', name: 'Advantage Plus Checking', productType: 'CHECKING', balance: 4210.55, availableBalance: 4110.55 },
    { id: 'sav-02', name: 'Rainy Day Savings', productType: 'SAVINGS', balance: 18250.0, availableBalance: 18250.0 },
    { id: 'crd-03', name: 'Travel Rewards Card', productType: 'CREDIT_CARD', balance: -732.18, availableBalance: 9267.82 },
    { id: 'chk-04', name: 'Household Checking', productType: 'CHECKING', balance: 1885.4, availableBalance: 1885.4 },
  ];

  /** BOFA-9042: toPromise() is deprecated and needs to move to firstValueFrom. */
  getAccounts(): Promise<Account[]> {
    return of(this.fixtures).toPromise() as Promise<Account[]>;
  }

  search(term: string): Account[] {
    const needle = term.trim().toLowerCase();
    if (!needle) {
      return this.fixtures.slice();
    }
    return this.fixtures.filter((a) => a.name.toLowerCase().indexOf(needle) !== -1);
  }
}
