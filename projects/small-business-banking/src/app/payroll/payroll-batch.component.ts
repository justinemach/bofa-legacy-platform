import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuditLogService, DisclosureDialogComponent } from 'bofa-compliance';
import { ApiClientService } from 'bofa-core';

export interface PayrollItem {
  payee: string;
  routing: string;
  amount: number;
  selected: boolean;
}

@Component({
  selector: 'app-payroll-batch',
  templateUrl: './payroll-batch.component.html',
  styleUrls: ['./payroll-batch.component.scss'],
})
export class PayrollBatchComponent {
  sameDay = false;
  submitting = false;

  items: PayrollItem[] = [
    { payee: 'A. Nguyen', routing: '026009593', amount: 3250.0, selected: true },
    { payee: 'R. Patel', routing: '026009593', amount: 2880.5, selected: true },
    { payee: 'M. Alvarez', routing: '121000358', amount: 4110.75, selected: true },
    { payee: 'T. Okafor', routing: '121000358', amount: 1990.0, selected: false },
  ];

  constructor(
    private readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar,
    private readonly api: ApiClientService,
    private readonly audit: AuditLogService
  ) {}

  get selectedItems(): PayrollItem[] {
    return this.items.filter((item) => item.selected);
  }

  get batchTotal(): number {
    return this.selectedItems.reduce((sum, item) => sum + item.amount, 0);
  }

  submitBatch(): void {
    const ref = this.dialog.open(DisclosureDialogComponent, {
      data: {
        title: 'ACH origination agreement',
        body:
          'By submitting this batch you confirm the entries comply with NACHA operating rules ' +
          'and that same-day entries submitted after 2:45pm ET settle the next business day.',
      },
    });

    ref.afterClosed().subscribe((accepted: boolean) => {
      if (!accepted) {
        return;
      }
      this.submitting = true;
      this.api
        .fetch('/batches', { count: this.selectedItems.length, total: this.batchTotal })
        .then(async (result) => {
          await this.audit.record('e123456', 'SUBMIT_ACH_BATCH', 'payments/batches');
          this.submitting = false;
          this.snackBar.open(
            'Batch of ' + result.count + ' payments submitted.',
            'Dismiss',
            { duration: 4000 }
          );
        });
    });
  }
}
