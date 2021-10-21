import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as request from 'supertest';

import Trip from '../src/trips/entities/trip.entity';
import { StatsModule } from '../src/stats/stats.module';
import { StatsService } from '../src/stats/stats.service';
import {
  statWeeklyFixture,
  statWeeklyDtoFixture,
  createStatMonthlyFixture,
  createStatMonthlyDtoFixture,
} from './fixtures';

describe('StatsController (e2e)', () => {
  let app: INestApplication;
  const statsServiceMock = {
    getWeekly: async () => statWeeklyFixture,
    getMonthly: async () => [
      createStatMonthlyFixture('2021-10-21'),
      createStatMonthlyFixture('2021-10-20', 1.5),
      createStatMonthlyFixture('2021-10-19', 2),
    ],
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [StatsModule],
    })
      .overrideProvider(StatsService)
      .useValue(statsServiceMock)
      .overrideProvider(getRepositoryToken(Trip))
      .useValue({})
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/stats/weekly (GET)', () => {
    return request(app.getHttpServer())
      .get('/stats/weekly')
      .expect(200)
      .expect(statWeeklyDtoFixture);
  });

  it('/stats/monthly (GET)', () => {
    return request(app.getHttpServer())
      .get('/stats/monthly')
      .expect(200)
      .expect([
        createStatMonthlyDtoFixture('October, 21st'),
        createStatMonthlyDtoFixture('October, 20th', 1.5),
        createStatMonthlyDtoFixture('October, 19th', 2),
      ]);
  });
});
