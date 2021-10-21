import { ApiProperty } from '@nestjs/swagger';

export class StatMonthlyDto {
  @ApiProperty()
  day: string;

  @ApiProperty()
  totalDistance: string;

  @ApiProperty()
  avgRide: string;

  @ApiProperty()
  avgPrice: string;
}
