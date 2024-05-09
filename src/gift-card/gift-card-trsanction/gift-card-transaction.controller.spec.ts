import { Test, TestingModule } from "@nestjs/testing";
import { GiftCardTransactionController } from "./gift-card-transaction.controller";

describe("GiftCardController", () => {
  let controller: GiftCardTransactionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GiftCardTransactionController],
    }).compile();

    controller = module.get<GiftCardTransactionController>(
      GiftCardTransactionController,
    );
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
