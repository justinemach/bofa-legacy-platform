import { Injectable } from '@angular/core';
import { of } from 'rxjs';

export interface AuditEvent {
  actor: string;
  action: string;
  resource: string;
  occurredAt: string;
}

/** Ships customer-impacting UI events to the audit platform. */
@Injectable()
export class AuditLogService {
  private readonly buffer: AuditEvent[] = [];

  record(actor: string, action: string, resource: string): Promise<AuditEvent> {
    const event: AuditEvent = {
      actor,
      action,
      resource,
      occurredAt: new Date().toISOString(),
    };
    this.buffer.push(event);
    // BOFA-9042: still on the deprecated toPromise() bridge.
    return of(event).toPromise() as Promise<AuditEvent>;
  }

  get recorded(): AuditEvent[] {
    return this.buffer.slice();
  }
}
