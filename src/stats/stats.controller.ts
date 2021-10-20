import { Controller, Get } from '@nestjs/common';

import { StatsService } from './stats.service';
import { StatsMapper } from './stats.mapper';

@Controller('stats')
export class StatsController {
  constructor(
    private readonly statsMapper: StatsMapper,
    private readonly statsService: StatsService,
  ) {}

  @Get('weekly')
  async getWeekly() {
    const stat = await this.statsService.getWeekly();

    return this.statsMapper.fromDomainToWeeklyDto(stat);
  }

  @Get('monthly')
  async getMonthly() {
    const stats = await this.statsService.getMonthly();

    return stats.map(this.statsMapper.fromDomainToMonthlyDto);
  }
}
