import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, RouterStateSnapshot } from '@angular/router';

import { SessionService } from './session.service';

/**
 * Returns true when the signed-in user holds the entitlement declared on the
 * route's `data.entitlement`, or when the route declares none.
 */
function isEntitled(session: SessionService, route: ActivatedRouteSnapshot): boolean {
  const required = route.data['entitlement'] as string | undefined;
  if (!required) {
    return true;
  }
  return session.hasEntitlement(required);
}

/**
 * Functional form of the guard, for route configs on Angular 15+.
 */
export const entitlementsGuard: CanActivateFn = (route) => isEntitled(inject(SessionService), route);

/**
 * Blocks a route when the signed-in user lacks the entitlement declared on the
 * route's `data.entitlement`.
 *
 * Class-based guards are deprecated from v15; retained so the product apps'
 * route configs keep working until each app moves to `entitlementsGuard`.
 */
@Injectable()
export class EntitlementsGuard implements CanActivate {
  constructor(private readonly session: SessionService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return isEntitled(this.session, route);
  }
}
