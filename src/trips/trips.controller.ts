import { Controller, Post, Body } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

import { CreatedTripDto } from './dto/createdTrip.dto';
import { TripDto } from './dto/trip.dto';
import { TripsMapper } from './trips.mapper';
import { TripsService } from './trips.service';

@Controller('trips')
export class TripsController {
  constructor(
    private readonly tripsService: TripsService,
    private readonly tripsMapper: TripsMapper,
  ) {}

  @ApiResponse({
    status: 201,
    type: () => CreatedTripDto,
  })
  @Post()
  async create(@Body() tripDto: TripDto) {
    const trip = this.tripsMapper.fromDtoToDomain(tripDto);
    const newTrip = await this.tripsService.create(trip);
    return this.tripsMapper.fromDomainToDto(newTrip);
  }
}
