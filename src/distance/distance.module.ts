import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Client } from '@googlemaps/google-maps-services-js';

import { AddressesMapper } from '../addresses/addresses.mapper';
import { DistanceProvider } from './distance.provider';

@Module({
  imports: [ConfigModule],
  providers: [
    AddressesMapper,
    DistanceProvider,
    {
      provide: Client,
      useClass: Client,
    },
  ],
  exports: [
    DistanceProvider,
    {
      provide: Client,
      useClass: Client,
    },
  ],
})
export class DistanceModule {}
