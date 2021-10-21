import { ApiProperty } from '@nestjs/swagger';

export class CreatedTripDto {
  @ApiProperty()
  public startAddress: string;

  @ApiProperty()
  public destinationAddress: string;

  @ApiProperty()
  public price: string;

  @ApiProperty()
  public distance: string;

  @ApiProperty()
  public date: string;
}
