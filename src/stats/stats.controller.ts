import { Controller, Get } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

import { StatMonthlyDto } from './dto/statMonthly.dto';
import { StatsMapper } from './stats.mapper';
import { StatsService } from './stats.service';
import { StatWeeklyDto } from './dto/statWeekly.dto';

@Controller('stats')
export class StatsController {
  constructor(
    private readonly statsMapper: StatsMapper,
    private readonly statsService: StatsService,
  ) {}

  @ApiResponse({
    type: () => StatWeeklyDto,
  })
  @Get('weekly')
  async getWeekly(): Promise<StatWeeklyDto> {
    const stat = await this.statsService.getWeekly();

    return this.statsMapper.fromDomainToWeeklyDto(stat);
  }

  @ApiResponse({
    type: () => StatMonthlyDto,
    isArray: true,
  })
  @Get('monthly')
  async getMonthly(): Promise<StatMonthlyDto[]> {
    const stats = await this.statsService.getMonthly();

    return stats.map(this.statsMapper.fromDomainToMonthlyDto);
  }
}
