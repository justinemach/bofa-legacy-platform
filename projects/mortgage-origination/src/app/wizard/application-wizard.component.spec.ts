import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BofaDsModule } from 'bofa-ds';
import { BofaCoreModule } from 'bofa-core';
import { BofaComplianceModule } from 'bofa-compliance';

import { ApplicationWizardComponent } from './application-wizard.component';

describe('ApplicationWizardComponent', () => {
  let fixture: ComponentFixture<ApplicationWizardComponent>;
  let component: ApplicationWizardComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApplicationWizardComponent],
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatStepperModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        BofaDsModule,
        BofaCoreModule.forRoot(),
        BofaComplianceModule.forRoot(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ApplicationWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('computes the loan amount from price and down payment', () => {
    expect(component.loanAmount).toBe(520000);
  });

  it('produces a quote once the forms are valid', async () => {
    component.borrowerForm.patchValue({ fullName: 'J. Mach' });
    await component.requestQuote();
    expect(component.quote).not.toBeNull();
    expect(component.quote!.monthlyPayment).toBeGreaterThan(0);
  });
});
