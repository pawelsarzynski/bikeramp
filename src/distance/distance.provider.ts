import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client, LatLng } from '@googlemaps/google-maps-services-js';

import Address from '../addresses/entities/address.entity';
import { AddressesMapper } from '../addresses/addresses.mapper';
import { METERS_IN_KILOMETER, ERROR_MESSAGES } from '../shared/constants';

@Injectable()
export class DistanceProvider {
  #timeout = 1000;

  constructor(
    private readonly configService: ConfigService,
    private readonly addressesMapper: AddressesMapper,
    private readonly googleClient: Client,
  ) {}

  async getDistance(from: Address, to: Address): Promise<number> {
    const fromCoords = await this.#getCoordinates(from);
    const toCoords = await this.#getCoordinates(to);

    const { data } = await this.googleClient.distancematrix({
      params: {
        origins: [fromCoords],
        destinations: [toCoords],
        key: this.configService.get('GOOGLE_API_KEY'),
      },
      timeout: this.#timeout,
    });

    return data.rows[0].elements[0].distance.value / METERS_IN_KILOMETER;
  }

  #getCoordinates = async (address: Address): Promise<LatLng> => {
    const addressDto = this.addressesMapper.fromDomainToDto(address);

    const { data } = await this.googleClient.geocode({
      params: {
        address: addressDto,
        key: this.configService.get('GOOGLE_API_KEY'),
      },
      timeout: this.#timeout,
    });

    if (data.results.length === 0) {
      throw new BadRequestException({
        message: ERROR_MESSAGES.INVALID_ADDRESS,
      });
    }

    return data.results[0].geometry.location;
  };
}
