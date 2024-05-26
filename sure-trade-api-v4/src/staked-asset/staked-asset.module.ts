import { Module } from '@nestjs/common';
import { StakedAssetService } from './staked-asset.service';
import { StakedAssetController } from './staked-asset.controller';

@Module({
  providers: [StakedAssetService],
  controllers: [StakedAssetController]
})
export class StakedAssetModule {}
