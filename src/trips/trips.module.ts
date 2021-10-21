import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import Trip from './entities/trip.entity';
import { AddressesMapper } from '../addresses/addresses.mapper';
import { DistanceModule } from '../distance/distance.module';
import { DistanceProvider } from '../distance/distance.provider';
import { TripsController } from './trips.controller';
import { TripsMapper } from './trips.mapper';
import { TripsService } from './trips.service';

@Module({
  imports: [TypeOrmModule.forFeature([Trip]), ConfigModule, DistanceModule],
  controllers: [TripsController],
  providers: [TripsService, TripsMapper, AddressesMapper, DistanceProvider],
})
export class TripsModule {}
