import { Test, TestingModule } from '@nestjs/testing';
import { GiftCardRateController } from './gift-card-rate.controller';

describe('GiftCardRateController', () => {
  let controller: GiftCardRateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GiftCardRateController],
    }).compile();

    controller = module.get<GiftCardRateController>(GiftCardRateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
