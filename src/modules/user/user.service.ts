import { RoleEntity, UserEntity } from '@Entities';
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterDto } from '../auth/dto/auth.dto';
import { CreateUserDto } from './dto/user.dto';
import { IUniqUserData, IUserResponse } from './interfaces';
import { RoleCodes } from '@Enums';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    @InjectRepository(RoleEntity) private roleRepo: Repository<RoleEntity>
  ) {}
  
  async create(data: CreateUserDto): Promise<UserEntity>  {
    const user = await this.userRepo.create({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      password: data.password,
      role: await this.roleRepo.findOneBy({code: RoleCodes[data.role]})
    })
    
    await user.save()
    delete user.password

    return user
  }


  async createAuthUser(data: RegisterDto): Promise<UserEntity>  {
    const user = await this.userRepo.create({
      firstName: data.firstName,
      email: data.email,
      phone: data.phone,
      password: data.password
    })
    await user.save()
    delete user.password
    console.log(user.role)

    return user
  }


  async getAll(): Promise<IUserResponse<UserEntity[]>>  {
    const [users, total] = await this.userRepo.createQueryBuilder('user')
    .getManyAndCount()
    return {users, total}
  }


  buildResponse(user: UserEntity): IUserResponse<UserEntity>  {
    return {user}
  }


  async checkForUnique(data: IUniqUserData): Promise<void> {
    const {email, phone} = data
    if(email) {
      const dublicateEmail = await this.userRepo.findOneBy({email})
      if(dublicateEmail) throw new ConflictException('User with this email already exists')
    }

    if(phone) {
      const dublicateEmail = await this.userRepo.findOneBy({phone})
      if(dublicateEmail) throw new ConflictException('User with this phone already exists')
    }
  }

}