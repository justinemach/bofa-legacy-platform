import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';

import { BofaDsModule } from 'bofa-ds';
import { BofaCoreModule } from 'bofa-core';
import { BofaComplianceModule } from 'bofa-compliance';

import { AppComponent } from './app.component';
import { CardCatalogComponent } from './catalog/card-catalog.component';

@NgModule({
  declarations: [AppComponent, CardCatalogComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTabsModule,
    BofaDsModule,
    BofaCoreModule.forRoot({ lineOfBusiness: 'CARDS', apiBaseUrl: '/api/cards' }),
    BofaComplianceModule.forRoot(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
