import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { BofaDsModule } from 'bofa-ds';
import { BofaCoreModule, EntitlementsGuard } from 'bofa-core';
import { BofaComplianceModule } from 'bofa-compliance';

import { AppComponent } from './app.component';
import { AccountsPageComponent } from './accounts/accounts-page.component';
import { TransfersPageComponent } from './transfers/transfers-page.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'accounts' },
  {
    path: 'accounts',
    component: AccountsPageComponent,
    canActivate: [EntitlementsGuard],
    data: { entitlement: 'ACCOUNTS_VIEW' },
  },
  {
    path: 'transfers',
    component: TransfersPageComponent,
    canActivate: [EntitlementsGuard],
    data: { entitlement: 'PAYMENTS_INITIATE' },
  },
];

@NgModule({
  declarations: [AppComponent, AccountsPageComponent, TransfersPageComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, { useHash: false }),
    BofaDsModule,
    BofaCoreModule.forRoot({ lineOfBusiness: 'RETAIL', apiBaseUrl: '/api/accounts' }),
    BofaComplianceModule.forRoot(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
