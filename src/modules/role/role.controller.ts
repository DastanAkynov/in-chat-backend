import { RoleEntity} from '@Entities';
import { IAppResponse } from '@Types';
import { Controller, Get } from '@nestjs/common';
import { RoleService } from './role.service';
import { IRoleResponse } from './interfaces';


@Controller('roles')
export class RoleController {
  constructor(
    private roleService: RoleService
  ){}
  

  @Get()
  getAll(): Promise<IRoleResponse<RoleEntity []>>{
    return this.roleService.getAll()
  }

}