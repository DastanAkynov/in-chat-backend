import { UserEntity } from '@Entities'
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserService } from '../user/user.service'
import { RefreshTokenDto, RegisterDto } from './dto/auth.dto'
import { IAuthResponse } from './interfaces'
import { TokenService } from '../shared/services/token.service'


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    private userService: UserService,
    private tokenService: TokenService
  ) {}
  
  async register(data: RegisterDto): Promise<IAuthResponse> {
    await this.userService.checkForUnique({email: data.email})
    const user = await this.userService.createAuthUser(data)
    delete user.updatedAt

    const response = await this.buildResponse(user)
    return response
  }


  async login(data: RegisterDto): Promise<IAuthResponse>  {
    const { email, password } = data
    const user = await this.userRepo.createQueryBuilder('user')
    .addSelect('user.password')
    .leftJoinAndSelect('user.role', 'role')
    .where('user.email = :email', {email})
    .getOne()
    
    if(!user) throw new NotFoundException('User not found')
    const validPassword = await user.validatePassword(password)
    if(!validPassword)  throw new UnauthorizedException('Invalid password')
    delete user.password
    const response = await this.buildResponse(user)
    return response
  }


  async refreshToken({token}: RefreshTokenDto): Promise<IAuthResponse>  {
    const user = await this.tokenService.validateByToken(token)
    if(!user) throw new UnauthorizedException('Invalid or expired token')
    const response = await this.buildResponse(user)
    return response
  }


  async buildResponse(user: UserEntity): Promise<IAuthResponse> {
    const accessToken = await this.tokenService.generateAccessToken(user)
    const refreshToken = await this.tokenService.generateRefreshToken(user)
    return {user, role: user.role?.code, accessToken, refreshToken}
  }

}