import { Controller, Post, Body } from '@nestjs/common';

import { TripDto } from './dto/trip.dto';
import { TripsMapper } from './trips.mapper';
import { TripsService } from './trips.service';

@Controller('trips')
export class TripsController {
  constructor(
    private readonly tripsService: TripsService,
    private readonly tripsMapper: TripsMapper,
  ) {}

  @Post()
  async create(@Body() tripDto: TripDto) {
    const trip = this.tripsMapper.fromDtoToDomain(tripDto);
    const newTrip = await this.tripsService.create(trip);
    return this.tripsMapper.fromDomainToDto(newTrip);
  }
}
