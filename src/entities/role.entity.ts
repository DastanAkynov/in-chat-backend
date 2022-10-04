import { RoleCodes } from '@Enums';
import { Column, Entity } from 'typeorm';
import { AppBaseEntity } from './app-base.entity';

@Entity('roles')
export class RoleEntity extends AppBaseEntity {

  @Column('varchar', {nullable: false, unique: true})
  name: string;

  @Column('enum', { enum: RoleCodes, default: RoleCodes.ANONYME, unique: true })
  code: RoleCodes;

}