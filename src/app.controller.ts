import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { SpecifiedCashRegisterDto } from './dto/specified-cash-register.dto';
import { PeriodDto } from './dto/period.dto';
import { ApiProperty, ApiTags } from '@nestjs/swagger';

@ApiTags('')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/check-specified-cash-register/inn/:inn/kkt/:kkt')
  async checkSpecifiedCashRegister(
    @Param() specifiedCashRegisterDto: SpecifiedCashRegisterDto,
    @Query() specifiedCashRegisterPeriodDto: PeriodDto,
  ) {

  }
}
