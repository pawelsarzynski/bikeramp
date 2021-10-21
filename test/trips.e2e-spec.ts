import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as request from 'supertest';

import Trip from '../src/trips/entities/trip.entity';
import { TripsModule } from '../src/trips/trips.module';
import { TripsService } from '../src/trips/trips.service';
import { createTripFixture, tripFixture, tripDtoFixture } from './fixtures';

describe('TripsController (e2e)', () => {
  let app: INestApplication;
  const tripsServiceMock = { create: async () => tripFixture };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TripsModule],
    })
      .overrideProvider(TripsService)
      .useValue(tripsServiceMock)
      .overrideProvider(getRepositoryToken(Trip))
      .useValue({
        create: () => tripFixture,
      })
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  describe('/trips (POST)', () => {
    it('respond with 201 and return new trip', () => {
      return request(app.getHttpServer())
        .post('/trips')
        .send(createTripFixture)
        .expect(201)
        .expect(tripDtoFixture);
    });

    it('respond with 400 when an invalid field is send', () => {
      return request(app.getHttpServer())
        .post('/trips')
        .send({ ...createTripFixture, price: 'foo' })
        .expect(400)
        .expect({
          statusCode: 400,
          message: [
            'price must not be less than 0',
            'price must be a number conforming to the specified constraints',
          ],
          error: 'Bad Request',
        });
    });
  });
});
