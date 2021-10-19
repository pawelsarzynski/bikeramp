import { Injectable, NotImplementedException } from '@nestjs/common';

import Address from 'src/addresses/entities/address.entity';

@Injectable()
export class AddressesMapper {
  fromDomainToDto(address: Address): string {
    return `${address.street} ${address.buildingNo}, ${address.city}, ${address.country}`;
  }

  fromDtoToDomain() {
    throw new NotImplementedException();
  }
}
