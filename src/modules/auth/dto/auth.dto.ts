import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class RegisterDto  {
  @IsNotEmpty()
  @IsString()
  firstName?: string;

  @IsNotEmpty()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  password?: string;

  // @IsNotEmpty()
  // @IsString()
  // @MinLength(3)
  // @Matches('password')
  // passwordConfirm?: string;

}

export class LoginDto  {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}


export class RefreshTokenDto {
  @IsNotEmpty()
  @IsString()
  token: string;
}