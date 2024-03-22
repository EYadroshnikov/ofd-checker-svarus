import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsUrl } from 'class-validator';
import validateConfig from '../utils/validate-config';
import { registerAs } from '@nestjs/config';
import { AppConfig } from './app-config.type';

enum Environment {
  Development = 'DEV',
  Production = 'PROD',
  Test = 'TEST',
}

class EnvironmentVariablesValidator {
  @IsEnum(Environment)
  @IsNotEmpty()
  ENV: Environment;

  @IsUrl()
  @IsNotEmpty()
  API_URL: string;

  @IsUrl()
  @IsOptional()
  DEV_API_URL: string;

  @IsEmail()
  @IsNotEmpty()
  OFD_LOGIN: string;

  @IsNotEmpty()
  OFD_PASSWORD: string;
}

export default registerAs<AppConfig>('app', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    env: process.env.ENV,
    url:
      process.env.ENV === 'PROD'
        ? process.env.API_URL
        : process.env.DEV_API_URL,
    ofdLogin: process.env.OFD_LOGIN,
    ofdPassword: process.env.OFD_PASSWORD,
  };
});
