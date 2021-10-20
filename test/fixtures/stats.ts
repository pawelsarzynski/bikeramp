import { CURRENCY, DISTANCE_UNIT } from '../../src/shared/constants';
import { StatMonthlyDto } from '../../src/stats/dto/statMonthly.dto';
import { StatWeeklyDto } from '../../src/stats/dto/statWeekly.dto';
import { StatMonthly } from '../../src/stats/entities/statMonthly.entity';
import { StatWeekly } from '../../src/stats/entities/statWeekly.entity';

export const statWeeklyFixture: StatWeekly = {
  totalDistance: 9,
  totalPrice: 12,
};

export const statWeeklyDtoFixture: StatWeeklyDto = {
  totalDistance: `9.000${DISTANCE_UNIT}`,
  totalPrice: `12.00${CURRENCY}`,
};

export const createStatMonthlyFixture = (
  day: string,
  multiplier = 1,
): StatMonthly => ({
  day,
  totalDistance: 100 * multiplier,
  avgRide: 9 * multiplier,
  avgPrice: 20,
});

export const createStatMonthlyDtoFixture = (
  day: string,
  multiplier = 1,
): StatMonthlyDto => ({
  day,
  totalDistance: `${(100 * multiplier).toFixed(3)}${DISTANCE_UNIT}`,
  avgRide: `${(9 * multiplier).toFixed(3)}${DISTANCE_UNIT}`,
  avgPrice: `20.00${CURRENCY}`,
});
