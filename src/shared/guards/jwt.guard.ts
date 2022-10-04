import { TokenService } from '@Services';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private tokenService: TokenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()

    const token  = request.headers['authorization']?.split(' ')[1]
    if(!token) throw new UnauthorizedException('You are not authorized')

    const user = await this.tokenService.validateByToken(token)
    if(!user) throw new UnauthorizedException('Invalid or expired authorization token');

    request.user = user

    return true
  }
}