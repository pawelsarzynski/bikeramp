import { IsInt, IsNotEmpty, IsString, Min, MinLength } from 'class-validator';

export class AddressDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  public street: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  public buildingNo: number;

  @IsString()
  @MinLength(3)
  public city: string;

  @IsString()
  @MinLength(3)
  public country: string;
}
