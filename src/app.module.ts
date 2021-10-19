import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from 'src/database/database.module';
import { HealthModule } from 'src/health/health.module';
import LoggerMiddleware from 'src/middlewares/logger/logger.middleware';
import { TripsModule } from 'src/trips/trips.module';

import { config } from '../config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot(config),
    DatabaseModule,
    HealthModule,
    TripsModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
