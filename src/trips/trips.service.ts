import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import Trip from './entities/trip.entity';
import { DistanceProvider } from '../distance/distance.provider';

@Injectable()
export class TripsService {
  constructor(
    @InjectRepository(Trip)
    private readonly tripsRepository: Repository<Trip>,
    private readonly distanceProvider: DistanceProvider,
  ) {}

  async create(trip: Trip): Promise<Trip> {
    trip.distance = await this.distanceProvider.getDistance(
      trip.startAddress,
      trip.destinationAddress,
    );

    return this.tripsRepository.save(trip);
  }
}
