import { Injectable, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleUser } from '../../users/enum/roles.enums';
import { ROLES_KEY } from '../decorator/roles.decorator';

import { JwtAuthGuard } from './jwt-auth.guard';

@Injectable()
export class RolesGuard extends JwtAuthGuard {
  constructor(private reflector: Reflector) {
    super();
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const baseGuardResult = await super.canActivate(context);
    if (!baseGuardResult) {
      return false;
    }
    const requiredRoles = this.reflector.getAllAndOverride<RoleUser[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}
