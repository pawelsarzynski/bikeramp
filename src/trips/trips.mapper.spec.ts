import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { AddressesMapper } from '../addresses/addresses.mapper';
import { TripsMapper } from './trips.mapper';
import Trip from './entities/trip.entity';
import {
  createTripFixture,
  tripDtoFixture,
  tripFixture,
} from '../../test/fixtures';

const addressesMapperMock = {
  fromDomainToDto: jest.fn(),
  fromDtoToDomain: jest.fn(),
};

describe('TripsMapper', () => {
  let mapper: TripsMapper;
  let addressesMapper: AddressesMapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddressesMapper,
        TripsMapper,
        {
          provide: getRepositoryToken(Trip),
          useValue: {
            create: (trip: Trip) => trip,
          },
        },
      ],
    })
      .overrideProvider(AddressesMapper)
      .useValue(addressesMapperMock)
      .compile();

    mapper = module.get<TripsMapper>(TripsMapper);
    addressesMapper = module.get<AddressesMapper>(AddressesMapper);
  });

  it('should be defined', () => {
    expect(mapper).toBeDefined();
  });

  describe('fromDtoToDomain', () => {
    it('should map object to trip entity', () => {
      const result = mapper.fromDtoToDomain(createTripFixture);

      expect(result).toEqual(createTripFixture);
      expect(addressesMapper.fromDtoToDomain).not.toBeCalled();
    });
  });

  describe('fromDomainToDto', () => {
    it('should map object to trip dto', () => {
      addressesMapperMock.fromDomainToDto.mockImplementation(
        ({ street, buildingNo, city, country }) =>
          `${street} ${buildingNo}, ${city}, ${country}`,
      );

      const result = mapper.fromDomainToDto(tripFixture);

      expect(result).toEqual(tripDtoFixture);
      expect(addressesMapper.fromDtoToDomain).not.toBeCalled();
    });
  });
});
