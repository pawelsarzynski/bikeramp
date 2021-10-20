import { formatCurrency } from '.';

describe('formatCurrency', () => {
  test.each`
    value        | expected
    ${12}        | ${'12.00PLN'}
    ${12.3211}   | ${'12.32PLN'}
    ${0.231}     | ${'0.23PLN'}
    ${1092.32}   | ${'1092.32PLN'}
    ${'12'}      | ${'12.00PLN'}
    ${'9.321'}   | ${'9.32PLN'}
    ${null}      | ${'0.00PLN'}
    ${undefined} | ${'0.00PLN'}
    ${NaN}       | ${'0.00PLN'}
    ${Infinity}  | ${'0.00PLN'}
  `(
    'should return $expected when $value is provided',
    ({ value, expected }) => {
      expect(formatCurrency(value)).toBe(expected);
    },
  );
});
