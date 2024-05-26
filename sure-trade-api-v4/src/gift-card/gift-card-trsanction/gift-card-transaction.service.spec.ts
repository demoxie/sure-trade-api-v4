import { Test, TestingModule } from "@nestjs/testing";
import { GiftCardTransactionService } from "./gift-card-transaction.service";

describe("GiftCardTrsanctionService", () => {
  let service: GiftCardTransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GiftCardTransactionService],
    }).compile();

    service = module.get<GiftCardTransactionService>(
      GiftCardTransactionService,
    );
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
