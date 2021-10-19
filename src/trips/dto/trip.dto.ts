import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, Min, ValidateNested } from 'class-validator';

import { AddressDto } from '../../addresses/dto/address.dto';

export class TripDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => AddressDto)
  public startAddress: AddressDto;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => AddressDto)
  public destinationAddress: AddressDto;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  public price: number;
}
