import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, Length } from 'class-validator';

export class SpecifiedCashRegisterDto {
  @ApiProperty({ example: '562414138597' })
  @IsNotEmpty()
  @IsNumberString()
  @Length(12, 12)
  inn: string;

  @ApiProperty({ example: '0025286476678724' })
  @IsNotEmpty()
  @IsNumberString()
  @Length(16, 16)
  kkt: string;
}
