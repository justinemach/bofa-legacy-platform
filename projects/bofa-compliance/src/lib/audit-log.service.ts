import { Injectable } from '@angular/core';
import { firstValueFrom, of } from 'rxjs';

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
    return firstValueFrom(of(event));
  }

  get recorded(): AuditEvent[] {
    return this.buffer.slice();
  }
}
