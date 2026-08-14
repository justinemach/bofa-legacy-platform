import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuditLogService } from 'bofa-compliance';

import { RateQuote, RateQuoteService } from './rate-quote.service';

@Component({
  selector: 'app-application-wizard',
  templateUrl: './application-wizard.component.html',
  styleUrls: ['./application-wizard.component.scss'],
})
export class ApplicationWizardComponent implements OnInit {
  borrowerForm!: FormGroup;
  propertyForm!: FormGroup;
  quote: RateQuote | null = null;

  readonly creditBands = ['EXCELLENT', 'GOOD', 'FAIR'];
  readonly terms = [15, 20, 30];

  constructor(
    private readonly fb: FormBuilder,
    private readonly rates: RateQuoteService,
    private readonly audit: AuditLogService
  ) {}

  ngOnInit(): void {
    this.borrowerForm = this.fb.group({
      fullName: ['', Validators.required],
      annualIncome: [120000, [Validators.required, Validators.min(1)]],
      creditBand: ['GOOD', Validators.required],
    });

    this.propertyForm = this.fb.group({
      purchasePrice: [650000, [Validators.required, Validators.min(1)]],
      downPayment: [130000, [Validators.required, Validators.min(0)]],
      term: [30, Validators.required],
    });
  }

  get loanAmount(): number {
    const price = Number(this.propertyForm.get('purchasePrice')?.value || 0);
    const down = Number(this.propertyForm.get('downPayment')?.value || 0);
    return Math.max(price - down, 0);
  }

  async requestQuote(): Promise<void> {
    if (this.borrowerForm.invalid || this.propertyForm.invalid) {
      return;
    }
    this.quote = await this.rates.quote(
      this.loanAmount,
      Number(this.propertyForm.get('term')?.value),
      String(this.borrowerForm.get('creditBand')?.value)
    );
    await this.audit.record('e123456', 'RATE_QUOTE', 'mortgage/application');
  }
}
