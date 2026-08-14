import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { BofaDsModule } from 'bofa-ds';
import { BofaCoreModule } from 'bofa-core';
import { BofaComplianceModule } from 'bofa-compliance';

import { AppComponent } from './app.component';
import { HoldingsTableComponent } from './holdings/holdings-table.component';

@NgModule({
  declarations: [AppComponent, HoldingsTableComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressBarModule,
    BofaDsModule,
    BofaCoreModule.forRoot({ lineOfBusiness: 'WEALTH', apiBaseUrl: '/api/wealth' }),
    BofaComplianceModule.forRoot(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
