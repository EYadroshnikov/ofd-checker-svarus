import { Controller, Get, Param, Query } from '@nestjs/common';
import { SpecifiedCashRegisterDto } from '../dto/specified-cash-register.dto';
import { PeriodDto } from '../dto/period.dto';
import { ApiTags } from '@nestjs/swagger';
import { OfdApiService } from './ofd-api.service';

@ApiTags('OFD')
@Controller('ofd')
export class OfdController {
  constructor(private readonly ofdService: OfdApiService) {}

  @Get('receipts/inn/:inn/kkt/:kkt')
  async getRecieptsFromSpecifiedCashRegByPeriod(
    @Param() specifiedCashRegisterDto: SpecifiedCashRegisterDto,
    @Query() periodDto: PeriodDto,
  ) {
    const receipts = await this.ofdService.getAuthorizedReceiptsByCashRegister(
      specifiedCashRegisterDto,
      periodDto,
    );
    return receipts.data;
  }
}
