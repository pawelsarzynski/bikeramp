import { ApiProperty } from '@nestjs/swagger';

export class StatWeeklyDto {
  @ApiProperty()
  totalDistance: string;

  @ApiProperty()
  totalPrice: string;
}
