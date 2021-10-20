import { Test, TestingModule } from '@nestjs/testing';

import { StatsMapper } from './stats.mapper';
import {
  createStatMonthlyFixture,
  createStatMonthlyDtoFixture,
  statWeeklyFixture,
  statWeeklyDtoFixture,
} from '../../test/fixtures';

describe('StatsMapper', () => {
  let mapper: StatsMapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StatsMapper],
    }).compile();

    mapper = module.get<StatsMapper>(StatsMapper);

    jest.useFakeTimers().setSystemTime(new Date('2021-10-20').getTime());
  });

  it('should be defined', () => {
    expect(mapper).toBeDefined();
  });

  describe('fromDomainToWeeklyDto', () => {
    it('should map object to stat weekly dto', () => {
      const result = mapper.fromDomainToWeeklyDto(statWeeklyFixture);

      expect(result).toEqual(statWeeklyDtoFixture);
    });
  });

  describe('fromDomainToMonthlyDto', () => {
    it('should map object to stat monthly dto', () => {
      const result = mapper.fromDomainToMonthlyDto(
        createStatMonthlyFixture('2021-10-20'),
      );

      expect(result).toEqual(createStatMonthlyDtoFixture('October, 20th'));
    });
  });
});
