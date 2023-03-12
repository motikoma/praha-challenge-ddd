import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * This guard is used to protect routes that require a valid JWT token.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
