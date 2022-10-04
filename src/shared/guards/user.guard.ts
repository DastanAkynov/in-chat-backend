import { TokenService } from '@Services';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private tokenService: TokenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const token  = request.headers['authorization']?.split(' ')[1]

    if(token) {
      request.user = await this.tokenService.validateByToken(token)
    }

    return true
  }
}