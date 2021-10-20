import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { Client } from '@googlemaps/google-maps-services-js';

import { DistanceProvider } from './distance.provider';
import { AddressesMapper } from '../addresses/addresses.mapper';

const addressesMapperMock = {
  fromDomainToDto: jest.fn((val) => Object.values(val).join(' ')),
};
const googleClientMock = {
  distancematrix: jest.fn(),
  geocode: jest.fn(),
};

const addressFromFixture = {
  id: 1,
  street: 'foo',
  buildingNo: 1,
  city: 'bar',
  country: 'baz',
  createdAt: '2021',
};
const addressToFixture = {
  id: 2,
  street: 'qux',
  buildingNo: 2,
  city: 'quux',
  country: 'corge',
  createdAt: '2021',
};

describe('StatsMapper', () => {
  let provider: DistanceProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DistanceProvider,
        AddressesMapper,
        {
          provide: ConfigService,
          useValue: {
            get: (key: string) => `${key}_MOCK`,
          },
        },
        {
          provide: Client,
          useValue: googleClientMock,
        },
      ],
    })
      .overrideProvider(AddressesMapper)
      .useValue(addressesMapperMock)
      .compile();

    provider = module.get<DistanceProvider>(DistanceProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  describe('getDistance', () => {
    it('should get distance between addresses', async () => {
      googleClientMock.geocode
        .mockResolvedValueOnce({
          data: { results: [{ geometry: { location: { lat: 20, lng: 51 } } }] },
        })
        .mockResolvedValueOnce({
          data: { results: [{ geometry: { location: { lat: 21, lng: 50 } } }] },
        });
      googleClientMock.distancematrix.mockResolvedValueOnce({
        data: { rows: [{ elements: [{ distance: { value: 99000 } }] }] },
      });

      const result = await provider.getDistance(
        addressFromFixture,
        addressToFixture,
      );

      expect(result).toEqual(99);
      expect(googleClientMock.geocode).toBeCalledTimes(2);
      expect(googleClientMock.geocode).toHaveBeenNthCalledWith(1, {
        params: {
          address: Object.values(addressFromFixture).join(' '),
          key: 'GOOGLE_API_KEY_MOCK',
        },
        timeout: 1000,
      });
      expect(googleClientMock.geocode).toHaveBeenNthCalledWith(2, {
        params: {
          address: Object.values(addressToFixture).join(' '),
          key: 'GOOGLE_API_KEY_MOCK',
        },
        timeout: 1000,
      });
      expect(googleClientMock.distancematrix).toBeCalledWith({
        params: {
          origins: [{ lat: 20, lng: 51 }],
          destinations: [{ lat: 21, lng: 50 }],
          key: 'GOOGLE_API_KEY_MOCK',
        },
        timeout: 1000,
      });
      expect(addressesMapperMock.fromDomainToDto).toHaveBeenCalledTimes(2);
      expect(addressesMapperMock.fromDomainToDto).toHaveBeenNthCalledWith(
        1,
        addressFromFixture,
      );
      expect(addressesMapperMock.fromDomainToDto).toHaveBeenNthCalledWith(
        2,
        addressToFixture,
      );
    });
  });
});
