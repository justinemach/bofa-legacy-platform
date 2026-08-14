import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatListModule } from '@angular/material/list';

import { BofaDsModule } from 'bofa-ds';
import { BofaCoreModule } from 'bofa-core';
import { BofaComplianceModule } from 'bofa-compliance';

import { AppComponent } from './app.component';
import { PayrollBatchComponent } from './payroll/payroll-batch.component';

@NgModule({
  declarations: [AppComponent, PayrollBatchComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatListModule,
    BofaDsModule,
    BofaCoreModule.forRoot({ lineOfBusiness: 'BUSINESS_BANKING', apiBaseUrl: '/api/payments' }),
    BofaComplianceModule.forRoot(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
