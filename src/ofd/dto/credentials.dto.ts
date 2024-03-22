import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CredentialsDto {
  @ApiProperty({ example: 'test@example.com' })
  @IsEmail()
  @IsNotEmpty()
  login: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  password: string;
}
