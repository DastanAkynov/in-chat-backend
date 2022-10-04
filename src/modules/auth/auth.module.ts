import { Module } from '@nestjs/common';
import { UserModule } from '@Modules';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@Entities';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [
    UserModule,
    SharedModule,
    TypeOrmModule.forFeature([
      UserEntity
    ])
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule{}