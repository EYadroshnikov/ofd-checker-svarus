import { Module } from '@nestjs/common';
import { OfdController } from './ofd.controller';
import { OfdApiService } from './ofd-api.service';


@Module({
  controllers: [OfdController],
  providers: [OfdApiService],
})
export class OfdModule {}
