import { Test, TestingModule } from '@nestjs/testing';
import { ModelmapperService } from './modelmapper.service';

describe('ModelmapperService', () => {
  let service: ModelmapperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModelmapperService],
    }).compile();

    service = module.get<ModelmapperService>(ModelmapperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
