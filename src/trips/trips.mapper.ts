import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { AddressesMapper } from '../addresses/addresses.mapper';
import Trip from './entities/trip.entity';
import { CreatedTripDto } from './dto/createdTrip.dto';
import { TripDto } from './dto/trip.dto';

@Injectable()
export class TripsMapper {
  constructor(
    @InjectRepository(Trip)
    private tripsRepository: Repository<Trip>,
    private readonly addressMapper: AddressesMapper,
  ) {}

  fromDomainToDto(trip: Trip): CreatedTripDto {
    const dto = new CreatedTripDto();

    dto.price = trip.price;
    dto.distance = trip.distance;
    dto.startAddress = this.addressMapper.fromDomainToDto(trip.startAddress);
    dto.destinationAddress = this.addressMapper.fromDomainToDto(
      trip.destinationAddress,
    );

    return dto;
  }

  fromDtoToDomain(tripDto: TripDto): Trip {
    return this.tripsRepository.create(tripDto);
  }
}
