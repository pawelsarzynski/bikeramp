import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import Trip from './entities/trip.entity';
import { TripsService } from './trips.service';
import { tripFixture } from '../../test/fixtures';
import { DistanceProvider } from '../distance/distance.provider';

const distanceProviderMock = {
  getDistance: jest.fn(),
};

describe('TripsService', () => {
  let service: TripsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TripsService,
        DistanceProvider,
        {
          provide: getRepositoryToken(Trip),
          useValue: {
            save: (trip: Trip) => trip,
          },
        },
      ],
    })
      .overrideProvider(DistanceProvider)
      .useValue(distanceProviderMock)
      .compile();

    service = module.get<TripsService>(TripsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create trip with distance', async () => {
      const distance = 21;
      distanceProviderMock.getDistance.mockResolvedValueOnce(distance);

      const result = await service.create(tripFixture);

      expect(result).toEqual({ ...tripFixture, distance });
      expect(distanceProviderMock.getDistance).toHaveBeenCalledWith(
        tripFixture.startAddress,
        tripFixture.destinationAddress,
      );
    });
  });
});
