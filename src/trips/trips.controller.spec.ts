import { Test, TestingModule } from '@nestjs/testing';

import { TripsController } from './trips.controller';
import { TripsMapper } from './trips.mapper';
import { TripsService } from './trips.service';
import {
  createTripFixture,
  tripDtoFixture,
  tripFixture,
} from '../../test/fixtures';

const tripsServiceMock = {
  create: jest.fn(),
};

const tripsMapperMock = {
  fromDomainToDto: jest.fn(),
  fromDtoToDomain: jest.fn(),
};

describe('TripsController', () => {
  let controller: TripsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TripsController],
      providers: [TripsService, TripsMapper],
    })
      .overrideProvider(TripsService)
      .useValue(tripsServiceMock)
      .overrideProvider(TripsMapper)
      .useValue(tripsMapperMock)
      .compile();

    controller = module.get<TripsController>(TripsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call mapper, service and return created trip', async () => {
      tripsMapperMock.fromDtoToDomain.mockReturnValueOnce(tripFixture);
      tripsServiceMock.create.mockResolvedValueOnce(tripFixture);
      tripsMapperMock.fromDomainToDto.mockReturnValueOnce(tripDtoFixture);

      const result = await controller.create(createTripFixture);

      expect(result).toEqual(tripDtoFixture);
      expect(tripsMapperMock.fromDtoToDomain).toBeCalledWith(createTripFixture);
      expect(tripsServiceMock.create).toBeCalledWith(tripFixture);
      expect(tripsMapperMock.fromDomainToDto).toBeCalledWith(tripFixture);
    });
  });
});
