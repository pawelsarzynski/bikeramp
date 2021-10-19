import { Test, TestingModule } from '@nestjs/testing';

import { TripsController } from './trips.controller';
import { TripsMapper } from './trips.mapper';
import { TripsService } from './trips.service';

const tripsServiceMock = {
  create: jest.fn(),
};

const tripsMapperMock = {
  fromDomainToDto: jest.fn(),
  fromDtoToDomain: jest.fn(),
};

const createTripFixture = {
  startAddress: {
    street: 'foo',
    buildingNo: 9,
    city: 'bar',
    country: 'baz',
  },
  destinationAddress: {
    street: 'qux',
    buildingNo: 91,
    city: 'quux',
    country: 'corge',
  },
  price: 12,
};

const tripFixture = {
  ...createTripFixture,
  id: 1,
  distance: 19,
  createdAt: '2021-10-19',
};

const tripDtoFixture = {
  startAddress: 'foo 9, bar, baz',
  destinationAdsress: 'qux 9, quux, corge',
  price: 12,
  distance: 19,
};

describe('TripsController', () => {
  let controller: TripsController;
  let service: TripsService;
  let mapper: TripsMapper;

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
    service = module.get<TripsService>(TripsService);
    mapper = module.get<TripsMapper>(TripsMapper);
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
