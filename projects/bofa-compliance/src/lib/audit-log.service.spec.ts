import { AuditLogService } from './audit-log.service';

describe('AuditLogService', () => {
  it('records an event', async () => {
    const service = new AuditLogService();
    const event = await service.record('e123456', 'VIEW', 'accounts');
    expect(event.action).toBe('VIEW');
    expect(service.recorded.length).toBe(1);
  });
});
