import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AddressesMapper } from '../addresses/addresses.mapper';
import { DistanceProvider } from './distance.provider';

@Module({
  imports: [ConfigModule],
  providers: [AddressesMapper, DistanceProvider],
  exports: [DistanceProvider],
})
export class DistanceModule {}
