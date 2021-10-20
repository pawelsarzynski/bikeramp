import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StatsController } from './stats.controller';
import { StatsMapper } from './stats.mapper';
import { StatsService } from './stats.service';
import Trip from '../trips/entities/trip.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Trip])],
  controllers: [StatsController],
  providers: [StatsService, StatsMapper],
})
export class StatsModule {}
