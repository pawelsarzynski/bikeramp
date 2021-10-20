import { CreatedTripDto } from '../../src/trips/dto/createdTrip.dto';
import { CURRENCY, DISTANCE_UNIT } from '../../src/shared/constants';
import Trip from '../../src/trips/entities/trip.entity';
import { TripDto } from '../../src/trips/dto/trip.dto';

const createTripFixture: TripDto = {
  startAddress: {
    street: 'foo',
    buildingNo: 9,
    city: 'bar',
    country: 'baz',
  },
  destinationAddress: {
    street: 'qux',
    buildingNo: 91,
    city: 'quux',
    country: 'corge',
  },
  price: 12,
  date: '2021-09-09',
};

const tripFixture = Object.assign(new Trip(), {
  ...createTripFixture,
  id: 1,
  distance: 19,
  createdAt: '2021-10-19',
});

const tripDtoFixture: CreatedTripDto = {
  startAddress: 'foo 9, bar, baz',
  destinationAddress: 'qux 91, quux, corge',
  price: `12.00${CURRENCY}`,
  distance: `19.000${DISTANCE_UNIT}`,
  date: '2021-09-09',
};

export { createTripFixture, tripDtoFixture, tripFixture };
