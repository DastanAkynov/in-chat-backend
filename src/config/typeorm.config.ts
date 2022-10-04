import { RoleEntity, UserEntity } from '@Entities';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { throwError } from '@Helpers';

require('dotenv').config();

const ENTITIES = [
  UserEntity,
  RoleEntity
]

export const typeOrmConfig: TypeOrmModuleOptions  = {
  type: 'postgres',
  host: process.env.DB_HOST || throwError(`Couldn't load host from .env`),
  port: 5432,
  username:
    process.env.DB_USER ||
    throwError(`Couldn't load user name of db from .env`),
  password:
    process.env.DB_SECRET || throwError(`Couldn't load db password from .env`),
  database:
    process.env.DB_NAME || throwError(`Couldn't load db name from .env`),
  entities: ENTITIES,
  synchronize: true,
}