import { InjectionToken } from '@angular/core';

/** Per-application platform configuration, supplied via BofaCoreModule.forRoot(). */
export interface BofaCoreConfig {
  /** Line of business code used for audit records, e.g. 'RETAIL'. */
  lineOfBusiness: string;
  /** Base URL of the product's back-end service. */
  apiBaseUrl: string;
  /** Session idle timeout in minutes, mandated by the security standard. */
  idleTimeoutMinutes: number;
}

export const BOFA_CORE_CONFIG = new InjectionToken<BofaCoreConfig>('BOFA_CORE_CONFIG');

export const DEFAULT_CORE_CONFIG: BofaCoreConfig = {
  lineOfBusiness: 'RETAIL',
  apiBaseUrl: '/api',
  idleTimeoutMinutes: 15,
};
