import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsNotEmpty } from 'class-validator';

export class PeriodDto {
  @ApiProperty({ example: '2024-02-23T00:00:00' })
  @IsISO8601({ strict: true, strictSeparator: true })
  @IsNotEmpty()
  dateFrom: Date;

  @ApiProperty({ example: '2024-02-23T00:00:00' })
  @IsISO8601({ strict: true, strictSeparator: true })
  @IsNotEmpty()
  dateTo: Date;
}
