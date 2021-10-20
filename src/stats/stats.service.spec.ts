import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import Trip from '../trips/entities/trip.entity';
import {
  createStatMonthlyFixture,
  statWeeklyFixture,
} from '../../test/fixtures';
import { StatsService } from './stats.service';

const queryBuilderMock = {
  select: jest.fn(() => queryBuilderMock),
  addSelect: jest.fn(() => queryBuilderMock),
  where: jest.fn(() => queryBuilderMock),
  andWhere: jest.fn(() => queryBuilderMock),
  groupBy: jest.fn(() => queryBuilderMock),
  setParameters: jest.fn(() => queryBuilderMock),
  getRawOne: jest.fn(() => statWeeklyFixture),
  getRawMany: jest.fn(() => [
    createStatMonthlyFixture('2021-11-20'),
    createStatMonthlyFixture('2021-11-19', 2),
  ]),
};

describe('StatsService', () => {
  let service: StatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StatsService,
        {
          provide: getRepositoryToken(Trip),
          useValue: {
            createQueryBuilder: () => queryBuilderMock,
          },
        },
      ],
    }).compile();

    service = module.get<StatsService>(StatsService);

    jest.useFakeTimers().setSystemTime(new Date('2021-10-20').getTime());
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterEach(() => {
    Object.values(queryBuilderMock).forEach(
      (mock: jest.MockedFunction<typeof queryBuilderMock>) => mock.mockClear(),
    );
  });

  describe('getWeekly', () => {
    it('should return weekly stats', async () => {
      const result = await service.getWeekly();

      expect(result).toEqual(statWeeklyFixture);
      expect(queryBuilderMock.select).toHaveBeenCalledWith(
        'SUM(trip.distance)',
        'totalDistance',
      );
      expect(queryBuilderMock.addSelect).toHaveBeenCalledWith(
        'SUM(trip.price)',
        'totalPrice',
      );
      expect(queryBuilderMock.where).toHaveBeenCalledWith(
        'trip.date >= :dateFrom',
      );
      expect(queryBuilderMock.andWhere).toHaveBeenCalledWith(
        'trip.date <= :dateTo',
      );
      expect(queryBuilderMock.setParameters).toHaveBeenCalledWith({
        dateFrom: '2021-10-13T00:00:00.000Z',
        dateTo: '2021-10-20T00:00:00.000Z',
      });
    });
  });

  describe('getMonthly', () => {
    it('should return monthly stats', async () => {
      const result = await service.getMonthly();

      expect(result).toEqual([
        createStatMonthlyFixture('2021-11-20'),
        createStatMonthlyFixture('2021-11-19', 2),
      ]);
      expect(queryBuilderMock.select).toHaveBeenCalledWith(
        'SUM(trip.distance)',
        'totalDistance',
      );
      expect(queryBuilderMock.addSelect).toHaveBeenCalledTimes(3);
      expect(queryBuilderMock.addSelect).toHaveBeenCalledWith(
        'AVG(trip.price)',
        'avgPrice',
      );
      expect(queryBuilderMock.addSelect).toHaveBeenCalledWith(
        'AVG(trip.distance)',
        'avgRide',
      );
      expect(queryBuilderMock.addSelect).toHaveBeenCalledWith(
        'trip.date',
        'day',
      );
      expect(queryBuilderMock.where).toHaveBeenCalledWith(
        'trip.date >= :dateFrom',
      );
      expect(queryBuilderMock.andWhere).toHaveBeenCalledWith(
        'trip.date <= :dateTo',
      );
      expect(queryBuilderMock.groupBy).toHaveBeenCalledWith('trip.date');
      expect(queryBuilderMock.setParameters).toHaveBeenCalledWith({
        dateFrom: '2021-09-20T00:00:00.000Z',
        dateTo: '2021-10-20T00:00:00.000Z',
      });
    });
  });
});
