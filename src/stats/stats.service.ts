import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { subDays, subMonths } from 'date-fns';

import { StatWeekly } from './entities/statWeekly.entity';
import { StatMonthly } from './entities/statMonthly.entity';

import Trip from '../trips/entities/trip.entity';

@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(Trip)
    private readonly tripsRepository: Repository<Trip>,
  ) {}

  getWeekly(): Promise<StatWeekly> {
    const dateFrom = subDays(new Date(), 7).toISOString();
    const dateTo = new Date().toISOString();

    return this.tripsRepository
      .createQueryBuilder('trip')
      .select('SUM(trip.distance)', 'totalDistance')
      .addSelect('SUM(trip.price)', 'totalPrice')
      .where('trip.date >= :dateFrom')
      .andWhere('trip.date <= :dateTo')
      .setParameters({ dateFrom, dateTo })
      .getRawOne();
  }

  getMonthly(): Promise<StatMonthly[]> {
    const dateFrom = subMonths(new Date(), 1).toISOString();
    const dateTo = new Date().toISOString();

    return this.tripsRepository
      .createQueryBuilder('trip')
      .select('SUM(trip.distance)', 'totalDistance')
      .addSelect('AVG(trip.price)', 'avgPrice')
      .addSelect('AVG(trip.distance)', 'avgRide')
      .addSelect('trip.date', 'day')
      .where('trip.date >= :dateFrom')
      .andWhere('trip.date <= :dateTo')
      .groupBy('trip.date')
      .setParameters({ dateFrom, dateTo })
      .getRawMany();
  }
}
