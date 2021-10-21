import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  Min,
  ValidateNested,
} from 'class-validator';

import { AddressDto } from '../../addresses/dto/address.dto';

export class TripDto {
  @ApiProperty({ type: () => AddressDto })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => AddressDto)
  public startAddress: AddressDto;

  @ApiProperty({ type: () => AddressDto })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => AddressDto)
  public destinationAddress: AddressDto;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  public price: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  public date: string;
}
