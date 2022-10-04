import { RoleEntity } from '@Entities';
import { RoleCodes } from '@Enums';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IRoleResponse } from './interfaces';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity) private roleRepo: Repository<RoleEntity>
  ) {
    this.generateRoles()
  }

  async generateRoles() {
    try{
      const roles = Object.values(RoleCodes)
      for(let role of roles) {
        const existRole = await this.roleRepo.findOneBy({code: role})
        if(!existRole) {
          const newRole = await this.roleRepo.create()
          newRole.name = role.toLocaleLowerCase(),
          newRole.code = RoleCodes[role]
          await newRole.save()
        }
      }
    } catch(err) {
      console.log('Error! Can not add roles to database...', err.message)
    }
  } 
  
  async getAll(): Promise<IRoleResponse<RoleEntity[]>>  {
    const [roles, total] = await this.roleRepo.createQueryBuilder('role')
    .getManyAndCount()
    return {roles, total}
  }
}