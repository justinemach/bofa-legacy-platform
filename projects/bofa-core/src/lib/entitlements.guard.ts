import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';

import { SessionService } from './session.service';

/**
 * Blocks a route when the signed-in user lacks the entitlement declared on the
 * route's `data.entitlement`.
 *
 * Class-based guards are the pattern used across the whole estate.
 */
@Injectable()
export class EntitlementsGuard implements CanActivate {
  constructor(private readonly session: SessionService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const required = route.data['entitlement'] as string | undefined;
    if (!required) {
      return true;
    }
    return this.session.hasEntitlement(required);
  }
}
