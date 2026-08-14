import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatListModule } from '@angular/material/list';
import { BofaDsModule } from 'bofa-ds';
import { BofaCoreModule } from 'bofa-core';
import { BofaComplianceModule } from 'bofa-compliance';

import { PayrollBatchComponent } from './payroll-batch.component';

describe('PayrollBatchComponent', () => {
  let fixture: ComponentFixture<PayrollBatchComponent>;
  let component: PayrollBatchComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PayrollBatchComponent],
      imports: [
        NoopAnimationsModule,
        FormsModule,
        MatDialogModule,
        MatSnackBarModule,
        MatSlideToggleModule,
        MatListModule,
        BofaDsModule,
        BofaCoreModule.forRoot(),
        BofaComplianceModule.forRoot(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PayrollBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('counts only selected entries', () => {
    expect(component.selectedItems.length).toBe(3);
  });

  it('totals the selected entries', () => {
    expect(component.batchTotal).toBeCloseTo(10241.25, 2);
  });
});
