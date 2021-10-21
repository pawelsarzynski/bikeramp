import { Injectable } from '@nestjs/common';
import { format } from 'date-fns';

import { StatMonthly } from './entities/statMonthly.entity';
import { StatWeekly } from './entities/statWeekly.entity';
import { StatMonthlyDto } from './dto/statMonthly.dto';
import { StatWeeklyDto } from './dto/statWeekly.dto';
import { formatCurrency, formatDistance } from '../shared/helpers';

@Injectable()
export class StatsMapper {
  fromDomainToWeeklyDto(stat: StatWeekly): StatWeeklyDto {
    const dto = new StatWeeklyDto();

    dto.totalDistance = formatDistance(stat.totalDistance);
    dto.totalPrice = formatCurrency(stat.totalPrice);

    return dto;
  }

  fromDomainToMonthlyDto(stat: StatMonthly): StatMonthlyDto {
    const dto = new StatMonthlyDto();

    dto.day = format(new Date(stat.day), 'MMMM, do');
    dto.totalDistance = formatDistance(stat.totalDistance);
    dto.avgRide = formatDistance(stat.avgRide);
    dto.avgPrice = formatCurrency(stat.avgPrice);

    return dto;
  }
}
