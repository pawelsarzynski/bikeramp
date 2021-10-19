import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from '@googlemaps/google-maps-services-js';

import Address from '../addresses/entities/address.entity';
import { AddressesMapper } from '../addresses/addresses.mapper';
import { METERS_IN_KILOMETER } from '../shared/constants';

@Injectable()
export class DistanceProvider {
  #googleClient: Client;

  #timeout = 1000;

  constructor(
    private readonly configService: ConfigService,
    private readonly addressesMapper: AddressesMapper,
  ) {
    this.#googleClient = new Client();
  }

  async getDistance(from: Address, to: Address) {
    const fromCoords = await this.#getCoordinates(from);
    const toCoords = await this.#getCoordinates(to);

    const distance = await this.#googleClient.distancematrix({
      params: {
        origins: [fromCoords],
        destinations: [toCoords],
        key: this.configService.get('GOOGLE_API_KEY'),
      },
      timeout: this.#timeout,
    });

    return (
      distance.data.rows[0].elements[0].distance.value / METERS_IN_KILOMETER
    );
  }

  #getCoordinates = async (address: Address) => {
    const addressDto = this.addressesMapper.fromDomainToDto(address);

    const res = await this.#googleClient.geocode({
      params: {
        address: addressDto,
        key: this.configService.get('GOOGLE_API_KEY'),
      },
      timeout: this.#timeout,
    });

    return res.data.results[0].geometry.location;
  };
}
