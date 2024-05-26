import { Module } from '@nestjs/common';
import { GiftCardRateService } from './gift-card-rate.service';
import { GiftCardRateController } from './gift-card-rate.controller';

@Module({
  providers: [GiftCardRateService],
  controllers: [GiftCardRateController]
})
export class GiftCardRateModule {}
