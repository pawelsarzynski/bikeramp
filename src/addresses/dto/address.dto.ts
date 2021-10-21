import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Min, MinLength } from 'class-validator';

export class AddressDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  public street: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  public buildingNo: number;

  @ApiProperty()
  @IsString()
  @MinLength(3)
  public city: string;

  @ApiProperty()
  @IsString()
  @MinLength(3)
  public country: string;
}
