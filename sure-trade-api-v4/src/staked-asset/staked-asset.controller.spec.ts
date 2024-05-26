import { Test, TestingModule } from '@nestjs/testing';
import { StakedAssetController } from './staked-asset.controller';

describe('StakedAssetController', () => {
  let controller: StakedAssetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StakedAssetController],
    }).compile();

    controller = module.get<StakedAssetController>(StakedAssetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
