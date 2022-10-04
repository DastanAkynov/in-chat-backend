import { RoleEntity, UserEntity } from '@Entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      RoleEntity
    ]
  )],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule{}