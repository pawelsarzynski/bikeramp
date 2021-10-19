import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TripsMapper } from 'src/trips/trips.mapper';
import { AddressesMapper } from 'src/addresses/addresses.mapper';
import Trip from './entities/trip.entity';
import { TripsService } from './trips.service';
import { TripsController } from './trips.controller';
import { DistanceModule } from '../distance/distance.module';
import { DistanceProvider } from '../distance/distance.provider';

@Module({
  imports: [TypeOrmModule.forFeature([Trip]), ConfigModule, DistanceModule],
  controllers: [TripsController],
  providers: [TripsService, TripsMapper, AddressesMapper, DistanceProvider],
})
export class TripsModule {}
