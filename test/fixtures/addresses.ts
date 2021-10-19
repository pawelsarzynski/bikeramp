import Address from '../../src/addresses/entities/address.entity';

const addressFixture = Object.assign(new Address(), {
  street: 'foo',
  buildingNo: 9,
  city: 'bar',
  country: 'baz',
});

const addressDtoFixture = 'foo 9, bar, baz';

export { addressFixture, addressDtoFixture };
