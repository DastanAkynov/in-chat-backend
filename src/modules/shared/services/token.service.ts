import { UserEntity } from '@Entities';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IJwtPayload } from '../interfaces';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    private jwtService: JwtService
  ) {}

  generateAccessToken(user: UserEntity, expiresIn = '10m'): Promise<string> {

    return this.jwtService.signAsync(
      { id: user.id },
      { expiresIn },
    );
  }

  generateRefreshToken(user: UserEntity, expiresIn = '30d'): Promise<string> {
    return this.jwtService.signAsync(
      { id: user.id },
      { expiresIn},
    );
  }

  async validateByToken(token: string): Promise<UserEntity | null> {
    const payload: IJwtPayload = await this.jwtService
      .verifyAsync(token)
      .catch(() => null);

    // await this.userRepo.findOne({ where:{ id: payload.id }, relations: ['role']});

    return payload ? await this.userRepo.findOneBy({id: payload.id}) : null;
  }
}