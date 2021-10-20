import { Test, TestingModule } from '@nestjs/testing';

import { StatsController } from './stats.controller';
import { StatsMapper } from './stats.mapper';
import { StatsService } from './stats.service';
import {
  createStatMonthlyFixture,
  createStatMonthlyDtoFixture,
  statWeeklyDtoFixture,
  statWeeklyFixture,
} from '../../test/fixtures';

const statsMapperMock = {
  fromDomainToMonthlyDto: jest.fn(),
  fromDomainToWeeklyDto: jest.fn(),
};

const statsServiceMock = {
  getMonthly: jest.fn(),
  getWeekly: jest.fn(),
};

describe('StatsController', () => {
  let controller: StatsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatsController],
      providers: [StatsService, StatsMapper],
    })
      .overrideProvider(StatsService)
      .useValue(statsServiceMock)
      .overrideProvider(StatsMapper)
      .useValue(statsMapperMock)
      .compile();

    controller = module.get<StatsController>(StatsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getWeekly', () => {
    it('should return weekly stats', async () => {
      statsServiceMock.getWeekly.mockResolvedValueOnce(statWeeklyFixture);
      statsMapperMock.fromDomainToWeeklyDto.mockReturnValueOnce(
        statWeeklyDtoFixture,
      );

      const result = await controller.getWeekly();

      expect(result).toEqual(statWeeklyDtoFixture);
      expect(statsServiceMock.getWeekly).toHaveBeenCalledTimes(1);
      expect(statsMapperMock.fromDomainToWeeklyDto).toHaveBeenCalledWith(
        statWeeklyFixture,
      );
    });
  });

  describe('getMonthly', () => {
    it('should return monthly stats', async () => {
      const monthlyFixtures = [
        createStatMonthlyFixture('2021-10-21'),
        createStatMonthlyFixture('2021-10-19', 2),
      ];
      statsServiceMock.getMonthly.mockResolvedValueOnce(monthlyFixtures);
      statsMapperMock.fromDomainToMonthlyDto.mockImplementation((_, i) =>
        createStatMonthlyDtoFixture('2021-10-19', i + 1),
      );

      const result = await controller.getMonthly();

      expect(result).toEqual([
        createStatMonthlyDtoFixture('2021-10-19'),
        createStatMonthlyDtoFixture('2021-10-19', 2),
      ]);
      expect(statsServiceMock.getMonthly).toHaveBeenCalledTimes(1);
      expect(statsMapperMock.fromDomainToMonthlyDto).toBeCalledTimes(2);
      expect(statsMapperMock.fromDomainToMonthlyDto).toHaveBeenNthCalledWith(
        1,
        createStatMonthlyFixture('2021-10-21'),
        0,
        monthlyFixtures,
      );
      expect(statsMapperMock.fromDomainToMonthlyDto).toHaveBeenNthCalledWith(
        2,
        createStatMonthlyFixture('2021-10-19', 2),
        1,
        monthlyFixtures,
      );
    });
  });
});
