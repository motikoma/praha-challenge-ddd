import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

/**
 * Reflector: metadataを取得するためのクラス
 *
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<number[]>(
      'roles',
      context.getHandler(),
    );

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest(); // ParticipantAuth
    const userRoles = user.values.roles.map((role: any) => role.role);

    if (requiredRoles.some((role) => userRoles.includes(role))) return true;

    throw new ForbiddenException(
      'You are not authorized to access this resource',
    );
  }
}
