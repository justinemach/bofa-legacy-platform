import { Component } from '@angular/core';
import { AuditLogService } from 'bofa-compliance';

interface Transfer {
  to: string;
  amount: number;
  when: string;
}

@Component({
  selector: 'app-transfers-page',
  templateUrl: './transfers-page.component.html',
  styleUrls: ['./transfers-page.component.scss'],
})
export class TransfersPageComponent {
  scheduled: Transfer[] = [
    { to: 'Rainy Day Savings', amount: 250, when: 'Every Friday' },
    { to: 'Travel Rewards Card', amount: 732.18, when: 'On the 3rd' },
  ];
  recipient = '';
  amount = '';

  constructor(private readonly audit: AuditLogService) {}

  async schedule(): Promise<void> {
    const parsed = Number(this.amount);
    if (!this.recipient || isNaN(parsed) || parsed <= 0) {
      return;
    }
    this.scheduled = this.scheduled.concat({
      to: this.recipient,
      amount: parsed,
      when: 'One time',
    });
    await this.audit.record('e123456', 'SCHEDULE_TRANSFER', this.recipient);
    this.recipient = '';
    this.amount = '';
  }
}
