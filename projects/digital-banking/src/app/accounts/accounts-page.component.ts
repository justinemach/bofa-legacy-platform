import { Component, OnInit } from '@angular/core';
import { AuditLogService } from 'bofa-compliance';
import { SessionService } from 'bofa-core';

import { Account, AccountsService } from './accounts.service';

@Component({
  selector: 'app-accounts-page',
  templateUrl: './accounts-page.component.html',
  styleUrls: ['./accounts-page.component.scss'],
})
export class AccountsPageComponent implements OnInit {
  accounts: Account[] = [];
  loading = true;
  searchTerm = '';

  constructor(
    private readonly accountsService: AccountsService,
    private readonly audit: AuditLogService,
    private readonly session: SessionService
  ) {}

  async ngOnInit(): Promise<void> {
    this.accounts = await this.accountsService.getAccounts();
    this.loading = false;
    const user = this.session.currentUser;
    await this.audit.record(user ? user.id : 'anonymous', 'VIEW', 'retail/accounts');
  }

  onSearch(): void {
    this.accounts = this.accountsService.search(this.searchTerm);
  }

  get totalBalance(): number {
    return this.accounts.reduce((sum, account) => sum + account.balance, 0);
  }
}
