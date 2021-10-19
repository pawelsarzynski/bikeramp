import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TripsMapper } from 'src/trips/trips.mapper';
import { AddressesMapper } from 'src/addresses/addresses.mapper';
import Trip from './entities/trip.entity';
import { TripsService } from './trips.service';
import { TripsController } from './trips.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Trip])],
  controllers: [TripsController],
  providers: [TripsService, TripsMapper, AddressesMapper],
})
export class TripsModule {}
