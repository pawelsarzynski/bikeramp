import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import Trip from './entities/trip.entity';
import { TripsService } from './trips.service';
import { tripFixture } from '../../test/fixtures';

describe('TripsService', () => {
  let service: TripsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TripsService,
        {
          provide: getRepositoryToken(Trip),
          useValue: {
            save: (trip: Trip) => trip,
          },
        },
      ],
    }).compile();

    service = module.get<TripsService>(TripsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create trip with distance', async () => {
      const result = await service.create(tripFixture);

      expect(result).toEqual({ ...tripFixture, distance: 21 });
    });
  });
});
