import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from 'src/config/config.type';
import { SpecifiedCashRegisterDto } from '../dto/specified-cash-register.dto';
import { PeriodDto } from '../dto/period.dto';

@Injectable()
export class OfdApiService {
  private authToken: string = null;

  constructor(private configService: ConfigService<AllConfigType>) {}

  async retrieveAuthToken(): Promise<string> {
    const response = await axios.post(
      `${this.configService.get('app.url', { infer: true })}/api/Authorization/CreateAuthToken`,
      {
        Login: this.configService.get('app.ofdLogin', { infer: true }),
        Password: this.configService.get('app.ofdPassword', { infer: true }),
      },
    );
    return response.data.AuthToken;
  }

  async getReceiptsByCashRegister(
    specifiedCashRegisterDto: SpecifiedCashRegisterDto,
    periodDto: PeriodDto,
  ) {
    return axios.get(
      `${this.configService.get('app.url', { infer: true })}/api/integration/v1/inn/${specifiedCashRegisterDto.inn}/kkt/${specifiedCashRegisterDto.kkt}/receipts?dateFrom=${periodDto.dateFrom}&dateTo=${periodDto.dateTo}&AuthToken=${this.authToken}`,
    );
  }

  async getAuthorizedReceiptsByCashRegister(
    specifiedCashRegisterDto: SpecifiedCashRegisterDto,
    periodDto: PeriodDto,
  ) {
    if (!this.authToken) this.authToken = await this.retrieveAuthToken();

    let response = await this.getReceiptsByCashRegister(
      specifiedCashRegisterDto,
      periodDto,
    );
    if (response.status != 200) {
      this.authToken = await this.retrieveAuthToken();
      response = await this.getReceiptsByCashRegister(
        specifiedCashRegisterDto,
        periodDto,
      );
    }
    return response;
  }
}
