import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BOFA_CORE_CONFIG, BofaCoreConfig, DEFAULT_CORE_CONFIG } from './config';
import { ApiClientService } from './api-client.service';
import { EntitlementsGuard } from './entitlements.guard';
import { MoneyPipe } from './money.pipe';
import { SessionService } from './session.service';

/**
 * Platform module. Every application calls `BofaCoreModule.forRoot({...})`
 * exactly once in its root module.
 */
@NgModule({
  declarations: [MoneyPipe],
  imports: [CommonModule],
  exports: [MoneyPipe],
})
export class BofaCoreModule {
  static forRoot(config?: Partial<BofaCoreConfig>): ModuleWithProviders<BofaCoreModule> {
    return {
      ngModule: BofaCoreModule,
      providers: [
        SessionService,
        ApiClientService,
        EntitlementsGuard,
        {
          provide: BOFA_CORE_CONFIG,
          useValue: { ...DEFAULT_CORE_CONFIG, ...(config || {}) },
        },
      ],
    };
  }
}
