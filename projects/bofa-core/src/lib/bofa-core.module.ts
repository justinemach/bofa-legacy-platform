import {
  EnvironmentProviders,
  makeEnvironmentProviders,
  ModuleWithProviders,
  NgModule,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { BOFA_CORE_CONFIG, BofaCoreConfig, DEFAULT_CORE_CONFIG } from './config';
import { ApiClientService } from './api-client.service';
import { EntitlementsGuard } from './entitlements.guard';
import { MoneyPipe } from './money.pipe';
import { SessionService } from './session.service';

/**
 * Provides the platform services once per application. Standalone
 * bootstraps pass this to `bootstrapApplication`; module-based applications
 * keep calling `BofaCoreModule.forRoot()`, which delegates here.
 */
export function provideBofaCore(config?: Partial<BofaCoreConfig>): EnvironmentProviders {
  return makeEnvironmentProviders([
    SessionService,
    ApiClientService,
    EntitlementsGuard,
    {
      provide: BOFA_CORE_CONFIG,
      useValue: { ...DEFAULT_CORE_CONFIG, ...(config || {}) },
    },
  ]);
}

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
      providers: [provideBofaCore(config)],
    };
  }
}
