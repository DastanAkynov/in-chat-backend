import { IAppResponse } from '@Types';
import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RefreshTokenDto, RegisterDto } from './dto/auth.dto';
import { IAuthResponse } from './interfaces';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ){}
  
  @Post('register')
  @UsePipes(ValidationPipe)
  register(@Body() data: RegisterDto): Promise<IAuthResponse> {
    return this.authService.register(data)
  }

  @Post('login')
  @UsePipes(ValidationPipe)
  login(@Body() data: LoginDto): Promise<IAuthResponse> {
    return this.authService.login(data)
  }

  @Post('refresh-token')
  @UsePipes(ValidationPipe)
  refreshToken(@Body() data: RefreshTokenDto ): Promise<IAuthResponse>  {
    return this.authService.refreshToken(data) as any
  }

}