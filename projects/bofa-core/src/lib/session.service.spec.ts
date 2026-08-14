import { TestBed } from '@angular/core/testing';
import { SessionService } from './session.service';

describe('SessionService', () => {
  let service: SessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [SessionService] });
    service = TestBed.inject(SessionService);
  });

  it('starts with a signed-in demo user', () => {
    expect(service.currentUser).not.toBeNull();
  });

  it('checks entitlements', () => {
    expect(service.hasEntitlement('ACCOUNTS_VIEW')).toBe(true);
    expect(service.hasEntitlement('NOT_A_REAL_CODE')).toBe(false);
  });

  it('clears the user on logout', () => {
    service.endSession();
    expect(service.currentUser).toBeNull();
  });
});
