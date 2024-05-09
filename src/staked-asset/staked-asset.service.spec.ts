import { Test, TestingModule } from '@nestjs/testing';
import { StakedAssetService } from './staked-asset.service';

describe('StakedAssetService', () => {
  let service: StakedAssetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StakedAssetService],
    }).compile();

    service = module.get<StakedAssetService>(StakedAssetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
