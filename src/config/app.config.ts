import { JwtModuleOptions } from '@nestjs/jwt';

require('dotenv').config();

export const config = {
  PORT: process.env.PORT,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY
}

export const JWT_CONFIG: JwtModuleOptions = {
  secret: config.JWT_SECRET_KEY,
};