import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AppBaseEntity } from './app-base.entity';
import { RoleEntity } from './role.entity';

import { hash, compare } from 'bcrypt'

@Entity('user')
export class UserEntity extends AppBaseEntity {
  @Column('varchar', { nullable: true })
  email: string;

  @Column('varchar', { nullable: true })
  firstName: string;

  @Column('varchar', { nullable: true })
  lastName: string;

  @Column('varchar', { nullable: true })
  phone: string;

  @Column('varchar', { nullable: true, select: false })
  password: string;

  @ManyToOne(
    () => RoleEntity,
    {nullable: true, eager: true}
  )
  @JoinColumn()
  role: RoleEntity

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10)
  }

  validatePassword(password: string): Promise<boolean> {
    return compare(password, this.password);
  }
  
}