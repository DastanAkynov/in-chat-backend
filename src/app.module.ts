import { Module } from '@nestjs/common';
import { 
  AuthModule, 
  RoleModule, 
  UserModule 
} from '@Modules';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '@TypeormConfig';


@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    RoleModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
