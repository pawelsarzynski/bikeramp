import { NotImplementedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { AddressesMapper } from './addresses.mapper';
import { addressFixture, addressDtoFixture } from '../../test/fixtures';

describe('AddressesMapper', () => {
  let mapper: AddressesMapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddressesMapper],
    }).compile();

    mapper = module.get<AddressesMapper>(AddressesMapper);
  });

  it('should be defined', () => {
    expect(mapper).toBeDefined();
  });

  describe('fromDtoToDomain', () => {
    it('should throw error', () => {
      try {
        expect(mapper.fromDtoToDomain()).toThrowError();
      } catch (ex) {
        expect(ex).toBeInstanceOf(NotImplementedException);
      }
    });
  });

  describe('fromDomainToDto', () => {
    it('should map object to address dto', () => {
      const result = mapper.fromDomainToDto(addressFixture);

      expect(result).toEqual(addressDtoFixture);
    });
  });
});
