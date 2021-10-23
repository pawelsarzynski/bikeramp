import { Test, TestingModule } from '@nestjs/testing';
import {
  HealthCheckService,
  TypeOrmHealthIndicator,
  MemoryHealthIndicator,
  DiskHealthIndicator,
} from '@nestjs/terminus';

import { HealthController } from './health.controller';

const healthCheckServiceMock = {
  check: jest.fn((callbacks: Array<() => void>) => {
    callbacks.forEach((fn) => fn());
    return 'health checks';
  }),
};
const typeOrmHealthIndicatorMock = { pingCheck: jest.fn(() => 'ping check') };
const memoryHealthIndicatorMock = {
  checkHeap: jest.fn(() => 'check heap'),
  checkRSS: jest.fn(() => 'check rrs'),
};
const diskHealthIndicatorMock = {
  checkStorage: jest.fn(() => 'check storage'),
};

describe('HealthController', () => {
  let controller: HealthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [
        {
          provide: HealthCheckService,
          useValue: healthCheckServiceMock,
        },
        {
          provide: TypeOrmHealthIndicator,
          useValue: typeOrmHealthIndicatorMock,
        },
        {
          provide: MemoryHealthIndicator,
          useValue: memoryHealthIndicatorMock,
        },
        {
          provide: DiskHealthIndicator,
          useValue: diskHealthIndicatorMock,
        },
      ],
    }).compile();

    controller = module.get<HealthController>(HealthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('check', () => {
    it('should run health checks and return result', async () => {
      const result = await controller.check();

      expect(result).toBe('health checks');
      expect(healthCheckServiceMock.check).toBeCalled();
      expect(typeOrmHealthIndicatorMock.pingCheck).toBeCalledWith('database');
      expect(memoryHealthIndicatorMock.checkHeap).toBeCalledWith(
        'memory heap',
        300 * 1024 * 1024,
      );
      expect(memoryHealthIndicatorMock.checkRSS).toBeCalledWith(
        'memory RSS',
        300 * 1024 * 1024,
      );
      expect(diskHealthIndicatorMock.checkStorage).toBeCalledWith(
        'disk health',
        { thresholdPercent: 0.5, path: '/' },
      );
    });
  });
});
