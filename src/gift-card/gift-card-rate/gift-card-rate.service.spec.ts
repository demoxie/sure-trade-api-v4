import { Test, TestingModule } from '@nestjs/testing';
import { GiftCardRateService } from './gift-card-rate.service';

describe('GiftCardRateService', () => {
  let service: GiftCardRateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GiftCardRateService],
    }).compile();

    service = module.get<GiftCardRateService>(GiftCardRateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
