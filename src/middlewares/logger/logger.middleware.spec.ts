import { Logger } from '@nestjs/common';
import { Request, Response } from 'express';

import LoggerMiddleware from './logger.middleware';

const loggerMock = {
  error: jest.fn(),
  warn: jest.fn(),
  log: jest.fn(),
} as unknown as Logger;

describe('LoggerMiddleware', () => {
  let logger: LoggerMiddleware;
  const nextMock = jest.fn();

  beforeEach(() => {
    logger = new LoggerMiddleware();
    Object.assign(logger, { logger: loggerMock });
  });

  afterEach(() => {
    nextMock.mockClear();
    Object.values(loggerMock).forEach((fn: jest.MockedFunction<() => void>) =>
      fn.mockClear(),
    );
  });

  it('should log error message', () => {
    logger.use(
      { method: 'GET', originalUrl: 'foo.com' } as Request,
      {
        statusCode: 500,
        statusMessage: 'internal error',
        on: (_, handler) => handler(),
      } as Response,
      nextMock,
    );

    expect(loggerMock.log).not.toBeCalled();
    expect(loggerMock.warn).not.toBeCalled();
    expect(loggerMock.error).toBeCalledWith('GET foo.com 500 internal error');
    expect(nextMock).toBeCalled();
  });

  it('should log warning message', () => {
    logger.use(
      { method: 'POST', originalUrl: 'foo.com' } as Request,
      {
        statusCode: 404,
        statusMessage: 'not found',
        on: (_, handler) => handler(),
      } as Response,
      nextMock,
    );

    expect(loggerMock.log).not.toBeCalled();
    expect(loggerMock.warn).toBeCalledWith('POST foo.com 404 not found');
    expect(loggerMock.error).not.toBeCalled();
    expect(nextMock).toBeCalled();
  });

  it('should log message', () => {
    logger.use(
      { method: 'POST', originalUrl: 'foo.com' } as Request,
      {
        statusCode: 201,
        statusMessage: 'resource created',
        on: (_, handler) => handler(),
      } as Response,
      nextMock,
    );

    expect(loggerMock.log).toBeCalledWith('POST foo.com 201 resource created');
    expect(loggerMock.warn).not.toBeCalled();
    expect(loggerMock.error).not.toBeCalled();
    expect(nextMock).toBeCalled();
  });
});
