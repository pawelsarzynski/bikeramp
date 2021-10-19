import Trip from '../../src/trips/entities/trip.entity';

const createTripFixture = {
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
};

const tripFixture = Object.assign(new Trip(), {
  ...createTripFixture,
  id: 1,
  distance: 19,
  createdAt: '2021-10-19',
});

const tripDtoFixture = {
  startAddress: 'foo 9, bar, baz',
  destinationAddress: 'qux 91, quux, corge',
  price: 12,
  distance: 19,
};

export { createTripFixture, tripDtoFixture, tripFixture };
